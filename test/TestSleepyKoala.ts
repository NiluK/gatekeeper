import { formatFixed } from "@ethersproject/bignumber";
import { expect } from "chai";
import { BigNumber } from "ethers";
import { ethers, waffle } from "hardhat";

import SleepyKoalaArtifact from "../artifacts/contracts/SleepyKoala.sol/SleepyKoala.json";
import { SleepyKoala } from "../typechain-types";

const { deployContract } = waffle;

async function mint(contract: SleepyKoala, tokenData = true): Promise<number> {
  const signer = (await ethers.getSigners())[0];
  const tx = await contract.mint(signer.address, tokenData);
  const receipt = await tx.wait();

  const tokenId = receipt.logs[0].topics[3];
  const bn = BigNumber.from(tokenId);
  return bn.toNumber();
}

describe("SleepKoala", function () {
  let contract: SleepyKoala;

  before(async function () {
    const signer = (await ethers.getSigners())[0];
    contract = (await deployContract(
      signer,
      SleepyKoalaArtifact,
      []
    )) as SleepyKoala;
    await contract.deployed();
    console.log(`SleepyKoala deployed: ${contract.address}`);
  });

  // test minting, token id should increment
  it("#mint", async function () {
    const firstMintId = await mint(contract);
    expect(firstMintId).to.equal(1);
    const secondMintId = await mint(contract);
    expect(secondMintId).to.gt(firstMintId);
  });

  it("#getTokenData", async function () {
    const tokenId = await mint(contract, false);
    const tokenData = await contract.getTokenData(BigNumber.from(tokenId));
    expect(tokenData).to.equal(false);
  });

  it("#setTokenData", async function () {});

  it("#invertTokenData", async function () {});
});
