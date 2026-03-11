  class Type {
    constructor(data) {
      this.name = data.name;
      this.image = data.image ?? null;
      this.color = this.getColorHexa();
    }

    getColorHexa() {
      const typeColors = {
        Plante: '#4caf50', Feu: '#cc6e1a', Eau: '#1a1aff', Poison: '#a040a0',
        Électrik: '#f0c030', Psy: '#f85888', Spectre: '#705898', Dragon: '#7038f8',
        Glace: '#98d8d8', Normal: '#a8a878', Vol: '#a890f0', Combat: '#c03028',
        Acier: '#b8b8d0', Fée: '#ee99ac', Ténèbres: '#705848', Sol: '#e0c068',
      };
      return typeColors[this.name] ?? '#808080';
    }
  }

  class Pokemon {
    constructor(data) {
      this.id = data.apiId;
      this.image = data.image;
      this.name = data.name;
      this.apiTypes = data.apiTypes.map(t => new Type(t));
      this.apiGeneration = data.apiGeneration;
      this.attack = data.stats.attack;
      this.defense = data.stats.defense;
      this.special_attack = data.stats.special_attack;
      this.speed = data.stats.speed;
      this.hp = data.stats.HP;
    }

    displayCard() {
      const color = this.apiTypes[0].color;
      const article = document.createElement('article');
      article.style.borderColor = color;
      article.style.backgroundColor = color;
      article.innerHTML = `
        <figure>
          <picture><img src="${this.image}" alt="${this.name}" /></picture>
          <figcaption>
            ${this.apiTypes.map(t => `<span class="types">${t.name}</span>`).join(' ')}
            <h2>${this.name}</h2>
            <ol>
              <li>Points de vie : ${this.hp}</li>
              <li>Attaque : ${this.attack}</li>
              <li>Défense : ${this.defense}</li>
              <li>Attaque spécial : ${this.special_attack}</li>
              <li>Vitesse : ${this.speed}</li>
            </ol>
          </figcaption>
        </figure>
      `;
      return article;
    }
  }

  let allPokemons = [];
  let currentGeneration = 1;
  let currentType = null;
  let currentSort = 'id';

  const sorters = {
    nom:     (a, b) => a.name.localeCompare(b.name),
    hp:      (a, b) => b.hp - a.hp,
    attaque: (a, b) => b.attack - a.attack,
    defense: (a, b) => b.defense - a.defense,
    vitesse: (a, b) => b.speed - a.speed,
    type:    (a, b) => a.apiTypes[0].name.localeCompare(b.apiTypes[0].name),
    id:      (a, b) => a.id - b.id,
  };

  const getFilteredSortedPokemons = () => {
    let list = allPokemons.filter(p => p.apiGeneration === currentGeneration);
    if (currentType) list = list.filter(p => p.apiTypes.some(t => t.name === currentType));
    return [...list].sort(sorters[currentSort] ?? sorters.id);
  };

  const renderTypeButtons = (pokemons) => {
    const container = document.getElementById('types-container');
    const uniqueTypes = [...new Set(pokemons.flatMap(p => p.apiTypes.map(t => t.name)))].sort();

    container.innerHTML = '';

    [null, ...uniqueTypes].forEach(type => {
      const btn = document.createElement('button');
      btn.textContent = type ?? 'Tous';
      btn.className = 'type-btn' + (currentType === type ? ' active' : '');
      if (type) {
        const tempType = new Type({ name: type });
        btn.style.backgroundColor = tempType.color;
      }
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
    pokemons.forEach(p => main.appendChild(p.displayCard()));
  };

  fetch('./data/data.json')
    .then(r => r.json())
    .then(data => {
      allPokemons = data.map(d => new Pokemon(d));
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