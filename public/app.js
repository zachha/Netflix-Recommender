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
                        <a href="#" class="algoBtn btn btn-primary addBtn">Recommend!</a>
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
            axios.post('/getRecommendedTitles', {
                title: searchBox.value
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

    // Listens for the form button to fire off and then queries the database for the input movie or show
    searchForm.addEventListener('submit', (formData) => {
        console.log(searchBox.value);
        formData.preventDefault();
      
       axios.post('/getSearchedTitles', {
        searchTitle: searchBox.value
       })
       .then( res => {
            console.log(res);
            if (res.length > 0) {
                res.forEach( show => {
                    addNewCard(show);
                })
                subheader.innerHTML("Click on the title of something ")
                dynamicDivButtons();
                return
            } else {
                subheader.innerHTML("Hmm... We couldn't find any titles with that name, Try Again!")
            }
       })
       .catch( err => {
            console.log(err);
       });
    });
});