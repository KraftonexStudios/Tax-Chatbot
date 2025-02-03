import { dirname } from "path";
import { fileURLToPath } from "url";
import { FlatCompat } from "@eslint/eslintrc";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const compat = new FlatCompat({
  baseDirectory: __dirname,
});

const eslintConfig = [
  ...compat.extends("next/core-web-vitals", "next/typescript"),
  {
    rules: {
      "no-restricted-syntax": "off",
      "no-console": "off",
      "no-unused-vars": "off",
      "no-undef": "off",
      "no-use-before-define": "off",
      "no-shadow": "off",
      "no-param-reassign": "off",
      "no-return-assign": "off",
      "no-underscore-dangle": "off",
      "no-plusplus": "off",
      "no-continue": "off",
      "no-await-in-loop": "off",
      "no-restricted-globals": "off",
      "no-restricted-properties": "off",
      "no-restricted-exports": "off",
      "no-restricted-imports": "off",
      "no-restricted-modules": "off",
      "no-restricted-syntax": "off",
      "no-restricted-keys": "off",
      "no-restricted-assignments": "off",
      "no-restricted-classes": "off",
      "no-restricted-constructors": "off",
      "no-restricted-declarations": "off",
      "no-restricted-destructuring": "off",
      "no-restricted-enums": "off",
      "no-restricted-expressions": "off",
      "no-restricted-functions": "off",
      "no-restricted-generators": "off",
      "no-restricted-interfaces": "off",
      "no-restricted-literals": "off",
      "no-restricted-methods": "off",
      "no-restricted-modifiers": "off",
      "no-restricted-names": "off",
      "no-restricted-operators": "off",
      "no-restricted-parameters": "off",
      "no-restricted-patterns": "off",
      "no-restricted-properties": "off",
      "no-restricted-prototypes": "off",
      "no-restricted-references": "off",
      "no-restricted-regex": "off",
      "no-restricted-rules": "off",
      "no-restricted-scope": "off",
      "no-restricted-statements": "off",
      "no-restricted-strings": "off",
      "no-restricted-symbols": "off",
      "no-restricted-tags": "off",
      "no-restricted-types": "off",
      "no-restricted-variables": "off",
      "no-restricted-warnings": "off",
    },
  },
];

export default eslintConfig;
