function getCouleurType(type) {
  switch (type) {
    case 'Plante':   return '#4caf50';
    case 'Feu':      return '#cc6e1a';
    case 'Eau':      return '#1a7acc';
    case 'Poison':   return '#a040a0';
    case 'Vol':      return '#7b9eb8';
    case 'Insecte':  return '#8aac2a';
    case 'Normal':   return '#a8a87a';
    case 'Électrik': return '#e8c000';
    case 'Sol':      return '#c8a53c';
    case 'Fée':      return '#d685ad';
    case 'Combat':   return '#c03028';
    case 'Psy':      return '#f85888';
    case 'Roche':    return '#b8a038';
    case 'Glace':    return '#78c8c8';
    case 'Dragon':   return '#7038f8';
    case 'Spectre':  return '#705898';
    case 'Acier':    return '#b8b8d0';
    case 'Ténèbres': return '#705848';
    default:         return 'grey';
  }
}

function loadData(generation) {
  const main = document.querySelector('main');
  main.innerHTML = '';

  fetch('https://pokebuildapi.fr/api/v1/pokemon/generation/' + generation)
    .then(function(response) {
      return response.json();
    })
    .then(function(pokemons) {
      pokemons.forEach(function(pokemon) {
        const couleur = getCouleurType(pokemon.apiTypes[0].name);

        const article = document.createElement('article');
        article.style.borderColor = couleur;
        article.style.backgroundColor = couleur;

        const types = pokemon.apiTypes
          .map(function(type) {
            return '<span>' + type.name + '</span>';
          })
          .join('');

        article.innerHTML = `
          <figure>
            <picture>
              <img src="${pokemon.image}" alt="Image ${pokemon.name}" />
            </picture>
            <figcaption>
              <h2>${pokemon.name}</h2>
              <div class="types">${types}</div>
              <ol>
                <li>HP : ${pokemon.stats.HP}</li>
                <li>Attaque : ${pokemon.stats.attack}</li>
                <li>Défense : ${pokemon.stats.defense}</li>
                <li>Atk. Spé. : ${pokemon.stats.special_attack}</li>
                <li>Vitesse : ${pokemon.stats.speed}</li>
              </ol>
            </figcaption>
          </figure>
        `;

        main.appendChild(article);
      });
    })
    .catch(function(error) {
      console.error('Erreur :', error);
    });
}

document.getElementById('generation-select').addEventListener('change', function() {
  const gen = parseInt(this.value);
  console.log('Génération sélectionnée :', gen);
  loadData(gen);
});

loadData(1);