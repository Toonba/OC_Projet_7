const mainSearchInput = document.getElementById('search')
const ingredientsSearchInput = document.getElementById('search-filter-ingredients')
const appareilsSearchInput = document.getElementById('search-filter-appareils')
const ustensilsSearchInput = document.getElementById('search-filter-ustensils')

const myAdvancedSearchInput = [ingredientsSearchInput, appareilsSearchInput, ustensilsSearchInput]

let currentRecipes = recipes
// Function that display recipes matching user input (if user input.length >3, else he display all recipes)) + modify the list of suggestion for each advanced search so that it suggest only ingredients, appareils or ustensils that are within the remaining recipes folowing main search.
function mainSearch(searchInput) {
  let currentSearch = ''
  if (searchInput.value.length < 3) {
    currentRecipes = recipes
  }
  if (searchInput.value.length >= 3) {
    currentRecipes = []
    currentSearch = searchInput.value.toLowerCase()
    currentRecipes = recipes.filter(
      (element) =>
        element.name.toLowerCase().includes(currentSearch) ||
        element.description.toLowerCase().includes(currentSearch) ||
        element.ingredients.forEach((item) => {
          item.ingredient.toLowerCase().includes(currentSearch)
        })
    )
  }
  recipesSection[0].innerHTML = ''
  displayRecipes(currentRecipes)
  getListIngredients(currentRecipes)
  getListAppareils(currentRecipes)
  getListUstensils(currentRecipes)
  return currentRecipes
}

function advancedSearch(searchInput) {
  const currentAdvancedSearch = searchInput.value.toLowerCase()
  let currentSuggestion = []
  if (searchInput === ingredientsSearchInput) {
    currentSuggestion = listUniqueIngredients.filter((element) => element.toLowerCase().includes(currentAdvancedSearch))
    displayIngredientsSuggestion(currentSuggestion)
  } else if (searchInput === appareilsSearchInput) {
    currentSuggestion = listUniqueAppareils.filter((element) => element.toLowerCase().includes(currentAdvancedSearch))
    displayAppareilsSuggestion(currentSuggestion)
  } else if (searchInput === ustensilsSearchInput) {
    currentSuggestion = listUniqueUstensils.filter((element) => element.toLowerCase().includes(currentAdvancedSearch))
    displayUstensilsSuggestion(currentSuggestion)
  }
}

mainSearchInput.addEventListener('keyup', (e) => {
  mainSearch(mainSearchInput)
})

myAdvancedSearchInput.forEach((input) => {
  input.addEventListener('keyup', (e) => {
    advancedSearch(input)
  })
})

let advancedRecipes = []
function advancedFilter(suggestion) {
  let advancedSearch = ''
  advancedRecipes = []
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
