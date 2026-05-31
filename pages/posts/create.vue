<template>
  <div class="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
    <h1 class="text-2xl font-bold text-gray-900 mb-6">发布新帖</h1>

    <div class="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
      <form @submit.prevent="handleSubmit">
        <div class="mb-4">
          <label for="title" class="block text-sm font-medium text-gray-700 mb-1">
            标题
          </label>
          <input
            id="title"
            v-model="form.title"
            type="text"
            required
            class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary-500"
            placeholder="请输入帖子标题"
          />
        </div>

        <div class="mb-4">
          <label for="category" class="block text-sm font-medium text-gray-700 mb-1">
            分类
          </label>
          <select
            id="category"
            v-model="form.categoryId"
            required
            class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary-500"
          >
            <option value="">请选择分类</option>
            <option
              v-for="category in postsStore.categories"
              :key="category.id"
              :value="category.id"
            >
              {{ category.name }}
            </option>
          </select>
        </div>

        <div class="mb-6">
          <label for="content" class="block text-sm font-medium text-gray-700 mb-1">
            内容
          </label>
          <textarea
            id="content"
            v-model="form.content"
            rows="10"
            required
            class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary-500"
            placeholder="请输入帖子内容"
          ></textarea>
        </div>

        <div class="flex items-center justify-end space-x-3">
          <NuxtLink
            to="/posts"
            class="px-4 py-2 text-sm font-medium text-gray-700 bg-gray-100 rounded-md hover:bg-gray-200"
          >
            取消
          </NuxtLink>
          <button
            type="submit"
            :disabled="submitting"
            class="px-4 py-2 bg-primary-600 text-white text-sm font-medium rounded-md hover:bg-primary-700 disabled:opacity-50"
          >
            {{ submitting ? '发布中...' : '发布帖子' }}
          </button>
        </div>
      </form>
    </div>
  </div>
</template>

<script setup lang="ts">
import { usePostsStore } from '~/stores/posts'
import { useAuthStore } from '~/stores/auth'

const postsStore = usePostsStore()
const auth = useAuthStore()
const router = useRouter()

const form = ref({
  title: '',
  categoryId: '',
  content: ''
})

const submitting = ref(false)

await postsStore.fetchCategories()

async function handleSubmit() {
  if (!auth.isAuthenticated) {
    if (confirm('请先登录，是否跳转到登录页面？')) {
      navigateTo('/login')
    }
    return
  }

  submitting.value = true

  try {
    const result = await postsStore.createPost({
      title: form.value.title,
      content: form.value.content,
      categoryId: form.value.categoryId
    })

    if (result?.post) {
      router.push(`/posts/${result.post.id}`)
    }
  } catch (error: any) {
    alert(error.message || '发布失败')
  } finally {
    submitting.value = false
  }
}

useHead({
  title: '发布新帖 - 校园论坛'
})
</script>
