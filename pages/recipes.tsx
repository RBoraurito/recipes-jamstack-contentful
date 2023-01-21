import { Container } from '@/components/Container'
import { RecipeCard } from '@/components/RecipeCard'
import { createApolloClient } from '@/lib/apolloClient'
import {
  CardRecipe,
  HomeRecipeQuery,
  RecipeOrder,
  RECIPE_QUERY,
} from '@/queries/recipe'
import { useQuery } from '@apollo/client'
import type { GetServerSideProps } from 'next'
import { useRouter } from 'next/router'
import { SortingHeader } from '@/components/SortingHeader'
import { RECIPE_TAGS } from '@/queries/tag'
import { pagination } from '@/values/pagination'
import { Pagination } from '@/components/Pagination'

const sortOptions = {
  'Most Recent': 'published_DESC',
  'Most old': 'published_ASC',
  Alphabetical: 'title_ASC',
  'Reverse Alphabetical': 'title_DESC',
}

const Recipes = () => {
  const router = useRouter()
  const { page, tag, order } = router.query
  const { data } = useQuery<HomeRecipeQuery>(RECIPE_QUERY, {
    variables: {
      limit: pagination.pageSize,
      skip: page ? (Number(page) - 1) * pagination.pageSize : 0,
      order:
        RecipeOrder[order as keyof typeof RecipeOrder] ||
        RecipeOrder.published_DESC,
      tags: tag ? (tag as string).split(',') : [],
      notifyOnNetworkStatusChange: true,
    },
  })
  console.log(page)

  return (
    <Container classNames="py-6">
      <SortingHeader
        sortOptions={sortOptions}
        title="Recipes"
        description="Find your new favorite recipe."
      />

      <div className="grid grid-cols-1 gap-6 mt-14 sm:grid-cols-2 lg:grid-cols-3">
        {data &&
          (data.recipesCollection.items.length === 0 ? (
            <p className="my-12 text-lg text-gray-400 font-bold col-span-3 text-center">
              No recipes found. Please try again with different filters or
              search
            </p>
          ) : (
            data.recipesCollection.items.map((recipe) => (
              <RecipeCard key={recipe.title} recipe={recipe} />
            ))
          ))}
      </div>

      <Pagination
        total={data?.recipesCollection.total ?? 0}
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

  await Promise.all([
    client.query({
      query: RECIPE_QUERY,
      variables: {
        limit: pagination.pageSize,
        skip: page ? (Number(page) - 1) * pagination.pageSize : 0,
        order: order
          ? RecipeOrder[order as keyof typeof RecipeOrder]
          : RecipeOrder.published_DESC,
        tags: tag ? (tag as string).split(',') : [],
      },
    }),
    client.query({
      query: RECIPE_TAGS,
    }),
  ])

  return {
    props: {
      initialApolloState: client.cache.extract(),
    },
  }
}
