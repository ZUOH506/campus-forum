import { prisma } from '~/server/utils/database'

export default defineEventHandler(async (event) => {
  if (event.method !== 'GET') {
    throw createError({
      statusCode: 405,
      message: '方法不允许'
    })
  }

  const categories = await prisma.category.findMany({
    include: {
      _count: {
        select: {
          posts: true
        }
      }
    },
    orderBy: {
      name: 'asc'
    }
  })

  const formattedCategories = categories.map(category => ({
    id: category.id,
    name: category.name,
    description: category.description,
    postCount: category._count.posts
  }))

  return { categories: formattedCategories }
})
