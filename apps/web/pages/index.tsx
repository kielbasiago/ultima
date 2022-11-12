import { QueryBuilder, QUsb2SnesSession } from "@ff6wc/tracker-core";
import { Button } from "@ff6wc/ui";
import { useQuery } from "react-query";
import { GetSaveDataQuery } from "../queries/GetSaveDataQuery";

const useTracker = () =>
  useQuery(["tracker-info"], async () => {
    const session = new QUsb2SnesSession("ff6wc-data");
    const qb = new QueryBuilder(session);
    await qb.connect();
    return qb.send(new GetSaveDataQuery());
  });

export default function Web() {
  const { data } = useTracker();
  return (
    <div>
      <h1>Web</h1>
      <Button />

      <textarea value={data ? JSON.stringify(data) : ""} />
    </div>
  );
}
