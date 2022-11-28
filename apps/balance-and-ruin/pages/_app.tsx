import type { AppProps } from "next/app";
import { QueryClientProvider, QueryClient } from "react-query";
import { wrapper } from "~/state/store";
import "~/styles/globals.css";
import { Montserrat } from "@next/font/google";
import { cx } from "cva";
const client = new QueryClient({});

const montserrat = Montserrat();
function App({ Component, pageProps }: AppProps) {
  return (
    <div className={cx(montserrat.className, "bg-white text-grey")}>
      <QueryClientProvider client={client}>
        <Component {...pageProps} />
      </QueryClientProvider>
    </div>
  );
}

export default wrapper.withRedux(App);
