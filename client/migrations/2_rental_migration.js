const Rental = artifacts.require("Rental");

module.exports = function (deployer) {
  var owner = '0x7f3d20BD105eCa62173fCa45C0450E16cF9d5EB2';
  var price = 10;
  var deposit = 20;
  deployer.deploy(Rental,owner,price,deposit);
};
