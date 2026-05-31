<template>
  <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
    <div class="mb-12 text-center animate-fade-in-up">
      <h1 class="text-5xl font-black mb-4">
        <span class="bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-600 bg-clip-text text-transparent">
          ✨ 欢迎来到CampusHub ✨
        </span>
      </h1>
      <p class="text-xl text-gray-600">发现校园生活，分享精彩瞬间</p>
    </div>

    <div class="grid grid-cols-1 lg:grid-cols-3 gap-8">
      <div class="lg:col-span-2">
        <div class="glass-effect rounded-3xl p-8 mb-6">
          <h2 class="text-2xl font-bold text-gray-800 mb-6 flex items-center gap-3">
            <span class="w-10 h-10 rounded-xl bg-gradient-to-br from-indigo-500 to-purple-600 flex items-center justify-center text-white shadow-lg">📝</span>
            最新帖子
          </h2>
          <div v-if="postsStore.loading" class="text-center py-12">
            <div class="inline-block w-12 h-12 border-4 border-indigo-200 border-t-indigo-600 rounded-full animate-spin"></div>
            <p class="mt-4 text-gray-500">加载中...</p>
          </div>
          <div v-else-if="postsStore.posts.length === 0" class="text-center py-12">
            <div class="text-6xl mb-4">📭</div>
            <p class="text-gray-500">暂无帖子，来说点什么吧！</p>
            <NuxtLink to="/posts/create" class="inline-block mt-4 btn-primary">
              发布第一个帖子
            </NuxtLink>
          </div>
          <div v-else class="space-y-4">
            <NuxtLink
              v-for="post in postsStore.posts"
              :key="post.id"
              :to="`/posts/${post.id}`"
              class="block p-6 rounded-2xl bg-white/80 border-2 border-gray-100 hover:border-indigo-300 hover:shadow-xl card-hover transition-all duration-300"
            >
              <h3 class="text-xl font-bold text-gray-800 mb-3">{{ post.title }}</h3>
              <p class="text-gray-600 line-clamp-2 mb-4">{{ post.content }}</p>
              <div class="flex items-center flex-wrap gap-3">
                <span class="badge badge-primary">
                  {{ post.categoryName }}
                </span>
                <span class="text-sm text-gray-500 flex items-center gap-1">
                  <span>👤</span> {{ post.authorName }}
                </span>
                <span class="text-sm text-gray-500 flex items-center gap-1">
                  <span>👁️</span> {{ post.viewCount }}
                </span>
                <span class="text-sm text-gray-500 flex items-center gap-1">
                  <span>💬</span> {{ post.commentCount }}
                </span>
                <span class="text-sm text-indigo-600 font-medium ml-auto">{{ formatDate(post.createdAt) }}</span>
              </div>
            </NuxtLink>
          </div>
        </div>
      </div>

      <div class="space-y-6">
        <div class="glass-effect rounded-3xl p-6">
          <h3 class="text-xl font-bold text-gray-800 mb-5 flex items-center gap-3">
            <span class="w-9 h-9 rounded-xl bg-gradient-to-br from-purple-500 to-pink-500 flex items-center justify-center text-white shadow-lg">📂</span>
            论坛分类
          </h3>
          <div class="space-y-3">
            <NuxtLink
              v-for="category in postsStore.categories"
              :key="category.id"
              :to="`/categories/${category.id}`"
              class="flex items-center justify-between p-4 rounded-xl bg-white/70 hover:bg-white hover:shadow-lg card-hover transition-all duration-300 group"
            >
              <span class="text-gray-700 font-medium group-hover:text-indigo-600">{{ category.name }}</span>
              <span class="badge badge-primary group-hover:shadow-md transition-shadow">
                {{ category.postCount }}
              </span>
            </NuxtLink>
          </div>
        </div>

        <div class="glass-effect rounded-3xl p-6">
          <h3 class="text-xl font-bold text-gray-800 mb-5 flex items-center gap-3">
            <span class="w-9 h-9 rounded-xl bg-gradient-to-br from-green-500 to-teal-500 flex items-center justify-center text-white shadow-lg">🚀</span>
            快速操作
          </h3>
          <NuxtLink
            to="/posts/create"
            class="block w-full text-center px-6 py-4 gradient-bg text-white font-bold rounded-xl hover:shadow-xl transform hover:-translate-y-1 transition-all duration-300"
          >
            ✍️ 发布新帖
          </NuxtLink>
        </div>

        <div class="glass-effect rounded-3xl p-6 pulse-glow">
          <h3 class="text-lg font-bold text-gray-800 mb-4 flex items-center gap-3">
            <span class="w-8 h-8 rounded-lg bg-gradient-to-br from-yellow-400 to-orange-500 flex items-center justify-center text-white">🌟</span>
            热门推荐
          </h3>
          <p class="text-sm text-gray-600 mb-4">
            加入我们，发现更多校园精彩内容！
          </p>
          <div class="text-3xl text-center">🎓</div>
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
