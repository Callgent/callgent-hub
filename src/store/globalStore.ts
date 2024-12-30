import { User } from '@/types/global'
import { create } from 'zustand'

interface GlobalState {
  user: User | null
  setUser: (user: User) => void
  clearUser: () => void
}

const useGlobalStore = create<GlobalState>((set) => ({
  user: null,
  setUser: (user) => set({ user }),
  clearUser: () => set({ user: null }),
}))

export default useGlobalStore
