import { HomeRecipeQuery, HOME_RECIPE_QUERY } from '@/queries/recipe'
import { useQuery } from '@apollo/client'
import { RecipeCard } from '../RecipeCard'

export const HomeRecipes = () => {
  const { data } = useQuery<HomeRecipeQuery>(HOME_RECIPE_QUERY)

  return (
    <div className="relative bg-gray-50 px-6 pt-16 pb-20 lg:px-8 lg:pt-24 lg:pb-28">
      <div className="absolute inset-0">
        <div className="h-1/3 bg-white sm:h-2/3" />
      </div>
      <div className="relative mx-auto max-w-7xl">
        <div className="text-center">
          <h2 className="text-3xl font-bold tracking-tight text-primary-900 sm:text-4xl">
            Discover new recipes
          </h2>
          <p className="mx-auto mt-3 max-w-2xl text-xl text-gray-500 sm:mt-4">
            These are last recipes. Check them out!
          </p>
        </div>
        <div className="mx-auto mt-12 grid max-w-lg gap-5 lg:max-w-none lg:grid-cols-3">
          {data &&
            data.recipesCollection.items.map((recipe) => (
              <RecipeCard recipe={recipe} key={recipe.title} />
            ))}
        </div>
      </div>
    </div>
  )
}
