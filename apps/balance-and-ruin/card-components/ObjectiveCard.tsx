import { Card } from "@ff6wc/ui";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { SingleValue } from "react-select";
import { ObjectiveResultSelect } from "~/components/ObjectiveResultSelect/ObjectiveResultSelect";
import { ObjectiveResultValue } from "~/components/ObjectiveResultValue/ObjectiveResultValue";
import { setFlag, useFlagValueSelector } from "~/state/flagSlice";
import {
  selectObjectiveResultMetadataById,
  selectObjectivesByFlag,
  setResultValue,
} from "~/state/objectiveSlice";
import { ObjectiveResult } from "~/types/objectives";
import { createObjective } from "~/utils/createObjective";
import { objectiveToString } from "~/utils/objectiveToString";

type ObjectiveCardProps = {
  letter: string;
};

export const ObjectiveCard = ({ letter }: ObjectiveCardProps) => {
  const dispatch = useDispatch();
  const value = useFlagValueSelector<string>(`-o${letter}`)?.split(".") ?? [];

  const [resultId] = value;
  const flag = `-o${letter}`;
  const objective = useSelector(selectObjectivesByFlag)[flag];
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

    const newValue = objectiveToString(newObjective, newMetadata);

    dispatch(
      setFlag({
        flag,
        value: newValue,
      })
    );
  };

  const onValueChange = (value: number[]) => {
    // update objective store
    dispatch(
      setResultValue({
        flag,
        value,
      })
    );

    const newObjective = createObjective(objective, resultMetadata);
    newObjective.result.value = value;
    const newValue = objectiveToString(newObjective, resultMetadata);

    dispatch(
      setFlag({
        flag,
        value: newValue,
      })
    );
  };

  return (
    <Card title={`Objective ${letter.toUpperCase()}`}>
      <ObjectiveResultSelect flag={flag} onChange={onResultChange} />
      {value_range ? (
        <ObjectiveResultValue
          flag={flag}
          metadata={resultMetadata}
          onChange={onValueChange}
        />
      ) : null}
    </Card>
  );
};
