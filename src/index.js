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
    dogDiv.addEventListener('click',() => dogInfo(event, dog))
}

function dogInfo(event, dog){
  
   let infoDiv = document.querySelector('#dog-info')

   if (infoDiv.innerText[0] === dog.name[0]){
   infoDiv.querySelector('h2').remove()
   infoDiv.querySelector('img').remove()
   infoDiv.querySelector('button').remove()

   } 
    
   if (event.target.innerText === dog.name ){
   let infoDiv =  document.querySelector('#dog-info')
   let dogName = dog.name
   let dogImage = dog.image
   let idGoodDog = dog.isGoodDog
   let img = document.createElement('img')
   img.src = dogImage
   let name = document.createElement('h2')
   name.innerText = dogName
   let button = document.createElement('button')
   button.addEventListener('click',(event) => changeStatus(event, dog))

   infoDiv.appendChild(name)
   infoDiv.appendChild(img)
   infoDiv.appendChild(button)

   if (idGoodDog === true){
    button.innerText = "Good Dog!"
  } else {
   button.innerText = "Bad Dog!"
  }
  
  
   }
  

}


function changeStatus(event, dog){

    let button = event.currentTarget

   if ( button.innerText === "Good Dog!"){
    button.innerText = "Bad Dog!"
  } else {
    button.innerText = "Good Dog!"  }
   
}
