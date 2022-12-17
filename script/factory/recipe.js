function recipeFactory(data) {
  const { id, name, servings, ingredients, time, description, appliance, ustensils } = data

  function getRecipeCardDOM() {
    const article = document.createElement('article')
    article.classList.add('recipe')
    const imgcontainer = document.createElement('div')
    imgcontainer.classList.add('img-container')
    const recipeMainInfo = document.createElement('div')
    recipeMainInfo.classList.add('recipe-main-information')
    const recipeTitle = document.createElement('h2')
    recipeTitle.classList.add('title')
    recipeTitle.textContent = name
    const recipeDuration = document.createElement('p')
    recipeDuration.classList.add('recipe-duration')
    recipeDuration.innerHTML = `<i class="fa-regular fa-clock"></i> ${time} min`
    const recipeDetails = document.createElement('aside')
    recipeDetails.classList.add('recipe-details')
    const ingredientList = document.createElement('ul')
    ingredientList.classList.add('ingredients-list')
    ingredients.forEach((ingredient) => {
      const recipeIngredient = document.createElement('li')
      let unit = ''
      if (ingredient.unit !== undefined) {
        unit = ingredient.unit
      }
      recipeIngredient.innerHTML = `<strong>${ingredient.ingredient}:</strong> ${ingredient.quantity} ${unit}`
      ingredientList.appendChild(recipeIngredient)
    })
    const recipeDescription = document.createElement('p')
    recipeDescription.classList.add('recipe-description')
    recipeDescription.textContent = description
    article.appendChild(imgcontainer)
    article.appendChild(recipeMainInfo)
    article.appendChild(recipeDetails)
    recipeMainInfo.appendChild(recipeTitle)
    recipeMainInfo.appendChild(recipeDuration)
    recipeDetails.appendChild(ingredientList)
    recipeDetails.appendChild(recipeDescription)
    return article
  }

  return {
    id,
    name,
    servings,
    ingredients,
    time,
    description,
    appliance,
    ustensils,
    getRecipeCardDOM
  }
}
