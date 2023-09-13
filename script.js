const APILINK = 'https://api.themoviedb.org/3/discover/movie?sort_by=popularity.desc&api_key=f763245052333f692c0a0115a566fb6f&page=1';
const IMG_PATH = "https://image.tmdb.org/t/p/w1280";
const SEARCHAPI = "https://api.themoviedb.org/3/search/movie?api_key=f763245052333f692c0a0115a566fb6f&query=";

const main = document.getElementById("section");
const form = document.getElementById("form");
const search = document.getElementById("query");

// Function to add click event listeners to images and toggle red border
function addClickEventToImages() {
    const images = document.querySelectorAll('.thumbnail'); // Select all images with the class 'thumbnail'

    images.forEach(image => {
        image.addEventListener('click', () => {
            const card = image.parentElement.parentElement; // Find the 'card' element containing the clicked image

            if (card) {
                card.classList.toggle('red-border'); // Add or remove the 'red-border' class for the card element
            }
        });
    });
}

// Function to fetch and display movies based on the provided URL
function returnMovies(url) {
    fetch(url)
        .then(res => res.json())
        .then(function (data) {
            console.log(data.results);
            data.results.forEach(element => {
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

            // Call the function to add click events to images after they are added to the DOM
            addClickEventToImages();
        });
}

// Event listener for form submission
form.addEventListener("submit", (e) => {
    e.preventDefault();
    main.innerHTML = ''; // Clear the content in the 'section'

    const searchItem = search.value;

    if (searchItem) {
        // Fetch and display movies based on the user's search query
        returnMovies(SEARCHAPI + searchItem);
        search.value = "";
    }
});

// Call the function to initially load and display popular movies
returnMovies(APILINK);
