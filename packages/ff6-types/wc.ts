import { FF6Character, FF6Dragon, FF6Event } from ".";
import { Tuple } from "./utils/Tuple";
import * as event_bits from "./_eventBits";
import * as npc_bit from "./_npcBits";

class CheckBit extends Tuple<[string, string, number]> {
  public readonly byte: number;
  public readonly bit: number;
  public readonly key: string;
  public readonly raw_bit: number;
  public readonly name: string;
  constructor(key: string, name: string, bit: number) {
    super(key, name, bit);
    this.key = key;
    this.name = name;
    this.byte = Math.floor(bit / 8);
    this.raw_bit = bit;
    this.bit = bit % 8;
  }
}

const getCharBit = (char_idx: number) => 0x2e0 + char_idx;

export const CHARACTER_BIT: Record<FF6Character, CheckBit> = {
  terra: new CheckBit("terra", "Terra", getCharBit(0)),
  locke: new CheckBit("locke", "Locke", getCharBit(1)),
  cyan: new CheckBit("cyan", "Cyan", getCharBit(2)),
  shadow: new CheckBit("shadow", "Shadow", getCharBit(3)),
  edgar: new CheckBit("edgar", "Edgar", getCharBit(4)),
  sabin: new CheckBit("sabin", "Sabin", getCharBit(5)),
  celes: new CheckBit("celes", "Celes", getCharBit(6)),
  strago: new CheckBit("strago", "Strago", getCharBit(7)),
  relm: new CheckBit("relm", "Relm", getCharBit(8)),
  setzer: new CheckBit("setzer", "Setzer", getCharBit(9)),
  mog: new CheckBit("mog", "Mog", getCharBit(10)),
  gau: new CheckBit("gau", "Gau", getCharBit(11)),
  gogo: new CheckBit("gogo", "Gogo", getCharBit(12)),
  umaro: new CheckBit("umaro", "Umaro", getCharBit(13)),
};

