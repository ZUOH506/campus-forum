import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

async function main() {
  console.log('开始数据库初始化...')

  const categories = [
    {
      name: '公告',
      description: '论坛公告和重要通知'
    },
    {
      name: '学习',
      description: '学习方法与资源分享'
    },
    {
      name: '生活',
      description: '校园生活点滴'
    },
    {
      name: '二手',
      description: '二手交易信息'
    },
    {
      name: '活动',
      description: '校园活动信息'
    }
  ]

  for (const category of categories) {
    await prisma.category.upsert({
      where: { name: category.name },
      update: {},
      create: category
    })
    console.log(`分类 ${category.name} 创建成功`)
  }

  const adminUser = await prisma.user.upsert({
    where: { username: 'admin' },
    update: {},
    create: {
      username: 'admin',
      email: 'admin@campus.edu',
      password: 'admin123',
      avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=admin'
    }
  })
  console.log(`管理员用户 ${adminUser.username} 创建成功`)

  const welcomePost = await prisma.post.upsert({
    where: { id: 'welcome-post' },
    update: {},
    create: {
      id: 'welcome-post',
      title: '欢迎来到校园论坛',
      content: `这是一个为校园生活打造的论坛平台，欢迎大家积极参与讨论！

在这里你可以：
- 发布校园资讯
- 分享学习方法
- 交流生活心得
- 参与各种活动

希望大家在论坛里玩得开心！`,
      authorId: adminUser.id,
      categoryId: (await prisma.category.findUnique({ where: { name: '公告' } }))!.id
    }
  })
  console.log(`欢迎帖子 "${welcomePost.title}" 创建成功`)

  const welcomeComment = await prisma.comment.upsert({
    where: { id: 'welcome-comment' },
    update: {},
    create: {
      id: 'welcome-comment',
      content: '欢迎大家！希望大家在论坛里玩得开心！',
      authorId: adminUser.id,
      postId: welcomePost.id
    }
  })
  console.log(`欢迎评论创建成功`)

  console.log('数据库初始化完成！')
}

main()
  .catch((e) => {
    console.error('初始化失败:', e)
    process.exit(1)
  })
  .finally(async () => {
    await prisma.$disconnect()
  })
