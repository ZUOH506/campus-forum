const users = [
  {
    id: '1',
    username: 'admin',
    email: 'admin@campus.edu',
    password: 'admin123',
    avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=admin'
  }
]

const tokens = new Map<string, string>()

export function getUserByToken(token: string) {
  const userId = tokens.get(token)
  if (!userId) return null
  return users.find(u => u.id === userId)
}

export function createUser(userData: { username: string; email: string; password: string }) {
  const user = {
    id: Date.now().toString(),
    ...userData,
    avatar: `https://api.dicebear.com/7.x/avataaars/svg?seed=${userData.username}`
  }
  users.push(user)
  return user
}

export function generateToken(): string {
  return Math.random().toString(36).substring(2) + Date.now().toString(36)
}

export function saveToken(token: string, userId: string) {
  tokens.set(token, userId)
}
