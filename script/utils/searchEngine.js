const mainSearchInput = document.getElementById('search')
const ingredientsSearchInput = document.getElementById('search-filter-ingredients')
const appareilsSearchInput = document.getElementById('search-filter-appareils')
const ustensilsSearchInput = document.getElementById('search-filter-ustensils')

const myAdvancedSearchInput = [ingredientsSearchInput, appareilsSearchInput, ustensilsSearchInput]

let currentMainSearch = recipes
// Function that display recipes matching user input (if user input.length >3, else he display all recipes)) + modify the list of suggestion for each advanced search so that it suggest only ingredients, appareils or ustensils that are within the remaining recipes folowing main search.
function mainSearch(searchInput) {
  let currentSearch = ''
  if (searchInput.value.length < 3) {
    currentMainSearch = recipes
  }
  if (searchInput.value.length >= 3) {
    currentRecipes = []
    currentSearch = searchInput.value.toLowerCase()
    currentMainSearch = recipes.filter((element) => element.name.toLowerCase().includes(currentSearch) || element.description.toLowerCase().includes(currentSearch) || element.ingredients.toLowerCase().includes(currentSearch))
  }
  recipesSection[0].innerHTML = ''
  displayRecipes(currentMainSearch)
  getListIngredients(currentMainSearch)
  getListAppareils(currentMainSearch)
  getListUstensils(currentMainSearch)
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

function advancedFilterV2(tagArray) {
  currentRecipes = currentMainSearch
  if (tagArray.length === 0) {
    currentRecipes = currentMainSearch
  } else {
    tagArray.forEach((element) => {
      if (element.class === 'ingredients-tag') {
        advancedRecipes = currentRecipes.filter((recipe) => recipe.ingredients.some((item) => item.ingredient.toLowerCase().includes(element.text.toLowerCase())))
      } else if (element.class === 'appareils-tag') {
        advancedRecipes = currentRecipes.filter((recipe) => recipe.appliance.toLowerCase().includes(element.text.toLowerCase()))
      } else if (element.class === 'ustensils-tag') {
        advancedRecipes = currentRecipes.filter((recipe) => recipe.ustensils.some((item) => item.toLowerCase().includes(element.text.toLowerCase())))
      }
      currentRecipes = advancedRecipes
    })
  }
  recipesSection[0].innerHTML = ''
  displayRecipes(currentRecipes)
  getListIngredients(currentRecipes)
  getListAppareils(currentRecipes)
  getListUstensils(currentRecipes)
}
let advancedRecipes = []
function advancedFilter(tagclass, suggestion) {
  advancedRecipes = []
  if (tagclass === 'ingredients-tag') {
    // voir pour mettre la fonction filter dans un fonction "a part" plutôt que de tous écrire ici
    // forEach Map Recue FIlter refaire fonction de dessous en utilisant uniquement ceux-ci très probablement utilisé tableau intermédiaire
    advancedRecipes = currentRecipes.filter((element) => element.ingredients.some((item) => item.ingredient.toLowerCase().includes(suggestion.toLowerCase())))
    console.log(Array.prototype.some)
  } else if (tagclass === 'appareils-tag') {
    advancedRecipes = currentRecipes.filter((element) => element.appliance.toLowerCase().includes(suggestion.toLowerCase()))
  } else if (tagclass === 'ustensils-tag') {
    advancedRecipes = currentRecipes.filter((element) => element.ustensils.includes(suggestion.toLowerCase()))
  }
  recipesSection[0].innerHTML = ''
  displayRecipes(advancedRecipes)
  getListIngredients(advancedRecipes)
  getListAppareils(advancedRecipes)
  getListUstensils(advancedRecipes)
  return advancedRecipes
}

