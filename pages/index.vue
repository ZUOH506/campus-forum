<template>
  <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
    <div class="mb-10 text-center">
      <h1 class="text-4xl font-black text-amber-800 mb-3">
        ✨ 欢迎来到校园论坛 ✨
      </h1>
      <p class="text-lg text-amber-700/70">发现校园生活，分享精彩瞬间</p>
    </div>

    <div class="grid grid-cols-1 lg:grid-cols-3 gap-8">
      <div class="lg:col-span-2">
        <div class="glass-effect rounded-2xl p-7 border border-amber-100 shadow-xl mb-6">
          <h2 class="text-2xl font-bold text-amber-800 mb-6 flex items-center">
            📝 最新帖子
          </h2>
          <div v-if="postsStore.loading" class="text-center py-10 text-black-600">
            <div class="animate-pulse">加载中...</div>
          </div>
          <div v-else-if="postsStore.posts.length === 0" class="text-center py-10 text-amber-600">
            暂无帖子
          </div>
          <div v-else class="space-y-4">
            <NuxtLink
              v-for="post in postsStore.posts"
              :key="post.id"
              :to="`/posts/${post.id}`"
              class="block p-5 rounded-xl bg-white/80 border-2 border-transparent hover:border-amber-300 hover:shadow-xl hover:-translate-y-1 transition-all duration-300"
            >
              <h3 class="text-xl font-bold text-gray-800 mb-2">{{ post.title }}</h3>
              <p class="text-gray-600 line-clamp-2 mb-4">{{ post.content }}</p>
              <div class="flex items-center flex-wrap gap-3">
                <span class="bg-gradient-to-r from-amber-100 to-orange-100 text-amber-700 px-3 py-1 rounded-full text-xs font-semibold">
                  {{ post.categoryName }}
                </span>
                <span class="text-sm text-gray-500">👤 {{ post.authorName }}</span>
                <span class="text-sm text-gray-500">👁️ {{ post.viewCount }}</span>
                <span class="text-sm text-gray-500">💬 {{ post.commentCount }}</span>
                <span class="text-sm text-teal-600 font-medium">{{ formatDate(post.createdAt) }}</span>
              </div>
            </NuxtLink>
          </div>
        </div>
      </div>

      <div class="space-y-6">
        <div class="glass-effect rounded-2xl p-6 border border-amber-100 shadow-xl">
          <h3 class="text-xl font-bold text-amber-800 mb-5 flex items-center">
            📂 论坛分类
          </h3>
          <div class="space-y-3">
            <NuxtLink
              v-for="category in postsStore.categories"
              :key="category.id"
              :to="`/categories/${category.id}`"
              class="flex items-center justify-between p-3 rounded-xl bg-white/70 hover:bg-white hover:shadow-md transition-all duration-300 group"
            >
              <span class="text-gray-700 font-medium group-hover:text-amber-700">{{ category.name }}</span>
              <span class="text-xs bg-amber-100 text-amber-700 px-3 py-1 rounded-full font-bold">
                {{ category.postCount }}
              </span>
            </NuxtLink>
          </div>
        </div>

        <div class="glass-effect rounded-2xl p-6 border border-teal-100 shadow-xl">
          <h3 class="text-xl font-bold text-teal-800 mb-5 flex items-center">
            🚀 快速操作
          </h3>
          <NuxtLink
            to="/posts/create"
            class="block w-full text-center px-6 py-4 bg-gradient-to-r from-amber-500 via-orange-500 to-teal-500 text-white font-bold rounded-xl hover:from-amber-600 hover:via-orange-600 hover:to-teal-600 hover:shadow-lg transform hover:-translate-y-1 transition-all duration-300"
          >
            ✍️ 发布新帖
          </NuxtLink>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { usePostsStore } from '~/stores/posts'

const postsStore = usePostsStore()

await Promise.all([
  postsStore.fetchPosts(),
  postsStore.fetchCategories()
])

function formatDate(dateString: string) {
  const date = new Date(dateString)
  const now = new Date()
  const diff = now.getTime() - date.getTime()
  const days = Math.floor(diff / (1000 * 60 * 60 * 24))

  if (days === 0) return '今天'
  if (days === 1) return '昨天'
  if (days < 7) return `${days}天前`
  return date.toLocaleDateString('zh-CN')
}

useHead({
  title: '首页 - 校园论坛'
})
</script>

<style scoped>
.line-clamp-2 {
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
}
</style>
