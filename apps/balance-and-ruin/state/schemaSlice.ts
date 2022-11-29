import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { AppState } from "./store";
import { createWrapper, HYDRATE } from "next-redux-wrapper";
import { NullableProperties } from "~/types/utils";

export type RawFlagValue = string | number | string[] | number[];

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
  allowedValues?: number;
  min?: number;
  max?: number;
}

type Schema = Record<string, FlagMetadataNode>;
type SchemaOverrides = Record<string, NullableProperties<FlagMetadataNode>>;

// Type for our state
export interface SchemaState {
  /** Setting override for a flag, a given value will be taken over the server-supplied schema */
  overrides: SchemaOverrides;
  /** key is the flag, value contains info about the flag  */
  schema: Schema;
}

const schema = {};
const initialState: SchemaState = {
  overrides: { ...schema },
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

// Actual Slice
export const schemaSlice = createSlice({
  name: "flag",
  initialState,
  reducers: {
    setOverride: (state, action: PayloadAction<OverridePayload>) => {
      state.overrides[action.payload.flag] = action.payload.metadata;
    },
    setSchema: (state, action: PayloadAction<Schema>) => {
      state.schema = action.payload;
    },
  },
  // Special reducer for hydrating the state. Special case for next-redux-wrapper
  extraReducers: {
    [HYDRATE]: (state, action) => {
      return {
        ...state,
        ...action.payload.flag,
      };
    },
  },
});

export const { setOverride, setSchema } = schemaSlice.actions;

export const selectFlagValues = (state: AppState) => state.flag.flagValues;
export const selectFlagValue =
  <T>(flag: string) =>
  (state: AppState) => {
    return state.flag.flagValues[flag] as unknown as T;
  };

export const selectRawFlags = (state: AppState) => {
  return state.flag.rawFlags;
};

export default schemaSlice.reducer;
