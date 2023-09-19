const commonConfig = require("../.eslintrc.common.cjs");
const sampleConfig = commonConfig.getSampleConfig(__dirname, {
  includeSvelte: true,
});

module.exports = sampleConfig;
