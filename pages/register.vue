<template>
  <div class="min-h-[calc(100vh-8rem)] flex items-center justify-center px-4 py-12">
    <div class="max-w-md w-full animate-fade-in-up">
      <div class="glass-effect rounded-3xl shadow-2xl p-10">
        <div class="text-center mb-10">
          <div class="w-20 h-20 mx-auto mb-5 rounded-2xl bg-gradient-to-br from-purple-500 to-pink-600 flex items-center justify-center text-4xl shadow-xl">
            🎉
          </div>
          <h2 class="text-4xl font-black mb-3">
            <span class="bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">
              加入我们!
            </span>
          </h2>
          <p class="text-gray-600">创建你的校园论坛账号</p>
        </div>

        <form @submit.prevent="handleRegister" class="space-y-5">
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
            <label for="email" class="block text-sm font-semibold text-gray-700 mb-3">
              📧 邮箱
            </label>
            <input
              id="email"
              v-model="form.email"
              type="email"
              required
              class="input-field"
              placeholder="请输入邮箱"
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
              minlength="6"
              class="input-field"
              placeholder="请输入密码（至少6位）"
            />
          </div>

          <button
            type="submit"
            :disabled="loading"
            class="w-full gradient-bg text-white font-bold text-lg py-4 rounded-xl hover:shadow-xl transform hover:-translate-y-1 transition-all duration-300 disabled:opacity-60 disabled:cursor-not-allowed"
          >
            <span v-if="loading" class="flex items-center justify-center gap-2">
              <span class="inline-block w-5 h-5 border-3 border-white border-t-transparent rounded-full animate-spin"></span>
              注册中...
            </span>
            <span v-else class="flex items-center justify-center gap-2">
              🚀 立即注册
            </span>
          </button>
        </form>

        <div class="mt-8 text-center">
          <p class="text-gray-600">
            已有账号?
            <NuxtLink to="/login" class="text-indigo-600 hover:text-indigo-700 font-bold ml-1">
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
