import { SeedOfTheWeek } from "~/types/sotw";

type SotwData = Record<string, SeedOfTheWeek>;

export const fetchSotw = async () => {
  const response = await fetch(
    "https://storage.googleapis.com/seedbot/sotw_db.json"
  );
  const sotwData: SotwData = await response.json();
  return sotwData;
};

export const fetchSotwById = async (id: string) => {
  const sotws = await fetchSotw();
  return sotws[id];
};
