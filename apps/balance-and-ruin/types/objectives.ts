export type ObjectiveValue =
  | string
  | number
  | string[]
  | number[]
  | boolean
  | null;

export type RawObjectiveCondition = {
  condition_type_name: string;
  id: number;
  value_descriptions: string[];
  value_range: (string | number)[];
  range: boolean;
};

export type ObjectiveMetadata = {
  conditions: RawObjectiveCondition[];
  objectives: RawObjectiveResult[];
};

export type RawObjectiveResult = {
  id: number;
  name: string;
  value_range: (string | number)[];
  format_string: string;
  group: string;
};

export type ObjectiveResult = {
  group: string;
  label: string;
  id: string;
  value?: number[];
};

export type ObjectiveCondition = {
  name: string;
  id: string;
  /**  */
  range: boolean;
  values: (number | string)[];
};

export type Objective = {
  result: ObjectiveResult;
  conditions: ObjectiveCondition[];
  requiredConditions: [number, number];
  /** `-oa`, `-ob`, `-oc`, etc. */
  flag: string;
  /** `a`, `b`, `c`, etc. */
  letter: string;
  // value: string;
};

export type ObjectiveGroup = {
  label: string;
  options: ObjectiveResult[];
};
