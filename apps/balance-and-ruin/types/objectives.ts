export type ObjectiveValue =
  | string
  | number
  | string[]
  | number[]
  | boolean
  | null;

export type ObjectiveCondition = {
  /** Display name */
  condition_type_name: string;
  /** Condition id */
  id: number;
  /** List of descriptions. Indexes match with value_range */
  value_descriptions: string[];
  /** List of values. The index of a given value can be used to access the description on value_descriptions  */
  value_range: (string | number)[];
  /** If true, there are 2 args, otherwise 1 */
  range: boolean;
};

export type RawObjectiveResult = {
  /** Result id */
  id: number;
  /** Display name */
  name: string;
  /** List of values */
  value_range: (string | number)[];
  /** Format string used to display description */
  format_string: string;
  /** Human-readable group name. Use this to group the UI options */
  group: string;
};

export type ObjectiveMetadata = {
  conditions: ObjectiveCondition[];
  objectives: RawObjectiveResult[];
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
