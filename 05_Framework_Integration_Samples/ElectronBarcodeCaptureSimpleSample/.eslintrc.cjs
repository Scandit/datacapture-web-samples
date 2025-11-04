module.exports = {
  extends: [
    "eslint:recommended",
    "@electron-toolkit/eslint-config-ts/recommended",
    "@electron-toolkit/eslint-config-prettier",
  ],
  overrides: [
    {
      files: ["*.mjs"],
      rules: {
        "@typescript-eslint/explicit-function-return-type": "off",
      },
    },
  ],
};
