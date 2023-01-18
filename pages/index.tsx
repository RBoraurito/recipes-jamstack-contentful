import { Hero } from '@/components/Home/Hero'
import { HomePosts } from '@/components/Home/Posts'
import { HomeRecipes } from '@/components/Home/Recipes'
import { createApolloClient } from '@/lib/apolloClient'
import { HomeQueryData, HOME_QUERY } from '@/queries/home'
import { HOME_POST_QUERY } from '@/queries/post'
import { HOME_RECIPE_QUERY } from '@/queries/recipe'
import { useQuery } from '@apollo/client'
import { GetStaticProps } from 'next'
import Head from 'next/head'
import { useMemo } from 'react'

export default function Home() {
  const { data, loading } = useQuery<HomeQueryData>(HOME_QUERY)
  const heroImage = useMemo(
    () => data?.homeCollection.items[0].heroImage,
    [data?.homeCollection.items],
  )

  return (
    <>
      <Head>
        <title>Recipes App</title>
        <meta content="width=device-width, initial-scale=1" name="viewport" />
        <meta
          name="description"
          content="Recipes app for testing contentful and graphql"
        />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      {!loading && heroImage && (
        <Hero
          title={heroImage.title}
          description={heroImage.description}
          url={heroImage.url}
          width={heroImage.width}
          height={heroImage.height}
        />
      )}
      <HomeRecipes />
      <HomePosts />
    </>
  )
}

export const getStaticProps: GetStaticProps = async () => {
  const client = createApolloClient()

  const home = client.query({
    query: HOME_QUERY,
  })

  const homeRecipe = client.query({
    query: HOME_RECIPE_QUERY,
  })

  const homePost = client.query({
    query: HOME_POST_QUERY,
  })

  await Promise.all([home, homeRecipe, homePost])

  return {
    props: {
      initialApolloState: client.cache.extract(),
    },
    revalidate: 10,
  }
}
