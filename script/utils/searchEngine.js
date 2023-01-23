// conseil de chatGPT pour améliorer mon code

// Séparer les fonctions logiques dans des fichiers séparés : pour cela tu peux créer un nouveau fichier pour chaque fonction logique (par exemple, un fichier mainSearch.js pour la fonction mainSearch) et y déplacer le code de cette fonction. Ensuite, dans le fichier principal (searchEngine.js), tu peux importer ces fonctions à l'aide de l'instruction import de JavaScript.

// Utiliser des noms de variables plus explicites : tu peux changer les noms de variables pour qu'ils soient plus explicites (par exemple, recipesArray pour remplacer array dans la fonction mainSearch).

// Utiliser des commentaires pour expliquer le code : tu peux ajouter des commentaires pour expliquer ce que font les différentes parties de ton code. Il est important de les mettre à des endroits pertinents pour que les personnes qui lisent ton code puissent comprendre ce que tu essaies de faire.

// Utiliser des constantes plutôt que des variables pour les éléments du DOM : tu peux remplacer toutes les variables qui stockent des éléments du DOM par des constantes, pour éviter les erreurs potentielles.

// Utiliser des fonctions pour répéter des actions similaires : tu peux créer une fonction displaySuggestion pour afficher les suggestions pour les ingrédients, les appareils et les ustensiles. Cette fonction prend en paramètre les données à afficher et le type de suggestion (ingrédients, appareils ou ustensiles) et se charge de l'affichage.

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
  let newArray = array.filter((element, index) => array.indexOf(element) === index)
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
  array.forEach((element) => {
    listAllAppareils.push(element.appliance.toLowerCase())
    element.ingredients.forEach((ingredient) => {
      listAllIngredients.push(ingredient.ingredient.toLowerCase())
    })
    element.ustensils.forEach((ustensil) => {
      listAllUstensils.push(ustensil.toLowerCase())
    })
  })
  listUniqueIngredients = getListOfUnique(listAllIngredients)
  listUniqueAppareils = getListOfUnique(listAllAppareils)
  listUniqueUstensils = getListOfUnique(listAllUstensils)
  displaySuggestion(listUniqueIngredients, 'ingredient')
  displaySuggestion(listUniqueUstensils, 'ustensil')
  displaySuggestion(listUniqueAppareils, 'appareil')
}

function mainSearch(input, array) {
  const currentSearch = input.value.toLowerCase()
  let currentRecipes = array
  if (currentSearch.length >= 3) {
    currentRecipes = array.filter(
      (recipe) =>
        recipe.name.toLowerCase().includes(currentSearch) ||
        recipe.description
          .toLowerCase()
          .replace(/[,.:;]/g, ' ')
          .includes(currentSearch) ||
        recipe.ingredients.some((ingredient) => ingredient.ingredient.toLowerCase().includes(currentSearch))
    )
  }
  displayRecipes(currentRecipes)
  getSuggestionList(currentRecipes)
  hiddingSuggestion()
  if (currentRecipes.length === 0) {
    let error = 'Aucune recette ne correspond à votre critère… vous pouvez chercher « tarte aux pommes », « poisson », etc'
    let p = document.createElement('p')
    p.textContent = error
    recipesSection[0].innerHTML = ''
    recipesSection[0].appendChild(p)
  }
  return currentRecipes
}

function getMatchingRecipe(arrayToTest, previousMatchingRecipes, recipeProperty) {
  return arrayToTest.reduce((newArray, element) => {
    previousMatchingRecipes = newArray.filter((recipe) => recipe[recipeProperty].some((prop) => (recipeProperty === 'ingredients' ? prop.ingredient.toLowerCase() === element : prop.toLowerCase() === element)))
    return previousMatchingRecipes
  }, previousMatchingRecipes)
}

function advancedSearch(tag) {
  let currentRecipes = mainSearch(mainSearchInput, recipes)
  let advancedRecipesAppareils = tag.appareils.length === 0 ? currentRecipes : currentRecipes.filter((recipe) => recipe.appliance.toLowerCase() === tag.appareils[0])
  let advancedRecipesIngredients = tag.ingredients.length === 0 ? advancedRecipesAppareils : getMatchingRecipe(tag.ingredients, advancedRecipesAppareils, 'ingredients')
  let advancedRecipesUstensils = tag.ustensils.length === 0 ? advancedRecipesIngredients : getMatchingRecipe(tag.ustensils, advancedRecipesIngredients, 'ustensils')
  console.log(advancedRecipesIngredients)
  console.log(advancedRecipesUstensils)
  getSuggestionList(advancedRecipesUstensils)
  displayRecipes(advancedRecipesUstensils)
}

function advancedSearchTag(input, array, DOM, type) {
  const currentAdvancedSearch = input.value.toLowerCase()
  let currentSuggestion = array.filter((element) => element.toLowerCase().includes(currentAdvancedSearch))
  DOM.innerHTML = ''
  if (currentSuggestion.length === 0) {
    DOM.innerHTML = 'Aucune suggestion ne correspond à votre recherche'
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
      advancedSearchTag(input, listUniqueIngredients, ingredientsSuggestion[0], 'ingredient')
    } else if (input === appareilsInput) {
      advancedSearchTag(input, listUniqueAppareils, appareilsSuggestion[0], 'appareil')
    } else if (input === ustensilsInput) {
      advancedSearchTag(input, listUniqueUstensils, ustensilsSuggestion[0], 'ustensil')
    }
  })
})
