let allPokemons = [];

fetch('./data/data.json')
  .then(function(response) {
    return response.json();
  })
  .then(function(pokemons) {
    allPokemons = pokemons;
    afficherPokemons(1);

    const select = document.getElementById('generation-select');
    select.addEventListener('change', function() {
      afficherPokemons(parseInt(this.value));
    });
  })
  .catch(function(error) {
    console.error('Erreur :', error);
  });

function afficherPokemons(generation) {
  const main = document.querySelector('main');
  main.innerHTML = '';

  const filtered = allPokemons.filter(function(p) {
    return p.apiGeneration === generation;
  });

  if (filtered.length === 0) {
    main.innerHTML = '<p class="empty">Aucun Pokémon pour cette génération.</p>';
    return;
  }

  filtered.forEach(function(pokemon) {
    const couleur = getCouleurType(pokemon.apiTypes[0].name);

    const article = document.createElement('article');
    article.style.borderColor = couleur;
    article.style.backgroundColor = couleur;

    const types = pokemon.apiTypes
      .map(function(type) {
        return '<span class="types">' + type.name + '</span>';
      })
      .join(' ');

    article.innerHTML = `
      <figure>
        <picture>
          <img src="${pokemon.image}" alt="Image ${pokemon.name}" />
        </picture>
        <figcaption>
          ${types}
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

    main.appendChild(article);
  });
}

function getCouleurType(type) {
  switch (type) {
    case 'Plante':   return '#4caf50';
    case 'Feu':      return '#cc6e1a';
    case 'Eau':      return '#1a1aff';
    case 'Poison':   return '#a040a0';
    case 'Électrik': return '#f0c030';
    case 'Psy':      return '#f85888';
    case 'Spectre':  return '#705898';
    case 'Dragon':   return '#7038f8';
    case 'Glace':    return '#98d8d8';
    case 'Normal':   return '#a8a878';
    case 'Vol':      return '#a890f0';
    case 'Combat':   return '#c03028';
    case 'Acier':    return '#b8b8d0';
    case 'Fée':      return '#ee99ac';
    case 'Ténèbres': return '#705848';
    case 'Sol':      return '#e0c068';
    default:         return 'grey';
  }
}