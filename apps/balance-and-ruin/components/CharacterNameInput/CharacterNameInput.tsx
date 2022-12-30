import { useDispatch } from "react-redux";
import { defaultCharacterNameString } from "~/constants/graphicConstants";
import { Input } from "@ff6wc/ui";
import { setFlag, useFlagValueSelector } from "~/state/flagSlice";

export type CharacterNameInputProps = {
  characterId: number;
};

export const CharacterNameInput = ({
  characterId,
}: CharacterNameInputProps) => {
  const dispatch = useDispatch();
  const rawCharacterNames =
    useFlagValueSelector<string>("-name") ?? defaultCharacterNameString;

  const characterNames = rawCharacterNames.split(".");

  const setName = (newName: string) => {
    const charName = newName.slice(0, 6);
    const cn = [...characterNames];
    cn.splice(characterId, 1, charName);
    dispatch(
      setFlag({
        flag: "-name",
        value: cn.join("."),
      })
    );
  };

  return (
    <Input
      onChange={(e) => setName(e.target.value)}
      value={characterNames[characterId]}
    />
  );
};
