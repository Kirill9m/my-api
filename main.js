class ApiBackend {
    constructor(apiUrl) {
        this.apiUrl = apiUrl;
    }

    async loadAllFilms() {
        const response = await fetch(this.apiUrl + '/movies');
        if (!response.ok) {
            throw new Error(`Failed to fetch movies: ${response.statusText}`);
        }
        const payload = await response.json();
        return payload;
    }
}

class LoadFilms {
    constructor(backend) {
        this.backend = backend;
        this.films = [];
    }

    async add(listElem, loadingElem) {
        try {
            loadingElem.style.display = 'block';

            const challengesFromApi = await this.backend.loadAllFilms();

            challengesFromApi.forEach(filmData => {
                const film = this.render(filmData);
                this.films.push(film);
                listElem.appendChild(film);
            });
        } catch (error) {
            console.error('Error(trying to load film list):', error);
        } finally {
            loadingElem.style.display = 'none';
        }
    }

    render(data) {
        const movieCard = document.createElement('div');
        movieCard.classList.add('movie-card');

        movieCard.innerHTML = `
            <img src="${data.image}" alt="${data.title}">
            <h3>${data.title}</h3>
            <p><strong>Datum:</strong> ${data.date}</p>
            <p><strong>Pris:</strong> ${data.price}SEK</p>
            <p><strong>Platser:</strong> ${data.seatsAvailable}</p>
        `;

        return movieCard;
    }
}

const loadingMessage = document.createElement('div');
loadingMessage.classList.add('loading-message');
loadingMessage.innerText = 'Api is starting\nLoading movies... Please wait.';
document.querySelector('.loading-message').appendChild(loadingMessage);

loadingMessage.style.display = 'none';

const backend = new ApiBackend("https://my-api-7hk4.onrender.com");
const filmList = new LoadFilms(backend);

filmList.add(document.querySelector('.movies-container'), loadingMessage);