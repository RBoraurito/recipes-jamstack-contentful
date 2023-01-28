import { POST_CARD_FRAGMENT, SINGLE_POST_FRAGMENT } from '@/fragments/Post'
import { Author, Media, Sys, Tag } from '@/types/contentful/common'
import { gql } from '@apollo/client'

export const HOME_POST_QUERY = gql`
  ${POST_CARD_FRAGMENT}
  query PostHomeQuery {
    postsCollection(limit: 4) {
      items {
        ...PostCard
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

export const SINGLE_POST_QUERY = gql`
  ${SINGLE_POST_FRAGMENT}

  query SinglePostQuery($slug: String!) {
    postsCollection(where: { slug: $slug }) {
      items {
        ...SinglePost
      }
    }
  }
`

export interface SinglePostQuery {
  postsCollection: {
    items: SinglePost[]
  }
}

export interface SinglePost {
  sys: Pick<Sys, 'firstPublishedAt'>
  title: string
  slug: string
  description: string
  featuredImage: Pick<
    Media,
    'title' | 'description' | 'url' | 'width' | 'height'
  >
  readingMinutes: number
  author: Author
  contentfulMetadata: {
    tags: Tag[]
  }
  content: {
    json: any
  }
}

export const SLUG_POST_QUERY = gql`
  query SlugPostQuery {
    postsCollection {
      items {
        slug
      }
    }
  }
`

export interface SlugPostQuery {
  postsCollection: {
    items: {
      slug: string
    }[]
  }
}
