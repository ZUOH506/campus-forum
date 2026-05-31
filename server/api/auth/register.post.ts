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
  const { username, email, password } = body

  if (!username || !email || !password) {
    throw createError({
      statusCode: 400,
      message: '请填写所有必填字段'
    })
  }

  if (password.length < 6) {
    throw createError({
      statusCode: 400,
      message: '密码至少需要6位'
    })
  }

  const existingUser = await prisma.user.findFirst({
    where: {
      OR: [
        { username },
        { email }
      ]
    }
  })

  if (existingUser) {
    throw createError({
      statusCode: 400,
      message: '用户名或邮箱已存在'
    })
  }

  const avatar = `https://api.dicebear.com/7.x/avataaars/svg?seed=${username}`

  const newUser = await prisma.user.create({
    data: {
      username,
      email,
      password,
      avatar
    }
  })

  const token = generateToken()

  return {
    user: {
      id: newUser.id,
      username: newUser.username,
      email: newUser.email,
      avatar: newUser.avatar
    },
    token
  }
})
