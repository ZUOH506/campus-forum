import { prisma } from '~/server/utils/database'

export default defineEventHandler(async (event) => {
  if (event.method !== 'POST') {
    throw createError({
      statusCode: 405,
      message: '方法不允许'
    })
  }

  const postId = getRouterParam(event, 'id')
  const body = await readBody(event)
  const { content, authorId } = body

  if (!content) {
    throw createError({
      statusCode: 400,
      message: '评论内容不能为空'
    })
  }

  if (!postId) {
    throw createError({
      statusCode: 400,
      message: '帖子ID不能为空'
    })
  }

  const post = await prisma.post.findUnique({
    where: { id: postId }
  })

  if (!post) {
    throw createError({
      statusCode: 404,
      message: '帖子不存在'
    })
  }

  const author = await prisma.user.findUnique({
    where: { id: authorId }
  })

  const newComment = await prisma.comment.create({
    data: {
      content,
      postId,
      authorId
    },
    include: {
      author: {
        select: {
          id: true,
          username: true,
          avatar: true
        }
      }
    }
  })

  return {
    comment: {
      id: newComment.id,
      postId: newComment.postId,
      authorId: newComment.author.id,
      authorName: newComment.author.username,
      authorAvatar: newComment.author.avatar,
      content: newComment.content,
      createdAt: newComment.createdAt.toISOString()
    }
  }
})
