import React from "react";

const TrackerCellContainer: React.FC<React.ComponentProps<"span">> = (
  props
) => {
  return <span {...props} />;
};

export default React.memo(TrackerCellContainer);
