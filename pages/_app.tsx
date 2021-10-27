import type { NextPage } from "next";
import type { AppProps } from "next/app";
import { globalStyles } from "../stitches.config";

type NextPageWithLayout = NextPage & {
  layout: React.FunctionComponent;
};

type AppPropsWithLayout = AppProps & {
  Component: NextPageWithLayout;
};

function MyApp({ Component, pageProps }: AppPropsWithLayout) {
  const PageLayout = Component.layout ?? (({ children }) => children);
  globalStyles();
  return (
    <PageLayout>
      <Component {...pageProps} />
    </PageLayout>
  );
}
export default MyApp;
