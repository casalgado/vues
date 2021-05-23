module.exports = {
  preset: "@vue/cli-plugin-unit-jest",
  setupFiles: ["<rootDir>/jest/envVars.js"],
  snapshotSerializers: ["jest-serializer-vue"],
  collectCoverage: false,
  moduleFileExtensions: ["vue", "js", "ts", "tsx", "jsx", "json", "node"],
  collectCoverageFrom: ["**/*.{js,vue}", "!**/node_modules/**"],
};
