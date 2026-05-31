import { prisma } from '~/server/utils/database'

export default defineEventHandler(async (event) => {
  const id = getRouterParam(event, 'id')

  if (!id) {
    throw createError({
      statusCode: 400,
      message: '帖子ID不能为空'
    })
  }

  const post = await prisma.post.findUnique({
    where: { id },
    include: {
      author: {
        select: {
          id: true,
          username: true,
          avatar: true
        }
      },
      category: {
        select: {
          id: true,
          name: true
        }
      },
      comments: {
        include: {
          author: {
            select: {
              id: true,
              username: true,
              avatar: true
            }
          }
        },
        orderBy: {
          createdAt: 'asc'
        }
      }
    }
  })

  if (!post) {
    throw createError({
      statusCode: 404,
      message: '帖子不存在'
    })
  }

  await prisma.post.update({
    where: { id },
    data: {
      viewCount: {
        increment: 1
      }
    }
  })

  const formattedPost = {
    id: post.id,
    title: post.title,
    content: post.content,
    authorId: post.author.id,
    authorName: post.author.username,
    authorAvatar: post.author.avatar,
    categoryId: post.category.id,
    categoryName: post.category.name,
    createdAt: post.createdAt.toISOString(),
    updatedAt: post.updatedAt.toISOString(),
    viewCount: post.viewCount + 1,
    commentCount: post.comments.length
  }

  const formattedComments = post.comments.map(comment => ({
    id: comment.id,
    postId: comment.postId,
    authorId: comment.author.id,
    authorName: comment.author.username,
    authorAvatar: comment.author.avatar,
    content: comment.content,
    createdAt: comment.createdAt.toISOString()
  }))

  return {
    post: formattedPost,
    comments: formattedComments
  }
})
