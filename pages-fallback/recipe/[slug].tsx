import { Container } from '@/components/Container'

export const RecipeDetail = () => (
  <section className="animate-pulse">
    <Container>
      <div className="max-w-prose mx-auto py-6">
        <div className="h-4 rounded-full bg-gray-300 w-48 mb-4"></div>
        <div className="h-18 rounded-full bg-gray-300 w-full mb-4"></div>
        <div className="h-8 rounded-full bg-gray-300 w-64 mb-1"></div>
        <div className="h-6 rounded-full bg-gray-300 w-40 mb-4"></div>
      </div>
      <div className="h-72 rounded-md bg-gray-300 w-full mb-4"></div>
      <div className="max-w-prose mx-auto py-8">
        {[...Array(6)].map((_, i) => (
          <div key={i} role="status" className="space-y-2.5 max-w-lg mb-4">
            <div className="flex items-center w-full space-x-2">
              <div className="h-2.5 bg-gray-200 rounded-full w-32"></div>
              <div className="h-2.5 bg-gray-300 rounded-full w-24"></div>
              <div className="h-2.5 bg-gray-300 rounded-full w-full"></div>
            </div>
            <div className="flex items-center w-full space-x-2 max-w-[480px]">
              <div className="h-2.5 bg-gray-200 rounded-full w-full"></div>
              <div className="h-2.5 bg-gray-300 rounded-full w-full"></div>
              <div className="h-2.5 bg-gray-300 rounded-full w-24"></div>
            </div>
            <div className="flex items-center w-full space-x-2 max-w-[400px]">
              <div className="h-2.5 bg-gray-300 rounded-full w-full"></div>
              <div className="h-2.5 bg-gray-200 rounded-full w-80"></div>
              <div className="h-2.5 bg-gray-300 rounded-full w-full"></div>
            </div>
            <div className="flex items-center w-full space-x-2 max-w-[480px]">
              <div className="h-2.5 bg-gray-200 rounded-full w-full"></div>
              <div className="h-2.5 bg-gray-300 rounded-full w-full"></div>
              <div className="h-2.5 bg-gray-300 rounded-full w-24"></div>
            </div>
            <div className="flex items-center w-full space-x-2 max-w-[440px]">
              <div className="h-2.5 bg-gray-300 rounded-full w-32"></div>
              <div className="h-2.5 bg-gray-300 rounded-full w-24"></div>
              <div className="h-2.5 bg-gray-200 rounded-full w-full"></div>
            </div>
            <div className="flex items-center w-full space-x-2 max-w-[360px]">
              <div className="h-2.5 bg-gray-300 rounded-full w-full"></div>
              <div className="h-2.5 bg-gray-200 rounded-full w-80"></div>
              <div className="h-2.5 bg-gray-300 rounded-full w-full"></div>
            </div>
            <span className="sr-only">Loading...</span>
          </div>
        ))}
      </div>
    </Container>
  </section>
)
