const commonConfig = require("../.eslintrc.common.cjs");

const sampleConfig = commonConfig.getSampleConfig(__dirname, {
  includeReact: true,
});

module.exports = sampleConfig;
