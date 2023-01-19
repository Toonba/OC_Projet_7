// DOM
const dropdownClose = document.getElementsByClassName('dropdown-close')
const dropdownOpen = document.getElementsByClassName('dropdown-open')
const suggestionDivIngredient = document.getElementsByClassName('suggestion-ingredients')
const suggestionDivAppareils = document.getElementsByClassName('suggestion-appareils')
const suggestionDivUstensils = document.getElementsByClassName('suggestion-ustensils')
const chevronDown = document.getElementsByClassName('fa-chevron-down')
const suggestionContainer = document.getElementsByClassName('suggestion-container')
const researchTagSection = document.getElementsByClassName('research-tag')

// function allowing to hide current tag shown from their respective suggestion list
function hiddingSuggestion() {
  let tagArray = Array.from(researchTagSection[0].children)
  if (tagArray.length > 0) {
    tagArray.forEach((tag) => {
      if (tag.classList[0] === 'ingredients-tag') {
        listUniqueIngredients.splice(listUniqueIngredients.indexOf(tag.children[0].textContent), 1)
      }
      if (tag.classList[0] === 'appareils-tag') {
        listUniqueAppareils.splice(listUniqueAppareils.indexOf(tag.children[0].textContent), 1)
      }
      if (tag.classList[0] === 'ustensils-tag') {
        listUniqueUstensils.splice(listUniqueUstensils.indexOf(tag.children[0].textContent), 1)
      }
    })
    displaySuggestion(listUniqueIngredients, 'ingredient')
    displaySuggestion(listUniqueUstensils, 'ustensil')
    displaySuggestion(listUniqueAppareils, 'appareil')
  }
}

// function to display list of suggestion in the related fields
function displaySuggestion(array, type) {
  if (type === 'ingredient') {
    ingredientsSuggestion[0].innerHTML = ''
  }
  if (type === 'appareil') {
    appareilsSuggestion[0].innerHTML = ''
  }
  if (type === 'ustensil') {
    ustensilsSuggestion[0].innerHTML = ''
  }
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
  hiddingSuggestion()

  // voir pour faire des impor export ou des module (chercher doc et comment ca marche)
}
// function to delete tag and delete tag.textcontent from array (currentTag)
function deleteTag(closeButton) {
  const tag = closeButton.parentNode
  const tagText = tag.children[0].textContent
  const tagClass = tag.classList[0]
  if (tagClass === 'ingredients-tag') {
    currentTag.ingredients.splice(currentTag.ingredients.indexOf(tagText), 1)
  } else if (tagClass === 'appareils-tag') {
    currentTag.appareils.splice(currentTag.appareils.indexOf(tagText), 1)
  } else if (tagClass === 'ustensils-tag') {
    currentTag.ustensils.splice(currentTag.ustensils.indexOf(tagText), 1)
  }
  tag.remove()
  advancedSearch(currentTag)
  hidingSuggestion()
}

// Event to create tag when user click on one item of the suggestion list
;['click', 'keydown'].forEach((action) => {
  ;[suggestionDivIngredient[0], suggestionDivAppareils[0], suggestionDivUstensils[0]].forEach((suggestionDiv) => {
    suggestionDiv.addEventListener(action, (e) => {
      if ((action === 'keydown' && e.key === 'Enter') || action === 'click') {
        if (e.target.classList[0] !== 'suggestion') {
          if (suggestionDiv === suggestionDivIngredient[0]) {
            createResearchTag('ingredients-tag', e.target.textContent)
          } else if (suggestionDiv === suggestionDivAppareils[0]) {
            createResearchTag('appareils-tag', e.target.textContent)
          } else if (suggestionDiv === suggestionDivUstensils[0]) {
            createResearchTag('ustensils-tag', e.target.textContent)
          }
        }
      }
    })
  })
})

// Event to delete tag
researchTagSection[0].addEventListener('click', (e) => {
  if (e.target.classList[1] === 'fa-circle-xmark') {
    deleteTag(e.target)
  }
})

// Event to show hide suggestion
;[0, 1, 2].forEach((index) => {
  dropdownClose[index].addEventListener('click', (e) => {
    dropdownClose[index].classList.toggle('hide')
    dropdownOpen[index].classList.toggle('hide')
  })
  chevronDown[index].addEventListener('click', (e) => {
    dropdownClose[index].classList.toggle('hide')
    dropdownOpen[index].classList.toggle('hide')
  })
  suggestionContainer[index].addEventListener('click', (e) => {
    dropdownClose[index].classList.toggle('hide')
    dropdownOpen[index].classList.toggle('hide')
  })
})
