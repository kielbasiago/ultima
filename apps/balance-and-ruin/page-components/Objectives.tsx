import { useMemo } from "react";
import { ObjectiveCard } from "~/card-components/ObjectiveCard";
import { PageColumn } from "~/components/PageColumn/PageColumn";
import { PageContainer } from "~/components/PageContainer/PageContainer";
import { SelectOption } from "~/components/Select/Select";
import { Button } from "~/design-components";
import { ObjectiveMetadata } from "~/types/objectives";

type ObjectivesProps = {
  objectives: ObjectiveMetadata;
};

export const Objectives = ({ objectives }: ObjectivesProps) => {
  return (
    <div>
      <div>
        <Button variant="primary">Add Objective</Button>
      </div>
      <PageContainer columns={2}>
        <ObjectiveCard letter={"a"} metadata={objectives} />
      </PageContainer>
    </div>
  );
};
