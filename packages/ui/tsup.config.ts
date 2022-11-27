import { defineConfig } from "tsup";
import fs from "fs";

export default defineConfig({
  esbuildPlugins: [
    // ...esbuildPlugins,
    {
      name: "css-module",
      setup(build) {
        build.onResolve(
          { filter: /\.module\.css$/, namespace: "file" },
          async (args) => {
            return {
              path: `${args.path}#css-module`,
              namespace: "css-module",
              pluginData: {
                path: args.path,
              },
            };
          }
        );
        build.onLoad(
          { filter: /#css-module$/, namespace: "css-module" },
          async (args) => {
            const { pluginData } = args;
            const postcss = require("postcss");
            const source = await fs.readFile(pluginData.path, "utf8");

            let cssModule = {};
            await postcss([
              require("postcss-modules")({
                getJSON(_, json) {
                  cssModule = json;
                },
              }),
            ]).process(source, { from: pluginData.path });

            return {
              contents: `
          import "${pluginData.path}"
          export default ${JSON.stringify(cssModule)}
          `,
            };
          }
        );
        build.onResolve(
          { filter: /\.module\.css$/, namespace: "css-module" },
          async (args) => {
            return {
              path: require.resolve(args.path, { paths: [args.resolveDir] }),
              namespace: "file",
            };
          }
        );
      },
    },
  ],
});
