import { useDarkMode } from "@ff6wc/utils/useDarkMode";
import { cx } from "cva";
import type { AppProps } from "next/app";
import { AppType } from "next/app";
import { QueryClient, QueryClientProvider } from "react-query";
import { Provider } from "react-redux";
import { Schema } from "~/state/schemaSlice";
import { wrapper } from "~/state/store";
import "~/styles/globals.css";
import { openSans } from "@ff6wc/utils/fonts";
import { GoogleReCaptchaProvider } from "react-google-recaptcha-v3";

const client = new QueryClient({});

type Props = {
  schema: Schema;
};

const App: AppType<Props> = ({ Component, ...rest }: AppProps<Props>) => {
  const { store, props } = wrapper.useWrappedStore(rest);

  useDarkMode();

  if (!process.env.NEXT_PUBLIC_RECAPTCHA_KEY) {
    console.warn("no recaptcha key found, flag generation may not work");
  }

  return (
    <div
      className={cx(
        openSans.className,
        "text-grey dark:text-white flex flex-col h-full"
      )}
    >
      <Provider store={store}>
        <QueryClientProvider client={client}>
          <GoogleReCaptchaProvider
            reCaptchaKey={process.env.NEXT_PUBLIC_RECAPTCHA_KEY as string}
          >
            <Component {...props.pageProps} />
          </GoogleReCaptchaProvider>
        </QueryClientProvider>
      </Provider>
    </div>
  );
};

export default App;