export const EVENT_BIT: Record<FF6Event, CheckBit> = {
  ancientCastle: new CheckBit(
    "ancientCastle",
    "Ancient Castle",
    event_bits.GOT_RAIDEN
  ),
  barenFalls: new CheckBit("barenFalls", "Baren Falls", event_bits.NAMED_GAU),
  burningHouse: new CheckBit(
    "burningHouse",
    "Burning House",
    event_bits.DEFEATED_FLAME_EATER
  ),
  collapsingHouse: new CheckBit(
    "collapsingHouse",
    "Collapsing House",
    event_bits.FINISHED_COLLAPSING_HOUSE
  ),
  darill: new CheckBit("darill", "Daryl's Tomb", event_bits.DEFEATED_DULLAHAN),
  doma: new CheckBit("doma", "Doma Siege", event_bits.FINISHED_DOMA_WOB),
  nightmare1: new CheckBit(
    "nightmare1",
    "Doma Dream Door",
    event_bits.DEFEATED_STOOGES
  ),
  nightmare2: new CheckBit(
    "nightmare2",
    "Doma Dream Awaken",
    event_bits.FINISHED_DOMA_WOR
  ),
  nightmare3: new CheckBit(
    "nightmare3",
    "Doma Dream Throne",
    event_bits.GOT_ALEXANDR
  ),
  ebotsRock: new CheckBit(
    "ebotsRock",
    "Ebot's Rock",
    event_bits.DEFEATED_HIDON
  ),
  esperMountain: new CheckBit(
    "esperMountain",
    "Esper Mountain",
    event_bits.DEFEATED_ULTROS_ESPER_MOUNTAIN
  ),
  fanaticsTower1: new CheckBit(
    "fanaticsTower1",
    "Fanatic's Tower Follower",
    event_bits.RECRUITED_STRAGO_FANATICS_TOWER
  ),
  fanaticsTower2: new CheckBit(
    "fanaticsTower2",
    "Fanatic's Tower Follower",
    event_bits.DEFEATED_MAGIMASTER
  ),
  figaroThrone: new CheckBit(
    "figaroThrone",
    "Figaro Castle Throne",
    event_bits.NAMED_EDGAR
  ),
  figaroCastleEngineRoom: new CheckBit(
    "figaroCastleEngineRoom",
    "Figaro Castle Engine",
    event_bits.DEFEATED_TENTACLES_FIGARO
  ),
  floatingContinent1: new CheckBit(
    "floatingContinent1",
    "Floating Cont. Arrive",
    event_bits.RECRUITED_SHADOW_FLOATING_CONTINENT
  ),
  floatingContinent2: new CheckBit(
    "floatingContinent2",
    "Floating Cont. Beast",
    event_bits.DEFEATED_ATMAWEAPON
  ),
  floatingContinent3: new CheckBit(
    "floatingContinent3",
    "Floating Cont. Escape",
    event_bits.FINISHED_FLOATING_CONTINENT
  ),
  gauManor: new CheckBit(
    "gauManor",
    "Gau's Father's House",
    event_bits.RECRUITED_SHADOW_GAU_FATHER_HOUSE
  ),
  imperialCamp: new CheckBit(
    "imperialCamp",
    "Imperial Camp",
    event_bits.FINISHED_IMPERIAL_CAMP
  ),
  atmaWeapon: new CheckBit(
    "atmaWeapon",
    "Kefka's Tower Cell Beast",
    event_bits.DEFEATED_ATMA
  ),
  kohligen: new CheckBit(
    "kohligen",
    "Kohlingen Cafe",
    event_bits.RECRUITED_SHADOW_KOHLINGEN
  ),
  leteRiver: new CheckBit(
    "leteRiver",
    "Lete River",
    event_bits.RODE_RAFT_LETE_RIVER
  ),
  loneWolf1: new CheckBit(
    "loneWolf1",
    "Lone Wolf Chase",
    event_bits.CHASING_LONE_WOLF7
  ),
  loneWolf2: new CheckBit(
    "loneWolf2",
    "Lone Wolf Moogle Room",
    event_bits.GOT_BOTH_REWARDS_LONE_WOLF
  ),
  magitek1: new CheckBit(
    "magitek1",
    "Magitek Factory Trash",
    event_bits.GOT_IFRIT_SHIVA
  ),
  magitek2: new CheckBit(
    "magitek2",
    "Magitek Factory Guard",
    event_bits.DEFEATED_NUMBER_024
  ),
  magitek3: new CheckBit(
    "magitek3",
    "Magitek Factory Finish",
    event_bits.DEFEATED_CRANES
  ),
  mobliz: new CheckBit(
    "mobliz",
    "Mobliz Attack",
    event_bits.RECRUITED_TERRA_MOBLIZ
  ),
  moogleDefense: new CheckBit(
    "moogleDefense",
    "Moogle Defense",
    event_bits.COMPLETED_MOOGLE_DEFENSE
  ),
  mtKoltz: new CheckBit("mtKoltz", "Mt. Kolts", event_bits.DEFEATED_VARGAS),
  mtZozo: new CheckBit("mtZozo", "Mt. Zozo", event_bits.FINISHED_MT_ZOZO),
  kefkaAtNarshe: new CheckBit(
    "kefkaAtNarshe",
    "Narshe Battle",
    event_bits.FINISHED_NARSHE_BATTLE
  ),
  narsheWeaponShop1: new CheckBit(
    "narsheWeaponShop1",
    "Narshe Weapon Shop",
    event_bits.GOT_RAGNAROK
  ),
  narsheWeaponShop2: new CheckBit(
    "narsheWeaponShop2",
    "Narshe Weapon Shop Mines",
    event_bits.GOT_BOTH_REWARDS_WEAPON_SHOP
  ),
  operaHouse: new CheckBit(
    "operaHouse",
    "Opera House Disruption",
    event_bits.FINISHED_OPERA_DISRUPTION
  ),
  owzersMansion: new CheckBit(
    "owzersMansion",
    "Owzer's Mansion",
    event_bits.DEFEATED_CHADARNOOK
  ),
  phantomTrain: new CheckBit(
    "phantomTrain",
    "Phantom Train",
    event_bits.GOT_PHANTOM_TRAIN_REWARD
  ),
  phoenixCave: new CheckBit(
    "phoenixCave",
    "Phoenix Cave",
    event_bits.RECRUITED_LOCKE_PHOENIX_CAVE
  ),
  sealedGate: new CheckBit(
    "sealedGate",
    "Sealed Gate",
    npc_bit.BLOCK_SEALED_GATE
  ),
  doomGaze: new CheckBit(
    "doomGaze",
    "Search The Skies",
    event_bits.DEFEATED_DOOM_GAZE
  ),
  serpentTrench: new CheckBit(
    "serpentTrench",
    "Serpent Trench",
    event_bits.GOT_SERPENT_TRENCH_REWARD
  ),
  chainedCeles: new CheckBit(
    "chainedCeles",
    "South Figaro Prisoner",
    event_bits.FREED_CELES
  ),
  tunnelArmor: new CheckBit(
    "tunnelArmor",
    "South Figaro Cave",
    event_bits.DEFEATED_TUNNEL_ARMOR
  ),
  tritoch: new CheckBit("tritoch", "Tritoch Cliff", event_bits.GOT_TRITOCH),
  tzenThief: new CheckBit(
    "tzenThief",
    "Tzen Thief",
    event_bits.BOUGHT_ESPER_TZEN
  ),
  umarosCave: new CheckBit(
    "umarosCave",
    "Umaro's Cave",
    event_bits.RECRUITED_UMARO_WOR
  ),
  veldt: new CheckBit("veldt", "Veldt", event_bits.VELDT_REWARD_OBTAINED),
  veldtCave: new CheckBit(
    "veldtCave",
    "Veldt Cave",
    event_bits.DEFEATED_SR_BEHEMOTH
  ),
  whelk: new CheckBit("whelk", "Whelk Gate", event_bits.DEFEATED_WHELK),
  zoneEater: new CheckBit(
    "zoneEater",
    "Zone Eater",
    event_bits.RECRUITED_GOGO_WOR
  ),
  ramuh: new CheckBit("ramuh", "Zozo Tower", event_bits.GOT_ZOZO_REWARD),
  auctionHouse1: new CheckBit(
    "auctionHouse1",
    "Auction House Esper 1",
    event_bits.AUCTION_BOUGHT_ESPER1
  ),
  auctionHouse2: new CheckBit(
    "auctionHouse2",
    "Auction House Esper 2",
    event_bits.AUCTION_BOUGHT_ESPER2
  ),
} as Record<FF6Event, CheckBit>;

