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
  label: string;
  value: number;
};

export const RANDOM_OPTION: CommandOption = {
  value: RANDOM,
  label: "Random",
};

export const RANDOM_UNIQUE_OPTION: CommandOption = {
  value: RANDOM_UNIQUE,
  label: "Random Unique",
};

export const NONE_OPTION: CommandOption = {
  value: NONE,
  label: "None",
};

export const ALL_COMMANDS: Record<
  string | number,
  { value: number; label: string }
> = {
  [RANDOM]: RANDOM_OPTION,
  [RANDOM_UNIQUE]: RANDOM_UNIQUE_OPTION,
  [NONE]: NONE_OPTION,
  [BLITZ]: {
    value: BLITZ,
    label: "Blitz",
  },
  [CAPTURE]: {
    value: CAPTURE,
    label: "Capture",
  },
  [CONTROL]: {
    value: CONTROL,
    label: "Control",
  },
  [DANCE]: {
    value: DANCE,
    label: "Dance",
  },
  [FIGHT]: {
    value: FIGHT,
    label: "Fight",
  },
  [GP_RAIN]: {
    value: GP_RAIN,
    label: "GP Rain",
  },
  [HEALTH]: {
    value: HEALTH,
    label: "Health",
  },
  [JUMP]: {
    value: JUMP,
    label: "Jump",
  },
  [LEAP]: {
    value: LEAP,
    label: "Leap",
  },
  [LORE]: {
    value: LORE,
    label: "Lore",
  },
  [MAGITEK]: {
    value: MAGITEK,
    label: "Magitek",
  },
  [MORPH]: {
    value: MORPH,
    label: "Morph",
  },
  [POSSESS]: {
    value: POSSESS,
    label: "Possess",
  },
  [RAGE]: {
    value: RAGE,
    label: "Rage",
  },
  [RUNIC]: {
    value: RUNIC,
    label: "Runic",
  },
  [SKETCH]: {
    value: SKETCH,
    label: "Sketch",
  },
  [SHOCK]: {
    value: SHOCK,
    label: "Shock",
  },
  [SLOT]: {
    value: SLOT,
    label: "Slot",
  },
  [STEAL]: {
    value: STEAL,
    label: "Steal",
  },
  [SWD_TECH]: {
    value: SWD_TECH,
    label: "SwdTech",
  },
  [THROW]: {
    value: THROW,
    label: "Throw",
  },
  [TOOLS]: {
    value: TOOLS,
    label: "Tools",
  },
  [X_MAGIC]: {
    value: X_MAGIC,
    label: "X Magic",
  },
};
