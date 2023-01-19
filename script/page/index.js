function displayRecipes(array) {
  recipesSection[0].innerHTML = ''
  array.forEach((element) => {
    const recipeTemplate = recipeFactory(element)
    const recipeCardDOM = recipeTemplate.getRecipeCardDOM()
    recipesSection[0].appendChild(recipeCardDOM)
  })
}

function init() {
  displayRecipes(recipes)
  getSuggestionList(recipes)
}

init()
