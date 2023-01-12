// DOM
const dropdownClose = document.getElementsByClassName('dropdown-close')
const dropdownOpen = document.getElementsByClassName('dropdown-open')
const ingredientsDiv = document.getElementsByClassName('ingredients')
const appareilsDiv = document.getElementsByClassName('appareils')
const ustensilsDiv = document.getElementsByClassName('ustensils')
const suggestionDivIngredient = document.getElementsByClassName('suggestion-container')
const ingredientsInput = document.getElementById('search-filter-ingredients')
const appareilsInput = document.getElementById('search-filter-appareils')
const ustensilsInput = document.getElementById('search-filter-ustensils')
const suggestionListIngredient = ingredientsDiv[0].querySelectorAll('li')
const suggestionListAppareils = appareilsDiv[0].querySelectorAll('li')
const suggestionListUstensils = ustensilsDiv[0].querySelectorAll('li')
const testUlDivIngredient = document.getElementsByClassName('suggestion-ingredients')
const testUlDivAppareils = document.getElementsByClassName('suggestion-appareils')
const testUlDivUstensils = document.getElementsByClassName('suggestion-ustensils')
const chevronDown = document.getElementsByClassName('fa-chevron-down')

// class to gather multiple information about advanced search input
class SearchProperties {
  constructor(category, suggestionDiv, input, suggestionList, tagClass, chevron) {
    this.category = category
    this.suggestionDiv = suggestionDiv
    this.input = input
    this.suggestionList = suggestionList
    this.tagClass = tagClass
    this.chevron = chevron
  }
}
const ingredientsProperties = new SearchProperties(ingredientsDiv[0], suggestionDivIngredient[0], ingredientsInput, suggestionListIngredient, 'ingredients-tag', chevronDown[0])
const appareilsProperties = new SearchProperties(appareilsDiv[0], suggestionDivIngredient[1], appareilsInput, suggestionListAppareils, 'appareils-tag', chevronDown[1])
const ustensilsProperties = new SearchProperties(ustensilsDiv[0], suggestionDivIngredient[2], ustensilsInput, suggestionListUstensils, 'ustensils-tag', chevronDown[2])
let mySearchProperties = [ingredientsProperties, appareilsProperties, ustensilsProperties]

let currentTag = {
  ingredients: [],
  appareils: [],
  ustensils: []
}
// function to create research tag element and add tag.textcontent in an array (currentTag) that will allow no duplication of tag
function createResearchTag(tagClass, suggestion) {
  const tag = document.createElement('div')
  tag.classList.add(tagClass)
  const tagText = document.createElement('p')
  tagText.textContent = suggestion
  const tagClose = document.createElement('i')
  tagClose.classList.add('fa-regular', 'fa-circle-xmark')
  researchTagSection[0].appendChild(tag)
  tag.appendChild(tagText)
  tag.appendChild(tagClose)
  if (tagClass === 'ingredients-tag') {
    currentTag.ingredients.push(suggestion)
  } else if (tagClass === 'appareils-tag') {
    currentTag.appareils.push(suggestion)
  } else if (tagClass === 'ustensils-tag') {
    currentTag.ustensils.push(suggestion)
  }
  advancedSearch(currentTag)
}
// function to delete tag and delete tag.textcontent from array (currentTag)
function deleteTag(closeButton) {
  const tag = closeButton.parentNode
  const tagText = tag.children[0].textContent
  const tagClass = tag.classList[0]
  const recipeToDelete = []
  removedClicked(tagText)
  if (tagClass === 'ingredients-tag') {
    currentTag.ingredients.splice(currentTag.ingredients.indexOf(tagText), 1)
  } else if (tagClass === 'appareils-tag') {
    currentTag.appareils.splice(currentTag.appareils.indexOf(tagText), 1)
  } else if (tagClass === 'ustensils-tag') {
    currentTag.ustensils.splice(currentTag.ustensils.indexOf(tagText), 1)
  }
  tag.remove()
  advancedSearch(currentTag)
}

// function to remove clicked class
function removedClicked(text) {
  let clickedSuggestion = document.getElementsByClassName('clicked')
  for (i = 0; i < clickedSuggestion.length; i++) {
    if (clickedSuggestion[i].textContent === text) {
      clickedSuggestion[i].classList.remove('clicked')
    }
  }
}

// Event to delete tag
researchTagSection[0].addEventListener('click', (e) => {
  if (e.target.classList[1] === 'fa-circle-xmark') {
    deleteTag(e.target)
  }
})
// Event to create tag when user click on one item of the suggestion list
;['click', 'keydown'].forEach((action) => {
  ;[testUlDivIngredient[0], testUlDivAppareils[0], testUlDivUstensils[0]].forEach((suggestionDiv) => {
    suggestionDiv.addEventListener(action, (e) => {
      if ((action === 'keydown' && e.key === 'Enter') || action === 'click') {
        if (e.target.classList[0] !== 'suggestion') {
          if (e.target.classList[0] !== 'clicked') {
            e.target.classList.add('clicked')
            if (suggestionDiv === testUlDivIngredient[0]) {
              createResearchTag('ingredients-tag', e.target.textContent)
            } else if (suggestionDiv === testUlDivAppareils[0]) {
              createResearchTag('appareils-tag', e.target.textContent)
            } else if (suggestionDiv === testUlDivUstensils[0]) {
              createResearchTag('ustensils-tag', e.target.textContent)
            }
          }
        }
      }
    })
  })
})

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

// e.target avec id adaptatif c'est une meilleurs pratique que de faire des tableau d'objet
// plutôt faire une fonction toggle pour passer de active, inactive
// Event to display suggestion when user focus one advanced search input

dropdownClose[0].addEventListener('click', (e) => {
  dropdownClose[0].classList.toggle('hide')
  dropdownOpen[0].classList.toggle('hide')
})

dropdownOpen[0].addEventListener('click', (e) => {
  dropdownClose[0].classList.toggle('hide')
  dropdownOpen[0].classList.toggle('hide')
})
dropdownClose[1].addEventListener('click', (e) => {
  dropdownClose[1].classList.toggle('hide')
  dropdownOpen[1].classList.toggle('hide')
})

dropdownOpen[1].addEventListener('click', (e) => {
  dropdownClose[1].classList.toggle('hide')
  dropdownOpen[1].classList.toggle('hide')
})
dropdownClose[2].addEventListener('click', (e) => {
  dropdownClose[2].classList.toggle('hide')
  dropdownOpen[2].classList.toggle('hide')
})

dropdownOpen[2].addEventListener('click', (e) => {
  dropdownClose[2].classList.toggle('hide')
  dropdownOpen[2].classList.toggle('hide')
})
