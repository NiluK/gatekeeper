import React, { useState } from "react";

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

const Minter: React.FC<Props> = ({ wallet, hasNft, setHasNft }) => {
  const [injectContract, setInjectContract] = useState<
    IContract | MockContract
  >();
  const [loading, setLoading] = useState(false);

  function handleClickMint(e: React.MouseEvent<HTMLElement>) {
    e.preventDefault();
    setLoading(true);
    // interact with wallet balance
    setHasNft(true);
    setLoading(false)
  }

  function handleClickInvert(e: React.MouseEvent<HTMLElement>) {
    e.preventDefault()
    setLoading(true);
    // interact with contract
    setLoading(false)
  }

  return (
    <>
      <div className="relative p-5 bg-white rounded-lg shadow mt-4">
        <div className="relative">
          <div className="text-center">
            <div className="mt-8 text-center">
              <h2 className="text-l">Welcome {wallet}</h2>
            </div>

            <div>
              {!hasNft ? (
                <div>
                  <div className="mt-6">
                    <h2 className="text-l text-gray-600">
                      You need to mint NFTX
                    </h2>
                  </div>

                  <div className="mt-6 md:mt-8">
                    <button
                      className="w-full md:w-auto text-sm bg-gray-500 px-4 py-2 text-white rounded-3xl font-medium hover:bg-blue-600"
                      onClick={handleClickMint}
                    >
                      Mint
                    </button>
                  </div>
                </div>
              ) : (
                <div>
                  <div>
                    <div className="mt-6">
                      <h2 className="text-l text-gray-600">
                        The NFTX needs to be true
                      </h2>
                    </div>

                    <div className="mt-6 md:mt-8">
                      <button
                        className="w-full md:w-auto text-sm bg-gray-500 px-4 py-2 text-white rounded-3xl font-medium hover:bg-blue-600"
                        onClick={handleClickInvert}
                      >
                        Invert NFTX
                      </button>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Minter;
