import { useSelector } from "react-redux";
import { selectSettings } from "~/state/settingsSlice";

export type DeprecatedProps = {
  children: React.ReactNode;
};

export const Deprecated = ({ children }: DeprecatedProps) => {
  const { showDeprecated } = useSelector(selectSettings);
  if (!showDeprecated) {
    return null;
  }

  return <>{children}</>;
};
