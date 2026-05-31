export default defineEventHandler(async (event) => {
  const authHeader = getHeader(event, 'authorization')

  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    throw createError({
      statusCode: 401,
      message: '未授权'
    })
  }

  const token = authHeader.substring(7)

  const { getUserByToken } = await import('~/server/utils/auth')

  const user = getUserByToken(token)

  if (!user) {
    throw createError({
      statusCode: 401,
      message: '无效的令牌'
    })
  }

  return {
    user: {
      id: user.id,
      username: user.username,
      email: user.email,
      avatar: user.avatar
    }
  }
})
