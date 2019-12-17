var totalPages;

document.addEventListener('DOMContentLoaded', webIsReady)

function webIsReady() {
  getPups()
  getDogBar().addEventListener('click', showPupsInfo)
  btnDog()
}

function getPups() {
  fetch('http://localhost:3000/pups')
  .then(response => response.json())
  .then(pupsData => pupsData.forEach(puppy => renderPup(puppy)))
  .catch(error => console.log(error.message))
}


function renderPup(puppy) {
  let divDogBarTag = document.querySelector('#dog-bar')

  let spanName = document.createElement('span')
  spanName.dataset.id = puppy.id
  spanName.dataset.behavior = puppy.isGoodDog
  // spanName.setAttribute('id', puppy.id)

  spanName.innerHTML = puppy.name
  divDogBarTag.appendChild(spanName)
}

function getDogBar() {
  return document.querySelector('#dog-bar')
}
function getDogInfoSpan(){
  return document.getElementsByTagName('span')
}

function showPupsInfo(e, puppyId) {
  const spanDogId = e.target.dataset.id
  console.log(spanDogId);
  fetch(`http://localhost:3000/pups/${spanDogId}`)
  .then(res => res.json())
  // .then(data => console.log(data))
  .then(puppyInfo => showPuppyInfo(puppyInfo))
  .catch(error => console.log(error.message))
}

function showPuppyInfo(puppyInfo) {
  getDivDogInfo().innerHTML = ''
  // console.log(puppyInfo);
  let img = document.createElement('img')
  img.src = puppyInfo.image
  let h2 = document.createElement('h2')
  h2.innerText = puppyInfo.name
  let btnInfo = document.createElement('button')
  btnValue = puppyInfo.isGoodDog
  let behavior;
  if (btnValue === true) {
    btnInfo.innerText = 'Good Dog!'
    behavior = false
    // updatePuppy(puppyInfo.id, behavior)
  } else {
    btnInfo.innerText = 'Bad Dog!'
    behavior = true
    // updatePuppy(puppyInfo.id, behavior)
  }
  getDivDogInfo().append(img, h2, btnInfo)
  // debugger
  // btnInfo.addEventListener('click', {updatePuppy(puppyInfo.id, behavior)})
  btnInfo.addEventListener('click', () => {updatePuppy(puppyInfo.id, behavior)})
// doge
}

function updatePuppy(puppyId, behavior) {
  dataToUpdate = {isGoodDog: behavior}
  console.log(dataToUpdate);
  // debugger
  confObj = {
    method: 'PATCH',
    headers:{
      'Content-Type': 'application/json',
      'Accept': 'applications/json'
    },
    body: JSON.stringify(dataToUpdate)

  }
  fetch(`http://localhost:3000/pups/${puppyId}`, confObj)
  .then(res => res.json())
  .then(puppy => showPuppyInfo(puppy))
  // .then(puppy => console.log('puppy should be updated ' + puppy.isGoodDog))
  .catch(error => console.log(error.message))

}

function getDivDogInfo() {
  return document.querySelector('#dog-info')
}

function btnDog() {
  let btnFilter = document.querySelector('#good-dog-filter')

  btnFilter.addEventListener('click', (e) => {
    let dogSpans = getDogBar().querySelectorAll('span')

    // console.log(span.dataset.behavior)
    if (btnFilter.innerText === 'Filter good dogs: OFF') {
      dogSpans.forEach( span => {
        if (span.dataset.behavior === 'false') {
          span.style.display = 'none'
        }
      })
      btnFilter.innerHTML = 'Filter good dogs: ON'
    } else {
      dogSpans.forEach( span => {
        // debugger
        console.log(span.dataset.behavior)
        if (span.dataset.behavior === 'false') {
          span.style.display = 'inline-flex'
        }
      })
      btnFilter.innerHTML = 'Filter good dogs: OFF'
    }
  })
}
