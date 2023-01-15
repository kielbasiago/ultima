import { cva, cx } from "cva";

export type TextareaProps = JSX.IntrinsicElements["textarea"];

const textareaStyles = cva([
  "text-sm",
  "max-h-[600px] bg-gray-200 dark:bg-gray-900 p-4",
  "whitespace-normal font-mono break-words box-decoration-clone",
  "overflow-auto",
]);

export const Textarea = ({ className, ...rest }: TextareaProps) => {
  return (
    <textarea
      {...rest}
      className={cx(
        textareaStyles({ className }),
        "w-full p-4 min-h-[175px] h-fit text-xs"
      )}
    />
  );
};
