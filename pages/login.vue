<template>
  <div class="min-h-[calc(100vh-8rem)] flex items-center justify-center px-4 py-12">
    <div class="max-w-md w-full animate-fade-in-up">
      <div class="glass-effect rounded-3xl shadow-2xl p-10">
        <div class="text-center mb-10">
          <div class="w-20 h-20 mx-auto mb-5 rounded-2xl bg-gradient-to-br from-indigo-500 to-purple-600 flex items-center justify-center text-4xl shadow-xl">
            🎓
          </div>
          <h2 class="text-4xl font-black mb-3">
            <span class="bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent">
              欢迎回来!
            </span>
          </h2>
          <p class="text-gray-600">登录你的校园论坛账号</p>
        </div>

        <form @submit.prevent="handleLogin" class="space-y-6">
          <div>
            <label for="username" class="block text-sm font-semibold text-gray-700 mb-3">
              👤 用户名
            </label>
            <input
              id="username"
              v-model="form.username"
              type="text"
              required
              class="input-field"
              placeholder="请输入用户名"
            />
          </div>

          <div>
            <label for="password" class="block text-sm font-semibold text-gray-700 mb-3">
              🔒 密码
            </label>
            <input
              id="password"
              v-model="form.password"
              type="password"
              required
              class="input-field"
              placeholder="请输入密码"
            />
          </div>

          <button
            type="submit"
            :disabled="loading"
            class="w-full gradient-bg text-white font-bold text-lg py-4 rounded-xl hover:shadow-xl transform hover:-translate-y-1 transition-all duration-300 disabled:opacity-60 disabled:cursor-not-allowed"
          >
            <span v-if="loading" class="flex items-center justify-center gap-2">
              <span class="inline-block w-5 h-5 border-3 border-white border-t-transparent rounded-full animate-spin"></span>
              登录中...
            </span>
            <span v-else class="flex items-center justify-center gap-2">
              🚀 立即登录
            </span>
          </button>
        </form>

        <div class="mt-8 text-center">
          <p class="text-gray-600">
            还没有账号?
            <NuxtLink to="/register" class="text-indigo-600 hover:text-indigo-700 font-bold ml-1">
              立即注册 →
            </NuxtLink>
          </p>
        </div>

        <div class="mt-8 p-5 bg-gradient-to-r from-indigo-50 via-purple-50 to-pink-50 rounded-2xl border border-indigo-100">
          <p class="text-xs font-semibold text-indigo-700 mb-3">📝 测试账号:</p>
          <p class="text-sm text-gray-700">👤 用户名: <span class="font-bold">admin</span></p>
          <p class="text-sm text-gray-700">🔑 密码: <span class="font-bold">admin123</span></p>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { useAuthStore } from '~/stores/auth'

const auth = useAuthStore()
const router = useRouter()

const form = ref({
  username: '',
  password: ''
})

const loading = ref(false)

async function handleLogin() {
  loading.value = true

  try {
    await auth.login(form.value.username, form.value.password)
    router.push('/')
  } catch (error: any) {
    alert(error.message || '登录失败')
  } finally {
    loading.value = false
  }
}

useHead({
  title: '登录 - 校园论坛'
})
</script>
