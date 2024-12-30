import React from 'react'
import useGlobalStore from '@/store/hub'

const Pagination: React.FC = () => {
  const { pagination, prevPage, nextPage } = useGlobalStore()
  const { currentPage, lastPage, prev, next } = pagination

  const scrollToTop = () => {
    if (window.scrollTo) {
      window.scrollTo({
        top: 0,
        behavior: 'smooth',
      })
    } else {
      document.documentElement.scrollTop = 0
      document.body.scrollTop = 0
    }
  }

  const handlePrevPage = () => {
    if (prev) {
      prevPage()
      setTimeout(scrollToTop, 0)
    }
  }

  const handleNextPage = () => {
    if (next) {
      nextPage()
      setTimeout(scrollToTop, 0)
    }
  }

  return (
    <div className="w-full flex items-center justify-between mt-6 py-4 text-sm font-medium text-gray-400">
      <button
        onClick={handlePrevPage}
        disabled={!prev}
        className={`flex items-center gap-1 ${!prev ? 'text-gray-400 dark:text-gray-600 cursor-not-allowed' : 'hover:text-gray-200 dark:text-gray-400 text-gray-600'
          }`}
      >
        ← Previous Page
      </button>

      <span>
        Page {currentPage} of {lastPage}
      </span>

      <button
        onClick={handleNextPage}
        disabled={!next}
        className={`flex items-center gap-1 ${!next ? 'text-gray-400 dark:text-gray-600 cursor-not-allowed' : 'hover:text-gray-200 dark:text-gray-400 text-gray-600'
          }`}
      >
        Next Page →
      </button>
    </div>
  )
}

export default Pagination
