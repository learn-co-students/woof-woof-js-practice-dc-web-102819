
let filterOn = false
document.addEventListener("DOMContentLoaded", () => {
	
	getDogs()
	makeDogPage()
	let filter = document.getElementById('good-dog-filter')
	filter.addEventListener('click', toggleGoodDogs)
})

function toggleGoodDogs(event) {
	let dogBar = document.getElementById('dog-bar')


	if(filterOn) {
		filterOn = false
		event.target.innerText = 'Filter good dogs: OFF'
		Array.from(document.getElementsByClassName("false")).forEach(dog => dog.style.display = 'flex')

	} else {
		event.target.innerText = 'Filter good dogs: ON'
		filterOn = true

		Array.from(document.getElementsByClassName("false")).forEach(dog => dog.style.display = 'none')

	}
}


function getDogs() {
	fetch('http://localhost:3000/pups')
	.then(resp => resp.json())
	.then(data => data.forEach(dog => createDogBar(dog)))
}

function createDogBar(dog) {
	let dogBar = document.getElementById("dog-bar")
	let dogSpan = document.createElement('span')
	dogSpan.innerText = dog.name
	dogSpan.id = dog.id
	dogSpan.classList.add(`${dog.isGoodDog}`)
	dogBar.append(dogSpan)
	dogSpan.addEventListener("click", getDog)
}

function getDog(event) {
	let dogId = event.target.id
	fetch(`http://localhost:3000/pups/${dogId}`)
	.then(resp => resp.json())
	.then(data => replaceDogPage(data))

	// dogImage.src = 
}


function replaceDogPage(dog) {
	let dogInfo = document.getElementById("dog-info")
	let image = document.getElementById("image-box")
	image.style.display ='block'

	image.src = dog.image
	let title = document.getElementById('dog-title')
	title.innerText = dog.name

	let dogButton = document.getElementById("dog-button")
	dogButton.dataset.id = dog.id
	dogButton.style.display = 'block'
	if (dog.isGoodDog) {
		dogButton.innerText = "Good Dog!"
	} else {
		dogButton.innerText = "Bad Dog!"
	}
	dogButton.addEventListener('click', changeStatus)

}

function changeStatus(event) {
	console.log(event)

	let dogId = event.target.attributes[2].value
	let formData
	let dogSpan = document.getElementById(`${dogId}`)


	if (event.target.innerText === "Good Dog!") {

		formData = {
			isGoodDog: false
			
		}
		
		dogSpan.className = 'false'

	}else {
		formData = {
			isGoodDog: true
		}
		dogSpan.className = 'true'
	}
		

	let configObj = {
     method: "PATCH",
     headers: {
       "content-type": "application/json",
       Accept: "application/json"
     },
     body: JSON.stringify(formData)
   }

	fetch(`http://localhost:3000/pups/${dogId}`, configObj)
	.then(resp => resp.json())
	.then(dog => replaceDogPage(dog))
}

function makeDogPage() {
	let dogInfo = document.getElementById("dog-info")
	let image = document.createElement("img")
	image.id = "image-box"

	image.src = null
	dogInfo.append(image)
	image.style.display = 'none'

	let title = document.createElement("h2")
	title.id = "dog-title"
	dogInfo.append(title)

	let dogButton = document.createElement("button")
	dogButton.innerText = "Good Dog"
	dogButton.id = "dog-button"
	dogInfo.append(dogButton)
	dogButton.style.display = 'none'



}
