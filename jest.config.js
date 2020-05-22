module.exports = {
  preset: "@vue/cli-plugin-unit-jest",
  setupFiles: ["<rootDir>/jest/envVars.js"],
  snapshotSerializers: ["jest-serializer-vue"],
};
