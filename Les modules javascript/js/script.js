import { Pokemon } from './Pokemon.js';

/* ================================
   ÉTAT GLOBAL
================================ */
let allPokemons = [];
let currentGeneration = 1;
let currentType = null;
let currentSort = 'id';


/* ================================
   MÉTHODES DE TRI
================================ */
const sorters = {
  nom: (a, b) => a.name.localeCompare(b.name),

  hp: (a, b) => b.stats.HP - a.stats.HP,
  attaque: (a, b) => b.stats.attack - a.stats.attack,
  defense: (a, b) => b.stats.defense - a.stats.defense,
  vitesse: (a, b) => b.stats.speed - a.stats.speed,

  type: (a, b) =>
    a.apiTypes[0].name.localeCompare(b.apiTypes[0].name),

  id: (a, b) => a.apiId - b.apiId,
};


/* ================================
   FILTRAGE + TRI
================================ */
const getFilteredSortedPokemons = () => {
  // 1. Filtrer par génération
  let filtered = allPokemons.filter(
    p => p.apiGeneration === currentGeneration
  );

  // 2. Filtrer par type (si sélectionné)
  if (currentType) {
    filtered = filtered.filter(p =>
      p.apiTypes.some(t => t.name === currentType)
    );
  }

  // 3. Trier
  const sorter = sorters[currentSort] ?? sorters.id;
  return [...filtered].sort(sorter);
};


/* ================================
   CRÉATION D'UNE CARTE POKÉMON
================================ */
const createCard = (pokemon) => {
  const mainType = pokemon.apiTypes[0];
  const color = mainType.color;

  const article = document.createElement('article');

  // Style dynamique
  article.style.borderColor = color;
  article.style.backgroundColor = color;

  // Contenu HTML
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


/* ================================
   BOUTONS DE FILTRE PAR TYPE
================================ */
const renderTypeButtons = (pokemons) => {
  const container = document.getElementById('types-container');

  // Extraire tous les types uniques
  const uniqueTypes = [
    ...new Set(
      pokemons.flatMap(p => p.apiTypes.map(t => t.name))
    )
  ].sort();

  container.innerHTML = '';

  // Ajouter bouton "Tous" + types
  [null, ...uniqueTypes].forEach(type => {
    const button = document.createElement('button');

    button.textContent = type ?? 'Tous';
    button.className =
      'type-btn' + (currentType === type ? ' active' : '');

    // Couleur du bouton
    if (type) {
      const foundType = pokemons
        .flatMap(p => p.apiTypes)
        .find(t => t.name === type);

      if (foundType) {
        button.style.backgroundColor = foundType.color;
      }
    }

    // Action au clic
    button.addEventListener('click', () => {
      currentType = type;
      render();
    });

    container.appendChild(button);
  });
};


/* ================================
   RENDER GLOBAL
================================ */
const render = () => {
  const main = document.querySelector('main');

  // Pokémons de la génération actuelle
  const pokemonsOfGen = allPokemons.filter(
    p => p.apiGeneration === currentGeneration
  );

  // Mettre à jour les boutons de type
  renderTypeButtons(pokemonsOfGen);

  // Appliquer filtres + tri
  const pokemons = getFilteredSortedPokemons();

  // Message si aucun résultat
  if (pokemons.length === 0) {
    main.innerHTML =
      '<p class="empty">Aucun Pokémon pour ces critères.</p>';
    return;
  }

  // Affichage des cartes
  main.innerHTML = '';
  pokemons.forEach(p =>
    main.appendChild(createCard(p))
  );
};


/* ================================
   INITIALISATION
================================ */
fetch('./data/data.json')
  .then(response => response.json())
  .then(data => {
    // Transformer en instances de classe
    allPokemons = data.map(d => new Pokemon(d));

    render();

    // Changement de génération
    document
      .getElementById('generation-select')
      .addEventListener('change', function () {
        currentGeneration = parseInt(this.value);
        currentType = null; // reset filtre
        render();
      });

    // Changement de tri
    document
      .getElementById('sort-select')
      .addEventListener('change', function () {
        currentSort = this.value;
        render();
      });
  })
  .catch(console.error);