import { Author, Media, Sys, Tag } from '@/types/contentful/common'
import { gql } from '@apollo/client'

export const HOME_POST_QUERY = gql`
  query PostHomeQuery {
    postsCollection(limit: 4) {
      items {
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
        tagsCollection {
          items {
            tag
          }
        }
        readingMinutes
      }
    }
  }
`

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
  tagsCollection: {
    items: Pick<Tag<Media>, 'tag'>
  }
  readingMinutes: number
}