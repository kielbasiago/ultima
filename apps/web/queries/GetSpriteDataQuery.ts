import times from "lodash/times";
import {
  FF6Character,
  characterChecks,
  characterPalettes,
} from "@ff6wc/ff6-types";
import { CharacterSprite, Palette, PaletteColor, Tile } from "@ff6wc/ui";
import { Query } from "@ff6wc/tracker-core";

export type CharacterSpriteDataResponse = {
  portraits: Record<FF6Character, CharacterSprite>;
  palettes: Array<Palette>;
};

const TILE_SIZE = 32;
const TILES_PER_CHAR = 197 * TILE_SIZE;
const PAGE_SIZE = 0x16a0;
const CHAR_COUNT = 14; // char count
const PAGES = Math.ceil((CHAR_COUNT * PAGE_SIZE) / 1024); // 1024 is the max length

export class GetCharacterSpriteDataQuery extends Query<CharacterSpriteDataResponse> {
  private CHARACTER_SPRITE_GRAPHICS_ADDRESS = 0x150000;
  private CHARACTER_SPRITE_GRAPHICS_ADDRESSES: Array<number> = [];
  private CHARACTER_SPRITE_GRAPHICS_ADDRESS_LENGTHS: Array<number> = [];
  private CHARATER_SPRITE_PALETTES_ADDRESS = 0x268000;

  constructor() {
    super();
    const TILE_COUNT = 197; // tiles per sprite

    this.CHARACTER_SPRITE_GRAPHICS_ADDRESSES = times(
      PAGES,
      (index) => index * PAGE_SIZE + this.CHARACTER_SPRITE_GRAPHICS_ADDRESS
    );

    this.CHARACTER_SPRITE_GRAPHICS_ADDRESS_LENGTHS = times(
      PAGES,
      () => PAGE_SIZE
    );

    this.CHARATER_SPRITE_PALETTES_ADDRESS = this.IN_ROM(
      this.CHARATER_SPRITE_PALETTES_ADDRESS
    );
  }

  public get queryAddress(): Array<number> {
    return [
      this.IN_ROM(0xd0f1), // character sprite tile formation 0xC0D0F1 - 0xC0CE3A = 0x2B7;
      this.IN_ROM(0x17e960), // magicite graphics
      this.CHARATER_SPRITE_PALETTES_ADDRESS,
      ...this.CHARACTER_SPRITE_GRAPHICS_ADDRESSES,
    ];
  }

  public get queryLength(): Array<number> {
    return [
      695, //0xC0D0F1 - 0xC0CE3A = 0x2B7 = 695
      0xa0, // magicite graphics
      0x3ff,
      ...this.CHARACTER_SPRITE_GRAPHICS_ADDRESS_LENGTHS,
    ];
  }

  public async onResponse(
    responses: Array<Buffer>
  ): Promise<CharacterSpriteDataResponse> {
    const [TILE_INFO, MAGICITE_GRAPHICS, PALETTE, ...GRAPHICS] = responses;
    const PALETTE_BLOCK_SIZE = 32;

    const rawGraphicBlocks = GRAPHICS.map((g) =>
      g
        .toString()
        .split(",")
        .map((z) => Number.parseInt(z))
    );

    const allGraphics = rawGraphicBlocks.reduce((acc, val) => {
      return acc.concat(val);
    }, []);

    const graphicBlocks = times(CHAR_COUNT, (idx) => {
      const val = allGraphics.slice(
        idx * PAGE_SIZE,
        idx * PAGE_SIZE + PAGE_SIZE
      );

      return val;
    });

    const paletteBlocks = [...PALETTE].map((p) => p);

    const palettes = times(paletteBlocks.length / 32, (idx) => {
      return new Palette(paletteBlocks.slice(idx * 32, idx * 32 + 32));
    });

    const tiles = graphicBlocks.map((z, idx) => {
      //   const palette = palettes[characterPalettes[idx]];
      const tileCount = PAGE_SIZE / TILE_SIZE;
      const tileSize = 32;
      const paletteOffset = idx * PALETTE_BLOCK_SIZE;
      const paletteBytes = paletteBlocks.slice(
        paletteOffset,
        paletteOffset + PALETTE_BLOCK_SIZE
      );
      const palette = new Palette(paletteBytes);
      return times(tileCount, (idx) => {
        const tile = new Tile(
          z.slice(idx * tileSize, idx * tileSize + tileSize),
          palette
        );
        return tile;
      });
    });

    const val = Object.keys(characterChecks).reduce((acc, charName, idx) => {
      const tile = tiles[idx];
      const char = new CharacterSprite(idx, charName).setSprite(tile);
      acc[charName] = char;
      return acc;
    }, {} as Record<string, CharacterSprite>);

    return {
      portraits: val,
      palettes: palettes,
    };
  }
}
