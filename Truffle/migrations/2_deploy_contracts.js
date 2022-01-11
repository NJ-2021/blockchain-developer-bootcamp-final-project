const Vision = artifacts.require("Vision");

module.exports = function(deployer) {
  deployer.deploy(Vision);
};
