import { prisma } from '~/server/utils/database'

function generateToken(): string {
  return Math.random().toString(36).substring(2) + Date.now().toString(36)
}

export default defineEventHandler(async (event) => {
  if (event.method !== 'POST') {
    throw createError({
      statusCode: 405,
      message: '方法不允许'
    })
  }

  const body = await readBody(event)
  const { username, password } = body

  if (!username || !password) {
    throw createError({
      statusCode: 400,
      message: '请提供用户名和密码'
    })
  }

  const user = await prisma.user.findUnique({
    where: { username }
  })

  if (!user || user.password !== password) {
    throw createError({
      statusCode: 401,
      message: '用户名或密码错误'
    })
  }

  const token = generateToken()

  return {
    user: {
      id: user.id,
      username: user.username,
      email: user.email,
      avatar: user.avatar
    },
    token
  }
})
