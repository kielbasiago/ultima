import { Query } from "@ff6wc/tracker-core";
import {
  FF6Character,
  FF6Dragon,
  FF6Event,
  FF6EventFlags,
  FF6CharacterFlags,
  FF6DragonFlags,
  CHARACTER_BIT,
  DRAGON_BIT,
  EVENT_BIT,
  DRAGON_EVENT_BIT,
} from "@ff6wc/ff6-types";
import { GetSaveDataResponse } from "~/types/tracker";

/* base + event_word * 2 */
const CHARACTERS_AVAILABLE = 2; // custom
const ESPERS_FOUND = 3; // custom
const CHECKS_COMPLETE = 4; // custom
const DRAGONS_DEFEATED = 6; // track defeated instead of remaining

const BOSSES_DEFEATED = 27; // custom
export class GetSaveDataQuery extends Query<GetSaveDataResponse> {
  private EVENT_WORD_ADDRESS: number;
  private EVENT_ADDRESS: number;
  private DRAGON_ADDRESS: number;
  private CHEST_BITS: number;

  constructor() {
    super();
    this.EVENT_WORD_ADDRESS = this.IN_WRAM(0x1fc2);
    this.EVENT_ADDRESS = this.IN_WRAM(0x1e80);
    this.DRAGON_ADDRESS = this.IN_WRAM(0x1dc9);
    this.CHEST_BITS = this.IN_WRAM(0x1e40); // 0x1e40 - 0x1e7f
  }

  public get queryAddress(): Array<number> {
    const addresses = [
      this.EVENT_WORD_ADDRESS,
      this.EVENT_ADDRESS,
      this.DRAGON_ADDRESS,
      this.CHEST_BITS,
    ];
    return addresses;
  }

  public get queryLength(): Array<number> {
    return [64, 150, 24, 47];
  }

  public async onResponse(
    responses: Array<Buffer>
  ): Promise<GetSaveDataResponse> {
    const [EVENT_WORDS, EVENTS, DRAGONS, CHESTS] = responses;

    const value = this.parseAllData(EVENT_WORDS, EVENTS, DRAGONS, CHESTS);

    return value;
  }

  private parseAllData(
    eventWordsData: Buffer,
    eventsData: Buffer,
    dragonData: Buffer,
    chestData: Buffer
  ): GetSaveDataResponse {
    // PARSE EVENT WORD DATA
    const characterCount = eventWordsData[CHARACTERS_AVAILABLE * 2];
    const esperCount = eventWordsData[ESPERS_FOUND * 2];
    const checkCount = eventWordsData[CHECKS_COMPLETE * 2];
    const dragonCount = eventWordsData[DRAGONS_DEFEATED * 2];
    const bossCount = eventWordsData[BOSSES_DEFEATED * 2];

    // PARSE CHARACTERS FOUND
    const characterIds = Object.keys(CHARACTER_BIT);
    const characterBits = characterIds.map(
      (char) => CHARACTER_BIT[char as FF6Character]
    );
    const characters = characterIds.reduce((acc, charName, idx) => {
      const value = characterBits[idx];
      acc[charName as FF6Character] = !!(
        eventsData[value.byte] & Math.pow(2, value.bit)
      );
      return acc;
    }, {} as Record<FF6Character, boolean>);

    // PARSE EVENTS COMPLETE
    const eventIds = Object.keys(EVENT_BIT);
    const eventBits = eventIds.map((event) => EVENT_BIT[event as FF6Event]);
    const events = eventIds.reduce((acc, charName, idx) => {
      const value = eventBits[idx];
      acc[charName as FF6Event] = !!(
        eventsData[value.byte] & Math.pow(2, value.bit)
      );
      return acc;
    }, {} as Record<FF6Event, boolean>);

    // PARSE DRAGON EVENTS
    const dragonEventIds = Object.keys(DRAGON_EVENT_BIT);
    const dragonEventBits = dragonEventIds.map(
      (dragon) => DRAGON_EVENT_BIT[dragon as FF6Dragon]
    );
    const dragonEvents = dragonEventIds.reduce((acc, dragonEventName, idx) => {
      const value = dragonEventBits[idx]!;
      acc[dragonEventName as FF6Dragon] = !!(
        eventsData[value.byte] & Math.pow(2, value.bit)
      );
      return acc;
    }, {} as Record<FF6Dragon, boolean>);

    // PARSE DRAGON BATTLES
    const dragonIds = Object.keys(DRAGON_BIT);
    const dragonBits = dragonIds.map(
      (dragon) => DRAGON_BIT[dragon as FF6Dragon]
    );
    const dragons = dragonIds.reduce((acc, charName, idx) => {
      const value = dragonBits[idx]!;
      acc[charName as FF6Dragon] = !!(
        dragonData[value.byte] & Math.pow(2, value.bit)
      );
      return acc;
    }, {} as Record<FF6Dragon, boolean>);

    const chestCount = [...chestData].reduce((acc, chestByte) => {
      const bitcount = (byte: number) => {
        let bits = 0;

        while (byte) {
          bits += byte % 2;
          byte = byte >>> 1;
        }

        return bits;
      };

      acc += bitcount(chestByte);
      return acc;
    }, 0);

    const value = {
      characters,
      events,
      dragons: {
        ...dragons,
        ...dragonEvents,
      },
      allFlags: {
        ...characters,
        ...events,
        ...dragons,
        ...dragonEvents,
      },

      characterCount,
      esperCount,
      checkCount,
      dragonCount,
      bossCount,
      gameTime: 0,
      chestCount,
    } as GetSaveDataResponse;
    return value;
  }
}
