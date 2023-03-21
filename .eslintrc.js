module.exports = {
  extends: [
    require.resolve('umi/eslint'),
    "prettier",
    "plugin:tailwindcss/recommended"
  ],
  plugins: ["tailwindcss"],
  rules: {
    "tailwindcss/no-custom-classname": "off",
    "@typescript-eslint/no-unused-expressions": "off",
    "@typescript-eslint/ban-types": "off",
  },
  settings: {
    tailwindcss: {
      callees: ["cn"]
    }
  }
}
