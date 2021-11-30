const tsconfig = require("./tsconfig.paths.json");
// tsconfig aliases
const CracoAlias = require("craco-alias");
// eslint config
const { ESLINT_MODES } = require("@craco/craco");
const CracoEslintWebpackPlugin = require("craco-eslint-webpack-plugin");

module.exports = {
  style: {
    postcss: {
      plugins: [require("tailwindcss"), require("autoprefixer")],
    },
  },
  plugins: [
    {
      plugin: CracoAlias,
      options: {
        source: "tsconfig",
        // baseUrl: "./src",
        baseUrl: tsconfig.compilerOptions.baseUrl,
        tsConfigPath: "./tsconfig.paths.json",
      },
    },
    {
      plugin: CracoEslintWebpackPlugin,
      options: {
        skipPreflightCheck: true,
        eslintOptions: {
          files: "src/**/*.{js,jsx,ts,tsx}",
          lintDirtyModulesOnly: true,
        },
      },
    },
  ],
};
