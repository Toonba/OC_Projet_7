const mainSearchInput = document.getElementById('search')

// let currentSearch = ''
// let currentRecipes = []

// console.log(typeof recipes[0].ingredients[0].ingredient)
// console.log(typeof recipes[0].name)
// console.log(typeof recipes[0].description)

function mainSearch(searchInputValue) {
  let currentSearch = ''
  let currentRecipes = recipes
  if (searchInputValue.length >= 3) {
    currentRecipes = []
    currentSearch = searchInputValue.toLowerCase()
    recipes.forEach((recipe) => {
      if (
        recipe.name.toLowerCase().includes(currentSearch) ||
        recipe.description.includes(currentSearch) ||
        recipe.ingredients.forEach((item) => {
          item.ingredient.includes(currentSearch)
        })
      ) {
        currentRecipes.push(recipe)
      }
    })
  }
  console.log(currentRecipes)
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
