import type { AppProps } from "next/app";
import { QueryClientProvider, QueryClient } from "react-query";

const client = new QueryClient({});

export default function App({ Component, pageProps }: AppProps) {
  return (
    <div className="bg-white text-grey">
      <QueryClientProvider client={client}>
        <Component {...pageProps} />
      </QueryClientProvider>
    </div>
  );
}
