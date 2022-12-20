import { Button, Card, Input } from "@ff6wc/ui";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { CardColumn } from "~/components/CardColumn/CardColumn";
import { FlagLabel } from "~/components/FlagLabel/FlagLabel";
import { setFlags, setRawFlags } from "~/state/flagSlice";

export const PresetsCard = () => {
  return (
    <Card title={"Presets"}>
      <CardColumn>TODO: PRESETS</CardColumn>
    </Card>
  );
};
