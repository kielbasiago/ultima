import { Card } from "@ff6wc/ui";
import { Divider } from "@ff6wc/ui/Divider/Divider";
import first from "lodash/first";
import { useDispatch, useSelector } from "react-redux";
import { SingleValue } from "react-select";
import { ObjectiveAddConditionButton } from "~/components/ObjectiveAddConditionButton/ObjectiveAddConditionButton";
import { ObjectiveConditionSelect } from "~/components/ObjectiveConditionSelect/ObjectiveConditionSelect";
import { ObjectiveConditionsRequired } from "~/components/ObjectiveConditionsRequired/ObjectiveConditionsRequired";
import { ObjectiveDeleteButton } from "~/components/ObjectiveDeleteButton/ObjectiveDeleteButton";
import { ObjectiveResultSelect } from "~/components/ObjectiveResultSelect/ObjectiveResultSelect";
import { ObjectiveResultValue } from "~/components/ObjectiveResultValue/ObjectiveResultValue";
import { setFlag, useFlagValueSelector } from "~/state/flagSlice";
import {
  selectObjectiveResultMetadataById,
  setObjective,
  setResultValue,
} from "~/state/objectiveSlice";
import { Objective, ObjectiveResult } from "~/types/objectives";
import { createObjective } from "~/utils/createObjective";
import { objectiveToString } from "~/utils/objectiveToString";

type ObjectiveCardProps = {
  objective: Objective;
};

export const ObjectiveCard = ({ objective }: ObjectiveCardProps) => {
  const { flag, letter } = objective;
  const dispatch = useDispatch();

  const value = useFlagValueSelector<string>(`-o${letter}`)?.split(".") ?? [];

  const [resultId] = value;
  const metadata = useSelector(selectObjectiveResultMetadataById);

  const resultMetadata = metadata[resultId] ?? {};
  const { value_range } = resultMetadata;

  const clearObjectiveResult = () => {
    return dispatch(
      setFlag({
        flag,
        value: null,
      })
    );
  };

  const onResultChange = (val: SingleValue<ObjectiveResult>) => {
    if (val === null) {
      return clearObjectiveResult();
    }

    const newMetadata = metadata[val.id];
    const newObjective = createObjective(objective, newMetadata);

    // allow range of values
    if (newMetadata.value_range) {
      const minVal = Number.parseInt(newMetadata.value_range[0].toString());
      const newResultValue = [minVal, minVal];
      const newValue = objectiveToString(newObjective, [minVal, minVal]);
      newObjective.result.value = newResultValue;
      dispatch(
        setFlag({
          flag,
          value: newValue,
        })
      );
      dispatch(setObjective(newObjective));
    } else {
      const newValue = objectiveToString(newObjective);
      newObjective.result.value = undefined;
      dispatch(
        setFlag({
          flag,
          value: newValue,
        })
      );
      dispatch(setObjective(newObjective));
    }
  };

  const onObjectiveChange = (obj: Objective) => {
    dispatch(setObjective(obj));
    dispatch(
      setFlag({
        flag: obj.flag,
        value: objectiveToString(obj),
      })
    );
  };

  const title = (
    <div className={"flex flex-grow items-center justify-between "}>
      <span className="flex items-center gap-4">
        <span>Objective {letter.toUpperCase()}</span>
        <ObjectiveAddConditionButton objective={objective} />
      </span>
      <ObjectiveDeleteButton objective={objective} />
    </div>
  );

  return (
    <Card className="" title={title as unknown as any}>
      <ObjectiveResultSelect flag={flag} onChange={onResultChange} />
      {value_range ? (
        <ObjectiveResultValue objective={objective} metadata={resultMetadata} />
      ) : null}
      {objective.conditions.map((c, idx) => (
        <ObjectiveConditionSelect
          condition={c}
          key={idx}
          objective={objective}
          onChange={onObjectiveChange}
        />
      ))}
      <Divider />
      <ObjectiveConditionsRequired
        objective={objective}
        onChange={onObjectiveChange}
      />
    </Card>
  );
};
