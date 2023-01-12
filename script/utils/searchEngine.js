const mainSearchInput = document.getElementById('search')
const recipesSection = document.getElementsByClassName('recipes-gallery')

// Pour la main faire en sorte de chercher dans la description si ok recette suivante, sinon dans le nom, et sinon dans les ingredients

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
  displayRecipes(currentRecipes)
  return currentRecipes
}

mainSearchInput.addEventListener('keyup', (e) => {
  mainSearch(mainSearchInput, recipes)
})

// Faire une fonction qui va prendre comme paramettre un objet (constitué des tag), il va checker les rectte qui comprend tous les ingredient, puis sur ces recettes il va chercher ceux qui ont l'appareil, et sur ces dernière recette il va chercher ceux qui ont les ustensils

// obj = {
//   ingredient:['lait de coco', 'mangue', 'etc'],
//   appareils: 'blender',
//   ustensils:['cuillère à soupe', 'verre']
// }

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
    } else if (tag.appareils.length < 2) {
      for (let recipe of currentRecipes) {
        console.log(tag.appareils[0])
        console.log(recipe.appliance)
        if (tag.appareils[0] === recipe.appliance.toLowerCase()) {
          advancedRecipesAppareils.push(recipe)
        }
      }
    }
    if (tag.ingredients.length === 0) {
      advancedRecipesIngredients = advancedRecipesAppareils
    } else {
      for (let ingredient of tag.ingredients) {
        for (let recipe of advancedRecipesAppareils) {
          for (i = 0; i < recipe.ingredients.length; i++) {
            if (ingredient === recipe.ingredients[i].ingredient.toLowerCase()) {
              advancedRecipesIngredients.push(recipe)
            }
          }
        }
      }
    }
    if (tag.ustensils.length === 0) {
      advancedRecipesUstensils = advancedRecipesIngredients
    } else {
      for (let ustensil of tag.ustensils) {
        for (let recipe of advancedRecipesIngredients) {
          for (i = 0; i < recipe.ustensils.length; i++) {
            if (ustensil === recipe.ustensil[i].toLowerCase()) advancedRecipesUstensils.push(recipe)
          }
        }
      }
    }
    recipesSection[0].innerHTML = ''
    displayRecipes(advancedRecipesUstensils)
  }
}
// for (let )

// let allRecipesIDMatching = []
// for (element of array) {
//   if (element.class === 'ingredients-tag') {
//     for (let i = 0; i < recipesByIngredient.length; i++) {
//       if (element.text === recipesByIngredient[i].ingredients) {
//         for (let id of recipesByIngredient[i].recipeID) {
//           allRecipesIDMatching.push(id)
//         }
//       }
//     }
//   } else if (element.tagClass === 'appareils-tag') {
//   } else if (element.tagClass === 'ustensils-tag') {
//   }
// }
// let recipesMatchingSeveralTag = getListOfMultiple(allRecipesIDMatching)
// let recipesToKeep = console.log(allRecipesIDMatching)
// recipesSection[0].innerHTML = ''
// displayRecipes(advancedRecipes)
// console.log('coucou')
