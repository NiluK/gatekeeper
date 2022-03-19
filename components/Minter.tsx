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
  const [errorMessage, setErrorMessage] = useState("");

  const mintNFT = async () => {
    try {
      const { ethereum } = window;
      const provider = new ethers.providers.Web3Provider(
        ethereum,
        window.ethereum.givenProvider
      );
      const signer = provider.getSigner();
      const nftContract = new ethers.Contract(
        "0x8e1Ef80410758A45387E3777bba7cA814Be61B8E",
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
      setErrorMessage("Minting Error");
      setLoading(false);
    }
  };

  function getNFTdata(contractTX: any) {
    const { ethereum } = window;

    const provider = new ethers.providers.Web3Provider(
      ethereum,
      window.ethereum.givenProvider
    );
    const signer = provider.getSigner();

    const nftContract = new ethers.Contract(
      "0x8e1Ef80410758A45387E3777bba7cA814Be61B8E",
      NFT.abi,
      signer
    );

    const tokenId = contractTX.logs[0].topics[3];
    const tokenInt = ethers.BigNumber.from(tokenId);
    const token = formatFixed(tokenInt, 0);
    setTokenId(token);

    nftContract.getTokenData(token).then((data: boolean) => {
      setHasTrueNft(data);
    });
  }

  function invertNft(tokenId: string) {
    const { ethereum } = window;

    const provider = new ethers.providers.Web3Provider(
      ethereum,
      window.ethereum.givenProvider
    );
    const signer = provider.getSigner();

    const nftContract = new ethers.Contract(
      "0x8e1Ef80410758A45387E3777bba7cA814Be61B8E",
      NFT.abi,
      signer
    );

    setLoading(true);
    nftContract.functions
      .invertTokenData(tokenId)
      .then(async (data: any) => {
        let tx = await data.wait();
        console.log("Mined!", tx);
        console.log(
          `Mined, see transaction: https://rinkeby.etherscan.io/tx/${data.hash}`
        );
        nftContract.getTokenData(tokenId).then((data: any) => {
          console.log("getTokenData", data);
          setHasTrueNft(data);
          setErrorMessage("");
          setLoading(false);
        });
      })
      .catch(() => {
        setErrorMessage("Inverting NFT Error");
        setLoading(false);
      });
  }
  const NFTsymbol = "KOL";
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
                  {loading ? (
                    <button
                      type="button"
                      className="w-full md:w-auto text-sm bg-blue-600 px-4 py-2 text-white rounded-3xl font-medium"
                      disabled
                    >
                      <svg
                        role="status"
                        className="inline mr-2 w-4 h-4 text-gray-200 animate-spin dark:text-gray-600 fill-white align-baseline"
                        viewBox="0 0 100 100"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z"
                          fill="currentColor"
                        />
                        <path
                          d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z"
                          fill="currentFill"
                        />
                      </svg>
                      Minting...
                    </button>
                  ) : !errorMessage ? (
                    <button
                      className="w-full md:w-auto text-sm bg-gray-500 px-4 py-2 text-white rounded-3xl font-medium hover:bg-blue-600"
                      onClick={() => mintNFT()}
                    >
                      Mint {NFTsymbol}
                    </button>
                  ) : (
                    <div>
                      <button
                        type="button"
                        className="w-full md:w-auto text-sm bg-red-600 px-4 py-2 text-white rounded-3xl font-medium mr-2"
                        disabled
                      >
                        {errorMessage}
                      </button>
                      <button
                        className="w-full md:w-auto text-sm bg-blue-600 px-4 py-2 text-white rounded-3xl font-medium"
                        onClick={() => window.location.reload()}
                      >
                        Click to Reload!
                      </button>
                    </div>
                  )}
                </div>
              </div>
            ) : (
              <div>
                <div>
                  <div className="mt-6">
                    <h2 className="text-l text-gray-600">
                      {hasTrueNft
                        ? "Congratulations you have the correct NFT token"
                        : `Unfortunately your NFT doesn't meet the conditions for entry `}
                    </h2>
                  </div>

                  <div className="mt-6 md:mt-8">
                    {loading ? (
                      <button
                        type="button"
                        className="w-full md:w-auto text-sm bg-blue-600 px-4 py-2 text-white rounded-3xl font-medium"
                        disabled
                      >
                        <svg
                          role="status"
                          className="inline mr-2 w-4 h-4 text-gray-200 animate-spin dark:text-gray-600 fill-white align-baseline"
                          viewBox="0 0 100 100"
                          fill="none"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <path
                            d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z"
                            fill="currentColor"
                          />
                          <path
                            d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z"
                            fill="currentFill"
                          />
                        </svg>
                        Inverting...
                      </button>
                    ) : !errorMessage ? (
                      !hasTrueNft && (
                        <button
                          className="w-full md:w-auto text-sm bg-gray-500 px-4 py-2 text-white rounded-3xl font-medium hover:bg-blue-600"
                          onClick={() => invertNft(tokenId)}
                        >
                          Invert {NFTsymbol}
                        </button>
                      )
                    ) : (
                      <div>
                        <button
                          type="button"
                          className="w-full md:w-auto text-sm bg-red-600 px-4 py-2 text-white rounded-3xl font-medium mr-2"
                          disabled
                        >
                          {errorMessage}
                        </button>
                        <button
                          className="w-full md:w-auto text-sm bg-blue-600 px-4 py-2 text-white rounded-3xl font-medium"
                          onClick={() => invertNft(tokenId)}
                        >
                          Retry {NFTsymbol} Inversion
                        </button>
                      </div>
                    )}
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
