// DOM Element
const mainSearchInput = document.getElementById('search')
const recipesSection = document.getElementsByClassName('recipes-gallery')
const ingredientsSuggestion = document.getElementsByClassName('suggestion-ingredients')
const appareilsSuggestion = document.getElementsByClassName('suggestion-appareils')
const ustensilsSuggestion = document.getElementsByClassName('suggestion-ustensils')
const ingredientsInput = document.getElementById('search-filter-ingredients')
const appareilsInput = document.getElementById('search-filter-appareils')
const ustensilsInput = document.getElementById('search-filter-ustensils')

let myAdvancedInput = [ingredientsInput, appareilsInput, ustensilsInput]

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

// function that give the list of unique Ingredient, Appareils and Ustensils within an array and display it in the related suggestion field
let listUniqueAppareils = []
let listUniqueIngredients = []
let listUniqueUstensils = []
function getSuggestionList(array) {
  let listAllIngredients = []
  listUniqueIngredients = []
  let listAllAppareils = []
  listUniqueAppareils = []
  let listAllUstensils = []
  listUniqueUstensils = []
  for (let element of array) {
    listAllAppareils.push(element.appliance.toLowerCase())
    for (let ingredient of element.ingredients) {
      listAllIngredients.push(ingredient.ingredient.toLowerCase())
    }
    for (let ustensil of element.ustensils) {
      listAllUstensils.push(ustensil.toLowerCase())
    }
  }
  listUniqueIngredients = getListOfUnique(listAllIngredients)
  listUniqueAppareils = getListOfUnique(listAllAppareils)
  listUniqueUstensils = getListOfUnique(listAllUstensils)
  displaySuggestion(listUniqueIngredients, 'ingredient')
  displaySuggestion(listUniqueUstensils, 'ustensil')
  displaySuggestion(listUniqueAppareils, 'appareil')
}

// main search function allowing user to find a recipes for which is input is either contained in title, description or ingredient
function mainSearch(input, array) {
  let currentRecipes = array
  const currentSearch = input.value.toLowerCase()
  if (input.value.length >= 3) {
    currentRecipes = []
    for (let i = 0; i < array.length; i++) {
      if (array[i].name.toLowerCase().includes(currentSearch)) {
        currentRecipes.push(array[i])
      } else if (
        array[i].description
          .toLowerCase()
          .replace(/[,.:;]/g, ' ')
          .includes(currentSearch)
      ) {
        currentRecipes.push(array[i])
      } else {
        for (let j = 0; j < array[i].ingredients[j].length; j++) {
          if (array[i].ingredients[j].ingredient.toLowerCase().includes(currentSearch)) {
            currentRecipes.push(array[i])
          }
        }
      }
    }
  }
  displayRecipes(currentRecipes)
  getSuggestionList(currentRecipes)
  if (currentRecipes.length === 0) {
    let error = 'Aucune recette ne correspond à votre critère… vous pouvez chercher « tarte aux pommes », « poisson », etc'
    let p = document.createElement('p')
    p.textContent = error
    recipesSection[0].innerHTML = ''
    recipesSection[0].appendChild(p)
  }
  return currentRecipes
}

// Function that return an array of recipes matching specific parameters
// arrayToTest is either an array of ingredient or ustensils, previousMatchingRecipes is the array of recipes in which we want to check, and recipeProperty is either ingredient or ustenils.
function getMatchingRecipe(arrayToTest, previousMatchingRecipes, recipeProperty) {
  for (let element of arrayToTest) {
    newArray = []
    for (let recipe of previousMatchingRecipes) {
      for (let i = 0; i < recipe[recipeProperty].length; i++) {
        if (recipeProperty === 'ingredients') {
          if (element === recipe[recipeProperty][i].ingredient.toLowerCase()) {
            newArray.push(recipe)
          }
        } else {
          if (element === recipe[recipeProperty][i].toLowerCase()) {
            newArray.push(recipe)
          }
        }
      }
    }
    previousMatchingRecipes = newArray
  }
  return newArray
}

// Function that return an array of recipes matching the tag that user choose, the matching recipes are an intersection of all tag meaning that recipes must contain all the tag.
function advancedSearch(tag) {
  let currentRecipes = mainSearch(mainSearchInput, recipes)
  let advancedRecipesAppareils = []
  let advancedRecipesIngredients = []
  let advancedRecipesUstensils = []
  if (tag.appareils.length === 0) {
    advancedRecipesAppareils = currentRecipes
  } else {
    for (let recipe of currentRecipes) {
      if (tag.appareils[0] === recipe.appliance.toLowerCase()) {
        advancedRecipesAppareils.push(recipe)
      }
    }
  }
  if (tag.ingredients.length === 0) {
    advancedRecipesIngredients = advancedRecipesAppareils
  } else {
    advancedRecipesIngredients = getMatchingRecipe(tag.ingredients, advancedRecipesAppareils, 'ingredients')
  }
  if (tag.ustensils.length === 0) {
    advancedRecipesUstensils = advancedRecipesIngredients
  } else {
    advancedRecipesUstensils = getMatchingRecipe(tag.ustensils, advancedRecipesIngredients, 'ustensils')
  }
  getSuggestionList(advancedRecipesUstensils)
  displayRecipes(advancedRecipesUstensils)
}

// function that allow user to find tag by typing in the advanced searchbar
function advancedSearchTag(input, array, type) {
  const currentAdvancedSearch = input.value.toLowerCase()
  let currentSuggestion = []
  for (let element of array) {
    if (element.toLowerCase().includes(currentAdvancedSearch)) {
      currentSuggestion.push(element)
    }
  }
  displaySuggestion(currentSuggestion, type)
}

// Event listener
mainSearchInput.addEventListener('keyup', (e) => {
  mainSearch(mainSearchInput, recipes)
})

myAdvancedInput.forEach((input) => {
  input.addEventListener('keyup', (e) => {
    if (input === ingredientsInput) {
      advancedSearchTag(input, listUniqueIngredients, 'ingredient')
    } else if (input === appareilsInput) {
      advancedSearchTag(input, listUniqueAppareils, 'appareil')
    } else if (input === ustensilsInput) {
      advancedSearchTag(input, listUniqueUstensils, 'ustensil')
    }
  })
})
