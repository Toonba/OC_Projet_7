// DOM
const researchTagSection = document.getElementsByClassName('research-tag')
const ingredientsDiv = document.getElementsByClassName('ingredients')
const appareilsDiv = document.getElementsByClassName('appareils')
const ustensilsDiv = document.getElementsByClassName('ustensils')
const suggestionDivIngredient = document.getElementsByClassName('suggestion-container')
const ingredientsInput = document.getElementById('search-filter-ingredients')
const appareilsInput = document.getElementById('search-filter-appareils')
const ustensilsInput = document.getElementById('search-filter-ustensils')
const tagCloseButton = Array.from(document.querySelectorAll('.fa-circle-xmark'))
const suggestionListIngredient = ingredientsDiv[0].querySelectorAll('li')
const suggestionListAppareils = appareilsDiv[0].querySelectorAll('li')
const suggestionListUstensils = ustensilsDiv[0].querySelectorAll('li')
const testUlDivIngredient = document.getElementsByClassName('suggestion-ingredients')
const testUlDivAppareils = document.getElementsByClassName('suggestion-appareils')
const testUlDivUstensils = document.getElementsByClassName('suggestion-ustensils')

// IL VA FALLOIR REVOIR CETTE PARTIE MAIS 9A MARCHE POUR CREER LES TAG 
testUlDivIngredient[0].addEventListener
;['click', 'keydown'].forEach((action) => {
  testUlDivIngredient[0].addEventListener(action, (e) => {
    if ((action === 'keydown' && e.key === 'Enter') || action === 'click') {
      createResearchTag('ingredients-tag', e.target.textContent)
    }
  })
})
testUlDivAppareils[0].addEventListener
;['click', 'keydown'].forEach((action) => {
  testUlDivAppareils[0].addEventListener(action, (e) => {
    if ((action === 'keydown' && e.key === 'Enter') || action === 'click') {
      createResearchTag('appareils-tag', e.target.textContent)
    }
  })
})
testUlDivUstensils[0].addEventListener
;['click', 'keydown'].forEach((action) => {
  testUlDivUstensils[0].addEventListener(action, (e) => {
    if ((action === 'keydown' && e.key === 'Enter') || action === 'click') {
      createResearchTag('ustensils-tag', e.target.textContent)
    }
  })
})

class SearchProperties {
  constructor(category, suggestionDiv, input, suggestionList, tagClass) {
    this.category = category
    this.suggestionDiv = suggestionDiv
    this.input = input
    this.suggestionList = suggestionList
    this.tagClass = tagClass
  }
}
const ingredientsProperties = new SearchProperties(ingredientsDiv[0], suggestionDivIngredient[0], ingredientsInput, suggestionListIngredient, 'ingredients-tag')
const appareilsProperties = new SearchProperties(appareilsDiv[0], suggestionDivIngredient[1], appareilsInput, suggestionListAppareils, 'appareils-tag')
const ustensilsProperties = new SearchProperties(ustensilsDiv[0], suggestionDivIngredient[2], ustensilsInput, suggestionListUstensils, 'ustensils-tag')
let mySearchProperties = [ingredientsProperties, appareilsProperties, ustensilsProperties]

// function to create research tag element
function createResearchTag(tagClass, suggestion) {
  const tag = document.createElement('div')
  tag.classList.add(tagClass)
  const tagText = document.createElement('p')
  tagText.textContent = suggestion
  const tagClose = document.createElement('i')
  tagClose.classList.add('fa-regular', 'fa-circle-xmark')
  tagCloseButton.push(tagClose)
  researchTagSection[0].appendChild(tag)
  tag.appendChild(tagText)
  tag.appendChild(tagClose)
}
// function to delete tag
function deleteTag(closeButton) {
  const tag = closeButton.parentNode
  tag.remove()
}
// Event to delete tag
researchTagSection[0].addEventListener('click', (e) => {
  if (e.target.classList[1] === 'fa-circle-xmark') {
    deleteTag(e.target)
  }
})

// Event to create tage when user click/press Enter on one suggestion
// mySearchProperties.forEach((element) => {
//   console.log(element.suggestionList)
//   element.suggestionList.forEach((suggestion) => {
//     ;['click', 'keydown'].forEach((action) => {
//       suggestion.addEventListener(action, (e) => {
//         if ((action === 'keydown' && e.key === 'Enter') || action === 'click') {
//           createResearchTag(element.tagClass, suggestion.textContent)
//         }
//       })
//     })
//   })
// })

//Need to add class 'search-filter-box' to div.ingredients, div.appareils, div.ustensils
// suggestion et suggestion-ingredients, appareils, ustensils doivent doivent avoir un display sur block
mySearchProperties.forEach((element) => {
  element.input.addEventListener('focus', (e) => {
    element.category.classList.add('search-filter-box')
    element.suggestionDiv.classList.add('suggestion-active')
    element.suggestionDiv.classList.remove('suggestion-inactive')
  })
})
// mySearchProperties.forEach((element) => {
//   element.input.addEventListener('focusout', (e) => {
//     element.category.classList.remove('search-filter-box')
//     element.suggestionDiv.classList.remove('suggestion-active')
//     element.suggestionDiv.classList.add('suggestion-inactive')
//   })
// })
