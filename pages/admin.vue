<template>
  <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
    <div class="mb-10 text-center animate-fade-in-up">
      <h1 class="text-5xl font-black mb-4">
        <span class="bg-gradient-to-r from-pink-600 via-purple-600 to-indigo-600 bg-clip-text text-transparent">
          ⚙️ 管理后台
        </span>
      </h1>
      <p class="text-xl text-gray-600">欢迎回来，管理员！</p>
    </div>

    <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-10">
      <div class="glass-effect rounded-2xl p-6 card-hover">
        <div class="flex items-center justify-between mb-4">
          <div class="w-14 h-14 rounded-xl bg-gradient-to-br from-blue-500 to-blue-600 flex items-center justify-center text-white text-2xl shadow-lg">
            📝
          </div>
          <span class="text-xs font-semibold text-blue-600 bg-blue-100 px-3 py-1 rounded-full">
            帖子
          </span>
        </div>
        <h3 class="text-3xl font-black text-gray-800 mb-1">{{ stats.posts }}</h3>
        <p class="text-sm text-gray-600">总帖子数</p>
      </div>

      <div class="glass-effect rounded-2xl p-6 card-hover">
        <div class="flex items-center justify-between mb-4">
          <div class="w-14 h-14 rounded-xl bg-gradient-to-br from-green-500 to-green-600 flex items-center justify-center text-white text-2xl shadow-lg">
            💬
          </div>
          <span class="text-xs font-semibold text-green-600 bg-green-100 px-3 py-1 rounded-full">
            评论
          </span>
        </div>
        <h3 class="text-3xl font-black text-gray-800 mb-1">{{ stats.comments }}</h3>
        <p class="text-sm text-gray-600">总评论数</p>
      </div>

      <div class="glass-effect rounded-2xl p-6 card-hover">
        <div class="flex items-center justify-between mb-4">
          <div class="w-14 h-14 rounded-xl bg-gradient-to-br from-purple-500 to-purple-600 flex items-center justify-center text-white text-2xl shadow-lg">
            👥
          </div>
          <span class="text-xs font-semibold text-purple-600 bg-purple-100 px-3 py-1 rounded-full">
            用户
          </span>
        </div>
        <h3 class="text-3xl font-black text-gray-800 mb-1">{{ stats.users }}</h3>
        <p class="text-sm text-gray-600">总用户数</p>
      </div>

      <div class="glass-effect rounded-2xl p-6 card-hover">
        <div class="flex items-center justify-between mb-4">
          <div class="w-14 h-14 rounded-xl bg-gradient-to-br from-orange-500 to-orange-600 flex items-center justify-center text-white text-2xl shadow-lg">
            📂
          </div>
          <span class="text-xs font-semibold text-orange-600 bg-orange-100 px-3 py-1 rounded-full">
            分类
          </span>
        </div>
        <h3 class="text-3xl font-black text-gray-800 mb-1">{{ stats.categories }}</h3>
        <p class="text-sm text-gray-600">总分类数</p>
      </div>
    </div>

    <div class="grid grid-cols-1 lg:grid-cols-2 gap-8">
      <div class="glass-effect rounded-3xl p-8">
        <h2 class="text-2xl font-bold text-gray-800 mb-6 flex items-center gap-3">
          <span class="w-10 h-10 rounded-xl bg-gradient-to-br from-red-500 to-pink-500 flex items-center justify-center text-white shadow-lg">📝</span>
          帖子管理
        </h2>
        <div v-if="loadingPosts" class="text-center py-8">
          <div class="inline-block w-10 h-10 border-4 border-red-200 border-t-red-600 rounded-full animate-spin"></div>
        </div>
        <div v-else-if="recentPosts.length === 0" class="text-center py-8 text-gray-500">
          暂无帖子
        </div>
        <div v-else class="space-y-3">
          <div
            v-for="post in recentPosts"
            :key="post.id"
            class="p-4 rounded-xl bg-white/80 border-2 border-gray-100 hover:border-red-200 transition-all duration-300"
          >
            <div class="flex items-start justify-between gap-4">
              <div class="flex-1 min-w-0">
                <h4 class="font-bold text-gray-800 truncate">{{ post.title }}</h4>
                <p class="text-sm text-gray-500 mt-1">
                  <span class="badge badge-primary mr-2">{{ post.categoryName }}</span>
                  <span>👤 {{ post.authorName }}</span>
                </p>
              </div>
              <div class="flex items-center gap-2 text-sm text-gray-500">
                <span class="flex items-center gap-1">👁️ {{ post.viewCount }}</span>
                <span class="flex items-center gap-1">💬 {{ post.commentCount }}</span>
              </div>
            </div>
          </div>
        </div>
        <NuxtLink to="/posts" class="block mt-6 text-center gradient-bg text-white font-semibold py-3 rounded-xl hover:shadow-lg transition-all duration-300">
          查看全部帖子 →
        </NuxtLink>
      </div>

      <div class="glass-effect rounded-3xl p-8">
        <h2 class="text-2xl font-bold text-gray-800 mb-6 flex items-center gap-3">
          <span class="w-10 h-10 rounded-xl bg-gradient-to-br from-indigo-500 to-purple-500 flex items-center justify-center text-white shadow-lg">📂</span>
          分类管理
        </h2>
        <div v-if="loadingCategories" class="text-center py-8">
          <div class="inline-block w-10 h-10 border-4 border-indigo-200 border-t-indigo-600 rounded-full animate-spin"></div>
        </div>
        <div v-else-if="categories.length === 0" class="text-center py-8 text-gray-500">
          暂无分类
        </div>
        <div v-else class="space-y-3">
          <div
            v-for="category in categories"
            :key="category.id"
            class="p-4 rounded-xl bg-white/80 border-2 border-gray-100 hover:border-indigo-200 transition-all duration-300"
          >
            <div class="flex items-center justify-between">
              <div>
                <h4 class="font-bold text-gray-800">{{ category.name }}</h4>
                <p class="text-sm text-gray-500 mt-1">{{ category.description }}</p>
              </div>
              <span class="badge badge-primary">
                {{ category.postCount }} 篇
              </span>
            </div>
          </div>
        </div>
        <NuxtLink to="/categories" class="block mt-6 text-center gradient-bg text-white font-semibold py-3 rounded-xl hover:shadow-lg transition-all duration-300">
          管理分类 →
        </NuxtLink>
      </div>
    </div>

    <div class="mt-8 glass-effect rounded-3xl p-8">
      <h2 class="text-2xl font-bold text-gray-800 mb-6 flex items-center gap-3">
        <span class="w-10 h-10 rounded-xl bg-gradient-to-br from-yellow-500 to-orange-500 flex items-center justify-center text-white shadow-lg">⚡</span>
        快速操作
      </h2>
      <div class="grid grid-cols-1 md:grid-cols-3 gap-4">
        <NuxtLink
          to="/posts/create"
          class="block p-5 rounded-xl bg-white/80 border-2 border-gray-100 hover:border-yellow-200 hover:shadow-lg transition-all duration-300 text-center group"
        >
          <div class="text-4xl mb-3 group-hover:scale-110 transition-transform">✍️</div>
          <h4 class="font-bold text-gray-800">发布新帖</h4>
          <p class="text-sm text-gray-500 mt-1">创建新帖子</p>
        </NuxtLink>
        <NuxtLink
          to="/categories"
          class="block p-5 rounded-xl bg-white/80 border-2 border-gray-100 hover:border-yellow-200 hover:shadow-lg transition-all duration-300 text-center group"
        >
          <div class="text-4xl mb-3 group-hover:scale-110 transition-transform">📂</div>
          <h4 class="font-bold text-gray-800">分类管理</h4>
          <p class="text-sm text-gray-500 mt-1">编辑论坛分类</p>
        </NuxtLink>
        <NuxtLink
          to="/"
          class="block p-5 rounded-xl bg-white/80 border-2 border-gray-100 hover:border-yellow-200 hover:shadow-lg transition-all duration-300 text-center group"
        >
          <div class="text-4xl mb-3 group-hover:scale-110 transition-transform">🏠</div>
          <h4 class="font-bold text-gray-800">返回首页</h4>
          <p class="text-sm text-gray-500 mt-1">查看论坛首页</p>
        </NuxtLink>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { useAuthStore } from '~/stores/auth'

