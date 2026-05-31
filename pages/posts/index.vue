<template>
  <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
    <div class="flex items-center justify-between mb-8 animate-fade-in-up">
      <h1 class="text-4xl font-black">
        <span class="bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent">
          📚 帖子列表
        </span>
      </h1>
      <NuxtLink
        to="/posts/create"
        class="px-6 py-3 gradient-bg text-white font-bold rounded-xl hover:shadow-xl transform hover:-translate-y-1 transition-all duration-300 flex items-center gap-2"
      >
        <span>✍️</span> 发布新帖
      </NuxtLink>
    </div>

    <div class="glass-effect rounded-3xl shadow-xl overflow-hidden animate-fade-in-up">
      <div class="p-5 border-b border-gray-100 bg-white/50">
        <div class="flex items-center flex-wrap gap-3">
          <button
            @click="filter = 'all'"
            :class="[
              'px-5 py-2.5 rounded-xl text-sm font-bold transition-all duration-300',
              filter === 'all'
                ? 'gradient-bg text-white shadow-lg'
                : 'bg-white/70 text-gray-600 hover:bg-indigo-50 hover:text-indigo-600'
            ]"
          >
            📋 全部
          </button>
          <button
            v-for="category in postsStore.categories"
            :key="category.id"
            @click="filter = category.id"
            :class="[
              'px-5 py-2.5 rounded-xl text-sm font-bold transition-all duration-300',
              filter === category.id
                ? 'gradient-bg text-white shadow-lg'
                : 'bg-white/70 text-gray-600 hover:bg-indigo-50 hover:text-indigo-600'
            ]"
          >
            {{ category.name }}
          </button>
        </div>
      </div>

      <div v-if="postsStore.loading" class="p-12 text-center">
        <div class="inline-block w-12 h-12 border-4 border-indigo-200 border-t-indigo-600 rounded-full animate-spin"></div>
        <p class="mt-4 text-gray-500">加载中...</p>
      </div>
      <div v-else-if="filteredPosts.length === 0" class="p-12 text-center">
        <div class="text-6xl mb-4">📭</div>
        <p class="text-gray-500">暂无帖子，快来发布第一个帖子吧！</p>
      </div>
      <div v-else class="divide-y divide-gray-100">
        <NuxtLink
          v-for="post in filteredPosts"
          :key="post.id"
          :to="`/posts/${post.id}`"
          class="block p-6 bg-white/30 hover:bg-white hover:shadow-lg transition-all duration-300 group"
        >
          <div class="flex items-start justify-between">
            <div class="flex-1">
              <h3 class="text-xl font-bold text-gray-800 group-hover:text-indigo-600">{{ post.title }}</h3>
              <p class="mt-2 text-gray-600 line-clamp-2">{{ post.content }}</p>
              <div class="mt-4 flex items-center flex-wrap gap-3">
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
              </div>
            </div>
            <div class="ml-4 text-sm text-indigo-600 font-medium whitespace-nowrap">
              {{ formatDate(post.createdAt) }}
            </div>
          </div>
        </NuxtLink>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { usePostsStore } from '~/stores/posts'

const postsStore = usePostsStore()
const filter = ref('all')

await postsStore.fetchPosts()

const filteredPosts = computed(() => {
  if (filter.value === 'all') {
    return postsStore.posts
  }
  return postsStore.posts.filter(p => p.categoryId === filter.value)
})

function formatDate(dateString: string) {
  const date = new Date(dateString)
  return date.toLocaleDateString('zh-CN')
}

useHead({
  title: '帖子列表 - 校园论坛'
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
