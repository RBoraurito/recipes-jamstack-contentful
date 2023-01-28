import { gql } from '@apollo/client'

export const POST_CARD_FRAGMENT = gql`
  fragment PostCard on Posts {
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
`

export const SINGLE_POST_FRAGMENT = gql`
  fragment SinglePost on Posts {
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
    content {
      json
    }
  }
`
