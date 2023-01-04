import Auto from "~/pages/auto";
import { wrapper } from "~/state/store";

export const getServerSideProps = wrapper.getServerSideProps(
  (store) =>
    async ({}) => {
      return {
        props: {},
      };
    }
);

export default function Home() {
  return <Auto showLayout={false} />;
}
