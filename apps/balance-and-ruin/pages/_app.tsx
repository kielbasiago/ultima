import type { AppProps } from "next/app";
import { QueryClient, QueryClientProvider } from "react-query";
import { Provider } from "react-redux";
import { wrapper } from "~/state/store";

import { Montserrat, Roboto } from "@next/font/google";
import { cx } from "cva";
import { AppType } from "next/app";
import { Schema } from "~/state/schemaSlice";
import "~/styles/globals.css";

const client = new QueryClient({});

const montserrat = Montserrat();
const roboto = Roboto({ weight: ["500", "700", "400"] });

type Props = {
  schema: Schema;
};

const App: AppType<Props> = ({ Component, ...rest }: AppProps<Props>) => {
  const { store, props } = wrapper.useWrappedStore(rest);
  return (
    <div
      className={cx(
        roboto.className,
        "bg-white dark:bg-slate-800 text-grey dark:text-white"
      )}
    >
      <Provider store={store}>
        <QueryClientProvider client={client}>
          <Component {...props.pageProps} />
        </QueryClientProvider>
      </Provider>
    </div>
  );
};

export default App;
