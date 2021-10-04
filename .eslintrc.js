module.exports = {
  env: {
    node: true,
    jest: true,
  },
  extends: [
    "eslint:recommended",
    "plugin:prettier/recommended",
    "plugin:@typescript-eslint/recommended",
  ],
  parser: "@typescript-eslint/parser",
  parserOptions: {
    project: "./tsconfig.json",
    tsconfigRootDir: __dirname,
  },
  plugins: ["prettier", "@typescript-eslint", "eslint-plugin-tsdoc"],
  rules: {
    eqeqeq: "warn",
    "no-undef": "warn",
    "no-unused-vars": "error",
    "prettier/prettier": [
      "error",
      {
        "endOfLine": "auto",
      }
    ],
    "@typescript-eslint/explicit-module-boundary-types": "off",
    "@typescript-eslint/explicit-function-return-type": "off",
    "@typescript-eslint/no-explicit-any": "off",
    "@typescript-eslint/no-unused-vars": "error",
    "tsdoc/syntax": "warn",
  },
  ignorePatterns: [".eslintrc.js"],
};
