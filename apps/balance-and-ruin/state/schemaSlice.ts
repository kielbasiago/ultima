import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { AppState } from "./store";
import { HYDRATE } from "next-redux-wrapper";
import { NullableProperties } from "~/types/utils";

export type RawFlagValue = string | number | string[] | number[] | boolean;

export type RawFlagMetadata = {
  /** Description of flag. this is usually less-than-human-readable */
  description: string;
  /** default value */
  default?: RawFlagValue;
  /** shorthand flag i.e. `-cg` */
  flag: string;
  /** human readable version of the flag i.e. `character_gated` */
  key: string;
  /** data type */
  type: string; //'str' | 'lower' | 'bool' | 'int' | 'float';
  /** how flags are grouped in code */
  group: string;

  allowed_values?: RawFlagValue[];
  options?: {
    min_val?: number;
    max_val?: number;
  };

  /** number of args */
  nargs?: number;
  /** the arg names (probably not relevant) */
  args?: string[] | string; // ['MIN', 'MAX'] | 'COUNT' | 'PERCENT' | 'VALUE';

  /** Whether or not this option is mutually exclusive. Grouping will create options for a select. */
  mutually_exclusive_group?: string;
};

interface FlagMetadataNode {
  allowedValues: RawFlagValue[];
  defaultValue: RawFlagValue | null;
  description: string | null;
  min: number | null;
  max: number | null;
}

export type Schema = Record<string, FlagMetadataNode>;
type SchemaOverrides = Record<string, NullableProperties<FlagMetadataNode>>;

export interface SchemaState {
  /** Setting override for a flag, a given value will be taken over the server-supplied schema */
  overrides: Partial<SchemaOverrides>;
  /** Schema created from a generated backend json. Generates item for every flag  */
  schema: Schema;
}

const schema = {};
const initialState: SchemaState = {
  overrides: {},
  schema,
};

interface OverridePayload {
  /**
   * The WC flag used to identify a flag
   * @example
   * `-cg`
   * `-msl`
   */
  flag: string;
  /** Metadata values to override */
  metadata: SchemaOverrides[string];
}

const combineMetadata = (
  schema: SchemaState["schema"][string],
  overrides: SchemaState["overrides"][string]
) => {};

// Actual Slice
export const schemaSlice = createSlice({
  name: "schema",
  initialState,
  reducers: {
    setOverride: (state, action: PayloadAction<OverridePayload>) => {
      state.overrides[action.payload.flag] = action.payload.metadata;
    },
    setSchema: (
      state,
      action: PayloadAction<Record<string, RawFlagMetadata>>
    ) => {
      Object.values(action.payload).forEach((item) => {
        state.schema[item.flag] = {
          allowedValues: item.allowed_values || [],
          defaultValue: item.default || null,
          description: null,
          max: item.options?.max_val ?? null,
          min: item.options?.min_val ?? null,
        };
      });
    },
  },
  // Special reducer for hydrating the state. Special case for next-redux-wrapper
  extraReducers: {
    [HYDRATE]: (state, action) => {
      return {
        ...state,
        ...action.payload.schema,
      };
    },
  },
});

export const { setSchema, setOverride } = schemaSlice.actions;

export const selectSchema =
  (flag: string) =>
  (state: AppState): FlagMetadataNode => {
    // const servers = state.schema.schema[flag];
    // const ours = state.schema.overrides[flag];

    // return {
    //   allowedValues: ours?.allowedValues ?? servers?.allowedValues ?? [],
    //   description: ours?.description ?? servers?.description ?? null,
    //   max: ours?.max ?? servers?.max ?? null,
    //   min: ours?.min ?? servers?.min ?? null,
    // };
    return state.schema.schema[flag];
  };

export default schemaSlice.reducer;
