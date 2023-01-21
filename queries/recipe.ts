import { Author, Media, Sys, Tag } from '@/types/contentful/common'
import { gql } from '@apollo/client'

export const HOME_RECIPE_QUERY = gql`
  query HomeRecipeQuery {
    recipesCollection(limit: 3) {
      items {
        contentfulMetadata {
          tags {
            id
            name
          }
        }
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
  contentfulMetadata: {
    tags: Tag[]
  }
  sys: Pick<Sys, 'firstPublishedAt'>
}

export enum RecipeOrder {
  title_ASC = 'title_ASC',
  title_DESC = 'title_DESC',
  published_ASC = 'sys_firstPublishedAt_ASC',
  published_DESC = 'sys_firstPublishedAt_DESC',
}

export const RECIPE_QUERY = gql`
  query HomeRecipeQuery(
    $limit: Int = 16
    $skip: Int = 0
    $order: [RecipesOrder] = sys_firstPublishedAt_DESC
    $tags: [String] = []
  ) {
    recipesCollection(
      limit: $limit
      skip: $skip
      order: $order
      where: { contentfulMetadata: { tags: { id_contains_all: $tags } } }
    ) {
      items {
        contentfulMetadata {
          tags {
            id
            name
          }
        }
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
        sys {
          firstPublishedAt
        }
      }
    }
  }
`
