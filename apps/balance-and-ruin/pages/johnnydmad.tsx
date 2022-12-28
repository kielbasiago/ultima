import type { NextPage } from "next";
import MusicPage from "~/pages/music";
import { wrapper } from "~/state/store";

type PageProps = {};

export const getServerSideProps = wrapper.getServerSideProps(
  (store) =>
    async ({}) => {
      return {
        props: {},
      };
    }
);

const Home: NextPage<PageProps> = ({}: PageProps) => {
  return <MusicPage />;
};

export default Home;
