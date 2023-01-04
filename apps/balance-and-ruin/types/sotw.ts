export type SeedOfTheWeek = {
  create_date: string;
  creator: string;
  header_msg_id: string;
  leaderboard_header_id: string;
  name: string;
  description: string;
  participants_msg_id: string;
  rankings_msg_id: string;
  runners: Record<
    string,
    {
      id: string;
      finish_time: string;
      timestamp: string;
    }
  >;
  seed: string;
  seed_id: string;
  spoiler_splitter_id: string;
  submitter: string;
};
