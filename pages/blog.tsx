import { Container } from '@/components/Container'
import { RecipeCard } from '@/components/RecipeCard'
import { createApolloClient } from '@/lib/apolloClient'
import { useQuery } from '@apollo/client'
import type { GetServerSideProps } from 'next'
import { useRouter } from 'next/router'
import { SortingHeader } from '@/components/SortingHeader'
import { RECIPE_TAGS } from '@/queries/tag'
import { pagination } from '@/values/pagination'
import { Pagination } from '@/components/Pagination'
import { PostQuery, POST_QUERY, PostOrder } from '@/queries/post'
import { PostCard } from '@/components/PostCard'

const sortOptions = {
  'Most Recent': 'published_DESC',
  'Most old': 'published_ASC',
  Alphabetical: 'title_ASC',
  'Reverse Alphabetical': 'title_DESC',
}

const Recipes = () => {
  const router = useRouter()
  const { page, tag, order } = router.query
  const { data } = useQuery<PostQuery>(POST_QUERY, {
    variables: {
      limit: pagination.pageSize,
      skip: page ? (Number(page) - 1) * pagination.pageSize : 0,
      order:
        PostOrder[order as keyof typeof PostOrder] || PostOrder.published_DESC,
      tags: tag ? (tag as string).split(',') : [],
      notifyOnNetworkStatusChange: true,
    },
  })
  console.log(page)

  return (
    <Container classNames="py-6">
      <SortingHeader
        sortOptions={sortOptions}
        title="Blog"
        description="Checkout our new posts, they might help you wirt cooking stuff."
      />

      <div className="grid grid-cols-1 gap-6 mt-14 sm:grid-cols-2">
        {data &&
          (data.postsCollection.items.length === 0 ? (
            <p className="my-12 text-lg text-gray-400 font-bold col-span-3 text-center">
              No recipes found. Please try again with different filters or
              search
            </p>
          ) : (
            data.postsCollection.items.map((post) => (
              <PostCard key={post.title} post={post} />
            ))
          ))}
      </div>

      <Pagination
        total={data?.postsCollection.total ?? 0}
        className="mt-14"
        currentPage={Number(page) || 1}
      />
    </Container>
  )
}

export default Recipes

export const getServerSideProps: GetServerSideProps = async (context) => {
  const client = createApolloClient()

  const { page, tag, order } = context.query

  try {
    await Promise.all([
      client.query({
        query: POST_QUERY,
        variables: {
          limit: pagination.pageSize,
          skip: page ? (Number(page) - 1) * pagination.pageSize : 0,
          order: order
            ? PostOrder[order as keyof typeof PostOrder]
            : PostOrder.published_DESC,
          tags: tag ? (tag as string).split(',') : [],
        },
      }),
      client.query({
        query: RECIPE_TAGS,
      }),
    ])
  } catch (error) {
    console.error(error.networkError?.result?.errors)
  }


  return {
    props: {
      initialApolloState: client.cache.extract(),
    },
  }
}
