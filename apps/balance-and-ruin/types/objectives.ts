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
  format_string: "Random";
  group: "Random";
};

export type Objective = {
  conditions: ObjectiveCondition[];
  /** `-oa`, `-ob`, `-oc`, etc. */
  flag: string;
  /** `a`, `b`, `c`, etc. */
  letter: string;
  value: string;
};

export type ObjectiveGroup = {
  label: string;
  options: ObjectiveResult[];
};

export type ObjectiveResult = {
  group: string;
  label: string;
  id: string;
};

export type ObjectiveConditionValue = {
  description: string;
  id: string;
};

export type ObjectiveCondition = {
  name: string;
  id: string;

  /**  */
  range: boolean;
  /** Only available when range = true */
  values: ObjectiveConditionValue[];
};
