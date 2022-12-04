import { useMemo } from "react";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { AppState } from "./store";
import { HYDRATE } from "next-redux-wrapper";
import { NullableProperties } from "~/types/utils";
import { useSelector } from "react-redux";
import overrides from "./schema-overrides.json";

export type FlagValue = string | number | string[] | number[] | boolean | null;

export type RawFlagMetadata = {
  /** Description of flag. this is usually less-than-human-readable */
  description: string;
  /** default value */
  default?: FlagValue;
  /** shorthand flag i.e. `-cg` */
  flag: string;
  /** human readable version of the flag i.e. `character_gated` */
  key: string;
  /** data type */
  type: string; //'str' | 'lower' | 'bool' | 'int' | 'float';
  /** how flags are grouped in code */
  group: string;

  allowed_values?: FlagValue[];
  options?: {
    min_val?: number;
    max_val?: number;
    step?: number;
  };

  /** number of args */
  nargs?: number;
  /** the arg names (probably not relevant) */
  args?: string[] | string; // ['MIN', 'MAX'] | 'COUNT' | 'PERCENT' | 'VALUE';

  /** Whether or not this option is mutually exclusive. Grouping will create options for a select. */
  mutually_exclusive_group?: string;
};

interface FlagMetadataNode {
  allowedValues: FlagValue[] | null;
  defaultValue: FlagValue | null;
  description: string | null;
  min: number | null;
  max: number | null;
  step: number | null;
}

export type Schema = Record<string, FlagMetadataNode>;
type SchemaOverrides = Record<string, Partial<FlagMetadataNode>>;

export interface SchemaState {
  /** Setting override for a flag, a given value will be taken over the server-supplied schema */
  overrides: Partial<SchemaOverrides>;
  /** Schema created from a generated backend json. Generates item for every flag  */
  schema: Schema;
}

const schema = {};
const initialState: SchemaState = {
  overrides: overrides as SchemaOverrides,
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
        const allowedValues = item.allowed_values || [];
        let step: number = item.options?.step ?? 0;
        if (!step && allowedValues) {
          const interpreted = (allowedValues as number[]).find(
            (val) => val % 1
          );
          step = interpreted ? interpreted % 1 : 1;
        }
        // const step = item.options?.step ??  % 1
        state.schema[item.flag] = {
          allowedValues: item.allowed_values || [],
          defaultValue: item.default ?? null,
          description: item.description ?? null,
          max: item.options?.max_val ?? null,
          min: item.options?.min_val ?? null,
          step,
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

const schemaSelector =
  <TKey extends keyof FlagMetadataNode>(flag: string, key: TKey) =>
  (state: AppState): FlagMetadataNode[TKey] => {
    const schema = state.schema.schema[flag];
    const overrides = state.schema.overrides[flag];
    return overrides?.[key] ?? schema?.[key] ?? null;
  };
export const selectAllowedValues = (flag: string) =>
  schemaSelector(flag, "allowedValues");
export const selectDefaultValue = (flag: string) =>
  schemaSelector(flag, "defaultValue");
export const selectDescription = (flag: string) =>
  schemaSelector(flag, "description");
export const selectMax = (flag: string) => schemaSelector(flag, "max");
export const selectMin = (flag: string) => schemaSelector(flag, "min");
export const selectStep = (flag: string) => schemaSelector(flag, "step");

export default schemaSlice.reducer;
