import { defineStore } from 'pinia'

export interface Post {
  id: string
  title: string
  content: string
  authorId: string
  authorName: string
  categoryId: string
  categoryName: string
  createdAt: string
  updatedAt: string
  commentCount: number
  viewCount: number
}

export interface Category {
  id: string
  name: string
  description: string
  postCount: number
}

export interface Comment {
  id: string
  postId: string
  authorId: string
  authorName: string
  content: string
  createdAt: string
}

interface PostsState {
  posts: Post[]
  currentPost: Post | null
  categories: Category[]
  comments: Comment[]
  loading: boolean
}

export const usePostsStore = defineStore('posts', {
  state: (): PostsState => ({
    posts: [],
    currentPost: null,
    categories: [],
    comments: [],
    loading: false
  }),

  actions: {
    async fetchPosts(params?: { categoryId?: string; page?: number }) {
      this.loading = true
      try {
        const query = new URLSearchParams()
        if (params?.categoryId) query.set('categoryId', params.categoryId)
        if (params?.page) query.set('page', params.page.toString())

        const { data } = await useFetch(`/api/posts?${query.toString()}`)
        if (data.value) {
          this.posts = data.value.posts
        }
      } finally {
        this.loading = false
      }
    },

    async fetchPost(id: string) {
      this.loading = true
      try {
        const { data } = await useFetch(`/api/posts/${id}`)
        if (data.value) {
          this.currentPost = data.value.post
          this.comments = data.value.comments
        }
      } finally {
        this.loading = false
      }
    },

    async createPost(post: { title: string; content: string; categoryId: string }) {
      const { data, error } = await useFetch('/api/posts', {
        method: 'POST',
        body: post
      })

      if (error.value) {
        throw new Error(error.value.message || '创建帖子失败')
      }

      return data.value
    },

    async fetchCategories() {
      const { data } = await useFetch('/api/categories')
      if (data.value) {
        this.categories = data.value.categories
      }
    },

    async addComment(postId: string, content: string) {
      const { data, error } = await useFetch(`/api/posts/${postId}/comments`, {
        method: 'POST',
        body: { content }
      })

      if (error.value) {
        throw new Error(error.value.message || '添加评论失败')
      }

      if (data.value) {
        this.comments.push(data.value.comment)
      }
    }
  }
})
