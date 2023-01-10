import { useMemo } from "react";
import { useSelector } from "react-redux";
import first from "lodash/first";
import last from "lodash/last";
import BaseSelect, { SingleValue } from "react-select";
import { FlagLabel } from "~/components/FlagLabel/FlagLabel";
import { SelectOption } from "~/components/Select/Select";
import { selectObjectiveConditionMetadataById } from "~/state/objectiveSlice";
import { Objective, ObjectiveCondition } from "~/types/objectives";
import { Slider } from "@ff6wc/ui";
import { HiTrash } from "react-icons/hi";
import { isValidCondition } from "~/utils/isValidCondition";

export type ObjectiveConditionsRequiredProps = {
  condition: ObjectiveCondition;
  objective: Objective;
  onChange: (objective: Objective) => any;
};

export const ObjectiveConditionSelect = ({
  condition,
  objective,
  onChange,
}: ObjectiveConditionsRequiredProps) => {
  const { id, range } = condition;

  const meta = useSelector(selectObjectiveConditionMetadataById);
  const myMeta = meta[id];
  const metaMin = first(myMeta.value_range);
  const metaMax = last(myMeta.value_range);

  const options = useMemo(
    () =>
      Object.values(meta).map<SelectOption>((c) => ({
        label: c.condition_type_name,
        value: c.id.toString(),
      })),
    [meta]
  );

  const optionsById = useMemo(
    () =>
      options.reduce((acc, val) => {
        acc[val.value] = val;
        return acc;
      }, {} as Record<string, SelectOption>),
    [options]
  );

  const selectedCondition = optionsById[id];

  const onConditionChange = (selected: SingleValue<SelectOption>) => {
    const idx = objective.conditions.indexOf(condition);

    if (!selected) {
      ("idk");
      return;
    }
    if (idx === -1) {
      // condition doesn't exist in result?
      console.error(
        "condition not found within objective",
        objective,
        condition
      );
      return;
    }
    const newMeta = meta[selected.value];
    const isRange = newMeta.range;

    const obj = { ...objective };

    const conditions = [...obj.conditions];

    const newCondition: ObjectiveCondition = {
      ...condition,
      id: selected.value,
      name: selected.label,
      range: meta[selected.value].range,
      values: (isRange
        ? [first(newMeta.value_range), first(newMeta.value_range)]
        : [first(newMeta.value_range)]) as string[],
    };
    conditions[idx] = newCondition;
    obj.conditions = conditions;
    const validConditions = conditions.filter(isValidCondition).length;

    const oldId = Number.parseInt(condition.id);
    const newId = Number.parseInt(newCondition.id);
    // if the current selected is "None" and we're selecting another condition, increse required conditions by 1
    if (oldId === 0 && newId > 0) {
      obj.requiredConditions = [
        Math.max(Math.min(obj.requiredConditions[0], validConditions) + 1, 0),
        Math.max(Math.min(obj.requiredConditions[1], validConditions) + 1, 0),
      ];
    } else if (newId === 0 && oldId > 0) {
      obj.requiredConditions = [
        Math.max(Math.min(obj.requiredConditions[0], validConditions) - 1, 0),
        Math.max(Math.min(obj.requiredConditions[1], validConditions) - 1, 0),
      ];
    }
    onChange(obj);
  };

  const onRangeValueChange = (values: number[]) => {
    const idx = objective.conditions.indexOf(condition);
    const obj = { ...objective };
    const conditions = [...objective.conditions];
    const newCondition: ObjectiveCondition = {
      ...condition,
      values,
    };
    conditions[idx] = newCondition;
    obj.conditions = conditions;
    onChange(obj);
  };

  const onSelectValueChange = (selected: SingleValue<SelectOption>) => {
    if (!selected) {
      return;
    }

    const idx = objective.conditions.indexOf(condition);
    const obj = { ...objective };
    const conditions = [...objective.conditions];
    const newCondition: ObjectiveCondition = {
      ...condition,
      values: [selected.value],
    };
    conditions[idx] = newCondition;
    obj.conditions = conditions;
    onChange(obj);
  };

  const selectOptions =
    myMeta.value_range?.map<SelectOption>((value, idx) => {
      const description = myMeta.value_descriptions[idx];
      return {
        label: description,
        value: value.toString(),
      };
    }) ?? [];

  const getSelectedValueOption = () =>
    selectOptions.find(
      ({ value }) => value.toString() === condition.values?.[0]?.toString()
    );

  const showSubselect = !["0", "1"].includes(id);
  const description = "";

  return (
    <div className="flex flex-col gap-2">
      <div>
        <FlagLabel
          flag={objective.flag}
          helperText={description}
          label={"Condition"}
        />
      </div>

      <BaseSelect
        className="ff6wc-select-container"
        classNamePrefix="ff6wc-select"
        instanceId={id}
        getOptionLabel={(option) => option.label}
        getOptionValue={(option) => option.value}
        options={options}
        onChange={(val) => onConditionChange(val)}
        value={selectedCondition}
      />

      {showSubselect && !range ? (
        <BaseSelect
          className="ff6wc-select-container"
          classNamePrefix="ff6wc-select"
          instanceId={id}
          getOptionLabel={(option) => option.label}
          getOptionValue={(option) => option.value}
          options={selectOptions}
          onChange={(val) => onSelectValueChange(val)}
          value={getSelectedValueOption()}
        />
      ) : null}

      {showSubselect && range ? (
        <Slider
          markActiveValues
          min={metaMin as number}
          max={metaMax as number}
          step={1}
          onChange={(val) => onRangeValueChange(val)}
          range
          value={condition.values as number[]}
        />
      ) : null}
    </div>
  );
};
