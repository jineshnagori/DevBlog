// eslint.config.js
export default {
  languageOptions: {
    ecmaVersion: 2021,
    sourceType: "script", 
    globals: {
      window: "readonly",
      document: "readonly",
      navigator: "readonly"
    }
  },
  rules: {
    semi: ["error", "always"],
    quotes: ["error", "double"],
    "no-unused-vars": "warn",
    "no-console": "warn",
    "keyword-spacing": ["error", { before: true, after: true }],
    "space-infix-ops": ["error", { int32Hint: false }],
    "comma-dangle": ["error", "always-multiline"]
  }
};
