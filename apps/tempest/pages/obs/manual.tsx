import Manual from "~/pages/manual";
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
  return <Manual showLayout={false} />;
}
