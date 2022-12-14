import groupBy from "lodash/groupBy";
import { useId, useMemo } from "react";
import { useDispatch, useSelector } from "react-redux";
import BaseSelect, { Props, SingleValue } from "react-select";
import { FlagLabel } from "~/components/FlagLabel/FlagLabel";
import { FlagSelectOption } from "~/components/FlagSelectOption/FlagSelectOption";
import { useFlagValueSelector } from "~/state/flagSlice";
import {
  selectObjectiveResultMetadata,
  selectObjectiveResultMetadataById,
} from "~/state/objectiveSlice";
import {
  ObjectiveGroup,
  ObjectiveResult,
  RawObjectiveResult,
} from "~/types/objectives";

type ObjectiveCardProps = {
  flag: string;
  onChange: (val: SingleValue<ObjectiveResult>) => any;
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
const useResultOptions = (results: RawObjectiveResult[]) => {
  return useMemo<ObjectiveResult[]>(
    () =>
      results.map(({ group, id, format_string }) => ({
        group,
        id: id.toString(),
        label: format_string.replace("{{ . }}", ""),
      })),
    [results]
  );
};

export const ObjectiveResultSelect = ({
  flag,
  onChange,
}: ObjectiveCardProps) => {
  const resultMetadata = useSelector(selectObjectiveResultMetadata);
  const rawValue = useFlagValueSelector<string>(flag) ?? "0.0.0";

  const [resultId] = rawValue?.split(".") ?? [];

  const results = useResultOptions(resultMetadata);

  const resultsById = useMemo(
    () =>
      results.reduce((acc, result) => {
        acc[result.id] = resultMetadata.find(
          ({ id }) => id.toString() === result.id
        );
        return acc;
      }, {} as Record<string | number, RawObjectiveResult | undefined>),
    [resultMetadata, results]
  );

  const resultOptionsById = results.reduce((acc, result) => {
    acc[result.id] = result;
    return acc;
  }, {} as Record<string | number, ObjectiveResult | undefined>);

  const selectedObjective = resultOptionsById[resultId];

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

  const getOptionLabel = (option: ObjectiveResult) => {
    const label = `${resultsById[option.id]?.name}`;
    if (label !== option.group) {
      return label;
    }
    return label === "Random" ? "Random" : `Random (${option.group})`;
  };

  return (
    <div key={id}>
      <div>
        <FlagLabel flag={flag} helperText="" label="Result" />
      </div>
      <BaseSelect
        className="ff6wc-select-container"
        classNamePrefix="ff6wc-select"
        components={{ Option: FlagSelectOption }}
        filterOption={filterOption}
        instanceId={id}
        getOptionLabel={getOptionLabel}
        getOptionValue={(option) => option.id.toString()}
        options={groupOptions}
        onChange={(val) => onChange(val)}
        value={selectedObjective}
      />
    </div>
  );
};
