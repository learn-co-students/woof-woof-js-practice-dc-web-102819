console.log('This is your index.js file speaking');

const urlPrefix = "http://localhost:3000/pups"


document.addEventListener('DOMContentLoaded', function() {
    
    fetch(urlPrefix)
    .then(response => response.json())
    .then(console.log("Horray! We have puppies!"))
    .then(obj => spanPuppies(obj))
    .catch(error => alert("Something went wrong: " + error.message ));
});


function spanPuppies(db) {
    let dogBar = document.getElementById('dog-bar')
    
    db.forEach(pup => {
        let pupSpan = document.createElement('span');
        pupSpan.innerText = pup.name;
        pupSpan.id = `pup-${pup.id}`
        pupSpan.addEventListener('click', grabDetails)
        
        dogBar.appendChild(pupSpan);
        console.log(`Added Pup: ${pup.name}`);
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
    if (pup.isGoodDog === true) {
        goodDogBtn.innerText = "Good Dog!"
    } else if (pup.isGoodDog === false) {
        goodDogBtn.innerText = "Bad Dog!"
    }

    detailContainer.appendChild(pupImage);
    detailContainer.appendChild(pupTitle);
    detailContainer.appendChild(goodDogBtn);

}
