import type { NextPage } from "next";
import { RomFileSelect } from "~/components/RomFileSelect/RomFileSelect";
import { Button } from "~/design-components";
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

const Home: NextPage<PageProps> = () => {
  return (
    <div className="flex flex-col">
      <RomFileSelect />
    </div>
  );
};

export default Home;
