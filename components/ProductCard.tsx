import { Product } from '@/queries/recipe'
import Image from 'next/image'

export const ProductCard = ({ product }: { product: Product }) => (
  <div key={product.title} className="group relative">
    <div className="min-h-80 aspect-w-1 aspect-h-1 w-full overflow-hidden rounded-md bg-gray-200 group-hover:opacity-75 lg:h-40">
      <Image
        src={product.image.url}
        alt={product.image.description}
        width={product.image.width}
        height={product.image.height}
        title={product.image.title}
        className="h-full w-full object-cover object-center lg:h-full lg:w-full"
      />
    </div>
    <div className="mt-4 flex justify-between">
      <div>
        <h3 className="text-sm text-gray-700">
          <a href={product.link} target="_blank" rel="noreferrer">
            <span aria-hidden="true" className="absolute inset-0" />
            {product.title}
          </a>
        </h3>
      </div>
      <p className="text-sm font-medium text-gray-900">${product.price}</p>
    </div>
  </div>
)
