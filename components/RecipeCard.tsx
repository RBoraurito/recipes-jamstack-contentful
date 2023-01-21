import { CardRecipe } from '@/queries/recipe'
import { dateTime, displayDate } from '@/values/date-formats'
import { slugify } from '@/utils/sluglify'
import { format } from 'date-fns'
import Image from 'next/image'
import Link from 'next/link'

export const RecipeCard = ({ recipe }: { recipe: CardRecipe }) => {
  return (
    <div
      key={recipe.title}
      className="flex flex-col overflow-hidden rounded-lg shadow-lg"
    >
      <div className="flex-shrink-0">
        <Image
          className="h-48 w-full object-cover"
          src={recipe.featuredImage.url}
          alt={recipe.featuredImage.description}
          title={recipe.featuredImage.title}
          width={recipe.featuredImage.width}
          height={recipe.featuredImage.height}
        />
      </div>
      <div className="flex flex-1 flex-col justify-between bg-white p-6">
        <div className="flex-1">
          <p className="text-sm font-medium text-primary-600">
            {recipe.contentfulMetadata.tags.map((tag) => (
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
          <Link
            href={`/recipe/${slugify(recipe.title)}`}
            target="_blank"
            className="mt-2 block"
          >
            <p className="text-xl font-semibold text-gray-900 hover:text-secondary-700">
              {recipe.title}
            </p>
          </Link>
        </div>
        <div className="mt-6 flex items-center">
          <div className="">
            <p className="text-sm font-medium text-gray-900">
              <a
                href={recipe.author.contactLink}
                target="_blank"
                className="hover:underline"
                rel="noreferrer"
              >
                {recipe.author.name}
              </a>
            </p>
            <div className="flex space-x-1 text-sm text-gray-500">
              <time
                dateTime={format(
                  new Date(recipe.sys.firstPublishedAt),
                  dateTime,
                )}
              >
                {format(new Date(recipe.sys.firstPublishedAt), displayDate)}
              </time>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
