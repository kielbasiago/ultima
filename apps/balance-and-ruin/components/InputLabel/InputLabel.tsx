export type InputLabelProps = {
  children: React.ReactNode;
  /** name of input */
  htmlFor: string;
} & React.DetailedHTMLProps<
  React.LabelHTMLAttributes<HTMLLabelElement>,
  HTMLLabelElement
>;

export const InputLabel = ({ children, htmlFor, ...rest }: InputLabelProps) => {
  return (
    <h4 className="text-sm font-medium">
      <label {...rest} htmlFor={htmlFor}>
        {children}
      </label>
    </h4>
  );
};
