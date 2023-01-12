function displayRecipes(array) {
  array.forEach((element) => {
    const recipeTemplate = recipeFactory(element)
    const recipeCardDOM = recipeTemplate.getRecipeCardDOM()
    recipesSection[0].appendChild(recipeCardDOM)
  })
}

function init() {
  displayRecipes(recipes)
  getListIngredients(recipes)
  getListAppareils(recipes)
  getListUstensils(recipes)
  displaySuggestion(listUniqueIngredients, 'ingredient')
  displaySuggestion(listUniqueAppareils, 'appareil')
  displaySuggestion(listUniqueUstensils, 'ustensil')
}

init()
