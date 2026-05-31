import { defineStore } from 'pinia'

interface User {
  id: string
  username: string
  email: string
  avatar?: string
}

interface AuthState {
  user: User | null
  token: string | null
}

export const useAuthStore = defineStore('auth', {
  state: (): AuthState => ({
    user: null,
    token: null
  }),

  getters: {
    isAuthenticated: (state) => !!state.token && !!state.user
  },

  actions: {
    async login(username: string, password: string) {
      const { data, error } = await useFetch('/api/auth/login', {
        method: 'POST',
        body: { username, password }
      })

      if (error.value) {
        throw new Error(error.value.message || '登录失败')
      }

      if (data.value) {
        this.user = data.value.user
        this.token = data.value.token
        if (import.meta.client) {
          localStorage.setItem('auth_token', this.token!)
        }
      }
    },

    async register(username: string, email: string, password: string) {
      const { data, error } = await useFetch('/api/auth/register', {
        method: 'POST',
        body: { username, email, password }
      })

      if (error.value) {
        throw new Error(error.value.message || '注册失败')
      }

      if (data.value) {
        this.user = data.value.user
        this.token = data.value.token
        if (import.meta.client) {
          localStorage.setItem('auth_token', this.token!)
        }
      }
    },

    logout() {
      this.user = null
      this.token = null
      if (import.meta.client) {
        localStorage.removeItem('auth_token')
      }
      navigateTo('/login')
    },

    async checkAuth() {
      if (import.meta.client) {
        const token = localStorage.getItem('auth_token')
        if (token) {
          this.token = token
          try {
            const { data } = await useFetch('/api/auth/me', {
              headers: { Authorization: `Bearer ${token}` }
            })
            if (data.value) {
              this.user = data.value.user
            }
          } catch {
            this.logout()
          }
        }
      }
    }
  }
})
