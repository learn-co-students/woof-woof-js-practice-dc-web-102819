document.addEventListener('DOMContentLoaded', () => {
    getDogs()
})

function getDogs() {
    fetch('http://localhost:3000/pups')
    .then(response => response.json())
    .then(dogs => dogs.forEach(dog => dogOrganizer(dog)))
}

function dogOrganizer(dog){
    dogDiv = document.querySelector('#dog-bar')
    dogSpan = document.createElement('span')
    dogSpan.innerText = dog.name
    dogDiv.appendChild(dogSpan)
    dogDiv.addEventListener('click',() => dogInfo(dog))
}

function dogInfo(dog){
    debugger
   infoDiv =  document.querySelector('#dog-info')
   let dogName = dog.name
   let dogImage = dog.image
   let idGoodDog = dog.isGoodDog
   let img = document.createElement('img')
   img.innerText = dogImage
   let name = document.createElement('h2')
   name = dogName
   let button = document.createElement('button')
   if (idGoodDog = true){
       button.innerText = "Good Dog!"
   } else {
    button.innerText = "Bad Dog!"
   }


}