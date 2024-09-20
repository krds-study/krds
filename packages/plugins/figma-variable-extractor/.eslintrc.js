/** @type {import("eslint").Linter.Config} */
module.exports = {
  root: true,
  extends: [
    "@krds-prac/eslint-config/react-internal.js", 
    "eslint:recommended",
    "plugin:@typescript-eslint/recommended",
    "plugin:@figma/figma-plugins/recommended"
  ],
  parser: "@typescript-eslint/parser",
};
