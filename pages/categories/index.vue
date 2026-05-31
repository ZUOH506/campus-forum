<template>
  <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
    <h1 class="text-2xl font-bold text-gray-900 mb-6">论坛分类</h1>

    <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      <NuxtLink
        v-for="category in postsStore.categories"
        :key="category.id"
        :to="`/categories/${category.id}`"
        class="bg-white rounded-lg shadow-sm border border-gray-200 p-6 hover:border-primary-300 hover:shadow-md transition-all"
      >
        <h3 class="text-lg font-semibold text-gray-900 mb-2">{{ category.name }}</h3>
        <p class="text-sm text-gray-600 mb-4">{{ category.description }}</p>
        <div class="flex items-center justify-between">
          <span class="text-xs text-gray-500">
            {{ category.postCount }} 个帖子
          </span>
          <span class="text-primary-600 text-sm">查看更多 →</span>
        </div>
      </NuxtLink>
    </div>
  </div>
</template>

<script setup lang="ts">
import { usePostsStore } from '~/stores/posts'

const postsStore = usePostsStore()

await postsStore.fetchCategories()

useHead({
  title: '分类 - campushub'
})
</script>
