import type { NextPage } from "next";
import { wrapper } from "~/state/store";

type PageProps = {
  data: string;
};

export const getServerSideProps = wrapper.getServerSideProps(
  (store) =>
    async ({}) => {
      const protocol =
        process.env.NODE_ENV === "development" ? "http" : "https";
      const url = `${protocol}://${process.env.VERCEL_URL}/api/generate-rom`;
      const response = await fetch(url);
      return {
        props: {
          data: response,
        },
      };
    }
);

const Home: NextPage<PageProps> = ({ data }) => {
  return <div>{JSON.stringify(data)}</div>;
};

export default Home;
