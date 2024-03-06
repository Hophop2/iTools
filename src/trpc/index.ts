
import { getKindeServerSession } from '@kinde-oss/kinde-auth-nextjs/server'
import {

  privateProcedure,
  publicProcedure,
  router,
} from './trpc'
import { TRPCError,} from '@trpc/server'
import { db } from '@/db'
import { z } from 'zod'
import { openai } from '@/lib/openai'

export const appRouter = router({
  authCallback: publicProcedure.query(async () => {
    const { getUser } = getKindeServerSession()
    const user = getUser()

    if ( !user ||!user.id || !user.email)
      throw new TRPCError({ code: 'UNAUTHORIZED' })

  
    const dbUser = await db.user.findFirst({
      where: {
        id: user.id,
      },
    })

    if (!dbUser) {
      await db.user.create({
        data: {
          id: user.id,
          email: user.email,
        },
      })
    }

    return { success: true }
}),
getFiles: privateProcedure.query(async({ctx}) => {
const {userId } = ctx
return await db.file.findMany({
  where: {
    userId: userId,
    
  }
})
}),
getFile: privateProcedure
.input(z.object({ key: z.string() }))
.mutation(async ({ ctx, input }) => {
  const { userId } = ctx

  const file = await db.file.findFirst({
    where: {
      key: input.key,
      userId,
    },
  })

  if (!file) throw new TRPCError({ code: 'NOT_FOUND' })

  return file
}),

getFileUploadStatus: privateProcedure.input(z.object({fileId: z.string()})).query(async({ctx, input}) => {
  const {userId} = ctx

  const file = await db.file.findFirst({
    where: {
      id: input.fileId,
      userId
    }
  })
  if(!file) return {status: 'PENDING' as const}

  return {status: file.uploadStatus}
}),

getFileMessages: privateProcedure.input(z.object({
  limit: z.number().min(1).max(50).nullish(),
  cursor: z.string().nullish(),
  fileId: z.string(),
})).query(async({ctx, input}) => {
  const {userId} = ctx
  const {fileId, cursor} = input

  const limit = input.limit ?? 8

  const file = await db.file.findFirst({
    where: {
      id: fileId,
      userId
    }
  })

  if(!file) throw new TRPCError({code: 'NOT_FOUND'})

  const messages = await db.message.findMany({
take: limit + 1,
where: {
  fileId
},
orderBy: {
  createdAt: 'desc'
},
cursor: cursor ? {id:cursor} : undefined,
select: {
  id: true,
  isUserMessage: true,
  createdAt: true,
  text: true,
}
  })

  let nextCursor: typeof cursor | undefined=undefined
  if(messages.length > limit) {
    const nextMsg = messages.pop()
    nextCursor = nextMsg?.id
  }

  return {
    messages,
    nextCursor,
  }
}),

deleteFile: privateProcedure.input(z.object({id: z.string()})).mutation(async ({ctx, input}) => {
  const {userId} = ctx

  const file = db.file.findFirst({
    where: {
      id: userId
    }
  })

  if(!file) throw new TRPCError({code: 'NOT_FOUND'})

  await db.file.delete({
    where: {
      id: input.id,
    }
  })

  return file
}),

CreateImage: privateProcedure.input(z.object({prompt: z.string()})).mutation(async({ctx, input}) => {
  try {
    
    const {prompt} = input
    
      const response = await openai.images.generate({
        prompt: prompt,
        n: 1,
        size: '512x512',
      })
    
    
    
      return response
  } catch(err) {
    console.error('Wystąpił błąd w funkcji CreateImage:', err);
    throw new Error('Wystąpił błąd podczas generowania obrazu')
  }

}),

saveImage: privateProcedure.input(z.object({prompt: z.string(), image: z.string()})).mutation(async({ctx, input}) => {
  const {userId} = ctx
const {prompt, image} = input

await db.image.create({
  data: {
    url: image,
    prompt: prompt,
    userId,
  }
})

 
}),

getImages: privateProcedure.query(async({ctx}) => {
  const {userId} = ctx
  console.log(userId)
 const images = await db.image.findMany({
    where: {
        userId: userId
    }
  })
  if(!images) throw new TRPCError({code: 'NOT_FOUND'})
  
  return images
}),

getImage: privateProcedure.input(z.object({imageId: z.string()})).query(async({ctx, input}) => {
  const {userId} = ctx

  const image = await db.image.findFirst({
    where: {
      id: input.imageId,
      userId
    }
  })

  if(!image) throw new TRPCError({code: 'NOT_FOUND'})
  return image
}),
})

export type AppRouter = typeof appRouter
