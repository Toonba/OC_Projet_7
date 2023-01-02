// DOM Element
const ingredientsSuggestion = document.getElementsByClassName('suggestion-ingredients')
const appareilsSuggestion = document.getElementsByClassName('suggestion-appareils')
const ustensilsSuggestion = document.getElementsByClassName('suggestion-ustensils')
const researchTagSection = document.getElementsByClassName('research-tag')

// Get List of Ingredient

// function that give the list of unique ingredient within the array
let listUniqueIngredients = []
function getListIngredients(array) {
  const listAllIngredients = []
  listUniqueIngredients = []
  array.forEach((element) => {
    element.ingredients.forEach((item) => {
      listAllIngredients.push(item.ingredient.toLowerCase())
    })
  })
  listUniqueIngredients = listAllIngredients.filter((element, position) => listAllIngredients.indexOf(element) === position)
  displayIngredientsSuggestion(listUniqueIngredients)
  return listUniqueIngredients
}

// function that give the list of unique appareils within the array
let listUniqueAppareils = []
function getListAppareils(array) {
  const listAllAppareils = []
  array.forEach((element) => {
    listAllAppareils.push(element.appliance.toLowerCase())
  })
  listUniqueAppareils = listAllAppareils.filter((element, position) => listAllAppareils.indexOf(element) === position)
  displayAppareilsSuggestion(listUniqueAppareils)
  return listUniqueAppareils
}

// function that give the list of unique ustensils within the array
let listUniqueUstensils = []
function getListUstensils(array) {
  const listAllUstensils = []
  array.forEach((element) => {
    element.ustensils.forEach((item) => {
      listAllUstensils.push(item.toLowerCase())
    })
  })
  listUniqueUstensils = listAllUstensils.filter((element, position) => listAllUstensils.indexOf(element) === position)
  displayUstensilsSuggestion(listUniqueUstensils)
  return listUniqueUstensils
}

function displayIngredientsSuggestion(array) {
  ingredientsSuggestion[0].innerHTML = ''
  array.forEach((element) => {
    const newItem = document.createElement('li')
    newItem.setAttribute('tabindex', '0')
    newItem.textContent = element
    ingredientsSuggestion[0].appendChild(newItem)
  })
}

function displayAppareilsSuggestion(array) {
  appareilsSuggestion[0].innerHTML = ''
  array.forEach((element) => {
    const newItem = document.createElement('li')
    newItem.setAttribute('tabindex', '0')
    newItem.textContent = element
    appareilsSuggestion[0].appendChild(newItem)
  })
}

function displayUstensilsSuggestion(array) {
  ustensilsSuggestion[0].innerHTML = ''
  array.forEach((element) => {
    const newItem = document.createElement('li')
    newItem.setAttribute('tabindex', '0')
    newItem.textContent = element
    ustensilsSuggestion[0].appendChild(newItem)
  })
}

getListIngredients(recipes)
getListAppareils(recipes)
getListUstensils(recipes)
