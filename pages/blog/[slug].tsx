import { Container } from '@/components/Container'
import { createApolloClient } from '@/lib/apolloClient'
import { RecipeDetail } from '@/pages-fallback/recipe/[slug]'
import {
  SinglePostQuery,
  SINGLE_POST_QUERY,
  SlugPostQuery,
  SLUG_POST_QUERY,
} from '@/queries/post'
import { camelize } from '@/utils/camelize'
import { dateTime, displayDate } from '@/values/date-formats'
import { useQuery } from '@apollo/client'
import { format } from 'date-fns'
import { GetStaticPaths, GetStaticProps } from 'next'
import Link from 'next/link'
import Image from 'next/image'
import { useRouter } from 'next/router'
import { useMemo } from 'react'
import { documentToReactComponents } from '@contentful/rich-text-react-renderer'

const Recipe = ({ slug }: { slug: string }) => {
  const router = useRouter()
  const { data, loading } = useQuery<SinglePostQuery>(SINGLE_POST_QUERY, {
    variables: {
      slug,
    },
  })

  const post = useMemo(() => data?.postsCollection.items[0], [data])

  if (router.isFallback || loading) return <RecipeDetail />
  if (!post) return null
  return (
    <Container classNames="py-8 sm:py-12">
      <div className="max-w-prose mx-auto">
        <div className="mb-4 sm:mb-6 inline-flex items-start">
          <p className="text-gray-600 font-bold text-lg uppercase mr-2">
            Categories:
          </p>
          {post?.contentfulMetadata.tags.map((tag) => (
            <Link
              className="text-primary-500 font-medium hover:underline mr-2"
              key={tag.id}
              href={`/blog?tag=${camelize(tag.name)}`}
              target="_blank"
            >
              {tag.name}
            </Link>
          ))}
        </div>
        <h1 className="text-4xl font-bold tracking-tight text-primary-800 sm:text-5xl mb-3">
          {post?.title}
        </h1>
        <p className="text-lg text-gray-700">
          By{' '}
          <a
            href={post?.author.contactLink}
            className="text-secondary-600 font-medium"
          >
            {post?.author.name}
          </a>
        </p>
        <time
          className="text-md text-gray-600 mb-4 block"
          dateTime={format(new Date(post.sys.firstPublishedAt), dateTime)}
        >
          {format(new Date(post.sys.firstPublishedAt), displayDate)}
        </time>
      </div>
      <Image
        src={post?.featuredImage.url}
        width={post?.featuredImage.width}
        height={post?.featuredImage.height}
        alt={post?.featuredImage.description}
        title={post?.featuredImage.title}
        className="max-h-96 w-full object-cover object-center mb-4"
      />
      <section className="prose mx-auto my-8 sm:my-10">
        {documentToReactComponents(post.content.json)}
      </section>
    </Container>
  )
}

export default Recipe

export const getStaticProps: GetStaticProps = async (context) => {
  const client = createApolloClient()

  try {
    const { data: post } = await client.query<SinglePostQuery>({
      query: SINGLE_POST_QUERY,
      variables: {
        slug: context.params?.slug,
      },
    })

    if (!post.postsCollection.items.length) {
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

  const { data } = await client.query<SlugPostQuery>({
    query: SLUG_POST_QUERY,
  })

  return {
    paths: data.postsCollection.items.map((post) => ({
      params: {
        slug: post.slug,
      },
    })),
    fallback: true,
  }
}
