import { Card } from "@ff6wc/ui";
import { useDispatch } from "react-redux";
import { CardColumn } from "~/components/CardColumn/CardColumn";
import { useFlagValueSelector } from "~/state/flagSlice";

export const CommandsExcluded = () => {
  const dispatch = useDispatch();

  const ex1 = useFlagValueSelector<number>("-rec1");
  const ex2 = useFlagValueSelector<number>("-rec2");
  const ex3 = useFlagValueSelector<number>("-rec3");
  const ex4 = useFlagValueSelector<number>("-rec4");
  const ex5 = useFlagValueSelector<number>("-rec5");
  const ex6 = useFlagValueSelector<number>("-rec6");

  return (
    <Card title={"Excluded"}>
      <CardColumn>TODO EXCLUDED</CardColumn>
    </Card>
  );
};
