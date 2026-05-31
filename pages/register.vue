<template>
  <div class="min-h-[calc(100vh-8rem)] flex items-center justify-center px-4 py-12">
    <div class="max-w-md w-full">
      <div class="glass-effect rounded-2xl shadow-2xl border border-amber-100 p-10">
        <div class="text-center mb-10">
          <div class="text-5xl mb-4">🎉</div>
          <h2 class="text-3xl font-black text-amber-800">加入我们!</h2>
          <p class="text-amber-600/70 mt-2">创建你的校园论坛账号</p>
        </div>

        <form @submit.prevent="handleRegister">
          <div class="mb-5">
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

          <div class="mb-5">
            <label for="email" class="block text-sm font-semibold text-gray-700 mb-2">
              📧 邮箱
            </label>
            <input
              id="email"
              v-model="form.email"
              type="email"
              required
              class="w-full px-5 py-4 border-2 border-amber-200 rounded-xl focus:outline-none focus:ring-4 focus:ring-amber-100 focus:border-amber-400 bg-white/80 transition-all duration-300"
              placeholder="请输入邮箱"
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
              minlength="6"
              class="w-full px-5 py-4 border-2 border-amber-200 rounded-xl focus:outline-none focus:ring-4 focus:ring-amber-100 focus:border-amber-400 bg-white/80 transition-all duration-300"
              placeholder="请输入密码（至少6位）"
            />
          </div>

          <button
            type="submit"
            :disabled="loading"
            class="w-full px-6 py-4 bg-gradient-to-r from-teal-500 via-orange-500 to-amber-500 text-white font-bold text-lg rounded-xl hover:from-teal-600 hover:via-orange-600 hover:to-amber-600 hover:shadow-xl transform hover:-translate-y-0.5 transition-all duration-300 disabled:opacity-60 disabled:cursor-not-allowed"
          >
            {{ loading ? '✨ 注册中...' : '🚀 立即注册' }}
          </button>
        </form>

        <div class="mt-8 text-center">
          <p class="text-gray-600">
            已有账号?
            <NuxtLink to="/login" class="text-amber-600 hover:text-amber-700 font-bold">
              立即登录 →
            </NuxtLink>
          </p>
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
  email: '',
  password: ''
})

const loading = ref(false)

async function handleRegister() {
  if (form.value.password.length < 6) {
    alert('密码至少需要6位')
    return
  }

  loading.value = true

  try {
    await auth.register(form.value.username, form.value.email, form.value.password)
    router.push('/')
  } catch (error: any) {
    alert(error.message || '注册失败')
  } finally {
    loading.value = false
  }
}

useHead({
  title: '注册 - 校园论坛'
})
</script>
