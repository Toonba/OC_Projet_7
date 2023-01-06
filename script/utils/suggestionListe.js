// DOM Element
const ingredientsSuggestion = document.getElementsByClassName('suggestion-ingredients')
const appareilsSuggestion = document.getElementsByClassName('suggestion-appareils')
const ustensilsSuggestion = document.getElementsByClassName('suggestion-ustensils')
const researchTagSection = document.getElementsByClassName('research-tag')

// Function to get an array without any element repeted
function getListOfUnique(array) {
  let newArray = []
  for (let i = 0; i < array.length; i++) {
    if (array.indexOf(array[i]) === i) {
      newArray.push(array[i])
    }
  }
  return newArray
}

// function that give the list of unique ingredient within the array
let listUniqueIngredients = []
function getListIngredients(array) {
  const listAllIngredients = []
  listUniqueIngredients = []
  for (let element of array) {
    for (let ingredient of element.ingredients) {
      listAllIngredients.push(ingredient.ingredient.toLowerCase())
    }
  }
  listUniqueIngredients = getListOfUnique(listAllIngredients)
  return listUniqueIngredients
}

// function that give the list of unique appareils within the array
let listUniqueAppareils = []
function getListAppareils(array) {
  const listAllAppareils = []
  for (let element of array) {
    listAllAppareils.push(element.appliance.toLowerCase())
  }
  listUniqueAppareils = getListOfUnique(listAllAppareils)
  return listUniqueAppareils
}

// function that give the list of unique ustensils within the array
let listUniqueUstensils = []
function getListUstensils(array) {
  let listAllUstensils = []
  for (let element of array) {
    for (let ustensil of element.ustensils) {
      listAllUstensils.push(ustensil.toLowerCase())
    }
  }
  listUniqueUstensils = getListOfUnique(listAllUstensils)
  return listUniqueUstensils
}
getListIngredients(recipes)
getListAppareils(recipes)
getListUstensils(recipes)
// Get array of recipes in fonction of ingr appli and usten

let recipesByIngredient = []
for (let ingredient of listUniqueIngredients) {
  let recipeId = []
  for (let i = 0; i < recipes.length; i++) {
    for (j = 0; j < recipes[i].ingredients.length; j++) {
      if (recipes[i].ingredients[j].ingredient.toLowerCase() === ingredient) {
        recipeId.push(recipes[i].id)
      }
    }
  }
  let obj = { ingredients: ingredient, 'recipe id': recipeId }
  recipesByIngredient.push(obj)
}
console.log(recipesByIngredient)

let recipesByAppareil = []
for (let appareil of listUniqueAppareils) {
  let recipeId = []
  for (let i = 0; i < recipes.length; i++) {
    if (recipes[i].appliance.toLowerCase() === appareil) {
      recipeId.push(recipes[i].id)
    }
  }
  let obj = { appareil: appareil, 'recipe id': recipeId }
  recipesByAppareil.push(obj)
}

let recipesByUstensils = []
for (let ustensil of listUniqueUstensils) {
  let recipeId = []
  for (let i = 0; i < recipes.length; i++) {
    for (j = 0; j < recipes[i].ustensils.length; j++) {
      if (recipes[i].ustensils[j].toLowerCase() === ustensil) {
        recipeId.push(recipes[i].id)
      }
    }
  }
  let obj = { ustensils: ustensil, 'recipe id': recipeId }
  recipesByUstensils.push(obj)
}

// Faudra potentiellement mettre ça ailleurs et le faire d'une autre façon, ça sera probablement mieux
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
