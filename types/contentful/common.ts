export interface Sys {
  id: string
  spaceId: string
  environmentId: string
  publishedAt: string
  firstPublishedAt: string
  publishedVersion: number
}

export interface Media {
  title: string
  description: string
  width: number
  height: number
  contentType: string
  fileName: string
  size: number
  url: string
}

export interface Author {
  name: string
  contactLink: string
}

export interface Tag {
  id: string
  name: string
}
