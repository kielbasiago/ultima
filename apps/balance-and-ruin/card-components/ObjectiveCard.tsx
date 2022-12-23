import { Card } from "@ff6wc/ui";
import groupBy from "lodash/groupBy";
import { useId, useMemo } from "react";
import { useDispatch } from "react-redux";
import BaseSelect, { SingleValue, SingleValueProps, Props } from "react-select";
import { FlagSelectOption } from "~/components/FlagSelectOption/FlagSelectOption";
import { InputLabel } from "~/components/InputLabel/InputLabel";
import { SelectOption } from "~/components/Select/Select";
import { Divider } from "~/design-components/Divider/Divider";
import { setFlag, useFlagValueSelector } from "~/state/flagSlice";
import {
  ObjectiveGroup,
  ObjectiveMetadata,
  ObjectiveResult,
  RawObjectiveResult,
} from "~/types/objectives";

type ObjectiveCardProps = {
  letter: string;
  metadata: ObjectiveMetadata;
};

type ObjectiveFilter = Props<
  ObjectiveResult,
  false,
  ObjectiveGroup
>["filterOption"];

/*
   Objective String:
    0.2.2.2.7.7.4.10.10

    resultId.conditionMin.conditionMax.conditonOneId.conditionOneValue1.conditionValue2.conditionTwoValue1.conditionTwoValue2, etc.
 */
const getDefaultObjectiveString = (objectiveId: string | number) =>
  `${objectiveId}.0.0`;

const useConditionOptions = (metadata: ObjectiveMetadata) => {
  const { conditions: rawConditions, objectives: rawResults } = metadata;
  return useMemo<SelectOption[]>(
    () =>
      rawConditions.map((c, idx) => ({
        label: c.condition_type_name,
        value: idx.toString(),
      })),
    [rawConditions]
  );
};
const useResultOptions = (metadata: ObjectiveMetadata) => {
  const { objectives: rawResults } = metadata;

  return useMemo<ObjectiveResult[]>(
    () =>
      rawResults.map(({ group, id, name }) => ({
        group,
        id: id.toString(),
        label: name,
      })),
    [rawResults]
  );
};

export const ObjectiveCard = ({ letter, metadata }: ObjectiveCardProps) => {
  const flag = `-o${letter.toLowerCase()}`;
  const dispatch = useDispatch();
  const rawValue = useFlagValueSelector<string>(flag) ?? "0.0.0";

  const [resultId, conditionsMin, conditionsMax, ...conditionValues] =
    rawValue?.split(".") ?? [];

  const results = useResultOptions(metadata);

  const resultsById = results.reduce((acc, result) => {
    acc[result.id] = metadata.objectives.find(
      ({ id }) => id.toString() === result.id
    );
    return acc;
  }, {} as Record<string | number, RawObjectiveResult | undefined>);

  const resultOptionsById = results.reduce((acc, result) => {
    acc[result.id] = result;
    return acc;
  }, {} as Record<string | number, ObjectiveResult | undefined>);

  const setObjectiveResult = (val: string | null) => {
    if (val == null) {
      return dispatch(
        setFlag({
          flag,
          value: null,
        })
      );
    }

    const [_ignore, ...remaining] = rawValue.split(".");
    dispatch(
      setFlag({
        flag,
        value: [val, conditionsMin, conditionsMax, ...conditionValues].join(
          "."
        ),
      })
    );
  };

  const selectedObjective = resultOptionsById[resultId];

  const onChange = (val: SingleValue<ObjectiveResult>) => {
    setObjectiveResult(val?.id!);
  };

  const id = useId();
  const resultsByGroup = groupBy(results, (i) => i.group);
  const groupOptions = Object.entries(resultsByGroup).map<ObjectiveGroup>(
    ([key, results], idx) => {
      return {
        label: key,
        options: results,
      };
    }
  );

  const filterOption: ObjectiveFilter = ({ label, data, value }, needle) => {
    // default search
    if (label.includes(needle) || value.includes(needle)) return true;

    // check if a group as the filter string as label
    const groupedOptions = groupOptions.filter((group) =>
      group.label.toLocaleLowerCase().includes(needle)
    );

    if (groupOptions) {
      for (const groupOption of groupedOptions) {
        // Check if current option is in group
        const option = groupOption.options.find((opt) => opt.id === value);
        if (option) {
          return true;
        }
      }
    }

    return label.toLowerCase().includes(needle.toLowerCase());
  };

  return (
    <Card title={`Objective ${letter.toUpperCase()}`}>
      <div key={id}>
        <InputLabel htmlFor={id}>Result</InputLabel>
        <BaseSelect
          className="ff6wc-select-container"
          classNamePrefix="ff6wc-select"
          components={{ Option: FlagSelectOption }}
          filterOption={filterOption}
          instanceId={id}
          getOptionLabel={(option) => `${resultsById[option.id]?.name}`}
          getOptionValue={(option) => option.id.toString()}
          options={groupOptions}
          onChange={(val) => onChange(val)}
          value={selectedObjective}
        />
      </div>
      <Divider />
    </Card>
  );
};
