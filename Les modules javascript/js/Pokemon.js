import { Type } from './Type.js';

export class Pokemon {
  constructor(data) {
    this.apiId = data.apiId;
    this.name = data.name;
    this.image = data.image;
    this.apiGeneration = data.apiGeneration;
    this.stats = data.stats;
    this.apiTypes = data.apiTypes.map(t => new Type(t.name));
  }
}