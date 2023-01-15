import { gql } from '@apollo/client'

export const HOME_QUERY = gql`
  query HomeQuery {
    homeCollection(limit: 1) {
      items {
        heroImage {
          title
          description
          url
          width
          height
        }
      }
    }
  }
`

export interface HomeQueryData {
  homeCollection: {
    items: [
      {
        heroImage: {
          title: string
          description: string
          url: string
          width: number
          height: number
        }
      },
    ]
  }
}
