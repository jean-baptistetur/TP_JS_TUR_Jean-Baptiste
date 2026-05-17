class Type {
  constructor({ name, image = null }) {
    this.name = name;
    this.image = image;
    this.color = Type.getColor(name);
  }

  // Couleur associée au type
  static getColor(name) {
    const colors = {
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

    return colors[name] ?? '#808080';
  }
}

class Pokemon {
  constructor(data) {
    this.id = data.apiId;
    this.name = data.name;
    this.image = data.image;
    this.generation = data.apiGeneration;
    this.types = data.apiTypes.map(t => new Type(t));

    const stats = data.stats;
    this.stats = {
      hp: stats.HP,
      attack: stats.attack,
      defense: stats.defense,
      specialAttack: stats.special_attack,
      speed: stats.speed,
    };
  }

  // Carte HTML du Pokémon
  createCard() {
    const primaryColor = this.types[0]?.color ?? '#ccc';

    const el = document.createElement('article');
    el.style.borderColor = primaryColor;
    el.style.backgroundColor = primaryColor;

    el.innerHTML = `
      <figure>
        <img src="${this.image}" alt="${this.name}" />

        <figcaption>
          <div class="types">
            ${this.types.map(t => `<span>${t.name}</span>`).join(' ')}
          </div>

          <h2>${this.name}</h2>

          <ul>
            <li>PV : ${this.stats.hp}</li>
            <li>Attaque : ${this.stats.attack}</li>
            <li>Défense : ${this.stats.defense}</li>
            <li>Att. spéciale : ${this.stats.specialAttack}</li>
            <li>Vitesse : ${this.stats.speed}</li>
          </ul>
        </figcaption>
      </figure>
    `;

    return el;
  }
}

let pokemons = [];
let generation = 1;
let selectedType = null;
let sortMode = 'id';

const sorters = {
  nom: (a, b) => a.name.localeCompare(b.name),
  hp: (a, b) => b.stats.hp - a.stats.hp,
  attaque: (a, b) => b.stats.attack - a.stats.attack,
  defense: (a, b) => b.stats.defense - a.stats.defense,
  vitesse: (a, b) => b.stats.speed - a.stats.speed,
  type: (a, b) => a.types[0].name.localeCompare(b.types[0].name),
  id: (a, b) => a.id - b.id,
};

// Pokémons visibles selon les filtres
function getVisiblePokemons() {
  let list = pokemons.filter(p => p.generation === generation);

  if (selectedType) {
    list = list.filter(p =>
      p.types.some(t => t.name === selectedType)
    );
  }

  return list.sort(sorters[sortMode] ?? sorters.id);
}

// Boutons de filtre par type
function renderTypeButtons(list) {
  const container = document.getElementById('types-container');
  container.innerHTML = '';

  const types = [
    null,
    ...new Set(list.flatMap(p => p.types.map(t => t.name))),
  ].sort();

  types.forEach(type => {
    const btn = document.createElement('button');

    btn.textContent = type ?? 'Tous';
    btn.className = 'type-btn' + (selectedType === type ? ' active' : '');

    if (type) {
      btn.style.backgroundColor = new Type({ name: type }).color;
    }

    btn.onclick = () => {
      selectedType = type;
      render();
    };

    container.appendChild(btn);
  });
}

// Rendu principal
function render() {
  const baseList = pokemons.filter(p => p.generation === generation);

  renderTypeButtons(baseList);

  const visible = getVisiblePokemons();
  const main = document.querySelector('main');

  main.innerHTML = '';

  if (!visible.length) {
    main.innerHTML = '<p class="empty">Aucun Pokémon trouvé.</p>';
    return;
  }

  visible.forEach(p => main.appendChild(p.createCard()));
}

// Chargement initial
fetch('./data/data.json')
  .then(r => r.json())
  .then(data => {
    pokemons = data.map(d => new Pokemon(d));

    render();

    document.getElementById('generation-select').onchange = e => {
      generation = +e.target.value;
      selectedType = null;
      render();
    };

    document.getElementById('sort-select').onchange = e => {
      sortMode = e.target.value;
      render();
    };
  })
  .catch(console.error);