document.addEventListener("DOMContentLoaded", function(){
	console.log('connected')
	getDogs();
	document.querySelector('#good-dog-filter').addEventListener('click', filterGoodDogs)
})

function getDogs() {
	fetch('http://localhost:3000/pups')
		.then(response => response.json())
		.then(json => json.forEach(dog => {
			renderDog(dog)
		}))
}

function renderDog(dog) {

	let type = dog.isGoodDog ? "good-dog" : 'bad-dog';

	let dogName = document.createElement('span');
	dogName.id = `dog-${dog.id}`;
	dogName.className = (type)
	dogName.innerText = dog.name;
	dogName.addEventListener('click', showDogInfo)
	// dogContainer.appendChild(dogName);
	

	let dogBar = document.querySelector('#dog-bar');
	dogBar.appendChild(dogName)
}

function showDogInfo(event) {
	let dogContainer = document.querySelector('#dog-info');
	let dogID = event.currentTarget.id.split('-')[1]
	
	fetch(`http://localhost:3000/pups/${dogID}`)
		.then(response => response.json())
		.then(dog => {
			dogContainer.innerHTML = '';
			let dogImg = document.createElement('img');
			dogImg.src = dog.image;
			dogContainer.appendChild(dogImg);

			let dogName = document.createElement('h2');
			dogName.innerText = dog.name;
			dogContainer.appendChild(dogName);

			let dogButton = document.createElement('button');
			dogButton.innerText = dog.isGoodDog;
			dogButton.addEventListener('click', toggleGoodDog)
			dogButton.addEventListener('click', setDisplay)
			dogButton.id = `dog-button-${dogID}`
			dogContainer.appendChild(dogButton);
		})
		.catch(error => alert(error.message))
}

function toggleGoodDog(event) {
	let current = event.currentTarget;
	let dogID = current.id.split('-')[2]
	let change = current.innerText === "true" ? "false" : "true";
	current.innerText = change;

	let body = { isGoodDog: `${change}` }

	fetch(`http://localhost:3000/pups/${dogID}`, {
		method: "PATCH",
		headers: {
			"Content-Type": "application/json"
		},
		body: JSON.stringify(body)
	}).then(response => response.json())
	.then(updateDog => {
		current.innerText = updateDog.isGoodDog;
		let dogElement = document.querySelector(`#dog-${dogID}`)
		console.log(updateDog)
	});
}

function setDisplay(event) {
	let dog = document.querySelector(`#dog-${event.currentTarget.id.split('-')[2]}`)
	
	if (dog.className === "bad-dog") {
		dog.className = "good-dog"
		dog.style.display = "flex";
	} else {
		dog.className = "bad-dog"
		dog.style.display = "none";
	}
}

function filterGoodDogs(event) {
	let filter = document.querySelector('#good-dog-filter');
	let status = filter.innerText.split(' ')[3]
	
	if (status === "OFF") {
		filter.innerText = "Filter good dogs: ON"
		document.querySelectorAll(".bad-dog").forEach(dog => {
			// dog.className = 'hidden-dog';
			dog.style.display = "none";
		})
	} else {
		filter.innerText = "Filter good dogs: OFF"
		document.querySelectorAll(".bad-dog").forEach(dog => {
			// dog.className = 'hidden-dog';
			dog.style.display = "flex";
		})
	}
}




