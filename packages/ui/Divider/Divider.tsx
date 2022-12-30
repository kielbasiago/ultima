import { cx } from "cva";

export type DividerProps = {};

export const Divider = ({}: DividerProps) => {
  return (
    <div className="relative">
      <div className="absolute  inset-0 flex items-center" aria-hidden="true">
        <div className="w-full border-y-1 border-t-gray-300 border-b-transparent" />
      </div>
    </div>
  );
};
