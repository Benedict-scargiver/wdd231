const directoryUrl = 'data/discovery.json';

const displayPlaces = (places) => {
    const grid = document.querySelector('div.discover-grid');

    places.forEach((place) => {
        let card = document.createElement('section');
        card.classList.add('place-card');

        let title = document.createElement('h2');
        title.textContent = place.name;

        let figure = document.createElement('figure');
        let image = document.createElement('img');
        image.setAttribute('src', place.imageURL);
        image.setAttribute('alt', `${place.name}`);
        image.setAttribute('loading', 'lazy');
        image.setAttribute('width', '300');
        image.setAttribute('height', '200');
        figure.appendChild(image);

        let address = document.createElement('address');
        address.textContent = place.address;

        let description = document.createElement('p');
        description.textContent = place.description;

        let button = document.createElement('button');
        button.textContent = 'Learn More';
        button.classList.add('learn-more-btn');

        card.appendChild(title);
        card.appendChild(figure);
        card.appendChild(address);
        card.appendChild(description);
        card.appendChild(button);

        grid.appendChild(card);
    });
};

async function getPlaces() {
    const response = await fetch(directoryUrl);
    const data = await response.json();
    displayPlaces(data.places);
}

getPlaces();

const displayVisitMessage = () => {
    const sidebar = document.querySelector('.visit-tab');
    const lastVisit = localStorage.getItem('lastVisit');
    const now = new Date();

    if (!lastVisit) {
        sidebar.textContent = "Welcome! Let us know if you have any questions.";
    } else {
        const lastVisitDate = new Date(lastVisit);
        const timeDifference = now - lastVisitDate;
        const daysDifference = Math.floor(timeDifference / (1000 * 60 * 60 * 24));

        if (daysDifference < 1) {
            sidebar.textContent = "Back so soon! Awesome!";
        } else if (daysDifference === 1) {
            sidebar.textContent = "You last visited 1 day ago.";
        } else {
            sidebar.textContent = `You last visited ${daysDifference} days ago.`;
        }
    }

    localStorage.setItem('lastVisit', now.toISOString());
};

displayVisitMessage();