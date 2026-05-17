import { Pokemon } from './Pokemon.js';

// ÉTAT GLOBAL
let allPokemons = [];
let currentGeneration = 1;
let currentType = null;
let currentSort = 'id';

// MÉTHODES DE TRI
const sorters = {
  nom: (a, b) => a.name.localeCompare(b.name),
  hp: (a, b) => b.stats.HP - a.stats.HP,
  attaque: (a, b) => b.stats.attack - a.stats.attack,
  defense: (a, b) => b.stats.defense - a.stats.defense,
  vitesse: (a, b) => b.stats.speed - a.stats.speed,
  type: (a, b) => a.apiTypes[0].name.localeCompare(b.apiTypes[0].name),
  id: (a, b) => a.apiId - b.apiId,
};

// FILTRAGE + TRI
const getFilteredSortedPokemons = () => {
  // Filtrer par génération
  let filtered = allPokemons.filter(
    p => p.apiGeneration === currentGeneration
  );

  // Filtrer par type si sélectionné
  if (currentType) {
    filtered = filtered.filter(p =>
      p.apiTypes.some(t => t.name === currentType)
    );
  }

  // Trier les résultats
  const sorter = sorters[currentSort] ?? sorters.id;
  return [...filtered].sort(sorter);
};

// CRÉATION D'UNE CARTE POKÉMON
const createCard = (pokemon) => {
  const mainType = pokemon.apiTypes[0];
  const color = mainType.color;

  const article = document.createElement('article');

  // Appliquer style dynamique
  article.style.borderColor = color;
  article.style.backgroundColor = color;

  // Générer le HTML
  article.innerHTML = `
    <figure>
      <picture>
        <img src="${pokemon.image}" alt="${pokemon.name}" />
      </picture>

      <figcaption>
        ${pokemon.apiTypes
          .map(t => `<span class="types">${t.name}</span>`)
          .join(' ')}

        <h2>${pokemon.name}</h2>

        <ol>
          <li>Points de vie : ${pokemon.stats.HP}</li>
          <li>Attaque : ${pokemon.stats.attack}</li>
          <li>Défense : ${pokemon.stats.defense}</li>
          <li>Attaque spécial : ${pokemon.stats.special_attack}</li>
          <li>Vitesse : ${pokemon.stats.speed}</li>
        </ol>
      </figcaption>
    </figure>
  `;

  return article;
};

// BOUTONS DE FILTRE PAR TYPE
const renderTypeButtons = (pokemons) => {
  const container = document.getElementById('types-container');

  // Extraire les types uniques
  const uniqueTypes = [
    ...new Set(
      pokemons.flatMap(p => p.apiTypes.map(t => t.name))
    )
  ].sort();

  container.innerHTML = '';

  // Ajouter bouton "Tous" et types
  [null, ...uniqueTypes].forEach(type => {
    const button = document.createElement('button');

    button.textContent = type ?? 'Tous';
    button.className =
      'type-btn' + (currentType === type ? ' active' : '');

    // Appliquer couleur du type
    if (type) {
      const foundType = pokemons
        .flatMap(p => p.apiTypes)
        .find(t => t.name === type);

      if (foundType) {
        button.style.backgroundColor = foundType.color;
      }
    }

    // Gérer le clic
    button.addEventListener('click', () => {
      currentType = type;
      render();
    });

    container.appendChild(button);
  });
};

// RENDER GLOBAL
const render = () => {
  const main = document.querySelector('main');

  // Récupérer pokémons de la génération actuelle
  const pokemonsOfGen = allPokemons.filter(
    p => p.apiGeneration === currentGeneration
  );

  // Mettre à jour les boutons de type
  renderTypeButtons(pokemonsOfGen);

  // Appliquer filtres et tri
  const pokemons = getFilteredSortedPokemons();

  // Afficher message si aucun résultat
  if (pokemons.length === 0) {
    main.innerHTML =
      '<p class="empty">Aucun Pokémon pour ces critères.</p>';
    return;
  }

  // Afficher les cartes
  main.innerHTML = '';
  pokemons.forEach(p =>
    main.appendChild(createCard(p))
  );
};

// INITIALISATION
fetch('./data/data.json')
  .then(response => response.json())
  .then(data => {
    // Convertir en instances de classe
    allPokemons = data.map(d => new Pokemon(d));

    render();

    // Gérer changement de génération
    document
      .getElementById('generation-select')
      .addEventListener('change', function () {
        currentGeneration = parseInt(this.value);
        currentType = null; // Réinitialiser filtre
        render();
      });

    // Gérer changement de tri
    document
      .getElementById('sort-select')
      .addEventListener('change', function () {
        currentSort = this.value;
        render();
      });
  })
  .catch(console.error);