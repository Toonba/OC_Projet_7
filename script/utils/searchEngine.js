const mainSearchInput = document.getElementById('search')

let currentRecipes = recipes
// Function that display recipes matching user input (if user input.length >3, else he display all recipes)) + modify the list of suggestion for each advanced search so that it suggest only ingredients, appareils or ustensils that are within the remaining recipes folowing main search.
function mainSearch(searchInputValue) {
  let currentSearch = ''
  if (searchInputValue.length < 3) {
    currentRecipes = recipes
  }
  if (searchInputValue.length >= 3) {
    currentRecipes = []
    currentSearch = searchInputValue.toLowerCase()
    recipes.forEach((recipe) => {
      if (
        recipe.name.toLowerCase().includes(currentSearch) ||
        recipe.description.toLowerCase().includes(currentSearch) ||
        recipe.ingredients.forEach((item) => {
          item.ingredient.toLowerCase().includes(currentSearch)
        })
      ) {
        currentRecipes.push(recipe)
      }
    })
  }
  recipesSection[0].innerHTML = ''
  displayRecipes(currentRecipes)
  getListIngredients(currentRecipes)
  getListAppareils(currentRecipes)
  getListUstensils(currentRecipes)
  return currentRecipes
}

mainSearchInput.addEventListener('keyup', (e) => {
  mainSearch(mainSearchInput.value)
})

function advancedFilter(suggestion) {
  let advancedSearch = ''
  let advancedRecipes = []
  if (suggestion.parentNode.classList[1] === 'suggestion-ingredients') {
    currentRecipes.forEach((recipe) => {
      recipe.ingredients.forEach((element) => {
        if (element.ingredient.toLowerCase().includes(suggestion.textContent.toLowerCase())) {
          advancedRecipes.push(recipe)
        }
      })
    })
  } else if (suggestion.parentNode.classList[1] === 'suggestion-appareils') {
    currentRecipes.forEach((recipe) => {
      if (recipe.appliance.toLowerCase().includes(suggestion.textContent.toLowerCase())) {
        advancedRecipes.push(recipe)
      }
    })
  } else if (suggestion.parentNode.classList[1] === 'suggestion-ustensils') {
    currentRecipes.forEach((recipe) => {
      recipe.ustensils.forEach((item) => {
        if (item.toLowerCase().includes(suggestion.textContent.toLowerCase())) {
          advancedRecipes.push(recipe)
        }
      })
    })
  }
  recipesSection[0].innerHTML = ''
  displayRecipes(advancedRecipes)
  getListIngredients(advancedRecipes)
  getListAppareils(advancedRecipes)
  getListUstensils(advancedRecipes)
  return advancedRecipes
}
