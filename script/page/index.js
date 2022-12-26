const recipesSection = document.getElementsByClassName('recipes-gallery')
function displayRecipes(array) {
  array.forEach((element) => {
    const recipeTemplate = recipeFactory(element)
    const recipeCardDOM = recipeTemplate.getRecipeCardDOM()
    recipesSection[0].appendChild(recipeCardDOM)
  })
}

function init() {
  displayRecipes(recipes)
}

init()
