<template>
  <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
    <div class="flex items-center justify-between mb-8">
      <h1 class="text-3xl font-black text-amber-800">📚 帖子列表</h1>
      <NuxtLink
        to="/posts/create"
        class="px-6 py-3 bg-gradient-to-r from-amber-500 via-orange-500 to-teal-500 text-white font-bold rounded-xl hover:from-amber-600 hover:via-orange-600 hover:to-teal-600 hover:shadow-xl transform hover:-translate-y-0.5 transition-all duration-300"
      >
        ✍️ 发布新帖
      </NuxtLink>
    </div>

    <div class="glass-effect rounded-2xl shadow-xl border border-amber-100 overflow-hidden">
      <div class="p-5 border-b border-amber-100 bg-white/50">
        <div class="flex items-center flex-wrap gap-3">
          <button
            @click="filter = 'all'"
            :class="[
              'px-5 py-2.5 rounded-xl text-sm font-bold transition-all duration-300',
              filter === 'all'
                ? 'bg-gradient-to-r from-amber-500 to-orange-500 text-white shadow-md'
                : 'bg-white/70 text-gray-600 hover:bg-amber-50 hover:text-amber-700'
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
                ? 'bg-gradient-to-r from-amber-500 to-orange-500 text-white shadow-md'
                : 'bg-white/70 text-gray-600 hover:bg-amber-50 hover:text-amber-700'
            ]"
          >
            {{ category.name }}
          </button>
        </div>
      </div>

      <div v-if="postsStore.loading" class="p-12 text-center text-amber-600">
        <div class="animate-pulse text-lg">加载中...</div>
      </div>
      <div v-else-if="filteredPosts.length === 0" class="p-12 text-center text-amber-600">
        暂无帖子
      </div>
      <div v-else class="divide-y divide-amber-100">
        <NuxtLink
          v-for="post in filteredPosts"
          :key="post.id"
          :to="`/posts/${post.id}`"
          class="block p-6 bg-white/30 hover:bg-white hover:shadow-lg transition-all duration-300 group"
        >
          <div class="flex items-start justify-between">
            <div class="flex-1">
              <h3 class="text-xl font-bold text-gray-800 group-hover:text-amber-700">{{ post.title }}</h3>
              <p class="mt-2 text-gray-600 line-clamp-2">{{ post.content }}</p>
              <div class="mt-4 flex items-center flex-wrap gap-3">
                <span class="bg-gradient-to-r from-amber-100 to-orange-100 text-amber-700 px-3 py-1 rounded-full text-xs font-semibold">
                  {{ post.categoryName }}
                </span>
                <span class="text-sm text-gray-500">👤 {{ post.authorName }}</span>
                <span class="text-sm text-gray-500">👁️ {{ post.viewCount }}</span>
                <span class="text-sm text-gray-500">💬 {{ post.commentCount }}</span>
              </div>
            </div>
            <div class="ml-4 text-sm text-teal-600 font-medium whitespace-nowrap">
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
