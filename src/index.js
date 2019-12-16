document.addEventListener("DOMContentLoaded", pups)



function pups() {
    getPups();
}


function getPups() {
    fetch(`http://localhost:3000/pups`)
    .then(response => response.json())
    .then(pups => {
        pups.forEach(pup => renderPups(pup))
    })
}


function renderPups(pup) {
    let dogContainer = document.getElementById('dog-bar')
    let dogElement = document.createElement('span')
    dogElement.id = pup.id
    dogElement.isGoodDog = pup.isGoodDog
    dogElement.innerText = `${pup.name}`
    dogElement.hideen = `${pup.image}`
    if (pup.isGoodDog === true) {
        pup.goodDogString = `Good Dog!`
    }
    else {
        pup.goodDogString = `Bad Dog!`
    }
    dogElement.isGoodDog = `${pup.goodDogString}`
    dogContainer.appendChild(dogElement)
    dogElement.addEventListener('click', showDogInfo)
}



function showDogInfo(event) {
    let dogInfoContainer = document.getElementById('dog-info')
    let dogImg = document.createElement('img')
    let dogButton = document.createElement('button')
    let dogName = document.createElement('h2')
    dogButton.id = event.target.id
    dogButton.isGoodDog = event.target.isGoodDog
    dogImg.src = event.target.hideen
    dogName.innerText = event.target.innerText
    dogButton.innerText = event.target.isGoodDog
    dogInfoContainer.appendChild(dogImg)
    dogInfoContainer.appendChild(dogName)
    dogInfoContainer.appendChild(dogButton)
    dogButton.addEventListener('click', changeIsGoodDog)
}


function changeIsGoodDog(event) {
    let dogID = event.target.id
    if (event.target.innerText === `Good Dog!`) {
       event.target.innerText = `Bad Dog!`
    } else {
       event.target.innerText = `Good Dog!`
    }
    let booleanValue
    if (event.target.innerText === 'Good Dog!') {
        booleanValue = true
    } else {
        booleanValue = false
    }
    let configObject = {
        method: 'PATCH',
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json"
        },
        body: JSON.stringify({isGoodDog: booleanValue}) 
        }
    fetch(`http://localhost:3000/pups/${dogID}`, configObject)
    .then(response => response.json())
    .then(data => console.log(data))
    }
    
    // if (event.target.innerText === `Good Dog`{