import { Author, Media, Sys, Tag } from '@/types/contentful/common'
import { gql } from '@apollo/client'

export const HOME_POST_QUERY = gql`
  query PostHomeQuery {
    postsCollection(limit: 4) {
      items {
        contentfulMetadata {
          tags {
            id
            name
          }
        }
        sys {
          firstPublishedAt
        }
        title
        description
        featuredImage {
          url
          title
          description
          width
          height
        }
        author {
          name
          contactLink
        }
        readingMinutes
      }
    }
  }
`

export enum PostOrder {
  title_ASC = 'title_ASC',
  title_DESC = 'title_DESC',
  published_ASC = 'sys_firstPublishedAt_ASC',
  published_DESC = 'sys_firstPublishedAt_DESC',
}

export interface PostHomeQuery {
  postsCollection: {
    items: PostCard[]
  }
}

export interface PostCard {
  sys: Pick<Sys, 'firstPublishedAt'>
  title: string
  description: string
  featuredImage: Pick<
    Media,
    'title' | 'description' | 'url' | 'width' | 'height'
  >
  author: Author
  contentfulMetadata: {
    tags: Tag[]
  }
  readingMinutes: number
}

export interface PostQuery {
  postsCollection: {
    total: number
    items: PostCard[]
  }
}

export const POST_QUERY = gql`
  query PostQuery(
    $limit: Int = 9
    $skip: Int = 0
    $order: [PostsOrder] = sys_firstPublishedAt_DESC
    $tags: [String] = []
  ) {
    postsCollection(
      limit: $limit
      skip: $skip
      order: $order
      where: { contentfulMetadata: { tags: { id_contains_all: $tags } } }
    ) {
      total
      items {
        contentfulMetadata {
          tags {
            id
            name
          }
        }
        sys {
          firstPublishedAt
        }
        title
        description
        featuredImage {
          url
          title
          description
          width
          height
        }
        author {
          name
          contactLink
        }
        readingMinutes
      }
    }
  }
`
