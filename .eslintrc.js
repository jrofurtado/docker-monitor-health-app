module.exports = {
  env: {
    browser: true,
    es2021: true,
  },
  extends: [
    "airbnb-typescript",
    "plugin:@typescript-eslint/recommended",
    "plugin:@typescript-eslint/recommended-requiring-type-checking",
    "plugin:import/errors", // temp
    "plugin:import/warnings", // temp
    "plugin:import/typescript", // temp
    "plugin:react-hooks/recommended",
    "prettier",
  ],
  overrides: [
    {
      files: ["*.ts", "*.tsx"], // Your TypeScript files extension
      parserOptions: {
        project: ["./tsconfig.eslint.json"], // Specify it only for TypeScript files
      },
    },
  ],
  parser: "@typescript-eslint/parser",
  parserOptions: {
    ecmaFeatures: {
      jsx: true,
    },
    project: ["./tsconfig.eslint.json"],
    ecmaVersion: 12,
    sourceType: "module",
  },
  ignorePatterns: [
    "src/react-app-env.d.ts",
    "generators/**/index.ts",
    "index.tsx",
  ],
  plugins: ["@typescript-eslint", "prettier", "import"],
  settings: {
    "import/resolver": {
      typescript: {},
    },
  },
  rules: {
    "react/jsx-filename-extension": [0],
    "prettier/prettier": ["error"],
    "import/prefer-default-export": "off",
    "import/no-extraneous-dependencies": "off",
    "@typescript-eslint/no-explicit-any": "error",
    "react/prop-types": "off",
    "prettier/prettier": ["error", {}, { usePrettierrc: true }],
    "import/order": [
      "error",
      {
        groups: [
          "builtin",
          "external",
          "internal",
          "parent",
          "sibling",
          "index",
          "object",
        ],
        "newlines-between": "always",
        alphabetize: { order: "asc", caseInsensitive: true },
      },
    ],
    "import/no-internal-modules": [
      "error",
      {
        allow: [
          // "@/!(features)/*",
          // "@/**/*",
          "**/node_modules/**/*",
          "source-map-support/*",
        ],
      },
    ],
    "no-restricted-imports": [
      "error",
      {
        patterns: [
          // "@/features/**/*",
          "**/*.module.css",
          "**/*.css",
          "**/*.scss",
        ],
      },
    ],
    // "react/jsx-uses-react": "off",
    // "react/react-in-jsx-scope": "off",
  },
};
