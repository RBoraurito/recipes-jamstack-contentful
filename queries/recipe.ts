import { Author, Media, Sys, Tag } from '@/types/contentful/common'
import { gql } from '@apollo/client'

export const HOME_RECIPE_QUERY = gql`
  query HomeRecipeQuery {
    recipesCollection(limit: 3) {
      items {
        title
        featuredImage {
          title
          description
          url
          width
          height
        }
        author {
          name
          contactLink
        }
        tagsCollection(limit: 3) {
          items {
            tag
          }
        }
        sys {
          firstPublishedAt
        }
      }
    }
  }
`

export interface HomeRecipeQuery {
  recipesCollection: {
    items: CardRecipe[]
  }
}

export interface CardRecipe {
  title: string
  featuredImage: Pick<
    Media,
    'title' | 'description' | 'url' | 'width' | 'height'
  >
  author: Author
  tagsCollection: {
    items: Pick<Tag<Media>, 'tag'>[]
  }
  sys: Pick<Sys, 'firstPublishedAt'>
}
