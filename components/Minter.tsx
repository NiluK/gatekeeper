import React, { useEffect, useState } from "react";
import { ethers } from "ethers";
import NFT from "../artifacts/contracts/SleepyKoala.sol/ISleepyKoala.json";
import { formatFixed } from "@ethersproject/bignumber";

interface Props {
  wallet: string;
  hasNft: boolean;
  setHasNft: React.Dispatch<React.SetStateAction<any>>;
}

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

const Minter: React.FC<Props> = ({ wallet }) => {
  const [injectContract, setInjectContract] = useState<
    IContract | MockContract
  >();
  const [loading, setLoading] = useState(false);
  const [hasNft, setHasNft] = useState(false);
  const [hasTrueNft, setHasTrueNft] = useState(false);
  const [tokenId, setTokenId] = useState("");

  const mintNFT = async () => {
    try {
      const { ethereum } = window;
      const provider = new ethers.providers.Web3Provider(
        ethereum,
        window.ethereum.givenProvider
      );
      const signer = provider.getSigner();
      const nftContract = new ethers.Contract(
        "0xd410dc6422Bc3ECc6B8fEcF27613A2b7c302556c",
        NFT.abi,
        signer
      );

      setLoading(true);

      let nftTx = await nftContract.functions.mint(wallet, false);
      console.log("Mining....", nftTx.hash);

      let tx = await nftTx.wait();

      console.log("Mined!", tx);

      setHasNft(true);

      setLoading(false);
      console.log(
        `Mined, see transaction: https://rinkeby.etherscan.io/tx/${nftTx.hash}`
      );

      getNFTdata(tx);
    } catch (error) {
      console.log("Error minting character", error);
    }
  };

  function getNFTdata(contractTX) {
    const { ethereum } = window;

    const provider = new ethers.providers.Web3Provider(
      ethereum,
      window.ethereum.givenProvider
    );
    const signer = provider.getSigner();

    const nftContract = new ethers.Contract(
      "0xd410dc6422Bc3ECc6B8fEcF27613A2b7c302556c",
      NFT.abi,
      signer
    );

    const tokenId = contractTX.logs[0].topics[3];
    const tokenInt = ethers.BigNumber.from(tokenId);
    const token = formatFixed(tokenInt, 0);
    setTokenId(token);

    nftContract.getTokenData(token).then((data: any) => {
      setHasTrueNft(data);
    });
  }

  function invertNft(tokenId) {
    const { ethereum } = window;

    const provider = new ethers.providers.Web3Provider(
      ethereum,
      window.ethereum.givenProvider
    );
    const signer = provider.getSigner();

    const nftContract = new ethers.Contract(
      "0xd410dc6422Bc3ECc6B8fEcF27613A2b7c302556c",
      NFT.abi,
      signer
    );

    nftContract.functions.setTokenData(tokenId, !hasTrueNft).then((data: any) => {
      console.log(data);
      console.log(data.value);
      const tokenInt = ethers.BigNumber.from(data.value);
      const token = formatFixed(tokenInt, 0);
      console.log(token);
      setHasTrueNft(!!token);
    });
  }


  // useEffect(() => {
  //   getNFTdata(1);
  // }, []);

  const NFTsymbol = 'KOL';


  console.log("hasTrueNft", hasTrueNft);

  return (
    <>
      <div className="relative p-5 bg-white rounded-lg shadow mt-4">
        <div className="relative">
          <div className="text-center">
            <div className="mt-8 text-center">
              <h2 className="text-l">Welcome {wallet}</h2>
            </div>
            {!hasNft ? (
              <div>
                <div className="mt-6">
                  <h2 className="text-l text-gray-600">
                    You need to mint {NFTsymbol}
                  </h2>
                </div>

                <div className="mt-6 md:mt-8">
                  <button
                    className="w-full md:w-auto text-sm bg-gray-500 px-4 py-2 text-white rounded-3xl font-medium hover:bg-blue-600"
                    onClick={() => mintNFT()}
                  >
                    {loading ? "Minting..." : `Mint ${NFTsymbol}`}
                  </button>
                </div>
              </div>
            ) : (
              <div>
                <div>
                  <div className="mt-6">
                    <h2 className="text-l text-gray-600">
                      {hasTrueNft
                        ? "Congrats you have the correct NFT token"
                        : `Unfortunately your NFT doesn't meet the conditions for entry `}
                    </h2>
                  </div>

                  <div className="mt-6 md:mt-8">
                    <button
                      className="w-full md:w-auto text-sm bg-gray-500 px-4 py-2 text-white rounded-3xl font-medium hover:bg-blue-600"
                      onClick={() => invertNft(tokenId)}
                    >
                      Invert {NFTsymbol}
                    </button>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </>
  );
};

export default Minter;
