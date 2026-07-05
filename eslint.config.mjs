import js from "@eslint/js";
import globals from "globals";

const eslintConfig = [
  js.configs.recommended,
  {
    ignores: [
      "node_modules/**",
      "dist/**",
    ],
  },
  {
    languageOptions: {
      ecmaVersion: "latest",
      sourceType: "module",
      globals: {
        ...globals.browser,
        ...globals.node,
      },
    },
  },
];

export default eslintConfig;
