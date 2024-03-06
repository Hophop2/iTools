import { colorGenerate } from "@/constants/constants";
import { db } from "@/db";
import { getKindeServerSession } from "@kinde-oss/kinde-auth-nextjs/server";
import { createUploadthing, type FileRouter } from "uploadthing/next";

import {PDFLoader} from 'langchain/document_loaders/fs/pdf'
import {OpenAIEmbeddings} from 'langchain/embeddings/openai'
import {PineconeStore} from 'langchain/vectorstores/pinecone'
import { pinecone } from "@/lib/pinecone";



 
const f = createUploadthing();
 


export const ourFileRouter = {

  pdfUploader: f({ pdf: { maxFileSize: "4MB" } })

    .middleware(async ({ req }) => {

      const {getUser} = getKindeServerSession()

      const kindeUser = getUser()

      if(!kindeUser || !kindeUser.id) throw new Error('UNAUTHORIZED')
    
 

      return { uploadUserId: kindeUser.id };
    })
    .onUploadComplete(async ({ metadata, file }) => {
      const color = colorGenerate()
      const newFile = await db.file.create({
        data: {
          key: file.key,
          name: file.name,
          color: color,
          userId: metadata.uploadUserId,
          url: `https://uploadthing-prod.s3.us-west-2.amazonaws.com/${file.key}`,
          uploadStatus: "PROCESSING",
          updatedAt: new Date(),
          
        },
      })
      try {
        const res = await fetch(`https://uploadthing-prod.s3.us-west-2.amazonaws.com/${file.key}`)
        const blob = await res.blob()

        const loader = new PDFLoader(blob)

        const pageLvlDocs = await loader.load()

        

        //vectorize and index doc
      
        const pineconeIndex = await pinecone
      .Index("aireader")
      .namespace(newFile.id);
      
      
     
      
        const embeddings = new OpenAIEmbeddings({
          openAIApiKey: process.env.OPENAI_API_KEY,
        })

        await PineconeStore.fromDocuments(
          pageLvlDocs,
          embeddings,
          {
            pineconeIndex

            
          }
        )

        await db.file.update({
          data: {
            uploadStatus: 'SUCCESS'
          },
          where: {
            id: newFile.id
          }
        })
      } catch (err) {
        console.log("erorr" + err)
        await db.file.update({
          data: {
            uploadStatus: 'FAILED'
          },
          where: {
            id: newFile.id
          }
        })
      
     
      }
    }),
} satisfies FileRouter;
 
export type OurFileRouter = typeof ourFileRouter;