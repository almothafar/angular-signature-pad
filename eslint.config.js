// @ts-check
const tseslint = require("typescript-eslint");
const angular = require("angular-eslint");

// Flat-config replacement for the previous .eslintrc.json setup. Mirrors the
// original strictness: the Angular ESLint recommended rules only (not
// eslint:recommended / typescript-eslint:recommended), plus the project's
// custom rule overrides.
module.exports = tseslint.config(
  {
    ignores: ["dist/**", "docs/**", "coverage/**"],
  },
  {
    files: ["**/*.ts"],
    extends: [...angular.configs.tsRecommended],
    processor: angular.processInlineTemplates,
    languageOptions: {
      parserOptions: {
        projectService: true,
        tsconfigRootDir: __dirname,
      },
    },
    rules: {
      "no-underscore-dangle": "off",
      "semi": ["error", "always"],
      "no-console": ["error", { allow: ["log", "warn", "error"] }],
      "@typescript-eslint/explicit-member-accessibility": ["off", { accessibility: "explicit" }],
      "@angular-eslint/component-selector": "off",
      "@angular-eslint/directive-selector": "off",
      // Components opt into ChangeDetectionStrategy.Eager (added by the v22
      // migration to preserve behavior); don't enforce OnPush.
      "@angular-eslint/prefer-on-push-component-change-detection": "off",
      "@angular-eslint/use-lifecycle-interface": ["error"],
      "arrow-parens": ["off", "always"],
      "max-len": ["error", { code: 180 }],
    },
  },
  {
    // Library directives must use the `lib` attribute-selector prefix.
    files: ["projects/angular-signature-pad/**/*.ts"],
    rules: {
      "@angular-eslint/directive-selector": [
        "error",
        { type: "attribute", prefix: "lib", style: "camelCase" },
      ],
    },
  },
  {
    files: ["**/*.html"],
    extends: [...angular.configs.templateRecommended],
    rules: {},
  }
);
