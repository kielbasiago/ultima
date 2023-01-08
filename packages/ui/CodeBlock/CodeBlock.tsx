import { cva, cx } from "cva";

const codeBlock = cva([
  "text-sm",
  "max-h-[600px] bg-gray-200 dark:bg-gray-900 p-4",
  "whitespace-pre font-mono break-words box-decoration-clone",
  "overflow-x-auto",
]);

export type Props = React.DetailedHTMLProps<
  React.HTMLAttributes<HTMLElement>,
  HTMLElement
>;

export const CodeBlock = ({ children, className, ...rest }: Props) => (
  <code className={cx(codeBlock({ className }))} {...rest}>
    {children}
  </code>
);
