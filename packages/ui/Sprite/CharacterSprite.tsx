import { Tile } from "../data/Tile";

export class CharacterSprite {
  public readonly id: number;
  public readonly name: string;
  public portrait!: Array<Tile>;
  public sprite!: Array<Tile>;
  constructor(id: number, name: string) {
    this.id = id;
    this.name = name;
  }

  public setPortrait(tiles: Array<Tile>) {
    this.portrait = tiles;
    return this;
  }

  public setSprite(tiles: Array<Tile>) {
    this.sprite = tiles;
    return this;
  }
}
