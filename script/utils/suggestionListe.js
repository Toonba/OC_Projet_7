// DOM Element
const ingredientsSuggestion = document.getElementsByClassName('suggestion-ingredients')
const appareilsSuggestion = document.getElementsByClassName('suggestion-appareils')
const ustensilsSuggestion = document.getElementsByClassName('suggestion-ustensils')

// Get List of Ingredient

function getListIngredients(array) {
  const listAllIngredients = []
  let listUniqueIngredients = []
  array.forEach((element) => {
    element.ingredients.forEach((item) => {
      listAllIngredients.push(item.ingredient)
    })
  })
  listUniqueIngredients = listAllIngredients.filter((element, position) => listAllIngredients.indexOf(element) === position)
  ingredientsSuggestion[0].innerHTML = ''
  listUniqueIngredients.forEach((element) => {
    const newItem = document.createElement('li')
    newItem.setAttribute('tabindex', '0')
    newItem.textContent = element
    ingredientsSuggestion[0].appendChild(newItem)
  })
  return listUniqueIngredients
}

function getListAppareils(array) {
  const listAllAppareils = []
  let listUniqueAppareils = []
  array.forEach((element) => {
    listAllAppareils.push(element.appliance)
  })
  listUniqueAppareils = listAllAppareils.filter((element, position) => listAllAppareils.indexOf(element) === position)
  appareilsSuggestion[0].innerHTML = ''
  listUniqueAppareils.forEach((element) => {
    const newItem = document.createElement('li')
    newItem.setAttribute('tabindex', '0')
    newItem.textContent = element
    appareilsSuggestion[0].appendChild(newItem)
  })
  return listUniqueAppareils
}

function getListUstensils(array) {
  const listAllUstensils = []
  let listUniqueUstensils = []
  array.forEach((element) => {
    element.ustensils.forEach((item) => {
      listAllUstensils.push(item)
    })
  })
  listUniqueUstensils = listAllUstensils.filter((element, position) => listAllUstensils.indexOf(element) === position)
  ustensilsSuggestion[0].innerHTML = ''
  listUniqueUstensils.forEach((element) => {
    const newItem = document.createElement('li')
    newItem.setAttribute('tabindex', '0')
    newItem.textContent = element
    ustensilsSuggestion[0].appendChild(newItem)
  })
  return listUniqueUstensils
}

getListIngredients(recipes)
getListAppareils(recipes)
getListUstensils(recipes)
