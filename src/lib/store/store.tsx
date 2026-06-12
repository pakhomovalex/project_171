import { create } from 'zustand'
import { persist } from 'zustand/middleware'

interface UserState {
  user: {
    id: number
    username: string
    avatar: string | null // URL аватарки
    email?: string
  } | null
  updateUser: (user: UserState['user']) => void
  logout: () => void
}

export const useUser = create<UserState>()(
  persist(
    (set) => ({
      user: null,
      updateUser: (user) => set({ user }),
      logout: () => {
        set({ user: null })
        // localStorage очистится автоматически благодаря persist
      },
    }),
    {
      name: 'user-storage',
      // Сохраняем только публичные поля
      partialize: (state) => ({ user: state.user }),
    }
  )
)