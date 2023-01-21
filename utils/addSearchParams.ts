import { ParsedUrlQuery } from 'querystring'

export const addSearchParams = (
  pathname: string,
  query: ParsedUrlQuery,
  params: Record<string, string>,
  remove: boolean = false,
) => {
  const values = Object.entries(params)[0]
  const addKey = values[0]
  let newQuery = {
    ...query,
    ...params,
  }
  return `${pathname}?${new URLSearchParams(
    newQuery as Record<string, string>,
  ).toString()}`
}

export const toggleSearchParams = (
  pathname: string,
  query: ParsedUrlQuery,
  params: Record<string, string>,
) => {
  const values = Object.entries(params)[0]
  const addKey = values[0]
  let newQuery = query
  if (query.hasOwnProperty(addKey)) {
    if (query[addKey]?.includes(values[1])) {
      query[addKey] = (query[addKey] as string)
        .split(',')
        .filter((item) => item !== values[1])
        .join(',')
      if (query[addKey] === '') {
        delete query[addKey]
      }
    } else {
      newQuery[addKey] = query[addKey] + ',' + values[1]
    }
  } else {
    newQuery = { ...query, ...params }
  }
  return `${pathname}?${new URLSearchParams(
    newQuery as Record<string, string>,
  ).toString()}`
}
