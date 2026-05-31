<template>
  <div class="min-h-[calc(100vh-8rem)] flex items-center justify-center px-4 py-12">
    <div class="max-w-md w-full">
      <div class="glass-effect rounded-2xl shadow-2xl border border-amber-100 p-10">
        <div class="text-center mb-10">
          <div class="text-5xl mb-4">🎓</div>
          <h2 class="text-3xl font-black text-amber-800">欢迎回来!</h2>
          <p class="text-amber-600/70 mt-2">登录你的校园论坛账号</p>
        </div>

        <form @submit.prevent="handleLogin">
          <div class="mb-6">
            <label for="username" class="block text-sm font-semibold text-gray-700 mb-2">
              👤 用户名
            </label>
            <input
              id="username"
              v-model="form.username"
              type="text"
              required
              class="w-full px-5 py-4 border-2 border-amber-200 rounded-xl focus:outline-none focus:ring-4 focus:ring-amber-100 focus:border-amber-400 bg-white/80 transition-all duration-300"
              placeholder="请输入用户名"
            />
          </div>

          <div class="mb-8">
            <label for="password" class="block text-sm font-semibold text-gray-700 mb-2">
              🔒 密码
            </label>
            <input
              id="password"
              v-model="form.password"
              type="password"
              required
              class="w-full px-5 py-4 border-2 border-amber-200 rounded-xl focus:outline-none focus:ring-4 focus:ring-amber-100 focus:border-amber-400 bg-white/80 transition-all duration-300"
              placeholder="请输入密码"
            />
          </div>

          <button
            type="submit"
            :disabled="loading"
            class="w-full px-6 py-4 bg-gradient-to-r from-amber-500 via-orange-500 to-teal-500 text-white font-bold text-lg rounded-xl hover:from-amber-600 hover:via-orange-600 hover:to-teal-600 hover:shadow-xl transform hover:-translate-y-0.5 transition-all duration-300 disabled:opacity-60 disabled:cursor-not-allowed"
          >
            {{ loading ? '✨ 登录中...' : '🚀 立即登录' }}
          </button>
        </form>

        <div class="mt-8 text-center">
          <p class="text-gray-600">
            还没有账号?
            <NuxtLink to="/register" class="text-amber-600 hover:text-amber-700 font-bold">
              立即注册 →
            </NuxtLink>
          </p>
        </div>

        <div class="mt-8 p-5 bg-gradient-to-r from-amber-50 via-orange-50 to-teal-50 rounded-xl border border-amber-100">
          <p class="text-xs font-semibold text-amber-700 mb-3">📝 测试账号:</p>
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
