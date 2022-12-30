import { cva } from "cva";
import { PropsWithChildren } from "react";

const codeBlock = cva([
  "text-sm",
  "max-h-[600px] bg-gray-200 dark:bg-gray-900 p-4",
  "whitespace-pre-wrap font-mono break-words box-decoration-clone",
  "overflow-auto",
]);

export const CodeBlock = ({ children }: PropsWithChildren) => (
  <code className={codeBlock()}>{children}</code>
);
