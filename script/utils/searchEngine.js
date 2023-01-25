// DOM Element
const mainSearchInput = document.getElementById('search');
const recipesSection = document.getElementsByClassName('recipes-gallery');
const ingredientsSuggestion = document.getElementsByClassName('suggestion-ingredients');
const appareilsSuggestion = document.getElementsByClassName('suggestion-appareils');
const ustensilsSuggestion = document.getElementsByClassName('suggestion-ustensils');
const ingredientsInput = document.getElementById('search-filter-ingredients');
const appareilsInput = document.getElementById('search-filter-appareils');
const ustensilsInput = document.getElementById('search-filter-ustensils');

let myAdvancedInput = [ingredientsInput, appareilsInput, ustensilsInput];

// Function to get an array without any element repeted
function getListOfUnique(array) {
  let newArray = array.filter((element, index) => array.indexOf(element) === index);
  return newArray;
}

// function that give the list of unique Ingredient, Appareils and Ustensils within an array and display it in the related suggestion field
let listUniqueAppareils = [];
let listUniqueIngredients = [];
let listUniqueUstensils = [];
function getSuggestionList(array) {
  let listAllIngredients = [];
  listUniqueIngredients = [];
  let listAllAppareils = [];
  listUniqueAppareils = [];
  let listAllUstensils = [];
  listUniqueUstensils = [];
  array.forEach((element) => {
    listAllAppareils.push(element.appliance.toLowerCase());
    element.ingredients.forEach((ingredient) => {
      listAllIngredients.push(ingredient.ingredient.toLowerCase());
    });
    element.ustensils.forEach((ustensil) => {
      listAllUstensils.push(ustensil.toLowerCase());
    });
  });
  listUniqueIngredients = getListOfUnique(listAllIngredients);
  listUniqueAppareils = getListOfUnique(listAllAppareils);
  listUniqueUstensils = getListOfUnique(listAllUstensils);
  displaySuggestion(listUniqueIngredients, 'ingredient');
  displaySuggestion(listUniqueUstensils, 'ustensil');
  displaySuggestion(listUniqueAppareils, 'appareil');
}

// main search function allowing user to find a recipes for which is input is either contained in title, description or ingredient
function mainSearch(input, array) {
  const currentSearch = input.value.toLowerCase();
  let currentRecipes = array;
  if (currentSearch.length >= 3) {
    currentRecipes = array.filter(
      (recipe) =>
        recipe.name.toLowerCase().includes(currentSearch) ||
        recipe.description
          .toLowerCase()
          .replace(/[,.:;]/g, ' ')
          .includes(currentSearch) ||
        recipe.ingredients.some((ingredient) => ingredient.ingredient.toLowerCase().includes(currentSearch))
    );
  }
  displayRecipes(currentRecipes);
  getSuggestionList(currentRecipes);
  hiddingSuggestion();
  if (currentRecipes.length === 0) {
    const error = 'Aucune recette ne correspond à votre critère… vous pouvez chercher « tarte aux pommes », « poisson », etc';
    const p = document.createElement('p');
    p.textContent = error;
    recipesSection[0].innerHTML = '';
    recipesSection[0].appendChild(p);
  }
  return currentRecipes;
}

// Function that return an array of recipes matching specific parameters
// arrayToTest is either an array of ingredient or ustensils, previousMatchingRecipes is the array of recipes in which we want to check, and recipeProperty is either ingredient or ustenils.
function getMatchingRecipe(arrayToTest, previousMatchingRecipes, recipeProperty) {
  return arrayToTest.reduce((newArray, element) => {
    previousMatchingRecipes = newArray.filter((recipe) => recipe[recipeProperty].some((prop) => (recipeProperty === 'ingredients' ? prop.ingredient.toLowerCase() === element : prop.toLowerCase() === element)));
    return previousMatchingRecipes;
  }, previousMatchingRecipes);
}

// Function that return an array of recipes matching the tag that user choose, the matching recipes are an intersection of all tag meaning that recipes must contain all the tag.
function advancedSearch(tag) {
  let currentRecipes = mainSearch(mainSearchInput, recipes);
  let advancedRecipesAppareils = tag.appareils.length === 0 ? currentRecipes : currentRecipes.filter((recipe) => recipe.appliance.toLowerCase() === tag.appareils[0]);
  let advancedRecipesIngredients = tag.ingredients.length === 0 ? advancedRecipesAppareils : getMatchingRecipe(tag.ingredients, advancedRecipesAppareils, 'ingredients');
  let advancedRecipesUstensils = tag.ustensils.length === 0 ? advancedRecipesIngredients : getMatchingRecipe(tag.ustensils, advancedRecipesIngredients, 'ustensils');
  getSuggestionList(advancedRecipesUstensils);
  displayRecipes(advancedRecipesUstensils);
}

// function that allow user to find tag by typing in the advanced searchbar
function advancedSearchTag(input, array, DOM, type) {
  const currentAdvancedSearch = input.value.toLowerCase();
  let currentSuggestion = array.filter((element) => element.toLowerCase().includes(currentAdvancedSearch));
  DOM.innerHTML = '';
  if (currentSuggestion.length === 0) {
    DOM.innerHTML = 'Aucune suggestion ne correspond à votre recherche';
  }
  displaySuggestion(currentSuggestion, type);
}

// Event listener
mainSearchInput.addEventListener('keyup', (e) => {
  mainSearch(mainSearchInput, recipes);
});

myAdvancedInput.forEach((input) => {
  input.addEventListener('keyup', (e) => {
    if (input === ingredientsInput) {
      advancedSearchTag(input, listUniqueIngredients, ingredientsSuggestion[0], 'ingredient');
    } else if (input === appareilsInput) {
      advancedSearchTag(input, listUniqueAppareils, appareilsSuggestion[0], 'appareil');
    } else if (input === ustensilsInput) {
      advancedSearchTag(input, listUniqueUstensils, ustensilsSuggestion[0], 'ustensil');
    }
  });
});
