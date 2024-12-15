class ApiBackend {
    constructor(apiUrl) {
        this.apiUrl = apiUrl;
    }

    async loadAllChallenges() {
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

    async add(listElem) {
        try {
            const challengesFromApi = await this.backend.loadAllChallenges();

            challengesFromApi.forEach(filmData => {
                const film = this.render(filmData);
                this.films.push(film);
                listElem.appendChild(film);
            });
        } catch (error) {
            console.error('Error(trying to load film list):', error);
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

const backend = new ApiBackend("https://my-api-7hk4.onrender.com");
const filmList = new LoadFilms(backend);

filmList.add(document.querySelector('.movies-container'));