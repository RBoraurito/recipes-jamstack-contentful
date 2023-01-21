import { Media, Tag } from '@/types/contentful/common'
import { gql } from '@apollo/client'

export const RECIPE_TAGS = gql`
  query RecipeTags {
    tagsCollection {
      items {
        name
      }
    }
  }
`

export interface RecipeTagsQuery {
  tagsCollection: {
    items: {
      name: string
    }[]
  }
}
