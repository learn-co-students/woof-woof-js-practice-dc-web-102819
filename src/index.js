console.log('This is your index.js file speaking');

const urlPrefix = "http://localhost:3000/pups"

document.addEventListener('DOMContentLoaded', function() {
    
    fetch(urlPrefix).then(response => response.json())
    .then(console.log("Horray! We have puppies!"))
    .then(obj => spanPuppies(obj))
    .catch(error => alert("Something went wrong: " + error.message ));

    document.getElementById('good-dog-filter').addEventListener('click', filterToggle);
});


function spanPuppies(db) {
    let dogBar = document.getElementById('dog-bar');
    dogBar.innerHTML = "";
    
    db.forEach(pup => {
        let pupSpan = document.createElement('span');
        pupSpan.innerText = pup.name;
        pupSpan.id = `pup-${pup.id}`
        pupSpan.addEventListener('click', grabDetails)
        
        dogBar.appendChild(pupSpan);
    })
}

function grabDetails(event) {
    let pupSpan = event.currentTarget;
    let pupId = pupSpan.id.split('-')[1];
    let url = urlPrefix + '/' + pupId;
    
    console.log("We're fetching from " + url);
    fetch(url)
    .then(response => response.json())
    .then(obj => showDetails(obj) )
    .catch(error => alert("Something went wrong: " + error.message )); 
}

function showDetails(pup) {
    let detailContainer = document.getElementById('dog-info');
    
    let pupImage = document.createElement('img');
    pupImage.src = pup.image;
    
    let pupTitle = document.createElement('h2');
    pupTitle.innerText = pup.name;

    let goodDogBtn = document.createElement('button');
    goodDogBtn.id = "dogbtn-" + pup.id;
    goodDogBtn.addEventListener('click', toggleDog)
    if (pup.isGoodDog === true) {
        goodDogBtn.innerText = "Good Dog!"
    } else if (pup.isGoodDog === false) {
        goodDogBtn.innerText = "Bad Dog!"
    }

    detailContainer.innerHTML = "";
    detailContainer.appendChild(pupImage);
    detailContainer.appendChild(pupTitle);
    detailContainer.appendChild(goodDogBtn);
}

function newDog(event) {
    if (event.currentTarget.innerText === "Good Dog!") {
        event.currentTarget.innerText = "Bad Dog!";
        return false;
    } else {
        event.currentTarget.innerText = "Good Dog!";
        return true;
    }
}

function toggleDog(event) {
    // console.log("You clicked the button!")
    let updateValue = newDog(event);

    let pupId = event.currentTarget.id.split("-")[1];
    let url = urlPrefix + '/' + pupId;
    
    fetch(url, {
        method: 'PATCH',
        headers: {'content-type': 'application/json'},
        body: JSON.stringify({isGoodDog: updateValue})
    }).then(response => response.json())
    .then(console.log("Dog's goodDog value has been patched to " + updateValue))
    .catch(error => alert("Something went wrong" + error.message));
}

function toggleValue(event) {
    if (event.currentTarget.innerText === 'Filter good dogs: OFF') {
        event.currentTarget.innerText = 'Filter good dogs: ON'
        return true
    } else {
        event.currentTarget.innerText = 'Filter good dogs: OFF'
        return false
    }
}

function filterToggle(event) {
    let filterValue = toggleValue(event);

    fetch(urlPrefix).then(response => response.json())
    .then(console.log("Horray! We have puppies!"))
    .then(obj => limitPuppies(obj, filterValue))
    .catch(error => alert("Something went wrong: " + error.message ));
}

function limitPuppies(pups, filterValue) {
    if (filterValue === true) {
        console.log("Filtering puppies!");
        let goodPups = pups.filter(pup => pup.isGoodDog === true);
        spanPuppies(goodPups)
    } else {
        spanPuppies(pups);
    }
}