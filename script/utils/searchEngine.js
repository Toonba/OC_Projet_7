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

// function that give the list of unique ingredient within the array
// let listUniqueIngredients = []
// function getListIngredients(array) {
//   const listAllIngredients = []
//   listUniqueIngredients = []
//   for (let element of array) {
//     for (let ingredient of element.ingredients) {
//       listAllIngredients.push(ingredient.ingredient.toLowerCase())
//     }
//   }
//   listUniqueIngredients = getListOfUnique(listAllIngredients)
//   displaySuggestion(listUniqueIngredients, 'ingredient')
//   return listUniqueIngredients
// }
// function that give the list of unique appareils within the array
// let listUniqueAppareils = []
// function getListAppareils(array) {
//   const listAllAppareils = []
//   for (let element of array) {
//     listAllAppareils.push(element.appliance.toLowerCase())
//   }
//   listUniqueAppareils = getListOfUnique(listAllAppareils)
//   displaySuggestion(listUniqueAppareils, 'appareil')
//   return listUniqueAppareils
// }
// function that give the list of unique ustensils within the array
// let listUniqueUstensils = []
// function getListUstensils(array) {
//   let listAllUstensils = []
//   for (let element of array) {
//     for (let ustensil of element.ustensils) {
//       listAllUstensils.push(ustensil.toLowerCase())
//     }
//   }
//   listUniqueUstensils = getListOfUnique(listAllUstensils)
//   displaySuggestion(listUniqueUstensils, 'ustensil')
//   return listUniqueUstensils
// }

// function to display list of suggestion in the related fields
function displaySuggestion(array, type) {
  for (let element of array) {
    const newItem = document.createElement('li')
    newItem.setAttribute('tabindex', '0')
    newItem.textContent = element
    if (type === 'ingredient') {
      ingredientsSuggestion[0].appendChild(newItem)
    }
    if (type === 'appareil') {
      appareilsSuggestion[0].appendChild(newItem)
    }
    if (type === 'ustensil') {
      ustensilsSuggestion[0].appendChild(newItem)
    }
  }
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

function mainSearch(input, array) {
  let currentSearch = ''
  let currentRecipes = []
  if (input.value.length < 3) {
    currentRecipes = recipes
  } else if (input.value.length >= 3) {
    currentSearch = input.value.toLowerCase()
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
      }
      for (let j = 0; j < array[i].ingredients[j].length; j++) {
        if (array[i].ingredients[j].ingredient.toLowerCase().includes(currentSearch)) {
          currentRecipes.push(array[i])
        }
      }
    }
  }
  recipesSection[0].innerHTML = ''
  ingredientsSuggestion[0].innerHTML = ''
  appareilsSuggestion[0].innerHTML = ''
  ustensilsSuggestion[0].innerHTML = ''
  displayRecipes(currentRecipes)
  getSuggestionList(currentRecipes)
  return currentRecipes
}

// function advancedSearch(tag) {
//   let currentRecipes = mainSearch(mainSearchInput, recipes)
//   let advancedRecipesAppareils = []
//   let advancedRecipesIngredients = []
//   let advancedRecipesUstensils = []
//   if (tag.appareils.length > 1) {
//     recipesSection[0].innerHTML = 'aucune recette ne correspond à votre recherche'
//   } else {
//     if (tag.appareils.length === 0) {
//       advancedRecipesAppareils = currentRecipes
//     } else {
//       for (let recipe of currentRecipes) {
//         if (tag.appareils[0] === recipe.appliance.toLowerCase()) {
//           advancedRecipesAppareils.push(recipe)
//         }
//       }
//     }
//     if (tag.ingredients.length === 0) {
//       advancedRecipesIngredients = advancedRecipesAppareils
//     } else {
//       for (let ingredient of tag.ingredients) {
//         advancedRecipesIngredients = []
//         for (let recipe of advancedRecipesAppareils) {
//           for (let i = 0; i < recipe.ingredients.length; i++) {
//             if (ingredient === recipe.ingredients[i].ingredient.toLowerCase()) {
//               advancedRecipesIngredients.push(recipe)
//             }
//           }
//         }
//         advancedRecipesAppareils = advancedRecipesIngredients
//       }
//     }
//     if (tag.ustensils.length === 0) {
//       advancedRecipesUstensils = advancedRecipesIngredients
//     } else {
//       for (let ustensil of tag.ustensils) {
//         advancedRecipesUstensils = []
//         for (let recipe of advancedRecipesIngredients) {
//           for (i = 0; i < recipe.ustensils.length; i++) {
//             if (ustensil === recipe.ustensils[i].toLowerCase()) {
//               advancedRecipesUstensils.push(recipe)
//             }
//           }
//         }
//         advancedRecipesIngredients = advancedRecipesUstensils
//       }
//     }
//   }
//   recipesSection[0].innerHTML = ''
//   ingredientsSuggestion[0].innerHTML = ''
//   appareilsSuggestion[0].innerHTML = ''
//   ustensilsSuggestion[0].innerHTML = ''
//   getSuggestionList(advancedRecipesUstensils)
//   if (advancedRecipesUstensils.length === 0) {
//     recipesSection[0].innerHTML = 'aucune recette ne correspond à votre recherche'
//   } else {
//     displayRecipes(advancedRecipesUstensils)
//   }
// }

