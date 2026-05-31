import { prisma } from '~/server/utils/database'

export default defineEventHandler(async (event) => {
  const method = event.method

  if (method === 'GET') {
    const query = getQuery(event)
    const categoryId = query.categoryId as string | undefined

    const posts = await prisma.post.findMany({
      where: categoryId ? { categoryId } : undefined,
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
          select: {
            id: true
          }
        }
      },
      orderBy: {
        createdAt: 'desc'
      }
    })

    const formattedPosts = posts.map(post => ({
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
      commentCount: post.comments.length,
      viewCount: post.viewCount
    }))

    return { posts: formattedPosts }
  }

  if (method === 'POST') {
    const body = await readBody(event)
    const { title, content, categoryId, authorId } = body

    if (!title || !content || !categoryId) {
      throw createError({
        statusCode: 400,
        message: '请填写所有必填字段'
      })
    }

    const category = await prisma.category.findUnique({
      where: { id: categoryId }
    })

    if (!category) {
      throw createError({
        statusCode: 400,
        message: '分类不存在'
      })
    }

    const newPost = await prisma.post.create({
      data: {
        title,
        content,
        authorId,
        categoryId
      },
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
        }
      }
    })

    return {
      post: {
        id: newPost.id,
        title: newPost.title,
        content: newPost.content,
        authorId: newPost.author.id,
        authorName: newPost.author.username,
        authorAvatar: newPost.author.avatar,
        categoryId: newPost.category.id,
        categoryName: newPost.category.name,
        createdAt: newPost.createdAt.toISOString(),
        updatedAt: newPost.updatedAt.toISOString(),
        commentCount: 0,
        viewCount: 0
      }
    }
  }

  throw createError({
    statusCode: 405,
    message: '方法不允许'
  })
})
