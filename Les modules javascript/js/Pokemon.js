import { Type } from './Type.js';

/* ================================
   CLASSE POKÉMON
================================ */
export class Pokemon {
  constructor(data) {
    // === IDENTITÉ ===
    this.apiId = data.apiId;
    this.name = data.name;

    // === MÉTADONNÉES ===
    this.image = data.image;
    this.apiGeneration = data.apiGeneration;

    // === STATISTIQUES ===
    this.stats = data.stats;

    // === TYPES (transformés en instances de Type) ===
    this.apiTypes = this.createTypes(data.apiTypes);
  }

  /**
   * Transforme les types bruts en objets Type
   * @param {Array} types
   * @returns {Type[]}
   */
  createTypes(types) {
    return types.map(type => new Type(type.name));
  }
}