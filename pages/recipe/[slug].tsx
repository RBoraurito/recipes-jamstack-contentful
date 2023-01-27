import { Container } from '@/components/Container'
import { createApolloClient } from '@/lib/apolloClient'
import {
  RecipesSlugs,
  RECIPE_SLUGS_QUERY,
  SingleRecipe,
  SINGLE_RECIPE_QUERY,
} from '@/queries/recipe'
import { camelize } from '@/utils/camelize'
import { useQuery } from '@apollo/client'
import Link from 'next/link'
import { GetStaticPaths, GetStaticProps } from 'next/types'
import { useMemo } from 'react'
import Image from 'next/image'
import { documentToReactComponents } from '@contentful/rich-text-react-renderer'
import { format } from 'date-fns'
import { dateTime, displayDate } from '@/values/date-formats'
import { ProductCard } from '@/components/ProductCard'
import { useRouter } from 'next/router'
import { RecipeDetail } from '@/pages-fallback/recipe/[slug]'

const Recipe = ({ slug }: { slug: string }) => {
  const router = useRouter()
  const { data, loading } = useQuery<SingleRecipe>(SINGLE_RECIPE_QUERY, {
    variables: {
      slug,
    },
  })

  const recipe = useMemo(() => data?.recipesCollection.items[0], [data])

  if (router.isFallback || loading) return <RecipeDetail />
  if (!recipe) return null
  return (
    <Container classNames="py-8 sm:py-12">
      <div className="max-w-prose mx-auto">
        <div className="mb-4 sm:mb-6 inline-flex items-start">
          <p className="text-gray-600 font-bold text-lg uppercase mr-2">
            Categories:
          </p>
          {recipe?.contentfulMetadata.tags.map((tag) => (
            <Link
              className="text-primary-500 font-medium hover:underline mr-2"
              key={tag.id}
              href={`/recipes?tag=${camelize(tag.name)}`}
              target="_blank"
            >
              {tag.name}
            </Link>
          ))}
        </div>
        <h1 className="text-4xl font-bold tracking-tight text-primary-800 sm:text-5xl mb-3">
          {recipe?.title}
        </h1>
        <p className="text-lg text-gray-700">
          By{' '}
          <a
            href={recipe?.author.contactLink}
            className="text-secondary-600 font-medium"
          >
            {recipe?.author.name}
          </a>
        </p>
        <time
          className="text-md text-gray-600 mb-4 block"
          dateTime={format(new Date(recipe.sys.firstPublishedAt), dateTime)}
        >
          {format(new Date(recipe.sys.firstPublishedAt), displayDate)}
        </time>
      </div>
      <Image
        src={recipe?.featuredImage.url}
        width={recipe?.featuredImage.width}
        height={recipe?.featuredImage.height}
        alt={recipe?.featuredImage.description}
        title={recipe?.featuredImage.title}
        className="max-h-96 w-full object-cover object-center mb-4"
      />
      <section className="prose mx-auto my-8 sm:my-10">
        {documentToReactComponents(recipe.recipe.json)}
      </section>
      <section className="max-w-prose mx-auto">
        <h2 className="text-2xl font-bold tracking-tight text-primary-800 sm:text-3xl mb-6">
          In the recipe
        </h2>
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-3">
          {recipe.relatedProductsCollection.items.map((product) => (
            <ProductCard key={product.title} product={product} />
          ))}
        </div>
      </section>
    </Container>
  )
}

export default Recipe

export const getStaticProps: GetStaticProps = async (context) => {
  const client = createApolloClient()

  try {
    const recipe = await client.query<SingleRecipe>({
      query: SINGLE_RECIPE_QUERY,
      variables: {
        slug: context.params?.slug,
      },
    })

    if (!recipe.data.recipesCollection.items.length) {
      return {
        notFound: true,
      }
    }

    return {
      props: {
        initialApolloState: client.cache.extract(),
        slug: context.params?.slug,
      },
      revalidate: 10,
    }
  } catch (error) {
    return {
      notFound: true,
    }
  }
}

export const getStaticPaths: GetStaticPaths = async () => {
  const client = createApolloClient()

  const { data } = await client.query<RecipesSlugs>({
    query: RECIPE_SLUGS_QUERY,
  })

  return {
    paths: data.recipesCollection.items.map((recipe) => ({
      params: {
        slug: recipe.slug,
      },
    })),
    fallback: true,
  }
}