// VERSION ALTERNATIVE de advancedSearch(tag)
function getMatchingRecipe(arrayToTest, matchingRecipes, previousMatchingRecipes, recipeProperty) {
  for (let element of arrayToTest) {
    console.log('coucou getMatching Recipes')
    matchingRecipes = []
    for (let recipe of previousMatchingRecipes) {
      for (let i = 0; i < recipe[recipeProperty].length; i++) {
        if (recipeProperty === 'ingredients') {
          if (element === recipe[recipeProperty][i].ingredient.toLowerCase()) {
            matchingRecipes.push(recipe)
          }
        } else {
          if (element === recipe[recipeProperty][i].toLowerCase()) {
            matchingRecipes.push(recipe)
          }
        }
      }
    }
    previousMatchingRecipes = matchingRecipes
    // if (arrayToTest.length === 1) {
    //   console.log('coucou break getmatchingrecipes')
    //   break
    //}
  }
  console.log(matchingRecipes)
  return matchingRecipes
}

function advancedSearch(tag) {
  let currentRecipes = mainSearch(mainSearchInput, recipes)
  let advancedRecipesAppareils = []
  let advancedRecipesIngredients = []
  let advancedRecipesUstensils = []
  if (tag.appareils.length > 1) {
    recipesSection[0].innerHTML = 'aucune recette ne correspond à votre recherche'
  } else {
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
      console.log('coucou ingredient')
      console.log(getMatchingRecipe(tag.ingredients, advancedRecipesIngredients, advancedRecipesAppareils, 'ingredients'))
      getMatchingRecipe(tag.ingredients, advancedRecipesIngredients, advancedRecipesAppareils, 'ingredients')
      console.log(advancedRecipesIngredients)
    }
    if (tag.ustensils.length === 0) {
      console.log("coucou pas d'ustensil dans les tag")
      advancedRecipesUstensils = advancedRecipesIngredients
    } else {
      console.log('coucou ustensils')
      getMatchingRecipe(tag.ustensils, advancedRecipesUstensils, advancedRecipesIngredients, 'ustensils')
    }
  }
  console.log(advancedRecipesUstensils)
  recipesSection[0].innerHTML = ''
  ingredientsSuggestion[0].innerHTML = ''
  appareilsSuggestion[0].innerHTML = ''
  ustensilsSuggestion[0].innerHTML = ''
  getSuggestionList(advancedRecipesUstensils)
  if (advancedRecipesUstensils.length === 0) {
    recipesSection[0].innerHTML = 'aucune recette ne correspond à votre recherche'
  } else {
    displayRecipes(advancedRecipesUstensils)
  }
}

// VERSION ALTERNATIVE de advancedSearchTag
// function advancedSearchTag(input) {
//   const currentAdvancedSearch = input.value.toLowerCase()
//   let currentSuggestion = []
//   if (input === ingredientsInput) {
//     for (let ingredient of listUniqueIngredients) {
//       if (ingredient.toLowerCase().includes(currentAdvancedSearch)) {
//         currentSuggestion.push(ingredient)
//       }
//     }
//     ingredientsSuggestion[0].innerHTML = ''
//     if (currentSuggestion.length === 0) {
//       ingredientsSuggestion[0].innerHTML = 'Aucune suggestion ne correspond à votre recherche'
//     }
//     displaySuggestion(currentSuggestion, 'ingredient')
//   } else if (input === appareilsInput) {
//     for (let appareil of listUniqueAppareils) {
//       if (appareil.toLowerCase().includes(currentAdvancedSearch)) {
//         currentSuggestion.push(appareil)
//       }
//     }
//     appareilsSuggestion[0].innerHTML = ''
//     if (currentSuggestion.length === 0) {
//       appareilsSuggestion[0].innerHTML = 'Aucune suggestion ne correspond à votre recherche'
//     }
//     displaySuggestion(currentSuggestion, 'appareil')
//   } else if (input === ustensilsInput) {
//     for (let ustensil of listUniqueUstensils) {
//       if (ustensil.toLowerCase().includes(currentAdvancedSearch)) {
//         currentSuggestion.push(ustensi)
//       }
//     }
//     ustensilsSuggestion[0].innerHTML = ''
//     if (currentSuggestion.length === 0) {
//       ustensilsSuggestion[0].innerHTML = 'Aucune suggestion ne correspond à votre recherche'
//     }
//     displaySuggestion(currentSuggestion, 'appareil')
//   }
// }

// myAdvancedInput.forEach((input) => {
//   input.addEventListener('keyup', (e) => {
//     advancedSearchTag(input)
//   })
// })

function advancedSearchTag(input, array, DOM, type) {
  const currentAdvancedSearch = input.value.toLowerCase()
  let currentSuggestion = []
  for (let element of array) {
    if (element.toLowerCase().includes(currentAdvancedSearch)) {
      currentSuggestion.push(element)
    }
  }
  DOM.innerHTML = ''
  if (currentSuggestion.length === 0) {
    DOM.innerHTML = 'Aucune suggestion ne correspond à votre recherche'
  }
  displaySuggestion(currentSuggestion, type)
}

mainSearchInput.addEventListener('keyup', (e) => {
  mainSearch(mainSearchInput, recipes)
})

myAdvancedInput.forEach((input) => {
  input.addEventListener('keyup', (e) => {
    if (input === ingredientsInput) {
      advancedSearchTag(input, listUniqueIngredients, ingredientsSuggestion[0], 'ingredient')
    } else if (input === appareilsInput) {
      advancedSearchTag(input, listUniqueAppareils, appareilsSuggestion[0], 'appareil')
    } else if (input === ustensilsInput) {
      advancedSearchTag(input, listUniqueUstensils, ustensilsSuggestion[0], 'ustensil')
    }
  })
})
