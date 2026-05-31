<template>
  <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
    <NuxtLink
      to="/categories"
      class="inline-flex items-center text-sm text-gray-600 hover:text-gray-900 mb-4"
    >
      ← 返回分类列表
    </NuxtLink>

    <div v-if="category" class="mb-8">
      <h1 class="text-2xl font-bold text-gray-900">{{ category.name }}</h1>
      <p class="mt-1 text-gray-600">{{ category.description }}</p>
    </div>

    <div class="bg-white rounded-lg shadow-sm border border-gray-200">
      <div v-if="postsStore.loading" class="p-8 text-center text-gray-500">
        加载中...
      </div>
      <div v-else-if="postsStore.posts.length === 0" class="p-8 text-center text-gray-500">
        该分类暂无帖子
      </div>
      <div v-else class="divide-y divide-gray-200">
        <NuxtLink
          v-for="post in postsStore.posts"
          :key="post.id"
          :to="`/posts/${post.id}`"
          class="block p-4 hover:bg-gray-50 transition-colors"
        >
          <div class="flex items-start justify-between">
            <div class="flex-1">
              <h3 class="text-lg font-medium text-gray-900">{{ post.title }}</h3>
              <p class="mt-1 text-sm text-gray-600 line-clamp-2">{{ post.content }}</p>
              <div class="mt-2 flex items-center text-xs text-gray-500 space-x-4">
                <span>作者: {{ post.authorName }}</span>
                <span>浏览: {{ post.viewCount }}</span>
                <span>评论: {{ post.commentCount }}</span>
              </div>
            </div>
            <div class="ml-4 text-xs text-gray-400">
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

const route = useRoute()
const postsStore = usePostsStore()

const categoryId = route.params.id as string

await postsStore.fetchCategories()
await postsStore.fetchPosts({ categoryId })

const category = computed(() => {
  return postsStore.categories.find(c => c.id === categoryId)
})

function formatDate(dateString: string) {
  const date = new Date(dateString)
  return date.toLocaleDateString('zh-CN')
}

useHead({
  title: category.value ? `${category.value.name} - 校园论坛` : '分类 - 校园论坛'
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
