fetch('./data/data.json')
  .then(function(response) {
    return response.json();
  })
  .then(function(pokemons) {
    console.log('Données récupérées :', pokemons);

    const main = document.querySelector('main');

    pokemons.forEach(function(pokemon) {
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
  })
  .catch(function(error) {
    console.error('Erreur :', error);
  });

function getCouleurType(type) {
  switch (type) {
    case 'Plante':
      return '#4caf50';
    case 'Feu':
      return '#cc6e1a';
    case 'Eau':
      return '#1a1aff';
    case 'Poison':
      return '#a040a0';
    default:
      return 'grey';
  }
}