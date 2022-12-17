import Mustache from "mustache";
import React from "react";
import { FlagValue } from "~/state/schemaSlice";

export const renderDescription = (
  template: React.ReactNode,
  value: FlagValue
) => {
  if (typeof template !== "string") {
    return template;
  }
  if (Array.isArray(value)) {
    return Mustache.render(template, value.join("-"));
  }
  return Mustache.render(template, value);
};
