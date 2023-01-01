export type FooterProps = {
  messages: React.ReactNode[];
};

export const Footer = (props: FooterProps) => {
  const { messages } = props;
  return (
    <div className="flex flex-col  gap-4 w-full justify-center items-center bg-gray-600 text-white text-xs p-3">
      {messages.map((m, idx) => (
        <p className="text-center" key={idx}>
          {m}
        </p>
      ))}
    </div>
  );
};
