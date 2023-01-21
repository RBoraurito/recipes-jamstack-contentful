import { pagination } from '@/values/pagination'
import {
  ArrowLongLeftIcon,
  ArrowLongRightIcon,
} from '@heroicons/react/20/solid'
import clsx from 'clsx'
import { useRouter } from 'next/router'
import { useMemo } from 'react'

interface PaginationProps {
  className?: string
  total: number
  currentPage: number
}

export const Pagination = ({
  className,
  total,
  currentPage,
}: PaginationProps) => {
  const router = useRouter()
  const pages = useMemo(
    () =>
      Array(Math.ceil(total / pagination.pageSize))
        .fill(0)
        .map((_, i) => i + 1),
    [total],
  )

  const goToPage = (page: number) => {
    if (page === currentPage) return
    router.push({
      pathname: router.pathname,
      query: {
        ...router.query,
        page,
      },
    })
  }

  const prevPage = () => {
    if (currentPage === 1) return
    router.push({
      pathname: router.pathname,
      query: {
        ...router.query,
        page: currentPage - 1,
      },
    })
  }
  const nextPage = () => {
    if (currentPage === pages.length + 1) return
    router.push({
      pathname: router.pathname,
      query: {
        ...router.query,
        page: currentPage + 1,
      },
    })
  }

  if (pages.length < 2) return null
  return (
    <nav
      className={clsx(
        'flex items-center justify-between border-t border-gray-200 px-4 sm:px-0',
        className,
      )}
    >
      <div className="-mt-px flex w-0 flex-1">
        <button
          type="button"
          disabled={currentPage === 1}
          className={clsx(
            'inline-flex items-center border-t-2 border-transparent pt-4 pr-1 text-sm font-medium text-gray-500  disabled:cursor-not-allowed disabled:text-gray-300',
            currentPage !== 1 && 'hover:border-gray-300 hover:text-gray-700',
          )}
          onClick={prevPage}
        >
          <ArrowLongLeftIcon
            className={clsx(
              'mr-3 h-5 w-5',
              currentPage === 1 ? 'text-gray-300' : 'text-gray-400',
            )}
            aria-hidden="true"
          />
          Previous
        </button>
      </div>
      <div className="hidden md:-mt-px md:flex">
        {pages.map((page) => (
          <button
            type="button"
            className={clsx(
              'inline-flex items-center border-t-2 px-4 pt-4 text-sm font-medium',
              page === currentPage
                ? 'border-primary-500 text-primary-600'
                : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300',
            )}
            onClick={() => goToPage(page)}
            key={page}
          >
            {page}
          </button>
        ))}
      </div>
      <div className="-mt-px flex w-0 flex-1 justify-end">
        <button
          type="button"
          disabled={currentPage === pages.length}
          className={clsx(
            'inline-flex items-center border-t-2 border-transparent pt-4 pr-1 text-sm font-medium text-gray-500 disabled:cursor-not-allowed disabled:text-gray-300',
            currentPage !== pages.length &&
              'hover:border-gray-300 hover:text-gray-700',
          )}
          onClick={nextPage}
        >
          Next
          <ArrowLongRightIcon
            className={clsx(
              'mr-3 h-5 w-5',
              currentPage === pages.length ? 'text-gray-300' : 'text-gray-400',
            )}
            aria-hidden="true"
          />
        </button>
      </div>
    </nav>
  )
}
