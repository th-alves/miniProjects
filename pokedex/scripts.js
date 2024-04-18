const gridContainer = document.getElementById("gridContainer");
let currentPage = 1;

function displayPokemonGrid(pokemonList) {
  gridContainer.innerHTML = "";
  pokemonList.forEach((pokemon) => {
    fetchPokemonDetails(pokemon.url);
  });
}

function fetchPokemon(offset) {
  const limit = 12;
  fetch(`https://pokeapi.co/api/v2/pokemon?limit=${limit}&offset=${offset}`)
    .then((response) => response.json())
    .then((data) => displayPokemonGrid(data.results))
    .catch((error) => console.log("Error do Fetch", error));
}

function fetchPokemonDetails(url) {
  fetch(url)
    .then((response) => response.json())
    .then((data) => displayPokemon(data))
    .catch((error) => console.log("Error do fetch", error));
}

function displayPokemon(pokemon) {
  const pokemonCard = document.createElement("div");
  pokemonCard.classList.add("pokemon-card");
  pokemonCard.innerHTML = `
  <img src="${pokemon.sprites.front_default}" alt="${pokemon.name}" />
    <h2>${pokemon.name}</h2>
    <p>Height: ${pokemon.height}</p>
    <p>Weight: ${pokemon.weight}</p>
  `;
  gridContainer.appendChild(pokemonCard);
}

function nextPage() {
  currentPage++;
  const offSet = (currentPage - 1) * 12;
  fetchPokemon(offSet);
}

function previousPage() {
  if (currentPage > 1) {
    currentPage--;
    const offSet = (currentPage - 1) * 12;
    fetchPokemon(offSet);
  }
}

fetchPokemon(0);
