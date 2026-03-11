let allPokemons = [];
let currentGeneration = 1;
let currentType = null;
let currentSort = 'id';

const typeColors = {
  Plante: '#4caf50', Feu: '#cc6e1a', Eau: '#1a1aff', Poison: '#a040a0',
  Électrik: '#f0c030', Psy: '#f85888', Spectre: '#705898', Dragon: '#7038f8',
  Glace: '#98d8d8', Normal: '#a8a878', Vol: '#a890f0', Combat: '#c03028',
  Acier: '#b8b8d0', Fée: '#ee99ac', Ténèbres: '#705848', Sol: '#e0c068',
};

const sorters = {
  nom:     (a, b) => a.name.localeCompare(b.name),
  hp:      (a, b) => b.stats.HP - a.stats.HP,
  attaque: (a, b) => b.stats.attack - a.stats.attack,
  defense: (a, b) => b.stats.defense - a.stats.defense,
  vitesse: (a, b) => b.stats.speed - a.stats.speed,
  type:    (a, b) => a.apiTypes[0].name.localeCompare(b.apiTypes[0].name),
  id:      (a, b) => a.apiId - b.apiId,
};

const getColor = (type) => typeColors[type] ?? 'grey';

const getFilteredSortedPokemons = () => {
  let list = allPokemons.filter(p => p.apiGeneration === currentGeneration);
  if (currentType) list = list.filter(p => p.apiTypes.some(t => t.name === currentType));
  return [...list].sort(sorters[currentSort] ?? sorters.id);
};

const createCard = (pokemon) => {
  const color = getColor(pokemon.apiTypes[0].name);
  const article = document.createElement('article');
  article.style.borderColor = article.style.backgroundColor = color;
  article.innerHTML = `
    <figure>
      <picture><img src="${pokemon.image}" alt="${pokemon.name}" /></picture>
      <figcaption>
        ${pokemon.apiTypes.map(t => `<span class="types">${t.name}</span>`).join(' ')}
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

const renderTypeButtons = (pokemons) => {
  const container = document.getElementById('types-container');
  const uniqueTypes = [...new Set(pokemons.flatMap(p => p.apiTypes.map(t => t.name)))].sort();

  container.innerHTML = '';

  [null, ...uniqueTypes].forEach(type => {
    const btn = document.createElement('button');
    btn.textContent = type ?? 'Tous';
    btn.className = 'type-btn' + (currentType === type ? ' active' : '');
    if (type) btn.style.backgroundColor = getColor(type);
    btn.addEventListener('click', () => { currentType = type; render(); });
    container.appendChild(btn);
  });
};

const render = () => {
  const byGen = allPokemons.filter(p => p.apiGeneration === currentGeneration);
  renderTypeButtons(byGen);

  const pokemons = getFilteredSortedPokemons();
  const main = document.querySelector('main');
  main.innerHTML = pokemons.length === 0
    ? '<p class="empty">Aucun Pokémon pour ces critères.</p>'
    : '';
  pokemons.forEach(p => main.appendChild(createCard(p)));
};

fetch('./data/data.json')
  .then(r => r.json())
  .then(data => {
    allPokemons = data;
    render();
    document.getElementById('generation-select').addEventListener('change', function () {
      currentGeneration = parseInt(this.value);
      currentType = null;
      render();
    });
    document.getElementById('sort-select').addEventListener('change', function () {
      currentSort = this.value;
      render();
    });
  })
  .catch(console.error);