let allPokemons = [];
let currentGeneration = 1;
let currentType = null;
let currentSort = 'id';

// Couleurs associées aux types de Pokémon
const typeColors = {
  Plante: '#4caf50',
  Feu: '#cc6e1a',
  Eau: '#1a1aff',
  Poison: '#a040a0',
  Électrik: '#f0c030',
  Psy: '#f85888',
  Spectre: '#705898',
  Dragon: '#7038f8',
  Glace: '#98d8d8',
  Normal: '#a8a878',
  Vol: '#a890f0',
  Combat: '#c03028',
  Acier: '#b8b8d0',
  Fée: '#ee99ac',
  Ténèbres: '#705848',
  Sol: '#e0c068',
};

// Gestion des tris disponibles
const sorters = {
  nom: (a, b) => a.name.localeCompare(b.name),
  hp: (a, b) => b.stats.HP - a.stats.HP,
  attaque: (a, b) => b.stats.attack - a.stats.attack,
  defense: (a, b) => b.stats.defense - a.stats.defense,
  vitesse: (a, b) => b.stats.speed - a.stats.speed,
  type: (a, b) => a.apiTypes[0].name.localeCompare(b.apiTypes[0].name),
  id: (a, b) => a.apiId - b.apiId,
};

// Retourne la couleur d’un type (fallback gris si inconnu)
const getTypeColor = (typeName) => typeColors[typeName] ?? 'grey';

// Filtre + tri des Pokémon selon génération / type / tri choisi
const filterAndSortPokemons = () => {
  let list = allPokemons.filter(
    pokemon => pokemon.apiGeneration === currentGeneration
  );

  if (currentType) {
    list = list.filter(pokemon =>
      pokemon.apiTypes.some(type => type.name === currentType)
    );
  }

  return [...list].sort(sorters[currentSort] ?? sorters.id);
};

// Création d’une carte Pokémon
const createCard = (pokemon) => {
  const primaryType = pokemon.apiTypes[0]?.name;
  const color = getTypeColor(primaryType);

  const article = document.createElement('article');
  article.style.borderColor = color;
  article.style.backgroundColor = color;

  article.innerHTML = `
    <figure>
      <picture>
        <img src="${pokemon.image}" alt="${pokemon.name}" />
      </picture>

      <figcaption>
        ${pokemon.apiTypes
          .map(type => `<span class="types">${type.name}</span>`)
          .join(' ')}

        <h2>${pokemon.name}</h2>

        <ol>
          <li>Points de vie : ${pokemon.stats.HP}</li>
          <li>Attaque : ${pokemon.stats.attack}</li>
          <li>Défense : ${pokemon.stats.defense}</li>
          <li>Attaque spéciale : ${pokemon.stats.special_attack}</li>
          <li>Vitesse : ${pokemon.stats.speed}</li>
        </ol>
      </figcaption>
    </figure>
  `;

  return article;
};

// Génération des boutons de filtre par type
const renderTypeButtons = (pokemons) => {
  const container = document.getElementById('types-container');

  const uniqueTypes = [...new Set(
    pokemons.flatMap(pokemon => pokemon.apiTypes.map(type => type.name))
  )].sort();

  container.innerHTML = '';

  // bouton "Tous" + types uniques
  [null, ...uniqueTypes].forEach(typeName => {
    const button = document.createElement('button');

    button.textContent = typeName ?? 'Tous';
    button.className = `type-btn${currentType === typeName ? ' active' : ''}`;

    if (typeName) {
      button.style.backgroundColor = getTypeColor(typeName);
    }

    button.addEventListener('click', () => {
      currentType = typeName;
      render();
    });

    container.appendChild(button);
  });
};

// Rendu principal de l’application
const render = () => {
  const pokemonsOfGeneration = allPokemons.filter(
    pokemon => pokemon.apiGeneration === currentGeneration
  );

  renderTypeButtons(pokemonsOfGeneration);

  const main = document.querySelector('main');
  const pokemons = filterAndSortPokemons();

  main.innerHTML = '';

  // Message si aucun résultat
  if (pokemons.length === 0) {
    main.innerHTML = '<p class="empty">Aucun Pokémon pour ces critères.</p>';
    return;
  }

  // Affichage des cartes
  pokemons.forEach(pokemon => main.appendChild(createCard(pokemon)));
};

// Chargement des données + init app
fetch('./data/data.json')
  .then(response => response.json())
  .then(data => {
    allPokemons = data;
    render();

    // Changement de génération
    document.getElementById('generation-select').addEventListener('change', function () {
      currentGeneration = Number(this.value);
      currentType = null;
      render();
    });

    // Changement de tri
    document.getElementById('sort-select').addEventListener('change', function () {
      currentSort = this.value;
      render();
    });
  })
  .catch(console.error);