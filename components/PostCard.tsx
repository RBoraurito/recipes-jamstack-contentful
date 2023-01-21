import type { PostCard as Props } from '@/queries/post'
import { dateTime, displayDate } from '@/values/date-formats'
import { slugify } from '@/utils/sluglify'
import { format } from 'date-fns'

export const PostCard = ({ post }: { post: Props }) => {
  const publishedDate = new Date(post.sys.firstPublishedAt)

  return (
    <div key={post.title}>
      <p className="text-sm text-gray-500">
        <time dateTime={format(publishedDate, dateTime)}>
          {format(publishedDate, displayDate)}
        </time>
      </p>
      <a href="#" className="mt-2 block">
        <p className="text-xl font-semibold text-gray-900">{post.title}</p>
        <p className="mt-3 text-base text-gray-500">{post.description}</p>
      </a>
      <div className="mt-3">
        <a
          href={`/post/${slugify(post.title)}`}
          className="text-base font-semibold text-primary-600 hover:text-primary-500"
        >
          Read full story
        </a>
      </div>
    </div>
  )
}
