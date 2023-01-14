export type FooterProps = {
  messages: React.ReactNode[];
};

export const Footer = (props: FooterProps) => {
  const { messages } = props;
  return (
    <div className="WC-footer flex flex-col gap-2 w-full justify-center items-center bg-gray-600 text-white text-xs p-3">
      {messages.map((m, idx) => (
        <div className="text-center" key={idx}>
          {m}
        </div>
      ))}
    </div>
  );
};
