import type { NextPage } from "next";
import { RomFileSelect } from "~/components/RomFileSelect/RomFileSelect";
import { Button } from "~/design-components";
import { wrapper } from "~/state/store";

type PageProps = {};

export const getServerSideProps = wrapper.getServerSideProps(
  (store) =>
    async ({}) => {
      // const protocol =
      //   process.env.NODE_ENV === "development" ? "http" : "https";

      // const url = `${protocol}://${process.env.VERCEL_URL}/api/generate-rom`;
      // const response = await fetch(url);
      // const data = await response.text();
      // return {
      //   props: {
      //     data,
      //   },
      // };
      return {
        props: {},
      };
    }
);

const Home: NextPage<PageProps> = () => {
  return (
    <div className="flex flex-col">
      <RomFileSelect />
    </div>
  );
};

export default Home;
