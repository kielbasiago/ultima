const path = require("path");
module.exports = {
  stories: ["../components/**/*.stories.@(js|jsx|ts|tsx)"],
  addons: [
    "@storybook/addon-links",
    "@storybook/addon-essentials",
    "@storybook/addon-interactions",
    {
      name: "@storybook/addon-postcss",
      options: {
        postcssOptions: {
          plugins: [require("tailwindcss"), require("autoprefixer")],
        },
        postcssLoaderOptions: {
          implementation: require("postcss"),
        },
      },
    },
  ],
  framework: {
    name: "@storybook/react-webpack5",
    options: {},
  },
  core: {
    builder: "@storybook/builder-webpack5",
  },
  docs: {
    docsPage: false,
  },
  babel: async (options) => {
    return {
      ...options,
      presets: [...options.presets, "@babel/preset-typescript"],
    };
  },
  webpackFinal: async (config) => {
    config.resolve.alias["~"] = path.resolve(__dirname, "../");
    return config;
  },
};
