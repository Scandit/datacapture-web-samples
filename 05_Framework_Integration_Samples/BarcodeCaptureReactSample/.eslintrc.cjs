module.exports = {
  root: true,
  env: {
    browser: true,
    es2022: true,
  },
  extends: [
    "eslint:all",
    "plugin:eslint-comments/recommended",
    "plugin:import/recommended",
    "plugin:no-unsanitized/DOM",
    "plugin:prettier/recommended",
    "plugin:promise/recommended",
    "plugin:regexp/recommended",
    "plugin:security/recommended",
    "plugin:sonarjs/recommended",
    "plugin:unicorn/recommended",
    "airbnb",
    "airbnb-typescript",
    "plugin:@typescript-eslint/all",
    "plugin:import/react",
    "plugin:import/typescript",
    "plugin:react/recommended",
    "plugin:react-hooks/recommended",
    "prettier",
  ],
  parser: "@typescript-eslint/parser",
  parserOptions: {
    ecmaVersion: 2022,
    sourceType: "module",
    project: "./tsconfig.json",
    ecmaFeatures: {
      impliedStrict: true,
      jsx: true,
    },
  },
  plugins: [
    "@typescript-eslint",
    "eslint-comments",
    "import",
    "no-secrets",
    "no-unsanitized",
    "promise",
    "regexp",
    "security",
    "simple-import-sort",
    "sonarjs",
    "unicorn",
    "react",
    "react-hooks",
  ],
  settings: {
    react: {
      version: "detect",
    },
    "import/parsers": {
      "@typescript-eslint/parser": [".ts", ".tsx"],
    },
    "import/resolver": {
      typescript: {
        project: "./tsconfig.json",
        alwaysTryTypes: true,
      },
    },
  },
  ignorePatterns: [
    "library/**",
    "node_modules/**",
    "*.d.ts",
    "*.js",
    "vite.config.*",
    ".eslintrc.cjs",
  ],
  rules: {
    // Base rules
    "default-case": "off",
    "class-methods-use-this": "off",
    "eslint-comments/disable-enable-pair": ["error", { allowWholeFile: true }],
    "import/order": "off",
    "import/prefer-default-export": "off",
    "no-alert": "off",
    "no-base-to-string": "off",
    "no-await-in-loop": "off",
    "no-console": "off",
    "no-non-null-assertion": "off",
    "no-param-reassign": ["error", { props: false }],
    "no-plusplus": "off",
    "no-restricted-syntax": "off",
    "no-secrets/no-secrets": ["error", { tolerance: 5 }],
    "no-underscore-dangle": "off",
    "no-unsanitized/property": ["error", {
      escape: {
        methods: ["DOMPurify.sanitize"],
      }
    }],
    "no-void": ["error", { allowAsStatement: true }],
    "one-var": "off",
    "security/detect-object-injection": "off",
    "sonarjs/cognitive-complexity": "off",
    "sonarjs/no-duplicate-string": "off",
    "sort-imports": "off",
    "unicorn/prefer-query-selector": "off",
    "unicorn/prefer-top-level-await": "off",
    "unicorn/filename-case": [
      "error",
      {
        cases: {
          camelCase: true,
          pascalCase: true,
        },
      },
    ],
    "unicorn/no-array-reduce": "off",
    "unicorn/no-await-expression-member": "off",
    "unicorn/no-null": "off",
    "unicorn/numeric-separators-style": ["error", { onlyIfContainsSeparator: true }],
    "unicorn/prefer-node-protocol": "off",
    "unicorn/prevent-abbreviations": [
      "error",
      {
        allowList: {
          Mod: true,
        },
        replacements: {
          props: false,
        },
      },
    ],
    "unicorn/expiring-todo-comments": "off",

    // React rules
    "jsx-a11y/anchor-is-valid": [
      "error",
      {
        components: ["Link"],
        specialLink: ["hrefLeft", "hrefRight"],
        aspects: ["invalidHref", "preferButton"],
      },
    ],
    "react/jsx-props-no-spreading": [
      "error",
      {
        exceptions: ["App", "Component"],
      },
    ],
    "react/forbid-component-props": [
      "error",
      {
        forbid: ["style"],
      },
    ],
    "react/forbid-dom-props": [
      "error",
      {
        forbid: ["style"],
      },
    ],
    "react/prop-types": "off",
    "react/react-in-jsx-scope": "off",
    "simple-import-sort/exports": "error",
    "simple-import-sort/imports": "error",

    // TypeScript rules
    "@typescript-eslint/class-methods-use-this": "off",
    "@typescript-eslint/dot-notation": "off",
    "@typescript-eslint/explicit-function-return-type": [
      "error",
      {
        allowExpressions: true,
      },
    ],
    "@typescript-eslint/init-declarations": "off",
    "@typescript-eslint/non-nullable-type-assertion-style": "off",
    "@typescript-eslint/no-base-to-string": "off",
    "@typescript-eslint/no-floating-promises": [
      "error",
      {
        ignoreIIFE: true,
      },
    ],
    "@typescript-eslint/no-inferrable-types": "off",
    "@typescript-eslint/no-magic-numbers": "off",
    "@typescript-eslint/no-misused-promises": [
      "error",
      {
        checksVoidReturn: false,
      },
    ],
    "@typescript-eslint/no-namespace": "off",
    "@typescript-eslint/no-non-null-assertion": "off",
    "@typescript-eslint/no-type-alias": "off",
    "@typescript-eslint/no-unused-vars": ["error", { argsIgnorePattern: "^_" }],
    "@typescript-eslint/no-use-before-define": ["warn", "nofunc"],
    "@typescript-eslint/prefer-readonly-parameter-types": "off",
    "@typescript-eslint/sort-type-constituents": "off",
    "@typescript-eslint/sort-type-union-intersection-members": "off",
    "@typescript-eslint/strict-boolean-expressions": [
      "error",
      {
        allowString: false,
        allowNumber: false,
        allowNullableObject: true,
        allowNullableBoolean: false,
        allowNullableString: false,
        allowNullableNumber: false,
        allowAny: false,
      },
    ],
    "@typescript-eslint/typedef": [
      "error",
      {
        arrayDestructuring: false,
        arrowParameter: false,
        memberVariableDeclaration: true,
        objectDestructuring: false,
        parameter: true,
        propertyDeclaration: true,
        variableDeclaration: false,
        variableDeclarationIgnoreFunction: true,
      },
    ],
    "import/no-extraneous-dependencies": "off",
  },
  overrides: [
    {
      files: ".eslintrc.cjs",
      env: {
        node: true,
      },
      parserOptions: {
        ecmaFeatures: {
          impliedStrict: true,
        },
        project: null,
      },
      rules: {
        "unicorn/expiring-todo-comments": "off",
        "prettier/prettier": "off",
      },
    },
  ],
};
