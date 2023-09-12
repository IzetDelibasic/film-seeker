const APILINK = 'https://api.themoviedb.org/3/discover/movie?sort_by=popularity.desc&api_key=f763245052333f692c0a0115a566fb6f&page=1';
const IMG_PATH = "https://image.tmdb.org/t/p/w1280";
const SEARCHAPI = "https://api.themoviedb.org/3/search/movie?api_key=f763245052333f692c0a0115a566fb6f&query=";
const main = document.getElementById("section");
const form = document.getElementById("form");
const search = document.getElementById("query");

// We added a new variable "responsiveLimit" to determine the number of movies in responsive view.
let responsiveLimit = window.innerWidth <= 768 ? 15 : 20;

returnMovies(APILINK, responsiveLimit);

function returnMovies(url, limit) {
    fetch(url)
        .then(res => res.json())
        .then(function(data) {
            console.log(data.results.slice(0, limit));

            data.results.slice(0, limit).forEach(element => {
                const div_card = document.createElement('div');
                div_card.setAttribute('class', 'card');

                const div_row = document.createElement('div');
                div_row.setAttribute('class', 'row');

                const div_column = document.createElement('div');
                div_column.setAttribute('class', 'column');

                const image = document.createElement('img');
                image.setAttribute('class', 'thumbnail');
                image.setAttribute('id', 'image');

                const title = document.createElement('h3');
                title.setAttribute('id', 'title');

                const center = document.createElement('center');

                title.innerHTML = `${element.title}`;
                image.src = IMG_PATH + element.poster_path;

                center.appendChild(image);
                div_card.appendChild(center);
                div_card.appendChild(title);
                div_column.appendChild(div_card);
                div_row.appendChild(div_column);

                main.appendChild(div_row);
            });
        });
}

form.addEventListener("submit", (e) => {
    e.preventDefault();
    main.innerHTML = '';

    const searchItem = search.value;

    if (searchItem) {
        // Adjusted the limit for responsive view to 15.
        responsiveLimit = window.innerWidth <= 768 ? 15 : 20;
        returnMovies(SEARCHAPI + searchItem, responsiveLimit);
        search.value = "";
    }
});

// Added an event listener for window resize to dynamically update the limit for responsive view.
window.addEventListener('resize', () => {
    responsiveLimit = window.innerWidth <= 768 ? 15 : 20;
    main.innerHTML = ''; 
    returnMovies(APILINK, responsiveLimit);
});
