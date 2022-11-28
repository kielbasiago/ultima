import type { NextPage } from "next";
import { FormEventHandler } from "react";
import { Card } from "@ff6wc/ui";
import { FlagSwitch } from "~/components/FlagSwitch/FlagSwitch";
import { FlagRange } from "~/components/FlagRange/FlagRange";
import { useSelector } from "react-redux";
import { selectRawFlags } from "~/state/flagSlice";
import { FlagSlider } from "~/components/FlagSlider/FlagSlider";
import { FlagsCard } from "~/components/FlagCard/FlagCard";

const Home: NextPage = () => {
  return (
    <div className={"p-12 flex flex-col h-full justify-between"}>
      <Card className="gap-4 p-4" contentClassName="gap-4" title={"Items"}>
        <FlagSlider flag="-lsced" label="Level Scaling Factor" />
        <FlagRange flag="-csb" label="Cursed Shield Battles" />
        <FlagSwitch flag="-mca" label="Moogle Charm All" />
        <FlagSwitch flag="-nxppd" invert label="Split Party Exp" />
      </Card>
      <FlagsCard />
    </div>
  );
};

export default Home;
