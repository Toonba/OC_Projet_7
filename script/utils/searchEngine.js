const mainSearchInput = document.getElementById('search')

function mainSearch(input, array) {
  let currentSearch = ''
  let currentRecipes = []
  console.log(input.value)
  if (input.value.length < 3) {
    currentRecipes = recipes
  } else if (input.value.length >= 3) {
    currentSearch = input.value.toLowerCase()
    currentRecipes = array
    for (let i = 0; i < array.length; i++) {
      for (let j = 0; j < array[i].ingredients.length; j++) {
        if (array[i].name.toLowerCase().includes(currentSearch) || array[i].description.toLowerCase().includes(currentSearch) || array[i].ingredients[j].ingredient.includes(currentSearch)) {
          currentRecipes.push(array[i])
        }
      }
    }
  }
  return currentRecipes
}

mainSearchInput.addEventListener('keyup', (e) => {
  mainSearch(mainSearchInput, recipes)
})
