document.addEventListener("DOMContentLoaded", async () => {
  const dataUrl = "data/art.json";
  const container = document.getElementById("gallery");
  const filterSelect = document.getElementById("filter");
  const modal = document.getElementById("modal");
  const modalContent = document.getElementById("modal-content");
  const closeBtn = document.getElementById("close-modal");

  let places = [];

  try {
    const response = await fetch(dataUrl);
    const json = await response.json();
    places = json.places;
    displayPlaces(places);
    populateFilters(places);
  } catch (error) {
    container.innerHTML = "<p>Failed to load data.</p>";
    console.error(error);
  }

  function displayPlaces(data) {
    container.innerHTML = "";
    data.forEach(place => {
      const card = document.createElement("div");
      card.className = "card";
      card.innerHTML = `
        <img src="${place.imageURL}" alt="${place.name}" loading="lazy">
        <h3>${place.name}</h3>
        <p><strong>Artist:</strong> ${place.artist}</p>
        <button class="details-btn">View Details</button>
      `;
      const button = card.querySelector(".details-btn");
      button.addEventListener("click", () => showModal(place));
      container.appendChild(card);
    });
  }

  function populateFilters(data) {
    const artists = [...new Set(data.map(p => p.artist))];
    const placeNames = [...new Set(data.map(p => p.name))];
    const allOptions = [...artists, ...placeNames]; // removed .sort()

    allOptions.forEach(opt => {
      const option = document.createElement("option");
      option.value = opt;
      option.textContent = opt;
      filterSelect.appendChild(option);
    });

    filterSelect.addEventListener("change", () => {
      const value = filterSelect.value.toLowerCase();
      const filtered = places.filter(p =>
        p.artist.toLowerCase().includes(value) ||
        p.name.toLowerCase().includes(value)
      );
      displayPlaces(filtered);
    });
  }

  function showModal(place) {
    modalContent.innerHTML = `
      <h2>${place.name}</h2>
      <img src="${place.imageURL}" alt="${place.name}" loading="lazy">
      <p><strong>Artist:</strong> ${place.artist}</p>
      <p>${place.description}</p>
    `;
    modal.style.display = "block";
  }

  closeBtn.addEventListener("click", () => {
    modal.style.display = "none";
  });

  window.addEventListener("click", e => {
    if (e.target === modal) {
      modal.style.display = "none";
    }
  });
});
