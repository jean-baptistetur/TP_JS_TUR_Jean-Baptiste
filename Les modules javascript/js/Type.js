const typeColors = {
  Plante: '#4caf50', Feu: '#cc6e1a', Eau: '#1a1aff', Poison: '#a040a0',
  Électrik: '#f0c030', Psy: '#f85888', Spectre: '#705898', Dragon: '#7038f8',
  Glace: '#98d8d8', Normal: '#a8a878', Vol: '#a890f0', Combat: '#c03028',
  Acier: '#b8b8d0', Fée: '#ee99ac', Ténèbres: '#705848', Sol: '#e0c068',
};

export class Type {
  constructor(name) {
    this.name = name;
    this.color = typeColors[name] ?? 'grey';
  }
}