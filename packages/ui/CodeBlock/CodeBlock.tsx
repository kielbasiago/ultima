import { cva } from "cva";
import { PropsWithChildren } from "react";

const codeBlock = cva([
  "text-sm",
  "max-h-[600px] bg-gray-200 dark:bg-gray-900 p-4",
  "whitespace-pre-wrap font-mono break-words box-decoration-clone",
  "overflow-auto",
]);

export type Props = React.DetailedHTMLProps<
  React.HTMLAttributes<HTMLElement>,
  HTMLElement
>;

export const CodeBlock = ({ children, className, ...rest }: Props) => (
  <code className={codeBlock({ className })} {...rest}>
    {children}
  </code>
);
