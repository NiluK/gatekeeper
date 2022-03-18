import React, { useState } from "react";
// import styles from "../styles/Minter.module.css";

interface Props {}

interface IContract {
  hasNFT(): Promise<boolean>;
  mintNFT(): Promise<void>;
}

class MockContract implements IContract {
  async hasNFT(): Promise<boolean> {
    return true;
  }
  async mintNFT(): Promise<void> {}
}

const Minter: React.FC<Props> = ({}) => {
  const [injectContract, setInjectContract] = useState<
    IContract | MockContract
  >();

  return (
    <>
      <div>
        <h2>
          <span>GateKeeper</span>
        </h2>

        <h3>You need to mint NFTX</h3>

        <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-full">
          Mint
        </button>
      </div>
    </>
  );
};

export default Minter;
