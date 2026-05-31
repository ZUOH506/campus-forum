<template>
  <div class="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
    <div v-if="postsStore.loading" class="text-center py-16">
      <div class="inline-block w-14 h-14 border-5 border-indigo-200 border-t-indigo-600 rounded-full animate-spin"></div>
      <p class="mt-4 text-gray-500 text-lg">加载中...</p>
    </div>
    <div v-else-if="!postsStore.currentPost" class="text-center py-16">
      <div class="text-6xl mb-4">😢</div>
      <h2 class="text-2xl text-gray-600 mb-6">帖子不存在</h2>
      <NuxtLink to="/posts" class="inline-block px-8 py-4 gradient-bg text-white font-bold rounded-xl hover:shadow-xl transition-all duration-300">
        ← 返回帖子列表
      </NuxtLink>
    </div>
    <div v-else>
      <NuxtLink
        to="/posts"
        class="inline-flex items-center text-sm text-indigo-600 hover:text-indigo-700 mb-6 font-semibold transition-colors"
      >
        ← 返回帖子列表
      </NuxtLink>

      <article class="glass-effect rounded-3xl shadow-xl p-8 mb-8 animate-fade-in-up">
        <header class="mb-8">
          <div class="flex items-center space-x-3 mb-5">
            <span class="badge badge-primary text-sm">
              {{ postsStore.currentPost.categoryName }}
            </span>
          </div>
          <h1 class="text-4xl font-black text-gray-800 mb-5">{{ postsStore.currentPost.title }}</h1>
          <div class="flex items-center flex-wrap gap-4 text-gray-600">
            <span class="flex items-center gap-2">
              <div class="w-8 h-8 rounded-full bg-gradient-to-br from-indigo-500 to-purple-600 flex items-center justify-center text-white text-sm font-bold">
                {{ postsStore.currentPost.authorName?.charAt(0).toUpperCase() }}
              </div>
              <span class="font-semibold">{{ postsStore.currentPost.authorName }}</span>
            </span>
            <span class="flex items-center gap-2">
              <span>👁️</span> {{ postsStore.currentPost.viewCount }}
            </span>
            <span class="flex items-center gap-2 text-indigo-600">
              <span>📅</span> {{ formatDate(postsStore.currentPost.createdAt) }}
            </span>
          </div>
        </header>

        <div class="prose max-w-none text-gray-700 whitespace-pre-wrap text-lg leading-relaxed bg-white/50 p-6 rounded-2xl">
          {{ postsStore.currentPost.content }}
        </div>
      </article>

      <div class="glass-effect rounded-3xl shadow-xl p-8 animate-fade-in-up">
        <h3 class="text-2xl font-bold text-gray-800 mb-6 flex items-center gap-3">
          <span class="w-10 h-10 rounded-xl bg-gradient-to-br from-pink-500 to-rose-500 flex items-center justify-center text-white shadow-lg">💬</span>
          评论 ({{ postsStore.comments.length }})
        </h3>

        <div v-if="postsStore.comments.length === 0" class="text-center py-8">
          <div class="text-5xl mb-3">💭</div>
          <p class="text-gray-500">暂无评论，来说两句吧 ✨</p>
        </div>
        <div v-else class="space-y-4 mb-8">
          <div
            v-for="comment in postsStore.comments"
            :key="comment.id"
            class="p-5 bg-white/80 rounded-2xl border-2 border-gray-100 hover:border-indigo-200 transition-all duration-300"
          >
            <div class="flex items-center justify-between mb-3">
              <div class="flex items-center gap-3">
                <div class="w-8 h-8 rounded-full bg-gradient-to-br from-indigo-500 to-purple-600 flex items-center justify-center text-white text-sm font-bold">
                  {{ comment.authorName?.charAt(0).toUpperCase() }}
                </div>
                <span class="font-bold text-gray-800">{{ comment.authorName }}</span>
              </div>
              <span class="text-sm text-indigo-600">{{ formatDate(comment.createdAt) }}</span>
            </div>
            <p class="text-gray-700 leading-relaxed">{{ comment.content }}</p>
          </div>
        </div>

        <div class="border-t-2 border-gray-200 pt-6">
          <h4 class="text-base font-bold text-gray-700 mb-4">✍️ 发表评论</h4>
          <textarea
            v-model="newComment"
            rows="4"
            class="input-field mb-5"
            placeholder="写下你的评论..."
          ></textarea>
          <div class="flex justify-end">
            <button
              @click="submitComment"
              :disabled="!newComment.trim()"
              class="px-8 py-4 gradient-bg text-white font-bold rounded-xl hover:shadow-xl transform hover:-translate-y-1 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              🚀 发布评论
            </button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { usePostsStore } from '~/stores/posts'
import { useAuthStore } from '~/stores/auth'

const route = useRoute()
const postsStore = usePostsStore()
const auth = useAuthStore()
const newComment = ref('')

const postId = route.params.id as string

await postsStore.fetchPost(postId)

async function submitComment() {
  if (!newComment.value.trim()) return

  if (!auth.isAuthenticated) {
    if (confirm('请先登录，是否跳转到登录页面？')) {
      navigateTo('/login')
    }
    return
  }

  try {
    await postsStore.addComment(postId, newComment.value)
    newComment.value = ''
  } catch (error: any) {
    alert(error.message || '评论失败')
  }
}

function formatDate(dateString: string) {
  const date = new Date(dateString)
  return date.toLocaleDateString('zh-CN') + ' ' + date.toLocaleTimeString('zh-CN', {
    hour: '2-digit',
    minute: '2-digit'
  })
}

useHead({
  title: postsStore.currentPost ? `${postsStore.currentPost.title} - 校园论坛` : '帖子详情 - 校园论坛'
})
</script>
