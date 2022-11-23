module.exports = {
  root: true,
  // This tells ESLint to load the config from the package `eslint-config-custom`
  extends: ["@ff6wc/eslint-config-custom"],
  settings: {
    next: {
      rootDir: ["apps/*/"],
    },
  },
};
