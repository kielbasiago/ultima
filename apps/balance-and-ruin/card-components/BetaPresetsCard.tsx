import React from "react";
import { useDispatch } from "react-redux";
import { Card, HelperText } from "~/../../packages/ui";
import { InputLabel } from "~/components/InputLabel/InputLabel";
import { Select, SelectOption } from "~/components/Select/Select";
import { setRawFlags } from "~/state/flagSlice";
import { setRawObjectives } from "~/state/objectiveSlice";

export type BetaPresetsProps = Record<string, unknown>;

const betaPresets: SelectOption[] = [
  {
    label: "Dragon Rush",
    value:
      "-cg -oa 2.1.1.6.7.7 -ob 3.1.1.6.8.8 -oc 30.8.8.1.1.11.8 -od 59.1.1.11.31 -oe 3.3.3.11.61.11.62.11.63 -sc1 random -sc2 random -sal -eu -csrp 80 125 -fst -brl -slr 3 5 -lmprp 75 125 -lel -srr 25 35 -rnl -rnc -sdr 1 2 -das -dda -dns -sch -scis -com 98989898989898989898989898 -rec1 28 -rec2 27 -xpm 12 -mpm 5 -gpm 5 -lsh 1 -hmh 1 -xgced 2 -ase 2.5 -msl 65 -sed -bbs -drloc shuffle -stloc mix -de statues -bnu -res -fer 0 -escr 100 -dgne -wnz -mmnu -cmd -stesp 1 1 -esr 2 5 -ebr 82 -emprp 75 125 -nm1 random -rnl1 -rns1 -nm2 random -rnl2 -rns2 -nmmi -mmprp 75 125 -gp 5000 -smc 3 -sws 1 -sfd 2 -sto 1 -sj 10 -ieor 33 -ieror 33 -csb 3 14 -mca -stra -saw -sisr 20 -sprp 75 125 -sdm 4 -npi -sebr -sesb -ccsr 20 -cms -frw -wmhc -cor -crr -crvr 50 60 -crm -ari -anca -adeh -nmc -noshoes -nu -nfps -fs -fe -fvd -fr -fj -fbs -fedc -fc -ond -etn -yremove -checks nfc -drewards cei",
    helperText:
      "A 7-dragon hunt where dragons give more exp than normal, with no boss exp",
  },
];

export const BetaPresets = () => {
  const dispatch = useDispatch();
  const [selected, setSelected] = React.useState<SelectOption | null>(null);

  return (
    <Card title="Beta Presets">
      <div className="flex flex-col gap-1">
        <InputLabel htmlFor="tournament-preset-select">Beta Presets</InputLabel>
        <Select
          options={betaPresets}
          onChange={(option) => {
            if (option) {
              setSelected(option);
              dispatch(setRawFlags(option.value));
              dispatch(setRawObjectives(option.value));
            }
          }}
          value={selected}
        />
        <HelperText>Presets used to test upcoming beta features </HelperText>
      </div>
    </Card>
  );
};
