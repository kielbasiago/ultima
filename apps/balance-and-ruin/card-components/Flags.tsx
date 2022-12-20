import { Button, Card, Input } from "@ff6wc/ui";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { CardColumn } from "~/components/CardColumn/CardColumn";
import { FlagLabel } from "~/components/FlagLabel/FlagLabel";
import { setFlags, setRawFlags } from "~/state/flagSlice";

export const FlagsCard = () => {
  const [flags, setFlags] = useState("");
  const dispatch = useDispatch();
  const onClick = () => {
    dispatch(setRawFlags(flags));
  };

  return (
    <Card title={"Enter Flags"}>
      <CardColumn>
        <div>
          <FlagLabel
            flag="-manualflagstring"
            helperText="Enter own flagstring below and click 'Set Flags' to update the active flags"
            label={""}
          />
        </div>
        <div className={"flex gap-4"}>
          <Input
            className={"flex-grow"}
            onChange={(e) => setFlags(e.target.value)}
          />
          <Button onClick={onClick} variant="primary">
            Set Flags
          </Button>
        </div>
      </CardColumn>
    </Card>
  );
};
