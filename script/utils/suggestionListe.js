// DOM Element
const ingredientsSuggestion = document.getElementsByClassName('suggestion-ingredients')
const appareilsSuggestion = document.getElementsByClassName('suggestion-appareils')
const ustensilsSuggestion = document.getElementsByClassName('suggestion-ustensils')

// Get List of Ingredient
const listAllIngredients = []
recipes.forEach((recipe) => {
  recipes.forEach((recipe) => {
    recipe.ingredients.forEach((item) => {
      listAllIngredients.push(item.ingredient)
    })
  })
})
const listUniqueIngredients = listAllIngredients.filter((element, position) => listAllIngredients.indexOf(element) === position)

listUniqueIngredients.forEach((element) => {
  const newItem = document.createElement('li')
  newItem.setAttribute('tabindex', '0')
  newItem.textContent = element
  ingredientsSuggestion[0].appendChild(newItem)
})

// get list of appareils
const listAllAppareils = []
recipes.forEach((recipe) => {
  listAllAppareils.push(recipe.appliance)
})
const listUniqueAppareils = listAllAppareils.filter((element, position) => listAllAppareils.indexOf(element) === position)
listUniqueAppareils.forEach((element) => {
  const newItem = document.createElement('li')
  newItem.setAttribute('tabindex', '0')
  newItem.textContent = element
  appareilsSuggestion[0].appendChild(newItem)
})

// get list of ustensils
const listAllUstensils = []
recipes.forEach((recipe) => {
  recipe.ustensils.forEach((item) => {
    listAllUstensils.push(item)
  })
})
const listUniqueUstensils = listAllUstensils.filter((element, position) => listAllUstensils.indexOf(element) === position)
listUniqueUstensils.forEach((element) => {
  const newItem = document.createElement('li')
  newItem.setAttribute('tabindex', '0')
  newItem.textContent = element
  ustensilsSuggestion[0].appendChild(newItem)
})
