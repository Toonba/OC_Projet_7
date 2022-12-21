// DOM
const researchTagSection = document.getElementsByClassName('research-tag')
const ingredientsDiv = document.getElementsByClassName('ingredients')
const appareilsDiv = document.getElementsByClassName('appareils')
const ustensilsDiv = document.getElementsByClassName('ustensils')
const suggestionDivIngredient = document.getElementsByClassName('test')
const ingredientsInput = document.getElementById('search-filter-ingredients')
const appareilsInput = document.getElementById('search-filter-appareils')
const ustensilsInput = document.getElementById('search-filter-ustensils')

class SearchProperties {
  constructor(type, suggestionDiv, input) {
    this.type = type
    this.suggestionDiv = suggestionDiv
    this.input = input
  }
}
const ingredientsProperties = new SearchProperties(ingredientsDiv[0], suggestionDivIngredient[0], ingredientsInput)
const appareilsProperties = new SearchProperties(appareilsDiv[0], suggestionDivIngredient[1], appareilsInput)
const ustensilsProperties = new SearchProperties(ustensilsDiv[0], suggestionDivIngredient[2], ustensilsInput)
let mySearchProperties = [ingredientsProperties, appareilsProperties, ustensilsProperties]

// function to create research tag element. tagClass should be one of following ingredients-tag ; appareils-tag ; ustensils-tag
function createResearchTag(tagClass) {
  const tag = document.createElement('div')
  tag.classList.add(tagClass)
  const tagText = document.createElement('p')
  tagText.textContent = researchText
  const tagClose = document.createElement('i')
  tagClose.classList.add('fa-regular fa-circle-xmark')
  tag.appendChild(tagText)
  tag.appendChild(tagClose)
}

console.log(suggestionDivIngredient)
//Need to add class 'search-filter-box' to div.ingredients, div.appareils, div.ustensils
// suggestion et suggestion-ingredients, appareils, ustensils doivent doivent avoir un display sur block
mySearchProperties.forEach((element) => {
  element.input.addEventListener('focus', (e) => {
    element.type.classList.add('search-filter-box')
    element.suggestionDiv.classList.add('suggestion-active')
    element.suggestionDiv.classList.remove('suggestion-inactive')
  })
})
mySearchProperties.forEach((element) => {
  element.input.addEventListener('focusout', (e) => {
    element.type.classList.remove('search-filter-box')
    element.suggestionDiv.classList.remove('suggestion-active')
    element.suggestionDiv.classList.add('suggestion-inactive')
  })
})
