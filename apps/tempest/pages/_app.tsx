import { useEffect } from "react";
import type { AppProps } from "next/app";
import { QueryClient, QueryClientProvider } from "react-query";

import { Montserrat, Roboto, Roboto_Mono } from "@next/font/google";
import { cx } from "cva";
import { AppType } from "next/app";
import "~/styles/globals.css";

const client = new QueryClient({});

const montserrat = Montserrat();
const roboto = Roboto({ weight: ["500", "700", "400"] });
const robotoMono = Roboto_Mono({ weight: ["500"] });

type Props = {};

const App: AppType<Props> = ({ Component, ...rest }: AppProps<Props>) => {
  // const { store, props } = wrapper.useWrappedStore(rest);
  useEffect(() => {
    document.documentElement.classList.remove("light");
    document.documentElement.style.colorScheme = "dark";
  }, []);
  return (
    <div
      className={cx(
        roboto.className,
        robotoMono.className,
        "text-grey dark:text-white w-full flex flex-col h-full"
      )}
    >
      {/* <Provider store={store}> */}
      <QueryClientProvider client={client}>
        <Component />
      </QueryClientProvider>
      {/* </Provider> */}
    </div>
  );
};

export default App;
