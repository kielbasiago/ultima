const path = require("path");
module.exports = {
  stories: ["../Button/*.stories.@(js|jsx|ts|tsx)"],
  addons: [
    "@storybook/addon-links",
    "@storybook/addon-essentials",
    "@storybook/addon-interactions",
  ],
  framework: {
    name: "@storybook/react-webpack5",
    options: {},
  },
  babel: async (options) => {
    console.log("new", options);
    return {
      // Update your babel configuration here
      ...options,
      presets: [...options.presets, "@babel/preset-typescript"],
    };
  },
  docs: {
    docsPage: true,
  },
};
