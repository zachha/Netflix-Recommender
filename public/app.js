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
// dynamically adds "true" accuracy button
function addAccBtnTrue() {
    return `
                <button type="button" class="btn btn-primary btn-lg accBtn" data-bool="True">Yes</button>
    `
}
// dynamically adds "false" accuracy button
function addAccBtnFalse() {
    return `
                <button type="button" class="btn btn-primary btn-lg accBtn" data-bool="False">No</button>
    `
}

function addDataImages() {
    return `
            <img src="/images/movie_and_show_barchart.jpg" class="d-block w-50" alt="...">
            <img src="/images/movie_ratings_piechart.jpg" class="d-block w-50" alt="...">
            <img src="/images/show_seasons_barchart.jpg" class="d-block w-50" alt="...">
    `
}

// dynamically adds cards for recommended movie list
function addRecommendedCard(titleData) {
    return `
                <div class="card text-center mx-auto cardDiv reccDiv">
                    <div class="card-header recommended-header">
                        ${titleData.type}
                    </div>
                    <div class="card-body recommended-body">
                        <h5 class="card-title recommended-title">${titleData.title}</h5>
                        <p class="card-text recommended-text">${titleData.description}</p>
                    </div>
                    <div class="card-footer text-muted recommended-genres">
                        ${titleData.genres}
                    </div>
                </div>
    `
}
// adds event listeners to dynamic accuracy buttons
function dynamicAccuracyButtons() {
    holderDiv.insertAdjacentHTML('afterbegin', addAccBtnFalse());
    holderDiv.insertAdjacentHTML('afterbegin', addAccBtnTrue());
    let accBtns = document.getElementsByClassName("accBtn");
    Array.from(accBtns).forEach( btn => {
        btn.addEventListener('click', () => {
            console.log(btn.dataset.bool);
        })
    })
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
            // gets recommended titles info back and dynamically creates cards and accuracy btns
            .then( res => {
                subheader.innerHTML = "Here are you recommendations!"
                console.log(res);
                let reccData = res.data;
                if (reccData.length > 0) {
                    reccData.forEach( show => {
                        holderDiv.insertAdjacentHTML('beforeend', addRecommendedCard(show));
                    });
                    dynamicAccuracyButtons();
                    return;
                } else {
                    subheader.innerHTML = "Hmm... We couldn't find any recommended titles for that title right now!";
                    return;
                }
            })
            .catch( err => {
                console.log(err);
                Subheader.innerHTML = "There was an error :( please try again";
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
    let dataVisBtn = document.getElementById('dataVisBtn');

    dataVisBtn.addEventListener('click', () => {
        clearDiv(holderDiv);
        holderDiv.insertAdjacentHTML('beforeend', addDataImages());
    })

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