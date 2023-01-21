import { Fragment, useMemo, useState } from 'react'
import {
  Dialog,
  Disclosure,
  Menu,
  Popover,
  Transition,
} from '@headlessui/react'
import { XMarkIcon } from '@heroicons/react/24/outline'
import { ChevronDownIcon } from '@heroicons/react/20/solid'
import clsx from 'clsx'
import Link from 'next/link'
import { addSearchParams, toggleSearchParams } from '@/utils/addSearchParams'
import { useRouter } from 'next/router'
import { useQuery } from '@apollo/client'
import { RecipeTagsQuery, RECIPE_TAGS } from '@/queries/tag'
import { camelize, titlelize } from '@/utils/camelize'

const activeFilters = [{ value: 'objects', label: 'Objects' }]

interface SortingHeaderProps {
  className?: string
  sortOptions: Record<string, string>
  title: string
  description: string
}

export const SortingHeader = ({
  className,
  sortOptions,
  title,
  description,
}: SortingHeaderProps) => {
  const [open, setOpen] = useState(false)
  const router = useRouter()
  const { order, tag } = router.query

  const { data: tags } = useQuery<RecipeTagsQuery>(RECIPE_TAGS)

  const activeTags = useMemo(() => (tag as string)?.split(',') ?? [], [tag])

  const handleFilter = (tag: string) => {
    router.push(toggleSearchParams(router.route, router.query, { tag }))
  }

  return (
    <div className={clsx('bg-white', className)}>
      {/* Mobile filter dialog */}
      <Transition.Root show={open} as={Fragment}>
        <Dialog as="div" className="relative z-40 sm:hidden" onClose={setOpen}>
          <Transition.Child
            as={Fragment}
            enter="transition-opacity ease-linear duration-300"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="transition-opacity ease-linear duration-300"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <div className="fixed inset-0 bg-black bg-opacity-25" />
          </Transition.Child>

          <div className="fixed inset-0 z-40 flex">
            <Transition.Child
              as={Fragment}
              enter="transition ease-in-out duration-300 transform"
              enterFrom="translate-x-full"
              enterTo="translate-x-0"
              leave="transition ease-in-out duration-300 transform"
              leaveFrom="translate-x-0"
              leaveTo="translate-x-full"
            >
              <Dialog.Panel className="relative ml-auto flex h-full w-full max-w-xs flex-col overflow-y-auto bg-white py-4 pb-12 shadow-xl">
                <div className="flex items-center justify-between px-4">
                  <h2 className="text-lg font-medium text-gray-900">Filters</h2>
                  <button
                    type="button"
                    className="-mr-2 flex h-10 w-10 items-center justify-center rounded-md bg-white p-2 text-gray-400"
                    onClick={() => setOpen(false)}
                  >
                    <span className="sr-only">Close menu</span>
                    <XMarkIcon className="h-6 w-6" aria-hidden="true" />
                  </button>
                </div>

                {/* Filters */}
                <form className="mt-4">
                  <Disclosure
                    as="div"
                    className="border-t border-gray-200 px-4 py-6"
                  >
                    {({ open }) => (
                      <>
                        <h3 className="-mx-2 -my-3 flow-root">
                          <Disclosure.Button className="flex w-full items-center justify-between bg-white px-2 py-3 text-sm text-gray-400">
                            <span className="font-medium text-gray-900">
                              Tags
                            </span>
                            <span className="ml-6 flex items-center">
                              <ChevronDownIcon
                                className={clsx(
                                  open ? '-rotate-180' : 'rotate-0',
                                  'h-5 w-5 transform',
                                )}
                                aria-hidden="true"
                              />
                            </span>
                          </Disclosure.Button>
                        </h3>
                        <Disclosure.Panel className="pt-6">
                          <div className="space-y-6">
                            {tags?.tagsCollection.items.map((tag) => (
                              <div key={tag.name} className="flex items-center">
                                <input
                                  id={`filter-mobile-${tag.name}`}
                                  name={`${tag.name}[]`}
                                  defaultValue={camelize(tag.name)}
                                  type="checkbox"
                                  defaultChecked={activeTags.includes(tag.name)}
                                  className="h-4 w-4 rounded border-gray-300 text-primary-600 focus:ring-primary-500"
                                />
                                <label
                                  htmlFor={`filter-mobile-${tag.name}`}
                                  className="ml-3 text-sm text-gray-500"
                                >
                                  {tag.name}
                                </label>
                              </div>
                            ))}
                          </div>
                        </Disclosure.Panel>
                      </>
                    )}
                  </Disclosure>
                </form>
              </Dialog.Panel>
            </Transition.Child>
          </div>
        </Dialog>
      </Transition.Root>

      <div className="mx-auto max-w-7xl py-16 px-4 sm:px-6 lg:px-8">
        <h1 className="text-3xl font-bold tracking-tight text-primary-900 text-center">
          {title}
        </h1>
        <p className="mt-4 max-w-xl text-md text-gray-700 text-center mx-auto">
          {description}
        </p>
      </div>

      {/* Filters */}
      <section aria-labelledby="filter-heading">
        <h2 id="filter-heading" className="sr-only">
          Filters
        </h2>

        <div className="border-b border-gray-200 bg-white pb-4">
          <div className="mx-auto flex max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
            <Menu as="div" className="relative inline-block text-left">
              <div>
                <Menu.Button className="group inline-flex justify-center text-sm font-medium text-gray-700 hover:text-gray-900">
                  Sort
                  <ChevronDownIcon
                    className="-mr-1 ml-1 h-5 w-5 flex-shrink-0 text-gray-400 group-hover:text-gray-500"
                    aria-hidden="true"
                  />
                </Menu.Button>
              </div>

              <Transition
                as={Fragment}
                enter="transition ease-out duration-100"
                enterFrom="transform opacity-0 scale-95"
                enterTo="transform opacity-100 scale-100"
                leave="transition ease-in duration-75"
                leaveFrom="transform opacity-100 scale-100"
                leaveTo="transform opacity-0 scale-95"
              >
                <Menu.Items className="absolute left-0 z-10 mt-2 w-40 origin-top-left rounded-md bg-white shadow-2xl ring-1 ring-black ring-opacity-5 focus:outline-none">
                  <div className="py-1">
                    {Object.entries(sortOptions).map((option) => (
                      <Menu.Item key={option[1]}>
                        {({ active }) => (
                          <Link
                            href={addSearchParams(router.route, router.query, {
                              order: option[1],
                            })}
                            className={clsx(
                              order === option[1]
                                ? 'font-medium text-gray-900'
                                : 'text-gray-500',
                              active ? 'bg-gray-100' : '',
                              'block px-4 py-2 text-sm',
                            )}
                          >
                            {option[0]}
                          </Link>
                        )}
                      </Menu.Item>
                    ))}
                  </div>
                </Menu.Items>
              </Transition>
            </Menu>

            <button
              type="button"
              className="inline-block text-sm font-medium text-gray-700 hover:text-gray-900 sm:hidden"
              onClick={() => setOpen(true)}
            >
              Filters
            </button>

            <div className="hidden sm:block">
              <div className="flow-root">
                <Popover.Group className="-mx-4 flex items-center divide-x divide-gray-200">
                  <Popover className="relative inline-block px-4 text-left">
                    <Popover.Button className="group inline-flex justify-center text-sm font-medium text-gray-700 hover:text-gray-900">
                      <span>Tags</span>
                      {activeTags.length > 0 && (
                        <span className="ml-1.5 rounded bg-gray-200 py-0.5 px-1.5 text-xs font-semibold tabular-nums text-gray-700">
                          {activeTags.length}
                        </span>
                      )}
                      <ChevronDownIcon
                        className="-mr-1 ml-1 h-5 w-5 flex-shrink-0 text-gray-400 group-hover:text-gray-500"
                        aria-hidden="true"
                      />
                    </Popover.Button>

                    <Transition
                      as={Fragment}
                      enter="transition ease-out duration-100"
                      enterFrom="transform opacity-0 scale-95"
                      enterTo="transform opacity-100 scale-100"
                      leave="transition ease-in duration-75"
                      leaveFrom="transform opacity-100 scale-100"
                      leaveTo="transform opacity-0 scale-95"
                    >
                      <Popover.Panel className="absolute right-0 z-10 mt-2 origin-top-right rounded-md bg-white p-4 shadow-2xl ring-1 ring-black ring-opacity-5 focus:outline-none">
                        <form className="space-y-4">
                          {tags?.tagsCollection.items.map((tag) => (
                            <div key={tag.name} className="flex items-center">
                              <input
                                id={`filter-${tag.name}`}
                                name={`${tag.name}[]`}
                                defaultValue={camelize(tag.name)}
                                type="checkbox"
                                defaultChecked={activeTags.includes(tag.name)}
                                className="h-4 w-4 rounded border-gray-300 text-primary-600 focus:ring-primary-500"
                                onChange={(e) => {
                                  handleFilter(e.target.value)
                                }}
                              />
                              <label
                                htmlFor={`filter-${tag.name}`}
                                className="ml-3 whitespace-nowrap pr-6 text-sm font-medium text-gray-900"
                              >
                                {tag.name}
                              </label>
                            </div>
                          ))}
                        </form>
                      </Popover.Panel>
                    </Transition>
                  </Popover>
                </Popover.Group>
              </div>
            </div>
          </div>
        </div>

        {/* Active filters */}
        <div className="bg-gray-100">
          <div className="mx-auto max-w-7xl py-3 px-4 sm:flex sm:items-center sm:px-6 lg:px-8">
            <h3 className="text-sm font-medium text-gray-500">
              Filters
              <span className="sr-only">, active</span>
            </h3>

            <div
              aria-hidden="true"
              className="hidden h-5 w-px bg-gray-300 sm:ml-4 sm:block"
            />

            <div className="mt-2 sm:mt-0 sm:ml-4">
              <div className="-m-1 flex flex-wrap items-center">
                {activeTags.map((activeTag) => (
                  <span
                    key={activeTag}
                    className="m-1 inline-flex items-center rounded-full border border-gray-200 bg-white py-1.5 pl-3 pr-2 text-sm font-medium text-gray-900"
                  >
                    <span>{titlelize(activeTag)}</span>
                    <button
                      type="button"
                      className="ml-1 inline-flex h-4 w-4 flex-shrink-0 rounded-full p-1 text-gray-400 hover:bg-gray-200 hover:text-gray-500"
                      onClick={() => handleFilter(activeTag)}
                    >
                      <span className="sr-only">
                        Remove filter for {activeTag}
                      </span>
                      <svg
                        className="h-2 w-2"
                        stroke="currentColor"
                        fill="none"
                        viewBox="0 0 8 8"
                      >
                        <path
                          strokeLinecap="round"
                          strokeWidth="1.5"
                          d="M1 1l6 6m0-6L1 7"
                        />
                      </svg>
                    </button>
                  </span>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}