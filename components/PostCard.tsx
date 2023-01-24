import type { PostCard as Props } from '@/queries/post'
import { dateTime, displayDate } from '@/values/date-formats'
import { slugify } from '@/utils/sluglify'
import { format } from 'date-fns'
import Link from 'next/link'

export const PostCard = ({ post }: { post: Props }) => {
  const publishedDate = new Date(post.sys.firstPublishedAt)

  return (
    <div key={post.title}>
      <p className="text-sm text-gray-500">
        <time dateTime={format(publishedDate, dateTime)}>
          {format(publishedDate, displayDate)}
        </time>
      </p>
      <Link href={`/blog/${slugify(post.title)}`} className="mt-2 block">
        <p className="text-xl font-semibold text-gray-900">{post.title}</p>
      </Link>
      <p className="text-sm font-medium text-primary-600 mt-2">
        {post.contentfulMetadata.tags.map((tag) => (
          <Link
            href={`/recipes?tag=${slugify(tag.name)}`}
            target="_blank"
            key={tag.id}
            className="hover:underline mr-2"
          >
            {tag.name}
          </Link>
        ))}
      </p>
      <p className="mt-3 text-base text-gray-500">{post.description}</p>

      <p className="mt-3 text-base text-gray-500 font-bold">
        Reading minutes:{' '}
        <span className="font-normal">{post.readingMinutes}</span>
      </p>
      <div className="mt-3">
        <Link
          href={`/post/${slugify(post.title)}`}
          className="text-base font-semibold text-primary-600 hover:text-primary-500"
        >
          Read full story
        </Link>
      </div>
    </div>
  )
}
