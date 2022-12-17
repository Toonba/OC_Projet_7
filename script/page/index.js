// async function getRecipes() {
//   const response = await fetch('./data/recipes.json')
//   return response.json()
// }

const recipesSection = document.getElementsByClassName('recipes-gallery')
function displayRecipes(recipes) {
  recipes.forEach((recipe) => {
    const recipeTemplate = recipeFactory(recipe)
    const recipeCardDOM = recipeTemplate.getRecipeCardDOM()
    recipesSection[0].appendChild(recipeCardDOM)
  })
}

function init() {
  console.log(recipesSection)
  displayRecipes(recipes)
}

init()
