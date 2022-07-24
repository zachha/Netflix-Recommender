// helper function that clears divs of html 
function clearDiv(div) {
    while(div.firstChild){
        div.removeChild(div.firstChild);
    }
}

// Uses template literals to build cards for each show returned from the database
function addNewCard(titleData) {
    return `
                <div class="card text-center mx-auto cardDiv">
                    <div class="card-header">
                        ${titleData.type}
                    </div>
                    <div class="card-body">
                        <h5 class="card-title">${titleData.title}</h5>
                        <p class="card-text">${titleData.description}</p>
                        <a href="#" class="algoBtn btn btn-primary addBtn" data-title="${titleData.title}">Recommend!</a>
                    </div>
                    <div class="card-footer text-muted">
                        ${titleData.genres}
                    </div>
                </div>
    `
}

// attaches recommender on click event listener to dynamically added buttons
function dynamicDivButtons() {
    let algoBtns = document.getElementsByClassName("algoBtn");
    Array.from(algoBtns).forEach( btn => {
        btn.addEventListener('click', () => {
            clearDiv(holderDiv);
            let chosenTitle = btn.dataset.title;
            console.log("THIS: " + chosenTitle);
            axios.post('/getRecommendedTitles', {
                reccTitle: chosenTitle
            })
            .then( res => {
                console.log(res);
            })
            .catch( err => {
                console.log(err);
            });
        });
    });
}
// Waits for DOM to fully load before any DOM traversal 
document.addEventListener('DOMContentLoaded', (event) => {
    console.log('Dom fully loaded and parsed');

    // Grabbing elements for DOM manipulation
    let searchForm = document.getElementById("searchForm");
    let searchBox = document.getElementById("searchBox");
    let subheader = document.getElementById("subheader");
    let holderDiv = document.getElementById('holderDiv');

    // Listens for the form button to fire off and then queries the database for the input movie or show
    searchForm.addEventListener('submit', (formData) => {
        console.log(searchBox.value);
        clearDiv(holderDiv);
        formData.preventDefault();
      
       axios.post('/getSearchedTitles', {
        searchTitle: searchBox.value
       })
       .then( res => {
            console.log(res.data);
            data = res.data;
            console.log(res.data);
            if (data.length > 0) {
                data.forEach( show => {
                    holderDiv.insertAdjacentHTML('beforeend', addNewCard(show));
                })
                subheader.innerHTML = "Now choose a title to get a recommendation! ";
                dynamicDivButtons();
                return;
            } else {
                subheader.innerHTML = "Hmm... We couldn't find any titles with that name, Try Again!";
                return;
            }
       })
       .catch( err => {
            console.log(err);
       });
    });
});