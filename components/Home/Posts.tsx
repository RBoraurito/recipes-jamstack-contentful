import { HOME_POST_QUERY, PostHomeQuery } from '@/queries/post'
import { useQuery } from '@apollo/client'
import { PostCard } from '@/components/PostCard'

export const HomePosts = () => {
  const { data } = useQuery<PostHomeQuery>(HOME_POST_QUERY)

  return (
    <div className="bg-white px-6 pt-16 pb-20 lg:px-8 lg:pt-24 lg:pb-28">
      <div className="relative mx-auto max-w-lg divide-y-2 divide-gray-200 lg:max-w-7xl">
        <div>
          <h2 className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
            Blog
          </h2>
          <div className="mt-3 sm:mt-4">
            <p className="text-xl text-gray-500">
              Checkout new articles about cooking and food.
            </p>
          </div>
        </div>
        <div className="mt-6 grid gap-16 pt-10 lg:grid-cols-2 lg:gap-x-5 lg:gap-y-12">
          {data?.postsCollection.items.map((post) => (
            <PostCard post={post} key={post.sys.firstPublishedAt} />
          ))}
        </div>
      </div>
    </div>
  )
}
