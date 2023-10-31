import { db } from "@/db";
import { openai } from "@/lib/openai";
import { pinecone } from "@/lib/pinecone";
import { SendMessageValidator } from "@/lib/validators";
import { getKindeServerSession } from "@kinde-oss/kinde-auth-nextjs/server";
import {OpenAIStream, StreamingTextResponse} from 'ai'
import { OpenAIEmbeddings } from "langchain/embeddings/openai";
import { PineconeStore } from "langchain/vectorstores/pinecone";
import { NextRequest } from "next/server";

export const POST = async (req: NextRequest) => {
    //LOGIC TO ASKING PDF

    const body = await req.json()

    const {getUser} = getKindeServerSession()
    const user = getUser()
    const {id: userId} = user

    if(!userId) return new Response('Unauthorized', {status: 401})

    const {fileId, message} = SendMessageValidator.parse(body)

    const file = await db.file.findFirst({
        where: {
            id: fileId,
            userId,
        }
    })

    if(!file) return  new Response('Not found', {status: 404})

    await db.message.create({
        data: {
            text: message,
            isUserMessage: true,
            userId,
            fileId,
            
        }
    })


    const embeddings = new OpenAIEmbeddings({
        openAIApiKey: process.env.OPENAI_API_KEY,
      })

      const pineconeIndex = await pinecone
      .Index("aireader")
      .namespace(file.id);

      const vectorStore = await PineconeStore.fromExistingIndex(embeddings, {
        pineconeIndex
      })

      const results = await vectorStore.similaritySearch(message, 4)

      const prevMsgs = await db.message.findMany({
        where:{
            fileId,
        },
        orderBy: {
            createdAt: 'asc'
        },
        take: 8
      })

      const formattedMsgs = prevMsgs.map((msg) => ({
        role: msg.isUserMessage ? 'user' as const : "assistant" as const,
        content: msg.text
      }))

      const res = await openai.chat.completions.create({
        model: 'gpt-3.5-turbo',
        temperature: 0,
        stream:true,
        messages: [
             //better prompt
            {
              role: 'system',
              content:
                'Use the following pieces of context (or previous conversaton if needed) to answer the users question in markdown format.',
            },
            {
               
              role: 'user',
              content: `Use the following pieces of context (or previous conversaton if needed) to answer the users question in markdown format. \nIf you don't know the answer, just say that you don't know, don't try to make up an answer.
              
        \n----------------\n
        
        PREVIOUS CONVERSATION:
        ${formattedMsgs.map((msg) => {
          if (msg.role === 'user') return `User: ${msg.content}\n`
          return `Assistant: ${msg.content}\n`
        })}
        
        \n----------------\n
        
        CONTEXT:
        ${results.map((r) => r.pageContent).join('\n\n')}
        
        USER INPUT: ${message}`,
            },
          ],
      })

      const stream = OpenAIStream(res, {
        async onCompletion(completion) {
            await db.message.create({
                data: {
                    text: completion,
                    isUserMessage: false,
                    fileId,
                    userId
                }
            })
        }
      })

      return new StreamingTextResponse(stream)
}