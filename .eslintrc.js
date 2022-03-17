/*
 * @Description:
 * @Author: lixin
 * @Date: 2021-08-13 14:19:55
 * @LastEditTime: 2022-01-04 17:20:09
 */
module.exports = {
  env: {
    browser: true,
    es2021: true,
    node: true,
  },
  parser: "@typescript-eslint/parser",
  extends: [
    "plugin:react/recommended",
    "plugin:@typescript-eslint/recommended",
    "plugin:react-hooks/recommended",
    "prettier",
  ],
  parserOptions: {
    ecmaFeatures: {
      jsx: true,
    },
    ecmaVersion: 12,
    sourceType: "module",
  },
  plugins: ["@typescript-eslint", "react-hooks", "prettier"],
  rules: {
    "@typescript-eslint/no-var-requires": 0,
    "prettier/prettier": "error",
  },
  settings: {
    react: {
      pragma: "React",
      version: "detect",
    },
  },
};
