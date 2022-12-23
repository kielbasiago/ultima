import { Card, HelperText } from "@ff6wc/ui";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { components, GroupProps } from "react-select";
import { InputLabel } from "~/components/InputLabel/InputLabel";
import { Select, SelectOption } from "~/components/Select/Select";
import { setRawFlags } from "~/state/flagSlice";

export type PresetsCardProps = {
  presets: SelectOption[];
};

const presets: SelectOption[] = [
  {
    label: "Ultros League",
    value:
      "-cg -oa 2.2.2.2.6.6.4.9.9 -ob 3.1.1.2.9.9.4.12.12 -oc 30.8.8.1.1.11.8 -sc1 random -sc2 random -sc3 random -sal -eu -csrp 80 125 -fst -brl -slr 3 5 -lmprp 75 125 -lel -srr 20 30 -rnl -rnc -sdr 1 2 -das -dda -dns -sch -com 98989898989898989898989898 -rec1 28 -rec2 27 -rec3 29 -xpm 3 -mpm 5 -gpm 5 -nxppd -lsced 2 -hmced 2 -xgced 2 -ase 2 -msl 40 -sed -bbs -be -bnu -res -fer 0 -escr 100 -dgne -wnz -mmnu -cmd -esr 1 5 -ebr 68 -emprp 75 125 -nm1 random -rnl1 -nm2 random -rnl2 -nmmi -gp 5000 -smc 3 -ieor 33 -ieror 33 -csb 3 14 -mca -stra -saw -sisr 20 -sprp 75 125 -sdm 4 -npi -snbr -ccsr 20 -cms -cor -crr -crvr 50 60 -crm -ari -anca -adeh -nmc -nfps -nu -fs -fe -fvd -fr -fj -fbs -fedc -as -ond -rr -etn -frw",
  },
  {
    label: "Terra's Sword",
    value:
      "-cg -oa 2.2.2.2.6.6.4.9.9 -ob 3.1.1.8.12.12 -oc 30.3.3.1.1.11.8 -od 31.10.10.1.1.12.9 -oe 33.1.1.12.9 -of 40.2.2.11.26.11.51 -og 45.10.10.0.0 -sc1 terra -sc2 random -sc3 random -sal -eu -csrp 80 125 -fst -brl -slr 3 5 -lmprp 75 125 -lel -srr 25 35 -rnl -rnc -sdr 1 2 -das -dda -dns -sch -com 03989898989898989898989898 -rec1 28 -rec2 27 -xpm 3 -mpm 7 -gpm 5 -nxppd -lsced 2.5 -hmced 2.5 -xgced 2 -ase 2 -msl 50 -sed -bbs -be -bnu -res -fer 0 -escr 100 -dgne -wnz -mmnu -cmd -esrt -ebr 82 -emprp 30 50 -ems -nm1 terra -rnl1 -rns1 -nm2 random -rnl2 -rns2 -nmmi -gp 5000 -smc 3 -sto 1 -ieor 33 -ieror 33 -csb 3 14 -mca -stra -saw -sisr 20 -sprp 75 125 -sdm 5 -npi -snbr -snsb -ccsr 20 -cms -cor -crr -crvr 120 120 -crm -ari -anca -adeh -nmc -nu -nfps -fs -fe -fvd -fr -fj -fbs -fedc -as -ond -rr -etn -frw",
  },
  {
    label: "Locke's Knife",
    value:
      "-cg -oa 2.2.2.2.6.6.4.9.9 -ob 3.1.1.8.12.12 -oc 30.3.3.1.1.11.8 -od 8.1.1.12.9 -oe 46.10.10.0.0 -of 48.5.5.0.0 -og 45.-5.-5.0.0 -sc1 locke -sc2 random -sc3 random -sal -eu -csrp 80 125 -fst -brl -slr 3 5 -lmprp 75 125 -lel -srr 25 35 -rnl -rnc -sdr 1 2 -das -dda -dns -sca -com 98059898989898989898989898 -rec1 28 -rec2 27 -rec3 29 -xpm 3 -mpm 5 -gpm 5 -nxppd -lsced 2.5 -hmced 2.5 -xgced 2 -ase 2 -msl 50 -sed -bbs -be -bnu -res -fer 0 -escr 100 -dgne -wnz -mmnu -cmd -esr 2 5 -ebr 82 -emprp 75 125 -nm1 random -rnl1 -rns1 -nm2 random -rnl2 -rns2 -nmmi -smc 3 -sfd 10 -sto 1 -ieor 33 -ieror 33 -csb 3 14 -mca -stra -saw -sirt -sprp 150 200 -ssf4 -sdm 5 -npi -snbr -ccsr 100 -cms -cor -crr -crvr 120 120 -crm -ari -anca -adeh -nmc -nu -nfps -fs -fe -fvd -fr -fj -fbs -fedc -as -ond -rr -etn -frw",
  },
  {
    label: "Edgar's Chain Saw",
    value:
      "-cg -oa 2.2.2.2.6.6.4.9.9 -ob 3.1.1.8.12.12 -oc 30.3.3.1.1.11.8 -od 43.1.1.12.6 -oe 48.5.5.0.0 -of 45.5.5.0.0 -og 45.10.10.1.1.12.9 -oh 46.10.10.1.1.12.9 -oi 47.10.10.1.1.12.9 -oj 48.10.10.1.1.12.9 -ok 58.1.1.12.6 -sc1 edgar -sc2 random -sc3 random -sal -eu -csrp 80 125 -fst -brl -slr 3 5 -lmprp 75 125 -lel -srr 25 35 -rnl -rnc -sdr 1 2 -das -dda -dns -sch -com 98989898099898989898989898 -rec1 28 -rec2 27 -rec3 29 -xpm 3 -mpm 5 -nxppd -lsced 2.5 -hmced 2.5 -xgced 2 -ase 2 -msl 50 -sed -bbs -be -bnu -res -fer 0 -escr 100 -dgne -wnz -mmnu -cmd -esr 2 5 -ebr 82 -emprp 75 125 -nm1 random -rnl1 -rns1 -nm2 random -rnl2 -rns2 -nmmi -gp 3000 -smc 3 -sws 3 -sfd 3 -sto 1 -ieor 33 -ieror 33 -csb 3 14 -mca -stra -saw -sisr 100 -sprv 2000 2000 -ssf4 -sdm 5 -npi -snbr -snsb -ccsr 20 -cms -cor -crr -crvr 120 120 -crm -ari -anca -adeh -nmc -nu -nfps -fs -fe -fvd -fr -fj -fbs -fedc -as -ond -rr -rc -etn -frw",
  },
  {
    label: "Sabin's Claw",
    value:
      "-open -oa 2.2.2.2.6.6.4.9.9 -ob 3.1.1.8.12.12 -oc 30.3.3.1.1.11.8 -od 14.1.1.12.9 -oe 47.20.20.1.1.12.9 -of 38.1.1.12.7 -og 48.5.5.0.0 -oh 47.5.5.0.0 -oi 13.3.3.11.34.11.11.11.33 -sc1 sabin -sc2 random -sc3 random -sal -eu -csrp 80 125 -fst -brl -slr 3 5 -lmprp 75 125 -lel -srr 25 35 -rnl -rnc -sdr 1 2 -das -dda -dns -sch -com 98989898981098989898989898 -rec1 28 -rec2 27 -rec3 29 -xpm 3 -mpm 5 -gpm 5 -nxppd -lsced 2.5 -hmced 2.5 -xgced 2 -ase 2 -msl 50 -sed -bbs -be -bnu -res -fer 0 -escr 100 -dgne -wnz -mmnu -cmd -esr 0 2 -ebr 100 -emprp 75 125 -nm1 random -rnl1 -rns1 -nm2 random -rnl2 -rns2 -nmmi -smc 3 -sto 1 -ieor 33 -ieror 33 -csb 3 14 -mca -stra -saw -sisr 20 -sprp 75 125 -ssf4 -sdm 5 -npi -snbr -snsb -snee -ccsr 20 -cms -cor -crr -crvr 120 120 -crm -cnee -ari -anca -adeh -nmc -nee -nu -nfps -nfce -fs -fe -fvd -fr -fj -fbs -fedc -as -ond -rr -etn -frw",
  },
  {
    label: "Cyan's Katana",
    value:
      "-cg -oa 2.2.2.2.6.6.4.9.9 -ob 3.1.1.8.12.12 -oc 30.8.8.1.1.11.8 -od 48.20.20.1.1.12.9 -oe 48.10.10.0.0 -of 47.5.5.0.0 -og 45.-5.-5.0.0 -sc1 cyan -sc2 random -sc3 random -sal -eu -csrp 80 125 -fst -brl -slr 3 5 -lmprp 75 125 -lel -srr 25 35 -rnl -rnc -sdr 1 2 -das -dda -dns -com 98980798989898989898989898 -rec1 28 -rec2 27 -rec3 29 -rec4 9 -xpm 4 -mpm 5 -gpm 5 -nxppd -lsced 2.5 -hmced 2.5 -xgced 2 -msl 50 -sed -be -bnu -res -fer 0 -escr 100 -dgne -wnz -mmnu -cmd -emprp 75 125 -nm1 random -rnl1 -rns1 -nm2 random -rnl2 -rns2 -nmmi -gp 5000 -smc 3 -sfd 3 -sto 1 -ieor 33 -ieror 33 -csb 3 14 -mca -stra -saw -sisr 20 -sprp 75 125 -sdm 5 -npi -snbr -snsb -ccsr 20 -cms -cor -crr -crvr 120 120 -crm -ari -anca -adeh -nmc -nu -nfps -nfce -pd -fs -fe -fvd -fr -fj -fbs -fedc -as -ond -rr -etn -frw",
  },
  {
    label: "Gau's Fang",
    value:
      "-cg -oa 2.2.2.2.6.6.4.9.9 -ob 3.1.1.8.12.12 -oc 30.3.3.1.1.11.8 -od 29.25.25.1.1.12.9 -oe 46.20.20.1.1.12.9 -of 37.1.1.11.48 -og 48.5.5.0.0 -oh 46.5.5.0.0 -sc1 gau -sc2 random -sc3 random -sal -sn -eu -csrp 50 175 -fst -brl -slr 3 5 -lmprp 75 125 -lel -srr 25 35 -rnl -rnc -sdr 1 2 -das -dda -dns -sch -com 98989898989898989898981697 -rec1 28 -rec2 27 -rec3 29 -xpm 3 -mpm 5 -gpm 5 -nxppd -lsced 2.5 -hmced 2.5 -xgced 2 -ase 2 -msl 50 -sed -bbs -bmbd -be -bnu -res -fer 0 -escr 100 -dgne -wnz -mmnu -cmd -esr 1 3 -ebr 82 -emprp 75 125 -nm1 random -rnl1 -rns1 -nm2 random -rnl2 -rns2 -nmmi -smc 3 -sto 1 -ieor 33 -ieror 33 -csb 3 14 -mca -stra -saw -sisr 20 -sprp 75 125 -sdm 4 -npi -snbr -snsb -ccsr 20 -cms -cor -crr -crvr 120 120 -crm -ari -anca -adeh -nmc -nu -nfps -fs -fe -fvd -fr -fj -fbs -fedc -as -ond -rr -etn -ycreature -frw",
  },
  {
    label: "Celes's Runic Blade",
    value:
      "-cg -oa 2.2.2.2.6.6.4.9.9 -ob 3.1.1.8.12.12 -oc 30.3.3.1.1.11.8 -od 16.1.1.12.9 -oe 31.10.10.1.1.12.9 -of 45.5.5.0.0 -og 46.5.5.0.0 -oh 40.1.1.12.4 -oi 58.1.1.12.5 -sc1 celes -sc2 random -sc3 random -sal -eu -csrp 90 140 -fst -brl -slr 3 5 -lmprp 75 125 -lel -srr 25 35 -rnl -rnc -sdr 1 2 -das -dda -dns -sch -com 98989898989811989898989898 -rec1 28 -rec3 29 -xpm 3 -mpm 5 -gpm 5 -nxppd -lsced 2.5 -hmced 2.5 -xgced 2 -ase 2 -msl 50 -sed -bbs -be -bnu -res -fer 0 -escr 100 -dgne -wnz -mmnu -cmd -esr 5 5 -ebr 33 -emprp 125 150 -eebr 7 -nm1 random -rnl1 -rns1 -nm2 celes -rnl2 -rns2 -nmmi -gp 5000 -smc 3 -sto 1 -ieor 33 -ieror 33 -csb 3 14 -mca -stra -saw -sisr 20 -sprp 75 125 -sdm 5 -npi -snbr -snsb -ccsr 20 -cms -cor -crr -crvr 120 120 -crm -ari -anca -adeh -nmc -nu -nfps -nfce -fs -fe -fvd -fr -fj -fbs -fedc -as -ond -rr -etn -yimperial -frw",
  },
  {
    label: "Setzer's Dice",
    value:
      "-cg -oa 2.2.2.2.6.6.4.9.9 -ob 3.1.1.8.12.12 -oc 30.3.3.1.1.11.8 -od 58.1.1.12.9 -oe 58.1.1.12.9 -of 58.1.1.12.9 -og 48.5.5.0.0 -oh 47.5.5.0.0 -sc1 setzer -sc2 random -sc3 random -sal -eu -csrp 65 140 -fst -brl -slr 3 5 -lmprp 75 125 -lel -srr 25 35 -rnl -rnc -sdr 1 2 -das -dda -dns -sch -com 99999999999999999915999999 -rec1 28 -xpm 3 -mpm 5 -gpm 5 -nxppd -lsced 2.5 -hmced 2.5 -xgced 2 -asr 2 -msl 50 -sed -bbr -be -bnu -rer 0 -fer 0 -escr 100 -dgne -wnz -mmnu -cmd -esr 0 5 -ebr 82 -emprv 1 128 -eer 6 12 -nm1 random -rnl1 -rns1 -nm2 random -rnl2 -rns2 -nmmi -gp 5000 -smc 3 -sto 1 -ieor 33 -ieror 33 -csb 3 14 -mca -stra -saw -sirt -sprv 0 65535 -sdm 5 -npi -snbr -snsb -ccrs -cms -cor -crr -crvr 120 120 -crm -ari -anca -adeh -nmc -nu -nfps -fs -fe -fvd -fr -fj -fbs -fedc -as -ond -rr -etn -frw",
  },
  {
    label: "Strago's Rod",
    value:
      "-cg -oa 2.2.2.2.6.6.4.9.9 -ob 3.1.1.8.12.12 -oc 30.3.3.1.1.11.8 -od 35.1.1.12.9 -oe 45.10.10.0.0 -of 28.24.24.2.2.11.14.11.10 -sc1 strago -sc2 random -sc3 random -sal -eu -csrp 80 125 -fst -brl -slr 6 12 -lmprp 50 100 -lel -srr 25 35 -rnl -rnc -sdr 1 2 -das -dda -dns -sch -com 98989898989898129898989898 -rec1 28 -rec3 29 -rec4 23 -xpm 3 -mpm 5 -gpm 5 -nxppd -lsced 2.5 -hmced 2.5 -xgced 2 -ase 2 -msl 50 -sed -bbs -be -bnu -res -fer 0 -escr 100 -dgne -wnz -mmnu -cmd -esr 1 2 -ebr 82 -emprp 50 100 -ems -nm1 random -rnl1 -rns1 -nm2 random -rnl2 -rns2 -nmmi -gp 5000 -smc 3 -sto 1 -ieor 33 -ieror 33 -csb 3 14 -mca -stra -saw -sisr 40 -sprp 75 125 -sdm 5 -npi -snsb -ccsr 20 -cms -cor -crr -crvr 120 120 -crm -ari -anca -adeh -nmc -nu -nfps -fs -fe -fvd -fr -fj -fbs -fedc -as -ond -rr -etn -frw",
  },
  {
    label: "Relm's Brush",
    value:
      "-cg -oa 2.2.2.2.6.6.4.9.9 -ob 3.1.1.8.12.12 -oc 30.3.3.1.1.11.8 -od 45.15.15.1.1.12.9 -oe 45.5.5.0.0 -of 46.5.5.0.0 -sc1 relm -sc2 random -sc3 random -sal -eu -csrp 80 125 -fst -brl -slr 3 5 -lmprp 75 125 -lel -srr 25 35 -rnl -rnc -sdr 1 2 -das -dda -dns -sch -com 98989898989898981398989898 -rec1 28 -rec2 27 -rec3 29 -xpm 3 -mpm 7 -gpm 5 -nxppd -lsced 2.5 -hmced 2.5 -xgced 2 -ase 2 -msl 50 -sed -bbs -be -bnu -res -fer 0 -escr 100 -dgne -wnz -mmnu -cmd -esr 4 5 -ebr 82 -emprp 75 125 -ems -nm1 random -rnl1 -rns1 -nm2 random -rnl2 -rns2 -nmmi -gp 5000 -smc 3 -sto 1 -ieor 33 -ieror 33 -csb 3 14 -mca -stra -saw -sisr 20 -sprp 75 125 -sdm 5 -npi -snbr -snsb -ccsr 20 -cms -cpal 100.95.20.92.126.41.6 -cor -crr -crvr 120 120 -crm -ari -anca -adeh -nmc -nee -nil -nu -nfps -fs -fe -fvd -fr -fj -fbs -fedc -as -ond -rr -etn -ysketch -frw",
  },
  {
    label: "Shadow's Ninja Star",
    value:
      "-cg -oa 2.2.2.2.6.6.4.9.9 -ob 3.1.1.8.12.12 -oc 30.3.3.1.1.11.8 -od 9.1.1.12.9 -oe 48.5.5.0.0 -of 46.5.5.0.0 -og 58.1.1.12.2 -sc1 shadow -sc2 random -sc3 random -sal -eu -csrp 80 125 -fst -brl -slr 3 5 -lmprp 75 125 -lel -srr 25 35 -rnl -rnc -sdr 1 2 -das -dda -dns -sch -com 98989808989898989898989898 -rec1 28 -rec2 27 -rec3 29 -xpm 8 -mpm 5 -gpm 10 -lsced 2.5 -hmced 2.5 -xgced 2 -ase 2 -msl 50 -sed -bbs -be -bnu -res -fer 0 -escr 100 -dgne -wnz -mmnu -cmd -esr 2 5 -ebr 82 -emprp 75 125 -nm1 random -rnl1 -rns1 -nm2 random -rnl2 -rns2 -nmmi -gp 50000 -smc 3 -sto 1 -ieor 33 -ieror 33 -csb 3 14 -mca -stra -saw -sisr 20 -sprp 75 125 -ssf0 -sdm 5 -npi -snbr -snsb -ccsr 20 -cms -cor -crr -crvr 120 120 -crm -ari -anca -adeh -nmc -nu -nfps -nfce -fs -fe -fvd -fr -fj -fbs -fedc -as -ond -rr -etn -yremove -frw",
  },
  {
    label: "Mog's Lance",
    value:
      "-cg -oa 2.2.2.2.6.6.4.9.9 -ob 3.1.1.8.12.12 -oc 30.3.3.1.1.11.8 -od 36.1.1.12.9 -oe 46.5.5.0.0 -of 48.5.5.0.0 -og 27.8.8.1.1.11.28 -oh 36.1.1.6.2.2 -oi 36.1.1.6.4.4 -sc1 mog -sc2 random -sc3 random -sal -eu -csrp 80 125 -fst -brl -slr 3 5 -lmprp 75 125 -lel -srr 25 35 -rnl -rnc -sdr 1 2 -das -dda -dns -sch -com 98989898989898989898199898 -rec1 28 -rec2 27 -rec3 29 -xpm 3 -mpm 5 -gpm 5 -nxppd -lsced 2.5 -hmced 2.5 -xgced 2 -ase 2 -msl 50 -sed -bbs -be -bnu -res -fer 0 -escr 100 -dgne -wnz -mmnu -cmd -esr 2 5 -ebr 82 -emprp 75 125 -nm1 random -rnl1 -rns1 -nm2 random -rnl2 -rns2 -nmmi -gp 5000 -smc 3 -sto 1 -ieor 100 -ieror 100 -csb 3 14 -mca -stra -saw -sisr 20 -sprp 75 125 -sdm 5 -npi -snbr -snsb -ccsr 20 -cms -name TERRA.LOCKE.KUPEK.KUPOP.KUMAMA.KUKU.KUTAN.KUPAN.KUSHU.KURIN.MOG.KURU.KAMOG.UMARO -cpor 0.1.10.10.10.10.10.10.10.10.10.10.10.13.14 -cspr 0.1.10.10.10.10.10.10.10.10.10.10.10.13.14.15.18.19.20.21 -cspp 2.1.5.5.5.5.5.5.5.5.5.5.5.5.1.0.6.1.0.3 -cor -crr -crvr 120 120 -crm -ari -anca -adeh -nmc -nu -nfps -fs -fe -fvd -fr -fj -fbs -fedc -as -ond -rr -etn -frw",
  },
  {
    label: "Gogo's Mirror",
    value:
      "-cg -oa 2.2.2.2.6.6.4.9.9 -ob 3.1.1.8.12.12 -oc 30.3.3.1.1.11.8 -od 12.1.1.12.9 -sc1 gogo -sc2 random -sc3 random -sal -eu -csrp 80 125 -fst -brl -slr 3 5 -lmprp 75 125 -lel -srr 25 35 -rnl -rnc -sdr 1 2 -das -dda -dns -sch -com 98989898989898989898989898 -xpm 4 -mpm 5 -gpm 5 -nxppd -lsh 1 -hmh 1 -xgh 1 -ase 2.5 -msl 50 -sed -bbs -be -bnu -res -fer 0 -escr 100 -dgne -wnz -mmnu -cmd -esr 2 5 -ebr 82 -emprp 75 125 -nm1 random -rnl1 -rns1 -nm2 random -rnl2 -rns2 -nmmi -gp 5000 -smc 3 -sto 1 -ieor 33 -ieror 33 -csb 3 14 -mca -stra -saw -sisr 20 -sprp 75 125 -sdm 5 -npi -snbr -snsb -ccsr 20 -cms -cor -crr -crvr 120 120 -crm -ari -anca -adeh -nmc -nfps -fs -fe -fvd -fr -fj -fbs -fedc -as -ond -rr -etn -yreflect -frw",
  },
  {
    label: "Umaro's Club",
    value:
      "-cg -oa 2.2.2.2.6.6.4.9.9 -ob 3.1.1.8.12.12 -oc 30.3.3.1.1.11.8 -od 5.1.1.12.9 -oe 48.30.30.1.1.12.9 -of 48.10.10.0.0 -sc1 umaro -sc2 random -sc3 random -sal -eu -csrp 100 125 -fst -brl -slr 3 5 -lmprp 75 125 -lel -srr 25 35 -rnl -rnc -sdr 1 2 -das -dda -dns -sch -com 98989898989897979797979897 -scc -rec1 28 -rec2 6 -rec3 11 -rec4 23 -rec5 13 -rec6 14 -xpm 3 -mpm 5 -gpm 5 -nxppd -lsced 2.5 -hmced 2.5 -xgced 2 -ase 2 -msl 50 -sed -bbs -be -bnu -res -fer 0 -escr 100 -dgne -wnz -mmnu -cmd -esr 2 5 -ebr 100 -emprp 75 125 -nm1 random -rnl1 -rns1 -nm2 random -rnl2 -rns2 -nmmi -gp 5000 -smc 3 -sto 1 -ieor 33 -ieror 33 -csb 3 14 -mca -stra -saw -sisr 20 -sprp 75 125 -sdm 5 -npi -snbr -snsb -ccsr 20 -cms -cor -crr -crvr 120 120 -crm -ari -anca -adeh -nmc -nu -nfps -nfce -fs -fe -fvd -fr -fj -fbs -fedc -as -ond -rr -etn -frw",
  },
];

const Group = (props: GroupProps<SelectOption, false>) => (
  <div>
    <components.Group {...props} />
  </div>
);

export const PresetsCard = ({ presets }: PresetsCardProps) => {
  const dispatch = useDispatch();
  const [selected, setSelected] = useState<SelectOption | null>(null);

  return (
    <Card title={"Presets"}>
      <div className="flex flex-col gap-1">
        <InputLabel htmlFor="tournament-preset-select">
          Tournament Presets
        </InputLabel>
        <Select
          options={presets}
          onChange={(option) => {
            if (option) {
              setSelected(option);
              dispatch(setRawFlags(option.value));
            }
          }}
          value={selected}
        />
        <HelperText>Presets used for ongoing tournaments</HelperText>
      </div>

      {/* <div className="flex flex-col gap-1">
        <InputLabel htmlFor="tournament-preset-select">
          Seed of the week
        </InputLabel>
        <Select
          options={presets}
          onChange={(option) => {
            if (option) {
              setSelected(option);
              dispatch(setRawFlags(option.value));
            }
          }}
          value={selected}
        />
        <HelperText>Presets used for ongoing tournaments</HelperText>
      </div> */}
    </Card>
  );
};
