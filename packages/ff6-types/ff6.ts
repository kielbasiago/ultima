export enum FF6Elements {
    Fire = 0x1,
    Ice = 0x2,
    Bolt = 0x4,
    Bio = 0x8,
    Wind = 0x10,
    Pearl = 0x20,
    Earth = 0x40,
    Water = 0x80,
  }
  
  export enum FF6StatusOne {
    Dark = 0x01,
    Zombie = 0x02,
    Poison = 0x04,
    EnableMagitek = 0x08,
    Vanish = 0x10,
    Imp = 0x20,
    Petrify = 0x40,
    Death = 0x80,
  }
  
  export enum FF6StatusTwo {
    Condemned = 0x01,
    Kneeling = 0x02,
    Blink = 0x04,
    Mute = 0x08,
    Berserk = 0x10,
    Muddle = 0x20,
    HPDrain = 0x40,
    Sleep = 0x80,
  }
  
  export enum FF6StatusThree {
    DanceButFloatForEquip = 0x01,
    Regen = 0x02,
    Slow = 0x04,
    Haste = 0x08,
    Stop = 0x10,
    Shell = 0x20,
    Safe = 0x40,
    Reflect = 0x80,
  }
  
  export enum FF6StatusFour {
    Rage = 0x01,
    Frozen = 0x02,
    ProtectionfromDeath = 0x04,
    MorphIntoEsper = 0x08,
    CastingSpell = 0x10,
    RemovedfromBattle = 0x20,
    RandomlyDefendedByInterceptor = 0x40,
    Float = 0x80,
  }
  
  export type FF6Dragon =
    // specific boss (order is based by id here)
    | "iceDragon"
    | "stormDragon"
    | "dirtDragon"
    | "goldDragon"
    | "skullDragon"
    | "blueDragon"
    | "redDragon"
    | "whiteDragon"
    // by location (order matches vanilla spawn locations above, by id)
    | "narsheDragon"
    | "mtZozoDragon"
    | "operaHouseDragon"
    | "kefkaTowerMidDragon"
    | "kefkaTowerRightDragon"
    | "ancientCastleDragon"
    | "phoenixCaveDragon"
    | "fanaticsTowerDragon";
  
  export type FF6DragonFlags = Record<FF6Dragon, boolean>;
  
  export const ff6Dragons = {
    iceDragon: "iceDragon",
    stormDragon: "stormDragon",
    dirtDragon: "dirtDragon",
    goldDragon: "goldDragon",
    skullDragon: "skullDragon",
    blueDragon: "blueDragon",
    redDragon: "redDragon",
    whiteDragon: "whiteDragon",
    narsheDragon: "narsheDragon",
    mtZozoDragon: "mtZozoDragon",
    operaHouseDragon: "operaHouseDragon",
    kefkaTowerMidDragon: "kefkaTowerMidDragon",
    kefkaTowerRightDragon: "kefkaTowerRightDragon",
    ancientCastleDragon: "ancientCastleDragon",
    phoenixCaveDragon: "phoenixCaveDragon",
    fanaticsTowerDragon: "fanaticsTowerDragon",
  };
  export type FF6Event =
    /** Global checks */
    | "doomGaze"
    | "tritoch"
    | "tzenThief"
    | "veldt"
    | "auctionHouse1"
    | "auctionHouse2"
    | "kefkaAtNarshe"
    /** Terra checks */
    | "whelk"
    | "leteRiver"
    | "sealedGate"
    | "mobliz"
    | "ramuh"
    /** Locke checks */
    | "narsheWeaponShop1"
    /** Secondary reward behind whelk  */
    | "narsheWeaponShop2"
    | "phoenixCave"
    | "tunnelArmor"
    /** Setzer checks */
    | "kohligen"
    | "darill"
    /** Sabin checks */
    | "barenFalls"
    | "imperialCamp"
    | "mtKoltz"
    | "phantomTrain"
    | "collapsingHouse"
    /** Celes checks */
    | "operaHouse"
    | "magitek1"
    | "magitek2"
    | "magitek3"
    | "chainedCeles"
    /** Shadow checks */
    | "gauManor"
    | "veldtCave"
    | "floatingContinent1"
    | "floatingContinent2"
    | "floatingContinent3"
    /** Cyan checks */
    | "doma"
    | "mtZozo"
    | "nightmare1"
    | "nightmare2"
    | "nightmare3"
    /** Relm checks */
    | "esperMountain"
    | "owzersMansion"
    /** Strago checks */
    | "burningHouse"
    | "ebotsRock"
    | "fanaticsTower1"
    | "fanaticsTower2"
    /** Mog checks */
    | "loneWolf1"
    | "loneWolf2"
    /** Edgar checks */
    | "figaroThrone"
    | "figaroCastleEngineRoom"
    | "ancientCastle"
    /** Gogo checks */
    | "zoneEater"
    /** Umaro checks */
    | "umarosCave"
    /** Gau checks */
    | "serpentTrench"
    /** Kefka's Tower */
    | "atmaWeapon";
  
  export const ff6Events = {
    /** Global checks */
    doomGaze: "doomGaze",
    tritoch: "tritoch",
    tzenThief: "tzenThief",
    veldt: "veldt",
    auctionHouse1: "auctionHouse1",
    auctionHouse2: "auctionHouse2",
    kefkaAtNarshe: "kefkaAtNarshe",
    /** Terra checks */
    whelk: "whelk",
    leteRiver: "leteRiver",
    sealedGate: "sealedGate",
    mobliz: "mobliz",
    ramuh: "ramuh",
    /** Locke checks */
    narsheWeaponShop1: "narsheWeaponShop1",
    narsheWeaponShop2: "narsheWeaponShop2",
    phoenixCave: "phoenixCave",
    tunnelArmor: "tunnelArmor",
    /** Setzer checks */
    kohligen: "kohligen",
    darill: "darill",
    /** Sabin checks */
    barenFalls: "barenFalls",
    imperialCamp: "imperialCamp",
    mtKoltz: "mtKoltz",
    phantomTrain: "phantomTrain",
    collapsingHouse: "collapsingHouse",
    /** Celes checks */
    operaHouse: "operaHouse",
    magitek1: "magitek1",
    magitek2: "magitek2",
    magitek3: "magitek3",
    chainedCeles: "chainedCeles",
    /** Shadow checks */
    gauManor: "gauManor",
    veldtCave: "veldtCave",
    floatingContinent1: "floatingContinent1",
    floatingContinent2: "floatingContinent2",
    floatingContinent3: "floatingContinent3",
    /** Cyan checks */
    doma: "Doma",
    mtZozo: "mtZozo",
    nightmare1: "nightmare1",
    nightmare2: "nightmare2",
    nightmare3: "nightmare3",
    /** Relm checks */
    esperMountain: "esperMountain",
    owzersMansion: "owzersMansion",
    /** Strago checks */
    burningHouse: "burningHouse",
    ebotsRock: "ebotsRock",
    fanaticsTower1: "fanaticsTower1",
    fanaticsTower2: "fanaticsTower2",
    /** Mog checks */
    loneWolf1: "loneWolf1",
    loneWolf2: "loneWolf2",
    /** Edgar checks */
    figaroThrone: "figaroThrone",
    figaroCastleEngineRoom: "figaroCastleEngineRoom",
    ancientCastle: "ancientCastle",
    /** Gogo checks */
    zoneEater: "zoneEater",
    /** Umaro checks */
    umarosCave: "umarosCave",
    /** Gau checks */
    serpentTrench: "serpentTrench",
    /** Kefka's Tower */
    atmaWeapon: "atmaWeapon",
  };
  export type FF6EventFlags = Record<FF6Event, boolean>;
  
  export type FF6Esper =
    | "ramuh"
    | "ifrit"
    | "shiva"
    | "siren"
    | "terrato"
    | "shoat"
    | "maduin"
    | "bismark"
    | "stray"
    | "palidor"
    | "tritoch"
    | "odin"
    | "raiden"
    | "bahamut"
    | "alexandr"
    | "crusader"
    | "ragnarok"
    | "kirin"
    | "zoneSeek"
    | "carbunkl"
    | "phantom"
    | "sraphim"
    | "golem"
    | "unicorn"
    | "fenrir"
    | "starlet"
    | "phoenix";
  
  export type FF6EsperFlags = Record<FF6Esper, boolean>;
  
  export const ff6Characters = {
    terra: "terra",
    locke: "locke",
    cyan: "cyan",
    shadow: "shadow",
    edgar: "edgar",
    sabin: "sabin",
    celes: "celes",
    strago: "strago",
    relm: "relm",
    setzer: "setzer",
    mog: "mog",
    gau: "gau",
    gogo: "gogo",
    umaro: "umaro",
  };
  
  export type FF6Character =
    | "terra"
    | "locke"
    | "cyan"
    | "shadow"
    | "edgar"
    | "sabin"
    | "celes"
    | "strago"
    | "relm"
    | "setzer"
    | "mog"
    | "gau"
    | "gogo"
    | "umaro";
  
  const ESPER_COUNT = 27;
  
  export const esperIds = Array.from(Array(ESPER_COUNT).keys());
  
  const [
    RAMUH,
    IFRIT,
    SHIVA,
    SIREN,
    TERRATO,
    SHOAT,
    MADUIN,
    BISMARK,
    STRAY,
    PALIDOR,
    TRITOCH,
    ODIN,
    RAIDEN,
    BAHAMUT,
    ALEXANDR,
    CRUSADER,
    RAGNAROK,
    KIRIN,
    ZONESEEK,
    CARBUNKL,
    PHANTOM,
    SRAPHIM,
    GOLEM,
    UNICORN,
    FENRIR,
    STARLET,
    PHOENIX,
  ] = esperIds;
  
  /** Whether or not a given character is available */
  export type FF6CharacterFlags = Record<FF6Character, boolean>;
  
  export enum FF6CharacterIds {
    terra = 0x00,
    locke = 0x01,
    cyan = 0x02,
    shadow = 0x03,
    edgar = 0x04,
    sabin = 0x05,
    celes = 0x06,
    strago = 0x07,
    relm = 0x08,
    setzer = 0x09,
    mog = 0x0a,
    gau = 0x0b,
    gogo = 0x0c,
    umaro = 0x0d,
  }
  
  export const checkToAsset: Record<string, string> = {
    //characters
    terra: "PrtTerra",
    locke: "PrtLocke",
    cyan: "PrtCyan",
    shadow: "PrtShadow",
    edgar: "PrtEdgar",
    sabin: "PrtSabin",
    celes: "PrtCeles",
    strago: "PrtStrago",
    relm: "PrtRelm",
    setzer: "PrtSetzer",
    mog: "PrtMog",
    gau: "PrtGau",
    gogo: "PrtGogo",
    umaro: "PrtUmaro",
  
    characterCount: "Char",
    esperCount: "Esper",
    dragonCount: "RedDragonSprite",
    bossCount: "UltrosSmileIGuess",
    checkCount: "Imper",
    chestCount: "Chest",
  
    // terra
    leteRiver: "Ultros",
    sealedGate: "Maduin",
    mobliz: "Phunbaba",
    whelk: "Whelk",
    ramuh: "Ramuh",
  
    //sabin
    barenFalls: "Rizopas",
    imperialCamp: "MilEnc",
    mtKoltz: "Vargas",
    phantomTrain: "GhostTrain",
    collapsingHouse: "TzenHouse",
    //celes
    operaHouse: "Weight",
    magitek: "Crane",
    chainedCeles: "ChainedCeles",
    //shadow
    gauManor: "GauDad",
    floatingContinent: "ShadowYump",
    veldtCave: "SrBehemoth",
  
    //cyan
    doma: "Captain",
    nightmare: "Wrexsoul",
    mtZozo: "Roses",
  
    //relm
    esperMountain: "GoddessStatue",
    owzersMansion: "Chadarnook",
  
    //mog
    loneWolf: "LoneWolf",
  
    //setzer
    kohligen: "InterceptorKohlingen",
    darill: "Dullahan",
  
    //gau
    serpentTrench: "DiveHelm",
    veldt: "GauJerky",
  
    //edgar
    figaroThrone: "FigaroThrone",
    figaroCastleEngineRoom: "Tentacle",
    ancientCastle: "Raiden",
  
    //locke
    tunnelArmor: "TunnelArmor",
    narsheWeaponShop: "Narshe_Wpn",
    phoenixCave: "Phoenix",
  
    //strago
    burningHouse: "FlameEater",
    ebotsRock: "Hidon",
    fanaticsTower: "MageMaster",
  
    //umaro
    umarosCave: "Umaro",
  
    //gogo
    zoneEater: "ZoneEater",
  
    //ungated
    kefkaAtNarshe: "Kefka",
    tzenThief: "TzenThief",
    auctionHouse: "Auctioneer",
    atmaWeapon: "AtmaWpn",
    tritoch: "Tritoch",
    doomGaze: "DoomGaze",
  
    iceDragon: "IceDragon",
    stormDragon: "StormDragon",
    dirtDragon: "DirtDragon",
    goldDragon: "GoldDragon",
    skullDragon: "SkullDragon",
    blueDragon: "BlueDragon",
    redDragon: "RedDragon",
    whiteDragon: "WhiteDragon",
  };
  