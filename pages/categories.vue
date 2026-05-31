<template>
  <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
    <div class="flex items-center justify-between mb-8 animate-fade-in-up">
      <h1 class="text-4xl font-black">
        <span class="bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">
          📂 分类管理
        </span>
      </h1>
      <NuxtLink
        to="/"
        class="px-6 py-3 bg-white/70 text-gray-700 font-bold rounded-xl hover:bg-white hover:shadow-lg transition-all duration-300 flex items-center gap-2"
      >
        <span>🏠</span> 返回首页
      </NuxtLink>
    </div>

    <div class="glass-effect rounded-3xl shadow-xl p-8 mb-8 animate-fade-in-up">
      <h2 class="text-2xl font-bold text-gray-800 mb-6 flex items-center gap-3">
        <span class="w-10 h-10 rounded-xl bg-gradient-to-br from-purple-500 to-pink-500 flex items-center justify-center text-white shadow-lg">➕</span>
        添加新分类
      </h2>

      <form @submit.prevent="handleCreateCategory" class="flex flex-col md:flex-row gap-4">
        <div class="flex-1">
          <input
            v-model="newCategory.name"
            type="text"
            required
            class="input-field"
            placeholder="分类名称"
          />
        </div>
        <div class="flex-1">
          <input
            v-model="newCategory.description"
            type="text"
            required
            class="input-field"
            placeholder="分类描述"
          />
        </div>
        <button
          type="submit"
          :disabled="loading"
          class="px-8 py-3 gradient-bg text-white font-bold rounded-xl hover:shadow-xl transform hover:-translate-y-1 transition-all duration-300 disabled:opacity-60 disabled:cursor-not-allowed"
        >
          <span v-if="loading" class="flex items-center gap-2">
            <span class="inline-block w-5 h-5 border-3 border-white border-t-transparent rounded-full animate-spin"></span>
            添加中...
          </span>
          <span v-else>✨ 添加分类</span>
        </button>
      </form>
    </div>

    <div class="glass-effect rounded-3xl shadow-xl overflow-hidden animate-fade-in-up">
      <div class="p-6 border-b border-gray-100 bg-white/50">
        <h2 class="text-xl font-bold text-gray-800 flex items-center gap-3">
          <span class="w-8 h-8 rounded-lg bg-gradient-to-br from-indigo-500 to-purple-500 flex items-center justify-center text-white">📋</span>
          现有分类 ({{ categories.length }})
        </h2>
      </div>

      <div v-if="loadingCategories" class="p-12 text-center">
        <div class="inline-block w-12 h-12 border-4 border-indigo-200 border-t-indigo-600 rounded-full animate-spin"></div>
        <p class="mt-4 text-gray-500">加载中...</p>
      </div>
      <div v-else-if="categories.length === 0" class="p-12 text-center">
        <div class="text-6xl mb-4">📭</div>
        <p class="text-gray-500">暂无分类</p>
      </div>
      <div v-else class="divide-y divide-gray-100">
        <div
          v-for="category in categories"
          :key="category.id"
          class="p-6 bg-white/30 hover:bg-white/60 transition-all duration-300"
        >
          <div class="flex items-center justify-between">
            <div class="flex-1">
              <h3 class="text-lg font-bold text-gray-800">{{ category.name }}</h3>
              <p class="text-sm text-gray-500 mt-1">{{ category.description }}</p>
            </div>
            <div class="flex items-center gap-4">
              <span class="badge badge-primary">
                {{ category.postCount || 0 }} 篇
              </span>
              <button
                v-if="category.name !== '默认分类'"
                @click="handleDeleteCategory(category.id)"
                class="px-4 py-2 bg-red-50 text-red-600 font-semibold rounded-lg hover:bg-red-100 transition-all duration-300"
              >
                删除
              </button>
            </div>
          </div>
        </div>
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

const categories = ref<any[]>([])
const loading = ref(false)
const loadingCategories = ref(true)

const newCategory = ref({
  name: '',
  description: ''
})

async function fetchCategories() {
  try {
    const data = await $fetch('/api/categories')
    categories.value = (data as any).categories
  } catch (error) {
    console.error('Failed to fetch categories:', error)
  } finally {
    loadingCategories.value = false
  }
}

async function handleCreateCategory() {
  loading.value = true

  try {
    await $fetch('/api/categories', {
      method: 'POST',
      body: newCategory.value
    })

    newCategory.value.name = ''
    newCategory.value.description = ''
    await fetchCategories()
  } catch (error: any) {
    alert(error.message || '添加分类失败')
  } finally {
    loading.value = false
  }
}

async function handleDeleteCategory(id: string) {
  if (!confirm('确定要删除这个分类吗？')) return

  try {
    await $fetch(`/api/categories/${id}`, {
      method: 'DELETE'
    })
    await fetchCategories()
  } catch (error: any) {
    alert(error.message || '删除分类失败')
  }
}

await fetchCategories()

useHead({
  title: '分类管理 - 校园论坛'
})
</script>
