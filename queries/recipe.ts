import { RECIPE_CARD_FRAGMENT, RECIPE_FRAGMENT } from '@/fragments/Recipe'
import { Author, Media, Sys, Tag } from '@/types/contentful/common'
import { gql } from '@apollo/client'

export const HOME_RECIPE_QUERY = gql`
  ${RECIPE_CARD_FRAGMENT}
  query HomeRecipeQuery {
    recipesCollection(limit: 3) {
      items {
        ...RecipeCard
      }
    }
  }
`

export interface HomeRecipeQuery {
  recipesCollection: {
    total: number
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
  ${RECIPE_CARD_FRAGMENT}
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
      total
      items {
        ...RecipeCard
      }
    }
  }
`

export const SINGLE_RECIPE_QUERY = gql`
  ${RECIPE_FRAGMENT}
  query SingleRecipeQuery($slug: String!) {
    recipesCollection(where: { slug: $slug }, limit: 1) {
      items {
        ...Recipe
      }
    }
  }
`

export interface SingleRecipe {
  recipesCollection: {
    items: [
      {
        title: string
        slug: string
        featuredImage: Pick<
          Media,
          'title' | 'description' | 'url' | 'width' | 'height'
        >
        author: Author
        contentfulMetadata: {
          tags: Tag[]
        }
        sys: Pick<Sys, 'firstPublishedAt'>
        recipe: {
          json: any
        }
        relatedProductsCollection: {
          items: Product[]
        }
      },
    ]
  }
}

export interface Product {
  title: string
  link: string
  image: Pick<Media, 'url' | 'title' | 'description' | 'width' | 'height'>
  price: number
}

export const RECIPE_TOTAL_QUERY = gql`
  query RecipeTotalQuery {
    recipesCollection {
      total
    }
  }
`

export interface RecipeTotal {
  recipesCollection: {
    total: number
  }
}

// Limit in 1 to try fallback
export const RECIPE_SLUGS_QUERY = gql`
  query RecipeSlugsQuery {
    recipesCollection {
      items {
        slug
      }
    }
  }
`

export interface RecipesSlugs {
  recipesCollection: {
    items: {
      slug: string
    }[]
  }
}
