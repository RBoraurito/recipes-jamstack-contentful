import { gql } from '@apollo/client'

export const RECIPE_CARD_FRAGMENT = gql`
  fragment RecipeCard on Recipes {
    contentfulMetadata {
      tags {
        id
        name
      }
    }
    slug
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
`

export const RECIPE_FRAGMENT = gql`
  fragment Recipe on Recipes {
    slug
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
    featuredImage {
      url
      description
      title
      width
      height
    }
    recipe {
      json
    }
    relatedProductsCollection(limit: 3) {
      items {
        title
        link
        image {
          url
          title
          description
          width
          height
        }
        price
      }
    }
    author {
      name
      contactLink
    }
  }
`