const auth = useAuthStore()
const router = useRouter()

if (!auth.isAuthenticated || auth.user?.username !== 'admin') {
  router.push('/login')
}

const stats = ref({
  posts: 0,
  comments: 0,
  users: 0,
  categories: 0
})

const recentPosts = ref<any[]>([])
const categories = ref<any[]>([])
const loadingPosts = ref(true)
const loadingCategories = ref(true)

async function fetchStats() {
  try {
    const [postsData, categoriesData] = await Promise.all([
      $fetch('/api/posts'),
      $fetch('/api/categories')
    ])

    stats.value.categories = (categoriesData as any).categories.length
    stats.value.posts = (postsData as any).posts.length
  } catch (error) {
    console.error('Failed to fetch stats:', error)
  }
}

async function fetchRecentPosts() {
  loadingPosts.value = true
  try {
    const data = await $fetch('/api/posts')
    recentPosts.value = (data as any).posts.slice(0, 5)
    stats.value.comments = (data as any).posts.reduce((sum: number, post: any) => sum + (post.commentCount || 0), 0)
  } catch (error) {
    console.error('Failed to fetch posts:', error)
  } finally {
    loadingPosts.value = false
  }
}

async function fetchCategories() {
  loadingCategories.value = true
  try {
    const data = await $fetch('/api/categories')
    categories.value = (data as any).categories
  } catch (error) {
    console.error('Failed to fetch categories:', error)
  } finally {
    loadingCategories.value = false
  }
}

async function fetchUsers() {
  try {
    const data = await $fetch('/api/users')
    stats.value.users = (data as any).users?.length || 1
  } catch (error) {
    stats.value.users = 1
  }
}

await Promise.all([
  fetchStats(),
  fetchRecentPosts(),
  fetchCategories(),
  fetchUsers()
])

useHead({
  title: '管理后台 - CampusHub'
})
</script>
