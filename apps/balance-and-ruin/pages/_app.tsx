import { useDarkMode } from "@ff6wc/utils/useDarkMode";
import { cx } from "cva";
import type { AppProps } from "next/app";
import { AppType } from "next/app";
import { QueryClient, QueryClientProvider } from "react-query";
import { Provider } from "react-redux";
import { Schema } from "~/state/schemaSlice";
import { wrapper } from "~/state/store";
import "~/styles/globals.css";
import { openSans, roboto } from "@ff6wc/utils/fonts";

const client = new QueryClient({});

type Props = {
  schema: Schema;
};

const App: AppType<Props> = ({ Component, ...rest }: AppProps<Props>) => {
  const { store, props } = wrapper.useWrappedStore(rest);

  useDarkMode();
  return (
    <div
      className={cx(
        openSans.className,
        "text-grey dark:text-white flex flex-col h-full"
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