export const DRAGON_EVENT_BIT: Partial<Record<FF6Dragon, CheckBit>> = {
  // by location
  ancientCastleDragon: new CheckBit(
    "ancientCastle",
    "Ancient Castle Dragon",
    event_bits.DEFEATED_ANCIENT_CASTLE_DRAGON
  ),
  fanaticsTowerDragon: new CheckBit(
    "fanaticsTower",
    "Fanatic's Tower Dragon",
    event_bits.DEFEATED_FANATICS_TOWER_DRAGON
  ),
  kefkaTowerMidDragon: new CheckBit(
    "kefkaTowerMid",
    "Kefka's Tower Dragon G",
    event_bits.DEFEATED_KEFKA_TOWER_DRAGON_G
  ),
  kefkaTowerRightDragon: new CheckBit(
    "kefkaTowerRight",
    "Kefka's Tower Dragon S",
    event_bits.DEFEATED_KEFKA_TOWER_DRAGON_S
  ),
  mtZozoDragon: new CheckBit(
    "mtZozo",
    "Mt. Zozo Dragon",
    event_bits.DEFEATED_MT_ZOZO_DRAGON
  ),
  narsheDragon: new CheckBit(
    "narshe",
    "Narshe Dragon",
    event_bits.DEFEATED_NARSHE_DRAGON
  ),
  operaHouseDragon: new CheckBit(
    "operaHouse",
    "Opera House Dragon",
    event_bits.DEFEATED_OPERA_HOUSE_DRAGON
  ),
  phoenixCaveDragon: new CheckBit(
    "phoenixCave",
    "Phoenix Cave Dragon",
    event_bits.DEFEATED_PHOENIX_CAVE_DRAGON
  ),
};

