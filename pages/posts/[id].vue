<template>
  <div class="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
    <div v-if="postsStore.loading" class="text-center py-16 text-amber-600">
      <div class="animate-pulse text-xl">✨ 加载中...</div>
    </div>
    <div v-else-if="!postsStore.currentPost" class="text-center py-16">
      <h2 class="text-2xl text-gray-600">帖子不存在</h2>
      <NuxtLink to="/posts" class="mt-6 inline-block px-6 py-3 bg-gradient-to-r from-amber-500 to-orange-500 text-white font-bold rounded-xl hover:from-amber-600 hover:to-orange-600 transition-all duration-300">
        ← 返回帖子列表
      </NuxtLink>
    </div>
    <div v-else>
      <NuxtLink
        to="/posts"
        class="inline-flex items-center text-sm text-gray-600 hover:text-amber-700 mb-6 font-semibold transition-colors"
      >
        ← 返回帖子列表
      </NuxtLink>

      <article class="glass-effect rounded-2xl shadow-xl border border-amber-100 p-8 mb-8">
        <header class="mb-8">
          <div class="flex items-center space-x-3 mb-5">
            <span class="bg-gradient-to-r from-amber-100 to-orange-100 text-amber-700 px-4 py-1.5 rounded-full text-sm font-bold">
              {{ postsStore.currentPost.categoryName }}
            </span>
          </div>
          <h1 class="text-3xl font-black text-gray-800">{{ postsStore.currentPost.title }}</h1>
          <div class="mt-5 flex items-center flex-wrap gap-4 text-gray-600">
            <span class="flex items-center gap-2">👤 <span class="font-semibold">{{ postsStore.currentPost.authorName }}</span></span>
            <span class="flex items-center gap-2">👁️ {{ postsStore.currentPost.viewCount }}</span>
            <span class="flex items-center gap-2 text-teal-600">📅 {{ formatDate(postsStore.currentPost.createdAt) }}</span>
          </div>
        </header>

        <div class="prose max-w-none text-gray-700 whitespace-pre-wrap text-lg leading-relaxed bg-white/50 p-6 rounded-xl">
          {{ postsStore.currentPost.content }}
        </div>
      </article>

      <div class="glass-effect rounded-2xl shadow-xl border border-amber-100 p-8">
        <h3 class="text-xl font-bold text-amber-800 mb-6 flex items-center">
          💬 评论 ({{ postsStore.comments.length }})
        </h3>

        <div v-if="postsStore.comments.length === 0" class="text-center py-8 text-amber-600">
          暂无评论，来说两句吧 ✨
        </div>
        <div v-else class="space-y-5 mb-8">
          <div
            v-for="comment in postsStore.comments"
            :key="comment.id"
            class="p-5 bg-gradient-to-r from-amber-50 to-teal-50 rounded-xl border border-amber-100"
          >
            <div class="flex items-center justify-between mb-3">
              <span class="font-bold text-gray-800">👤 {{ comment.authorName }}</span>
              <span class="text-sm text-teal-600">{{ formatDate(comment.createdAt) }}</span>
            </div>
            <p class="text-gray-700 leading-relaxed">{{ comment.content }}</p>
          </div>
        </div>

        <div class="border-t border-amber-200 pt-6">
          <h4 class="text-base font-bold text-gray-700 mb-4">✍️ 发表评论</h4>
          <textarea
            v-model="newComment"
            rows="4"
            class="w-full px-5 py-4 border-2 border-amber-200 rounded-xl focus:outline-none focus:ring-4 focus:ring-amber-100 focus:border-amber-400 bg-white/80 transition-all duration-300"
            placeholder="写下你的评论..."
          ></textarea>
          <div class="mt-5 flex justify-end">
            <button
              @click="submitComment"
              :disabled="!newComment.trim()"
              class="px-8 py-3 bg-gradient-to-r from-amber-500 via-orange-500 to-teal-500 text-white font-bold rounded-xl hover:from-amber-600 hover:via-orange-600 hover:to-teal-600 hover:shadow-xl transform hover:-translate-y-0.5 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
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
