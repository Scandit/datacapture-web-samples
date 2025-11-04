module.exports = {
  root: true,
  env: {
    browser: true,
    es2022: true,
  },
  extends: [
    "eslint:recommended",
    "plugin:@typescript-eslint/recommended",
  ],
  parser: "@typescript-eslint/parser",
  parserOptions: {
    ecmaVersion: 2022,
    sourceType: "module",
    project: "./tsconfig.json",
  },
  plugins: ["@typescript-eslint", "svelte3"],
  ignorePatterns: [
    "library/**",
    "node_modules/**",
    "*.d.ts",
    "*.js",
    "vite.config.*",
    ".eslintrc.cjs",
  ],
  overrides: [
    {
      files: "*.svelte",
      processor: "svelte3/svelte3",
      settings: {
        "svelte3/typescript": true,
      },
    },
  ],
  rules: {
    "@typescript-eslint/no-unused-vars": ["error", { argsIgnorePattern: "^_" }],
    "@typescript-eslint/no-non-null-assertion": "off",
    "no-console": "off",
    "no-alert": "off",
  },
};
