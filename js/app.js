async function getAPIData(url) {
    try {
        let response = await fetch(url);

        if (!response.ok) {
            //const message = `An error has occured: ${response.status}`;
            //console.log(message);
            return null;
        }

        const data = await response.json();

        return data;
        
    } catch(error) {
        console.error(error);
    }
}

function findGetParameter(parameterName) {
    var result = null,
        tmp = [];
    location.search
        .substr(1)
        .split("&")
        .forEach(function (item) {
        tmp = item.split("=");
        if (tmp[0] === parameterName) result = decodeURIComponent(tmp[1]);
        });
    return result;
}



const moviesList = document.querySelector(".moviesList-js");

let templateCardMovie = (id, title, summary, genre) => {
    let template = `<div class="col g-4">
        <div class="card" style="min-height:270px;">
            <div class="card-body d-flex flex-column justify-content-between">
                <div class="d-flex justify-content-between align-items-baseline">
                    <h5 class="card-title">${title}</h5>`;

                    if(genre) {
                        template += `<small class="text-muted text-uppercase">${genre}</small>`;
                    }
                            
                template += `</div><p class="card-text" style="height:6rem;overflow:hidden;">${summary}</p>
                <a class="btn btn-success ms-auto seeMovie${id}-js">More</a>
            </div>
        </div>
    </div>`;
    return template;
}

async function displayMovies() {
    const movies = await getAPIData('http://localhost:8080/api/movies');
    return movies;
}

if(moviesList) {                
    displayMovies()
        .then(function(movies){
            for(let movie of movies) {
                fetch('http://localhost:8080/api/movies/' + movie.id + '/genres')
                .then(function(response) {
                    if(response.ok) {
                        response.json().then(function(json){
                            moviesList.insertAdjacentHTML('beforeend',templateCardMovie(movie.id, movie.title, movie.summary, json.name));
                            let params = `resizable=yes,scrollbars=yes,status=no,location=no,toolbar=no,menubar=no,width=600,height=450,left=300,top=150`;
                            document.querySelector(`.seeMovie${movie.id}-js`).onclick = () => {window.open(`viewmovie.html?id=${movie.id}`, movie.title, params)};
                        })
                    } else {
                        moviesList.insertAdjacentHTML('beforeend',templateCardMovie(movie.id, movie.title, movie.summary));
                        let params = `resizable=yes,scrollbars=yes,status=no,location=no,toolbar=no,menubar=no,width=600,height=450,left=300,top=150`;
                        document.querySelector(`.seeMovie${movie.id}-js`).onclick = () => {window.open(`viewmovie.html?id=${movie.id}`, movie.title, params)};
                        console.log('Bad response');
                    }

                });
            }
        })
}


const searchBar = document.querySelector('#search');
const results = document.querySelector('#result');
    
let templateSearchResults = (id, title, summary, genre = null) => {
    let template = `<div class="col g-2">
        <div class="card">
            <div class="card-body d-flex flex-column">
                <h5 class="card-title">${title}</h5>
                <span class="card-text" style="max-height:3rem;overflow:hidden;">${summary}</span>
                <a class="btn btn-success ms-auto seeMovie${id}-js">More</a>
            </div>
        </div>
    </div>`;
    return template;
}

if(searchBar) {
    searchBar.addEventListener('keyup', (event) => {
        let searchInput = searchBar.value;
        results.innerHTML = '';
    
        if(!searchInput) {
            return;
        }
    
        async function displayResults(search) {
            const movies = await getAPIData('http://localhost:8080/api/movies/search/' + search);
            return movies;
        }
                    
        displayResults(searchInput)
            .then(function(movies){
                for(let movie of movies) {
                    results.insertAdjacentHTML('beforeend', templateSearchResults(movie.id, movie.title, movie.summary));
                    let params = `resizable=yes,scrollbars=yes,status=no,location=no,toolbar=no,menubar=no,width=600,height=450,left=300,top=150`;
                    document.querySelector(`.seeMovie${movie.id}-js`).onclick = () => {window.open(`viewmovie.html?id=${movie.id}`, movie.title, params)};      
                }
            })
    
    })
}

function outsideClick(event, notelem)	{
    var clickedOut = true, i, len = notelem.length;
    for (i = 0;i < len;i++)  {
        if (event.target == notelem[i] || notelem[i].contains(event.target)) {
            clickedOut = false;
        }
    }
    if (clickedOut) return true;
    else return false;
}

var modal = [document.getElementById("search"), document.getElementById("result")];
window.addEventListener('click', function(e) {
   if (outsideClick(e, modal)) {
       results.innerHTML = '';
   }
});



const movieId = findGetParameter('id');
const movieDisplay = document.querySelector(".movie-js");
    
const templateMovie = (id, title, summary, prod_year, genre, producer) => {
    let template = `
            <h3 class="mb-3">${title}</h3>
            <div class="my-3">
                <h6>Summary</h6>
            <div class="">${summary}</div></div>`;
    
    if(prod_year) {
        template += `<div class="my-3"><h6>Production year</h6><div>${prod_year}</div></div>`;
    }
                
    if(genre) {
        template += `<div class="my-3"><h6>Genre</h6><div class="text-capitalize">${genre.name}</div></div>`;
    }
    
    if(producer) {
        template += `<div class="my-3"><h6>Producer</h6><div class="text-capitalize">${producer.name}</div></div>`;
    }
    
    return template;
}
    
async function displayMovie(id) {
    const movie = await getAPIData('http://localhost:8080/api/movies/' + id);
    const genre = await getAPIData('http://localhost:8080/api/movies/' + id + '/genres');
    const producer = await getAPIData('http://localhost:8080/api/movies/' + id + '/producers');
    
    //console.log('displaymovie', [movie, genre, producer]);
    return [movie, genre , producer];
            
}

if(movieDisplay) {   
    displayMovie(movieId)
        .then(function([movie, genre, producer]){
            if(movie === null) {
                movieDisplay.insertAdjacentHTML('beforeend', '<div>Movie not found !</div>');
            } else {
                movieDisplay.insertAdjacentHTML('beforeend',templateMovie(movie.id, movie.title, movie.summary, movie.prod_year, genre, producer));
            }
        })
}