import { FF6Character } from "@ff6wc/ff6-types";
import { Tuple } from "~/utils/tuple";
import { characterChecks, GetSaveDataResponse } from "~/types/tracker";

type Callback = (args: GetSaveDataResponse) => boolean | number;
type DisplayName = string;
type Key = string;
type LayoutCellData = [Key, DisplayName, Callback, Callback?];

type NumberOptions = {
  /** default 0 */
  min?: number;
  max: number;
};

type LayoutNumberCellData = [
  Key,
  DisplayName,
  Callback,
  Callback?,
  NumberOptions?
];

export class LayoutCell extends Tuple<LayoutCellData, boolean> {}
export class LayoutNumberCell extends Tuple<LayoutNumberCellData, number> {
  public options: NumberOptions;

  constructor(...args: LayoutNumberCellData) {
    super(...args);
    this.options = args[4] ?? {
      max: 3,
      min: 0,
    };
  }
}
export class CharacterCell extends LayoutNumberCell {
  constructor(...args: LayoutNumberCellData) {
    super(...args);
    const [key] = args;

    this.options = {
      max: characterChecks[key as FF6Character].length,
      min: 0,
    };

    args[4] = this.options;
  }
}

export class LayoutGroup extends Tuple<
  [string, string, Array<LayoutCell | LayoutNumberCell>],
  never
> {}

