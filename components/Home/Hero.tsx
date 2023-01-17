import Image from 'next/image'
import Link from 'next/link'

interface HeroProps {
  title: string
  description: string
  url: string
  width: number
  height: number
}

export const Hero = ({ title, url, description, width, height }: HeroProps) => {
  return (
    <section className="lg:relative">
      <div className="mx-auto w-full max-w-7xl pt-16 pb-20 text-center lg:py-48 lg:text-left">
        <div className="px-6 sm:px-8 lg:w-1/2 xl:pr-16">
          <h1 className="text-4xl font-bold tracking-tight text-gray-900 sm:text-5xl md:text-6xl lg:text-5xl xl:text-6xl">
            <span className="block xl:inline">Find your new favorite</span>{' '}
            <span className="block text-primary-600 xl:inline">recipe</span>
          </h1>
          <p className="mx-auto mt-3 max-w-md text-lg text-gray-500 sm:text-xl md:mt-5 md:max-w-3xl">
            Here you will find all kinds of recipes. From the most simple to the
            most complex. You can also add your own recipes and share them with
            the community.
          </p>
          <div className="mt-10 sm:flex sm:justify-center lg:justify-start">
            <div className="rounded-md shadow">
              <Link
                href="/recipes"
                className="flex w-full items-center justify-center rounded-md border border-transparent bg-primary-600 px-8 py-3 text-base font-medium text-white hover:bg-primary-700 md:py-4 md:px-10 md:text-lg"
              >
                Explore recipes
              </Link>
            </div>
            <div className="mt-3 rounded-md shadow sm:mt-0 sm:ml-3">
              <Link
                href="/recipes/new"
                className="flex w-full items-center justify-center rounded-md border border-transparent bg-white px-8 py-3 text-base font-medium text-primary-600 hover:bg-gray-50 md:py-4 md:px-10 md:text-lg"
              >
                Add your own recipe
              </Link>
            </div>
          </div>
        </div>
      </div>
      <div className="relative h-64 w-full sm:h-72 md:h-96 lg:absolute lg:inset-y-0 lg:right-0 lg:h-full lg:w-1/2">
        <Image
          className="absolute inset-0 h-full w-full object-cover"
          src={url}
          title={title}
          alt={description}
          width={width}
          height={height}
        />
      </div>
    </section>
  )
}