const DRAGON_START_BIT = 144;
export const DRAGON_BIT: Partial<Record<FF6Dragon, CheckBit>> = {
  // by monster
  iceDragon: new CheckBit("iceDragon", "iceDragon", DRAGON_START_BIT),
  stormDragon: new CheckBit("stormDragon", "stormDragon", DRAGON_START_BIT + 1),
  dirtDragon: new CheckBit("dirtDragon", "dirtDragon", DRAGON_START_BIT + 2),
  goldDragon: new CheckBit("goldDragon", "goldDragon", DRAGON_START_BIT + 3),
  skullDragon: new CheckBit("skullDragon", "skullDragon", DRAGON_START_BIT + 4),
  blueDragon: new CheckBit("blueDragon", "blueDragon", DRAGON_START_BIT + 5),
  redDragon: new CheckBit("redDragon", "redDragon", DRAGON_START_BIT + 6),
  whiteDragon: new CheckBit("whiteDragon", "whiteDragon", DRAGON_START_BIT + 7),
};

export const characterChecks: Record<FF6Character, Array<FF6Event>> = {
  terra: ["leteRiver", "sealedGate", "whelk", "ramuh", "mobliz"],
  locke: ["tunnelArmor", "narsheWeaponShop1", "phoenixCave"],
  cyan: ["doma", "nightmare1", "nightmare2", "nightmare3", "mtZozo"],
  shadow: [
    "gauManor",
    "floatingContinent1",
    "floatingContinent2",
    "floatingContinent3",
    "veldtCave",
  ],
  edgar: ["figaroCastleEngineRoom", "ancientCastle", "figaroThrone"],
  sabin: [
    "barenFalls",
    "imperialCamp",
    "mtKoltz",
    "phantomTrain",
    "collapsingHouse",
  ],
  celes: ["operaHouse", "chainedCeles", "magitek1", "magitek2", "magitek3"],
  strago: ["burningHouse", "ebotsRock", "fanaticsTower1"],
  relm: ["esperMountain", "owzersMansion"],
  setzer: ["darill", "kohligen"],
  mog: ["loneWolf1", "loneWolf2", "moogleDefense"],
  gau: ["veldt", "serpentTrench"],
  gogo: ["zoneEater"],
  umaro: ["umarosCave"],
};

export const characterNames = Object.keys(
  characterChecks
) as Array<FF6Character>;

/*
  TERRA, LOCKE, CYAN, SHADOW, EDGAR, SABIN, CELES, STRAGO, RELM, SETZER, MOG, GAU, GOGO, UMARO = range(CHARACTER_COUNT)
  SOLDIER, IMP, GENERAL_LEO, BANON_DUNCAN, ESPER_TERRA, MERCHANT, GHOST, KEFKA = range(CHARACTER_COUNT, 22)

*/
export const characterPalettesByKey: Record<FF6Character, number> = {
  terra: 2,
  locke: 1,
  cyan: 4,
  shadow: 4,
  edgar: 0,
  sabin: 0,
  celes: 0,
  strago: 3,
  relm: 3,
  setzer: 4,
  mog: 5,
  gau: 3,
  gogo: 3,
  umaro: 5,
};

export const characterPalettes = characterNames.map(
  (z) => characterPalettesByKey[z]
);

export const otherPalettes = [1, 0, 0, 3, 6, 1, 0, 3];
