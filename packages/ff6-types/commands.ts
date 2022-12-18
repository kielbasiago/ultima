export const FIGHT = 0;
export const ITEM = 1;
export const MAGIC = 2;
export const MORPH = 3;
export const REVERT = 4;
export const STEAL = 5;
export const CAPTURE = 6;
export const SWD_TECH = 7;
export const THROW = 8;
export const TOOLS = 9;
export const BLITZ = 10;
export const RUNIC = 11;
export const LORE = 12;
export const SKETCH = 13;
export const CONTROL = 14;
export const SLOT = 15;
export const RAGE = 16;
export const LEAP = 17;
export const MIMIC = 18;
export const DANCE = 19;
export const ROW = 20;
export const DEF = 21;
export const JUMP = 22;
export const X_MAGIC = 23;
export const GP_RAIN = 24;
export const SUMMON = 25;
export const HEALTH = 26;
export const SHOCK = 27;
export const POSSESS = 28;
export const MAGITEK = 29;
export const NONE = 97;
export const RANDOM_UNIQUE = 98;
export const RANDOM = 99;

export type CommandArray = [
  number,
  number,
  number,
  number,
  number,
  number,
  number,
  number,
  number,
  number,
  number,
  number,
  number
];

export const DEFAULT_COMMANDS: CommandArray = [
  MORPH,
  STEAL,
  SWD_TECH,
  THROW,
  TOOLS,
  BLITZ,
  RUNIC,
  LORE,
  SKETCH,
  SLOT,
  DANCE,
  RAGE,
  LEAP,
];

export type CommandOption = {
  id: number;
  label: string;
};

export const RANDOM_OPTION = {
  id: RANDOM,
  label: "Random",
};

export const RANDOM_UNIQUE_OPTION = {
  id: RANDOM_UNIQUE,
  label: "Random Unique",
};

export const NONE_OPTION = {
  id: NONE,
  label: "None",
};

export const ALL_COMMANDS: Record<
  string | number,
  { id: number; label: string }
> = {
  [RANDOM]: RANDOM_OPTION,
  [RANDOM_UNIQUE]: RANDOM_UNIQUE_OPTION,
  [NONE]: NONE_OPTION,
  [BLITZ]: {
    id: BLITZ,
    label: "Blitz",
  },
  [CAPTURE]: {
    id: CAPTURE,
    label: "Capture",
  },
  [CONTROL]: {
    id: CONTROL,
    label: "Control",
  },
  [DANCE]: {
    id: DANCE,
    label: "Dance",
  },
  [FIGHT]: {
    id: FIGHT,
    label: "Fight",
  },
  [GP_RAIN]: {
    id: GP_RAIN,
    label: "GP Rain",
  },
  [HEALTH]: {
    id: HEALTH,
    label: "Health",
  },
  [JUMP]: {
    id: JUMP,
    label: "Jump",
  },
  [LEAP]: {
    id: LEAP,
    label: "Leap",
  },
  [LORE]: {
    id: LORE,
    label: "Lore",
  },
  [MAGITEK]: {
    id: MAGITEK,
    label: "Magitek",
  },
  [MORPH]: {
    id: MORPH,
    label: "Morph",
  },
  [POSSESS]: {
    id: POSSESS,
    label: "Possess",
  },
  [RAGE]: {
    id: RAGE,
    label: "Rage",
  },
  [RUNIC]: {
    id: RUNIC,
    label: "Runic",
  },
  [SKETCH]: {
    id: SKETCH,
    label: "Sketch",
  },
  [SHOCK]: {
    id: SHOCK,
    label: "Shock",
  },
  [SLOT]: {
    id: SLOT,
    label: "Slot",
  },
  [STEAL]: {
    id: STEAL,
    label: "Steal",
  },
  [SWD_TECH]: {
    id: SWD_TECH,
    label: "SwdTech",
  },
  [THROW]: {
    id: THROW,
    label: "Throw",
  },
  [TOOLS]: {
    id: TOOLS,
    label: "Tools",
  },
  [X_MAGIC]: {
    id: X_MAGIC,
    label: "X Magic",
  },
};
