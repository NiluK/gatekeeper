// We require the Hardhat Runtime Environment explicitly here. This is optional
// but useful for running the script in a standalone fashion through `node <script>`.
//
// When running the script with `npx hardhat run <script>` you'll find the Hardhat
// Runtime Environment's members available in the global scope.
import { ethers } from "hardhat";

async function main() {
  const SleepyKoala = await ethers.getContractFactory("SleepyKoala");
  const contract = await SleepyKoala.deploy();
  await contract.deployed();
  console.log("SleepyKoala deployed to:", contract.address);

  // const koalaAddress = "0x8e1Ef80410758A45387E3777bba7cA814Be61B8E";
  // const Gatekeeper = await ethers.getContractFactory("Gatekeeper");
  // const contract = await Gatekeeper.deploy(koalaAddress);
  // await contract.deployed();
  // console.log("Gatekeeper deployed to:", contract.address);
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
