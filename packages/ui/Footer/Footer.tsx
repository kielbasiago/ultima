export type FooterProps = {
  messages: React.ReactNode[];
};

export const Footer = (props: FooterProps) => {
  const { messages } = props;
  return (
    <div className="flex flex-col gap-2 w-full min-h-[75px] justify-center items-center bg-gray-600 text-white text-xs p-4">
      {messages.map((m, idx) => (
        <p className="px-5" key={idx}>
          {m}
        </p>
      ))}
    </div>
  );
};
