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

function getListOfMultiple(array) {
  let newArray = []
  for (let i = 0; i < array.length; i++) {
    if (array.indexOf(array[i]) !== i) {
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
let recipesByIngredient = []
function getListUstensils(array) {
  let listAllUstensils = []
  for (let element of array) {
    for (let ustensil of element.ustensils) {
      listAllUstensils.push(ustensil.toLowerCase())
    }
  }
  listUniqueUstensils = getListOfUnique(listAllUstensils)
  getRecipesByIngredient(listUniqueIngredients)
  return listUniqueUstensils
}
// Get array of recipes in fonction of ingr appli and usten

function getRecipesByIngredient(array) {
  for (let ingredient of array) {
    let recipeId = []
    for (let i = 0; i < recipes.length; i++) {
      for (j = 0; j < recipes[i].ingredients.length; j++) {
        if (recipes[i].ingredients[j].ingredient.toLowerCase() === ingredient) {
          recipeId.push(recipes[i].id)
        }
      }
    }
    let obj = { ingredients: ingredient, recipeID: recipeId }
    recipesByIngredient.push(obj)
  }
}

let recipesByAppareil = []
for (let appareil of listUniqueAppareils) {
  let recipeId = []
  for (let i = 0; i < recipes.length; i++) {
    if (recipes[i].appliance.toLowerCase() === appareil) {
      recipeId.push(recipes[i].id)
    }
  }
  let obj = { appareil: appareil, recipeID: recipeId }
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
  let obj = { ustensils: ustensil, recipeID: recipeId }
  recipesByUstensils.push(obj)
}

for (let recipe of recipes) {
  let ingredientList = []
  recipe.ingredientList = []
  for (let i = 0; i < recipe.ingredients.length; i++) {
    ingredientList.push(recipe.ingredients[i].ingredient)
  }
  recipe.ingredientList = ingredientList.join(' ')
}