const layout = [
  /** ********************* ROW 1 ********************** */
  [
    new LayoutGroup("terra", "", [
      new CharacterCell(
        "terra",
        "terra",
        ({ characters }) => characters.terra,
        ({ characters }) => characters.terra
      ),
      new LayoutCell(
        "leteRiver",
        "leteRiver",
        ({ events }) => events.leteRiver,
        ({ characters }) => characters.terra
      ),
      new LayoutCell(
        "sealedGate",
        "sealedGate",
        ({ events }) => events.sealedGate,
        ({ characters }) => characters.terra
      ),
      new LayoutCell(
        "whelk",
        "whelk",
        ({ events }) => events.whelk,
        ({ characters }) => characters.terra
      ),
      new LayoutCell(
        "ramuh",
        "ramuh",
        ({ events }) => events.ramuh,
        ({ characters }) => characters.terra
      ),
      new LayoutCell(
        "mobliz",
        "mobliz",
        ({ events }) => events.mobliz,
        ({ characters }) => characters.terra
      ),
    ]),
    new LayoutGroup("setzer", "", [
      new LayoutCell(
        "darill",
        "darill",
        ({ events }) => events.darill,
        ({ characters }) => characters.setzer
      ),
      new LayoutCell(
        "kohligen",
        "kohligen",
        ({ events }) => events.kohligen,
        ({ characters }) => characters.setzer
      ),
      new CharacterCell(
        "setzer",
        "setzer",
        ({ characters }) => characters.setzer,
        ({ characters }) => characters.setzer
      ),
    ]),
  ],
  /** ********************* ROW 2 ********************** */
  [
    new LayoutGroup("sabin", "", [
      new CharacterCell(
        "sabin",
        "sabin",
        ({ characters }) => characters.sabin,
        ({ characters }) => characters.sabin
      ),
      new LayoutCell(
        "barenFalls",
        "barenFalls",
        ({ events }) => events.barenFalls,
        ({ characters }) => characters.sabin
      ),
      new LayoutCell(
        "imperialCamp",
        "imperialCamp",
        ({ events }) => events.imperialCamp,
        ({ characters }) => characters.sabin
      ),
      new LayoutCell(
        "mtKoltz",
        "mtKoltz",
        ({ events }) => events.mtKoltz,
        ({ characters }) => characters.sabin
      ),
      new LayoutCell(
        "phantomTrain",
        "phantomTrain",
        ({ events }) => events.phantomTrain,
        ({ characters }) => characters.sabin
      ),
      new LayoutCell(
        "collapsingHouse",
        "collapsingHouse",
        ({ events }) => events.collapsingHouse,
        ({ characters }) => characters.sabin
      ),
    ]),

    new LayoutGroup("gau", "", [
      new LayoutCell(
        "serpentTrench",
        "serpentTrench",
        ({ events }) => events.serpentTrench,
        ({ characters }) => characters.gau
      ),
      new LayoutCell(
        "veldt",
        "veldt",
        ({ events }) => events.veldt,
        ({ characters }) => characters.gau
      ),
      new CharacterCell(
        "gau",
        "gau",
        ({ characters }) => characters.gau,
        ({ characters }) => characters.gau
      ),
    ]),
  ],
  [
    /** ********************* ROW 3 ********************** */
    new LayoutGroup("celes", "", [
      new CharacterCell(
        "celes",
        "celes",
        ({ characters }) => characters.celes,
        ({ characters }) => characters.celes
      ),
      new LayoutCell(
        "operaHouse",
        "operaHouse",
        ({ events }) => events.operaHouse,
        ({ characters }) => characters.celes
      ),
      new LayoutCell(
        "chainedCeles",
        "chainedCeles",
        ({ events }) => events.chainedCeles,
        ({ characters }) => characters.celes
      ),
      new LayoutNumberCell(
        "magitek",
        "magitek",
        ({ events }) =>
          // return number of checks done at this point
          [events.magitek1, events.magitek2, events.magitek3].filter((z) => !!z)
            .length,
        ({ characters }) => characters.celes,
        {
          max: 3,
        }
      ),
    ]),
    new LayoutGroup("none", "", [
      new LayoutNumberCell(
        "characterCount",
        "characterCount",
        ({ characterCount }) => characterCount,
        undefined,
        { max: 14 }
      ),
    ]),
    new LayoutGroup("edgar", "", [
      new LayoutCell(
        "figaroThrone",
        "figaroThrone",
        ({ events }) => events.figaroThrone,
        ({ characters }) => characters.edgar
      ),
      new LayoutCell(
        "figaroCastleEngineRoom",
        "figaroCastleEngineRoom",
        ({ events }) => events.figaroCastleEngineRoom,
        ({ characters }) => characters.edgar
      ),
      new LayoutCell(
        "ancientCastle",
        "ancientCastle",
        ({ events }) => events.ancientCastle,
        ({ characters }) => characters.edgar
      ),
      new CharacterCell(
        "edgar",
        "edgar",
        ({ characters }) => characters.edgar,
        ({ characters }) => characters.edgar
      ),
    ]),
  ],
  /** ********************* ROW 4 ********************** */
  [
    new LayoutGroup("shadow", "", [
      new CharacterCell(
        "shadow",
        "shadow",
        ({ characters }) => characters.shadow,
        ({ characters }) => characters.shadow
      ),
      new LayoutCell(
        "gauManor",
        "gauManor",
        ({ events }) => events.gauManor,
        ({ characters }) => characters.shadow
      ),
      new LayoutNumberCell(
        "floatingContinent",
        "floatingContinent",
        ({ events }) =>
          // return number of checks done at this point
          [
            events.floatingContinent1,
            events.floatingContinent2,
            events.floatingContinent3,
          ].filter((z) => !!z).length,
        ({ characters }) => characters.shadow,
        {
          max: 3,
        }
      ),
      new LayoutCell(
        "veldtCave",
        "veldtCave",
        ({ events }) => events.veldtCave,
        ({ characters }) => characters.shadow
      ),
    ]),

    new LayoutGroup("none", "", [
      new LayoutNumberCell(
        "esperCount",
        "esperCount",
        ({ esperCount }) => esperCount,
        undefined,
        { max: 27 }
      ),
    ]),

    new LayoutGroup("locke", "", [
      new LayoutCell(
        "tunnelArmor",
        "tunnelArmor",
        ({ events }) => events.tunnelArmor,
        ({ characters }) => characters.locke
      ),
      new LayoutNumberCell(
        "narsheWeaponShop",
        "narsheWeaponShop",
        ({ events }) =>
          [events.narsheWeaponShop1, events.narsheWeaponShop2].filter(
            (z) => !!z
          ).length,
        ({ characters }) => characters.locke,
        {
          max: 2,
        }
      ),
      new LayoutCell(
        "phoenixCave",
        "phoenixCave",
        ({ events }) => events.phoenixCave,
        ({ characters }) => characters.locke
      ),
      new CharacterCell(
        "locke",
        "locke",
        ({ characters }) => characters.locke,
        ({ characters }) => characters.locke
      ),
    ]),
  ],
  /** ********************* ROW 5 ********************** */
  [
    new LayoutGroup("cyan", "", [
      new CharacterCell(
        "cyan",
        "cyan",
        ({ characters }) => characters.cyan,
        ({ characters }) => characters.cyan
      ),
      new LayoutCell(
        "doma",
        "doma",
        ({ events }) => events.doma,
        ({ characters }) => characters.cyan
      ),
      new LayoutNumberCell(
        "nightmare",
        "nightmare",
        ({ events }) =>
          // return number of checks done at this point
          [events.nightmare1, events.nightmare2, events.nightmare3].filter(
            (z) => !!z
          ).length,
        ({ characters }) => characters.cyan,
        {
          max: 3,
        }
      ),
      new LayoutCell(
        "mtZozo",
        "mtZozo",
        ({ events }) => events.mtZozo,
        ({ characters }) => characters.cyan
      ),
    ]),

    new LayoutGroup("none", "", [
      new LayoutNumberCell(
        "dragonCount",
        "dragonCount",
        ({ dragonCount }) => dragonCount,
        undefined,
        {
          max: 8,
        }
      ),
    ]),

    new LayoutGroup("strago", "", [
      new LayoutCell(
        "burningHouse",
        "burningHouse",
        ({ events }) => events.burningHouse,
        ({ characters }) => characters.strago
      ),
      new LayoutCell(
        "ebotsRock",
        "ebotsRock",
        ({ events }) => events.ebotsRock,
        ({ characters }) => characters.strago
      ),
      new LayoutNumberCell(
        "fanaticsTower",
        "fanaticsTower",
        ({ events }) =>
          [events.fanaticsTower1, events.fanaticsTower2].filter((z) => !!z)
            .length,
        ({ characters }) => characters.strago,
        {
          max: 2,
        }
      ),
      new CharacterCell(
        "strago",
        "strago",
        ({ characters }) => characters.strago,
        ({ characters }) => characters.strago
      ),
    ]),
  ],
  /** ********************* ROW 6 ********************** */
  [
    new LayoutGroup("relm", "", [
      new CharacterCell(
        "relm",
        "relm",
        ({ characters }) => characters.relm,
        ({ characters }) => characters.relm
      ),
      new LayoutCell(
        "esperMountain",
        "esperMountain",
        ({ events }) => events.esperMountain,
        ({ characters }) => characters.relm
      ),
      new LayoutCell(
        "owzersMansion",
        "owzersMansion",
        ({ events }) => events.owzersMansion,
        ({ characters }) => characters.relm
      ),
    ]),
    new LayoutGroup("none", "", [
      new LayoutNumberCell(
        "bossCount",
        "bossCount",
        ({ bossCount }) => bossCount,
        undefined,
        { max: 100 }
      ),
      new LayoutNumberCell(
        "checkCount",
        "checkCount",
        ({ checkCount, events, dragons }) =>
          checkCount > 0
            ? checkCount
            : Object.values({ ...events, ...dragons }).filter((z) => !!z)
                .length,
        undefined,
        { max: 100 }
      ),
      new LayoutNumberCell(
        "chestCount",
        "chestCount",
        ({ chestCount }) => chestCount,
        undefined,
        {
          max: 255,
        }
      ),
    ]),

    new LayoutGroup("mog", "", [
      new LayoutCell(
        "moogleDefense",
        "moogleDefense",
        ({ events }) => events.moogleDefense,
        undefined
      ),
      new LayoutNumberCell(
        "loneWolf",
        "loneWolf",
        ({ events }) =>
          [events.loneWolf1, events.loneWolf2].filter((z) => !!z).length,
        ({ characters }) => characters.mog,
        {
          max: 2,
        }
      ),
      new CharacterCell(
        "mog",
        "mog",
        ({ characters }) => characters.mog,
        ({ characters }) => characters.mog
      ),
    ]),
  ],
  /** ********************* ROW 7 ********************** */
  [
    new LayoutGroup("gogo", "", [
      new CharacterCell(
        "gogo",
        "gogo",
        ({ characters }) => characters.gogo,
        ({ characters }) => characters.gogo
      ),
      new LayoutCell(
        "zoneEater",
        "zoneEater",
        ({ events }) => events.zoneEater,
        ({ characters }) => characters.gogo
      ),
    ]),
    new LayoutGroup("none", "justify-center", [
      new LayoutCell(
        "tzenThief",
        "tzenThief",
        ({ events }) => events.tzenThief,
        undefined
      ),

      new LayoutNumberCell(
        "auctionHouse",
        "auctionHouse",
        ({ events }) =>
          // return number of checks done at this point
          [events.auctionHouse1, events.auctionHouse2].filter((z) => !!z)
            .length,
        undefined,
        {
          max: 2,
        }
      ),

      new LayoutCell(
        "kefkaAtNarshe",
        "kefkaAtNarshe",
        ({ events }) => events.kefkaAtNarshe,
        undefined
      ),

      new LayoutCell("doomGaze", "doomGaze", ({ events }) => events.doomGaze),
      new LayoutCell("tritoch", "tritoch", ({ events }) => events.tritoch),
    ]),

    new LayoutGroup("umaro", "", [
      new LayoutCell(
        "umarosCave",
        "umarosCave",
        ({ events }) => events.umarosCave,
        ({ characters }) => characters.umaro
      ),
      new CharacterCell(
        "umaro",
        "umaro",
        ({ characters }) => characters.umaro,
        ({ characters }) => characters.umaro
      ),
    ]),
  ],
  [
    new LayoutGroup("dragons", "flex-wrap", [
      new LayoutCell(
        "ancientCastleDragon",
        "blueDragon",
        ({ dragons }) => dragons.ancientCastleDragon
      ),
      new LayoutCell(
        "narsheDragon",
        "iceDragon",
        ({ dragons }) => dragons.narsheDragon
      ),
      new LayoutCell(
        "mtZozoDragon",
        "stormDragon",
        ({ dragons }) => dragons.mtZozoDragon
      ),
      new LayoutCell(
        "operaHouseDragon",
        "dirtDragon",
        ({ dragons }) => dragons.operaHouseDragon
      ),
      new LayoutCell(
        "kefkaTowerMidDragon",
        "goldDragon",
        ({ dragons }) => dragons.kefkaTowerMidDragon
      ),
      new LayoutCell(
        "kefkaTowerRightDragon",
        "skullDragon",
        ({ dragons }) => dragons.kefkaTowerRightDragon
      ),
      new LayoutCell(
        "phoenixCaveDragon",
        "redDragon",
        ({ dragons }) => dragons.phoenixCaveDragon
      ),
      new LayoutCell(
        "fanaticsTowerDragon",
        "whiteDragon",
        ({ dragons }) => dragons.fanaticsTowerDragon
      ),
    ]),
  ],
];

type Cell = LayoutCell | LayoutNumberCell;
export const getCell = (key: string) => {
  const c = layout.reduce<Cell | null>((acc, groups, idx) => {
    acc =
      acc ||
      groups.reduce<Cell | null>((acc, group, idx) => {
        const cells = group.args[2];
        acc =
          acc ||
          cells.reduce<Cell | null>((acc, cell, idx) => {
            if (cell.args[0] === key) {
              return cell;
            }
            return acc;
          }, null);

        return acc;
      }, null);

    return acc;
  }, null);

  return c;
};

export { layout };
