import flatten from "lodash/flatten";
import { layout } from "~/components/EmoTracker/layout";
import TrackerCell from "~/components/EmoTracker/TrackerCell";
import TrackerGroup from "~/components/EmoTracker/TrackerGroup";
import TrackerRow from "~/components/EmoTracker/TrackerRow";

export type EmoTrackerLayoutProps = Record<string, unknown>;

export const EmoTrackerLayout = (props: EmoTrackerLayoutProps) => {
  const {} = props;

  return (
    <>
      {" "}
      {flatten(
        layout.map((layout, layoutIndex) => {
          const $groups = layout.map((group) => {
            const [groupName, _, cells] = group.args;
            const $cells = cells.map((cell) => {
              return <TrackerCell key={cell.args[0]} cell={cell} />;
            });

            return (
              <TrackerGroup key={groupName} group={group}>
                {$cells}
              </TrackerGroup>
            );
          });
          const center = $groups.length === 1;
          return (
            <TrackerRow
              justify={center ? "center" : "between"}
              key={layoutIndex}
            >
              {$groups}
            </TrackerRow>
          );
        })
      )}
    </>
  );
};
