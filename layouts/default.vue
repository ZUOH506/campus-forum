<template>
  <div class="min-h-screen flex flex-col">
    <header class="glass-nav sticky top-0 z-50">
      <nav class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div class="flex justify-between items-center h-16">
          <div class="flex items-center">
            <NuxtLink to="/" class="logo-brand flex items-center gap-3 group">
              <div class="w-10 h-10 rounded-xl bg-gradient-to-br from-indigo-500 to-purple-600 flex items-center justify-center text-white text-xl shadow-lg group-hover:shadow-xl transition-all duration-300">
                🎓
              </div>
              <span class="text-xl font-bold bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent hidden sm:inline">
                校园论坛
              </span>
            </NuxtLink>
            <div class="hidden sm:ml-10 sm:flex sm:items-center sm:space-x-2">
              <NuxtLink
                v-for="item in navItems"
                :key="item.path"
                :to="item.path"
                class="nav-item"
                active-class="nav-item-active"
              >
                <span class="text-lg">{{ item.icon }}</span>
                <span class="font-medium">{{ item.name }}</span>
              </NuxtLink>
              <a
                href="https://voicehub506.xhhhx.xyz"
                target="_blank"
                rel="noopener noreferrer"
                class="nav-item nav-item-highlight"
              >
                <span class="text-lg">🎵</span>
                <span class="font-medium">歌曲投稿</span>
              </a>
            </div>
          </div>
          <div class="flex items-center space-x-3">
            <template v-if="auth.isAuthenticated">
              <NuxtLink
                v-if="auth.user?.username === 'admin'"
                to="/admin"
                class="nav-item nav-item-admin"
              >
                <span class="text-lg">⚙️</span>
                <span class="font-medium hidden md:inline">管理</span>
              </NuxtLink>
              <div class="user-profile">
                <div class="user-avatar">
                  {{ auth.user?.username?.charAt(0).toUpperCase() }}
                </div>
                <span class="user-name hidden md:inline">{{ auth.user?.username }}</span>
              </div>
              <button
                @click="handleLogout"
                class="logout-btn"
              >
                退出
              </button>
            </template>
            <template v-else>
              <NuxtLink
                to="/login"
                class="nav-item-login"
              >
                登录
              </NuxtLink>
              <NuxtLink
                to="/register"
                class="register-btn"
              >
                注册
              </NuxtLink>
            </template>
          </div>
        </div>
      </nav>
    </header>

    <main class="flex-1">
      <slot />
    </main>

    <footer class="footer-gradient border-t border-purple-100 mt-auto">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
        <div class="text-center">
          <div class="flex items-center justify-center gap-3 mb-4">
            <div class="w-8 h-8 rounded-lg bg-gradient-to-br from-indigo-500 to-purple-600 flex items-center justify-center text-white">
              🎓
            </div>
            <span class="text-lg font-bold bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent">
              校园论坛
            </span>
          </div>
          <p class="text-sm text-gray-500">
            © 2024 校园论坛. 连接校园，共享精彩！
          </p>
        </div>
      </div>
    </footer>
  </div>
</template>

<script setup lang="ts">
import { useAuthStore } from '~/stores/auth'

const auth = useAuthStore()
const router = useRouter()

const navItems = [
  { name: '首页', path: '/', icon: '🏠' },
  { name: '帖子', path: '/posts', icon: '📝' },
  { name: '分类', path: '/categories', icon: '📂' }
]

const handleLogout = () => {
  auth.logout()
  router.push('/')
}
</script>

<style scoped>
.glass-nav {
  background: rgba(255, 255, 255, 0.85);
  backdrop-filter: blur(20px);
  -webkit-backdrop-filter: blur(20px);
  border-bottom: 1px solid rgba(102, 126, 234, 0.1);
  box-shadow: 0 4px 30px rgba(102, 126, 234, 0.08);
}

.logo-brand {
  @apply no-underline;
}

.nav-item {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  padding: 0.625rem 1.25rem;
  border-radius: 0.75rem;
  font-size: 0.9rem;
  color: #4b5563;
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
  text-decoration: none;
}

.nav-item:hover {
  background: rgba(102, 126, 234, 0.08);
  color: #667eea;
  transform: translateY(-2px);
}

.nav-item-active {
  background: rgba(102, 126, 234, 0.12);
  color: #667eea;
  font-weight: 600;
  box-shadow: 0 2px 10px rgba(102, 126, 234, 0.15);
}

.nav-item-highlight {
  background: linear-gradient(135deg, rgba(102, 126, 234, 0.15), rgba(118, 75, 162, 0.15));
  border: 1px solid rgba(102, 126, 234, 0.2);
  color: #667eea;
}

.nav-item-highlight:hover {
  background: linear-gradient(135deg, rgba(102, 126, 234, 0.25), rgba(118, 75, 162, 0.25));
  border-color: rgba(102, 126, 234, 0.4);
  box-shadow: 0 4px 15px rgba(102, 126, 234, 0.2);
}

.nav-item-admin {
  background: rgba(246, 135, 179, 0.15);
  border: 1px solid rgba(246, 135, 179, 0.2);
  color: #d53f8c;
}

.nav-item-admin:hover {
  background: rgba(246, 135, 179, 0.25);
  border-color: rgba(246, 135, 179, 0.4);
}

.user-profile {
  display: flex;
  align-items: center;
  gap: 0.75rem;
  padding: 0.5rem 1rem;
  background: rgba(102, 126, 234, 0.08);
  border-radius: 9999px;
  border: 1px solid rgba(102, 126, 234, 0.15);
}

.user-avatar {
  width: 2rem;
  height: 2rem;
  border-radius: 9999px;
  background: linear-gradient(135deg, #667eea, #764ba2);
  color: white;
  display: flex;
  align-items: center;
  justify-content: center;
  font-weight: 600;
  font-size: 0.875rem;
}

.user-name {
  font-weight: 500;
  color: #4b5563;
}

.logout-btn {
  padding: 0.625rem 1.25rem;
  border-radius: 0.75rem;
  font-size: 0.9rem;
  font-weight: 500;
  color: #dc2626;
  background: rgba(252, 129, 129, 0.1);
  border: 1px solid rgba(252, 129, 129, 0.2);
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
}

.logout-btn:hover {
  background: rgba(252, 129, 129, 0.2);
  transform: translateY(-2px);
}

.nav-item-login {
  padding: 0.625rem 1.25rem;
  border-radius: 0.75rem;
  font-size: 0.9rem;
  font-weight: 500;
  color: #667eea;
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
  text-decoration: none;
}

.nav-item-login:hover {
  background: rgba(102, 126, 234, 0.08);
  transform: translateY(-2px);
}

.register-btn {
  padding: 0.625rem 1.5rem;
  border-radius: 0.75rem;
  font-size: 0.9rem;
  font-weight: 600;
  color: white;
  background: linear-gradient(135deg, #667eea, #764ba2);
  box-shadow: 0 4px 15px rgba(102, 126, 234, 0.35);
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
  text-decoration: none;
}

.register-btn:hover {
  transform: translateY(-2px);
  box-shadow: 0 8px 25px rgba(102, 126, 234, 0.45);
}

.footer-gradient {
  background: linear-gradient(to right, rgba(165, 180, 252, 0.3), rgba(192, 192, 245, 0.3), rgba(245, 208, 254, 0.3));
}
</style>
