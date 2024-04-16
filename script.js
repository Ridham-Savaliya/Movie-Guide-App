const searchForm = document.querySelector('form');
const movieContainer = document.querySelector('.movie-container');
const inputBox = document.querySelector('.inputbox');


// function to fetch movie details using API!

const getMovieInfo = async (movie) => {
    try {
        const myapikey = 'http://www.omdbapi.com/?i=tt3896198&apikey=783136ea';
        const url = `http://www.omdbapi.com/?apikey=783136ea &t=${movie}`;

        const response = await fetch(url);

        if (!response.ok) {
            throw new Error("Unable to fetch movie data!")
        }
        const data = await response.json();
        showMovieData(data);
    }
    catch (error) {
        showErrorMsg("No Movie Data Found&#10060");
    }
}
// function to show data in screen
const showMovieData = (data) => {


    movieContainer.innerHTML = "";
    movieContainer.classList.remove('noBackground')
    //  use destrunctring assignment to extract properties from data object
    const { Title, imdbRating, Genre, Released, Runtime, Actors, Plot, Poster, year } = data;


    const movieElement = document.createElement('div');
    movieElement.classList.add('movie-info');
    movieElement.innerHTML = `<h2>${Title}</h2><p><strong>Rating: &#11088;</strong>${imdbRating}</p>`;

    const movieGenreElement = document.createElement('div');
    movieGenreElement.classList.add('movie-genre');

    Genre.split(",").forEach(element => {
        const p = document.createElement('p');
        p.innerText = element;
        movieGenreElement.appendChild(p);

    });
    //     //   appending elements into the div at the end!

    movieElement.appendChild(movieGenreElement);
    movieElement.innerHTML += `<p><strong>Released Date:</strong>${Released}</p>
                                   <p><strong>Duration:</strong>${Runtime}</p> 
                                   <p><strong>Cast:</strong>${Actors}</p>
                                   <p><strong>Plot:</strong>${Plot}</p>`;

    // crerating div for movie poster

    const movieposter = document.createElement('div');
    movieposter.classList.add('movie-poster');
    movieposter.innerHTML = `<img src =${Poster} alt="img not found">`;
    movieContainer.appendChild(movieposter);
    movieContainer.appendChild(movieElement);
}

// function to display error message

const showErrorMsg = (messege) => {
    movieContainer.innerHTML = `<h2>${messege}</h2>`;
    movieContainer.classList.add('noBackground');
}

// function to handle form submission!
const formSubmit = (e) => {
    e.preventDefault();
    const moviename = inputBox.value.trim();
    if (moviename !== '') {
        showErrorMsg("Fetching Movie Information&#10227 ")
        getMovieInfo(moviename);
    }
    else {
        movieContainer.innerHTML = `<h2>Enter Moviename To Get Movie Information!<strong> &#9757</strong></h2>`
        movieContainer.classList.add('noBackground');
    }
}

// adding event listener to search form
searchForm.addEventListener('submit', formSubmit);

