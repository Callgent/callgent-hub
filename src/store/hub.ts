import { Hub, PaginationInfo } from '@/types/global'
import { create } from 'zustand'

interface HubState {
  hublist: Hub[]
  setHublist: (hublist: Hub[]) => void
  addHub: (hub: Hub) => void
  clearHublist: () => void

  pagination: PaginationInfo
  setPagination: (pagination: PaginationInfo) => void
  setCurrentPage: (page: number) => void
  nextPage: () => void
  prevPage: () => void
  resetPage: () => void
}

const useGlobalStore = create<HubState>((set) => ({
  hublist: [],
  setHublist: (hublist) => set({ hublist }),
  addHub: (hub) => set((state) => ({ hublist: [...state.hublist, hub] })),
  clearHublist: () => set({ hublist: [] }),

  pagination: {
    total: 0,
    lastPage: 1,
    currentPage: 1,
    perPage: 10,
    prev: null,
    next: null,
  },
  setPagination: (pagination) => set({ pagination }),

  setCurrentPage: (page) =>
    set((state) => ({
      pagination: {
        ...state.pagination,
        currentPage: page,
        prev: page > 1 ? page - 1 : null,
        next: page < state.pagination.lastPage ? page + 1 : null,
      },
    })),

  nextPage: () =>
    set((state) => {
      const { currentPage, lastPage } = state.pagination
      const nextPage = currentPage < lastPage ? currentPage + 1 : currentPage
      return {
        pagination: {
          ...state.pagination,
          currentPage: nextPage,
          prev: nextPage > 1 ? nextPage - 1 : null,
          next: nextPage < lastPage ? nextPage + 1 : null,
        },
      }
    }),

  prevPage: () =>
    set((state) => {
      const { currentPage } = state.pagination
      const prevPage = currentPage > 1 ? currentPage - 1 : currentPage
      return {
        pagination: {
          ...state.pagination,
          currentPage: prevPage,
          prev: prevPage > 1 ? prevPage - 1 : null,
          next: prevPage < state.pagination.lastPage ? prevPage + 1 : null,
        },
      }
    }),

  resetPage: () =>
    set((state) => ({
      pagination: {
        ...state.pagination,
        currentPage: 1,
        prev: null,
        next: state.pagination.lastPage > 1 ? 2 : null,
      },
    })),
}))

export default useGlobalStore
