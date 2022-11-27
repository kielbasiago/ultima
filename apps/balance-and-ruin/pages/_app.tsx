import type { AppProps } from "next/app";
import { QueryClientProvider, QueryClient } from "react-query";
import { wrapper } from "~/state/store";
import "~/styles/globals.css";

const client = new QueryClient({});

function App({ Component, pageProps }: AppProps) {
  return (
    <div className="bg-white text-grey">
      <QueryClientProvider client={client}>
        <Component {...pageProps} />
      </QueryClientProvider>
    </div>
  );
}

export default wrapper.withRedux(App);
