<template>
  <div class="min-h-screen flex flex-col">
    <header class="liquid-glass-nav sticky top-0 z-50">
      <nav class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div class="flex justify-between items-center h-16">
          <div class="flex items-center">
            <NuxtLink to="/" class="text-2xl font-bold text-black drop-shadow-lg flex items-center gap-2">
              <span class="text-3xl">🎓</span>
              <span class="hidden sm:inline">CampusHub</span>
            </NuxtLink>
            <div class="hidden sm:ml-8 sm:flex sm:items-center sm:space-x-1">
              <NuxtLink
                v-for="item in navItems"
                :key="item.path"
                :to="item.path"
                class="nav-link"
                active-class="nav-link-active"
              >
                <span>{{ item.icon }}</span>
                <span>{{ item.name }}</span>
              </NuxtLink>
              <a
                href="https://voicehub06.xhhhx.xyz"
                target="_blank"
                rel="noopener noreferrer"
                class="nav-link nav-link-highlight"
              >
                <span>🎵</span>
                <span>歌曲投稿</span>
              </a>
            </div>
          </div>
          <div class="flex items-center space-x-3">
            <template v-if="auth.isAuthenticated">
              <div class="user-badge">
                <span class="text-lg">👤</span>
                <span class="text-sm font-medium text-white">{{ auth.user?.username }}</span>
              </div>
              <button
                @click="auth.logout"
                class="nav-action-btn"
              >
                退出
              </button>
            </template>
            <template v-else>
              <NuxtLink
                to="/login"
                class="nav-link"
              >
                登录
              </NuxtLink>
              <NuxtLink
                to="/register"
                class="nav-register-btn"
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

    <footer class="bg-gradient-to-r from-amber-100 via-orange-100 to-teal-100 border-t border-amber-200 mt-auto">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div class="text-center">
          <h3 class="text-lg font-bold text-amber-800 mb-2">CampusHub</h3>
          <p class="text-sm text-amber-700/70">
            © 2026立达校园论坛. Connecting Campus, Sharing Dreams.
          </p>
        </div>
      </div>
    </footer>
  </div>
</template>

<script setup lang="ts">
import { useAuthStore } from '~/stores/auth'

const auth = useAuthStore()

const navItems = [
  { name: '首页', path: '/', icon: '🏠' },
  { name: '帖子', path: '/posts', icon: '📝' },
  { name: '分类', path: '/categories', icon: '📂' }
]
</script>

<style scoped>
.liquid-glass-nav {
  background: rgba(255, 255, 255, 0.15);
  backdrop-filter: blur(20px);
  -webkit-backdrop-filter: blur(20px);
  border-bottom: 1px solid rgba(255, 255, 255, 0.2);
  box-shadow: 
    0 8px 32px rgba(0, 0, 0, 0.1),
    inset 0 1px 0 rgba(255, 255, 255, 0.3);
}

.nav-link {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  padding: 0.5rem 1rem;
  border-radius: 0.75rem;
  font-size: 0.875rem;
  font-weight: 500;
  color: rgba(255, 255, 255, 0.85);
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
  text-decoration: none;
}

.nav-link:hover {
  background: rgba(255, 255, 255, 0.2);
  color: rgba(255, 255, 255, 1);
  transform: translateY(-1px);
}

.nav-link-active {
  background: rgba(255, 255, 255, 0.25);
  color: rgba(255, 255, 255, 1);
  box-shadow: 
    0 4px 12px rgba(0, 0, 0, 0.15),
    inset 0 1px 0 rgba(255, 255, 255, 0.4);
}

.nav-link-highlight {
  background: linear-gradient(135deg, rgba(251, 191, 36, 0.6), rgba(245, 158, 11, 0.6));
  border: 1px solid rgba(251, 191, 36, 0.4);
}

.nav-link-highlight:hover {
  background: linear-gradient(135deg, rgba(251, 191, 36, 0.8), rgba(245, 158, 11, 0.8));
  box-shadow: 
    0 4px 16px rgba(245, 158, 11, 0.4),
    inset 0 1px 0 rgba(255, 255, 255, 0.4);
}

.user-badge {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  padding: 0.375rem 0.875rem;
  background: rgba(255, 255, 255, 0.2);
  border-radius: 9999px;
  border: 1px solid rgba(255, 255, 255, 0.3);
}

.nav-action-btn {
  padding: 0.5rem 1rem;
  border-radius: 0.75rem;
  font-size: 0.875rem;
  font-weight: 500;
  color: rgba(255, 255, 255, 0.9);
  background: rgba(255, 255, 255, 0.15);
  border: 1px solid rgba(255, 255, 255, 0.25);
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
}

.nav-action-btn:hover {
  background: rgba(255, 255, 255, 0.25);
  transform: translateY(-1px);
}

.nav-register-btn {
  padding: 0.5rem 1.25rem;
  border-radius: 0.75rem;
  font-size: 0.875rem;
  font-weight: 600;
  color: rgba(245, 158, 11, 0.9);
  background: rgba(255, 255, 255, 0.95);
  border: 1px solid rgba(255, 255, 255, 0.5);
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
}

.nav-register-btn:hover {
  background: rgba(255, 255, 255, 1);
  transform: translateY(-2px);
  box-shadow: 0 8px 24px rgba(0, 0, 0, 0.2);
}
</style>
