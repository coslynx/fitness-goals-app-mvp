/**
 * @file packages/fitness-tracker/.eslintrc.js
 * @description ESLint configuration file for the Fitness Tracker MVP project.
 * @author CosLynxAI
 */

module.exports = {
  root: true,
  env: {
    browser: true,
    node: true,
    jest: true,
  },
  extends: [
    "eslint:recommended",
    "plugin:react/recommended",
    "plugin:react-hooks/recommended",
    "plugin:@typescript-eslint/recommended",
    "plugin:prettier/recommended", // Enables eslint-plugin-prettier and disables ESLint rules that conflict with Prettier
    "next/core-web-vitals",
  ],
  parser: "@typescript-eslint/parser",
  parserOptions: {
    ecmaFeatures: {
      jsx: true,
    },
    ecmaVersion: 2022, // Allows for the parsing of modern JavaScript features
    sourceType: "module",
  },
  plugins: ["react", "@typescript-eslint", "prettier"],
  rules: {
    "prettier/prettier": [
      "warn",
      {
        printWidth: 100, // Specifies the line length
        tabWidth: 2, // Specifies the number of spaces per indentation
        useTabs: false, // Disables tabs for indentation
        semi: true, // Requires semicolons
        singleQuote: true, // Uses single quotes
        trailingComma: "es5", // Requires trailing commas in multiline objects/arrays
        bracketSpacing: true, // Inserts spaces between brackets
        jsxBracketSameLine: false, // Does not place closing JSX tags on the same line
        arrowParens: "always", // Requires parentheses around single-line arrow function arguments
        endOfLine: "lf", // Uses LF as the linebreak character
      },
    ],
    "react/react-in-jsx-scope": "off", // Allows for the omission of `import React`
    "react/jsx-filename-extension": [
      1,
      { extensions: [".tsx", ".jsx"] }, // Allows for JSX files to be named with .tsx or .jsx extension
    ],
    "react/prop-types": "off", // Disables prop-types as TypeScript provides type safety
    "no-unused-vars": "off", // Disables the no-unused-vars rule as TypeScript handles this
    "import/prefer-default-export": "off", // Allows for named exports
    "no-console": "warn", // Warns about console statements in production
    "@typescript-eslint/explicit-function-return-type": "off", // Allows for implicit function return types
    "@typescript-eslint/no-unused-vars": [
      "warn",
      {
        args: "none", // Only warns about unused variables, not arguments
      },
    ],
    "@typescript-eslint/no-empty-interface": "off", // Allows for empty interfaces
    "@typescript-eslint/no-explicit-any": "off", // Allows for using `any` type in specific cases
    "@typescript-eslint/ban-ts-comment": "off", // Allows for using `// @ts-ignore`
    "no-param-reassign": "off", // Allows for parameter reassignment
    "no-use-before-define": "off", // Allows for use of variables before definition
    "import/no-extraneous-dependencies": "off", // Allows for imports of external dependencies
    "no-shadow": "off", // Allows for shadowing variables
    "no-nested-ternary": "off", // Allows for nested ternary operators
    "max-len": [
      "warn",
      {
        code: 100, // Specifies the maximum line length
        ignoreComments: true, // Ignores comments
        ignoreUrls: true, // Ignores URLs
        ignoreStrings: true, // Ignores strings
        ignoreTemplateLiterals: true, // Ignores template literals
      },
    ],
    "no-debugger": "warn", // Warns about debugger statements in production
    "linebreak-style": ["warn", "unix"], // Enforces Unix line breaks
    "quotes": ["warn", "single"], // Enforces single quotes
    "semi": ["warn", "always"], // Enforces semicolons
    "indent": ["warn", 2], // Enforces 2 spaces for indentation
    "space-before-function-paren": ["warn", "always"], // Enforces spaces before function parentheses
    "object-curly-spacing": ["warn", "always"], // Enforces spaces inside curly braces
    "array-bracket-spacing": ["warn", "always"], // Enforces spaces inside square brackets
    "no-trailing-spaces": "warn", // Disallows trailing whitespace
  },
  settings: {
    react: {
      version: "detect", // Automatically detects the React version
    },
  },
};