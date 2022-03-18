/*
  This example requires Tailwind CSS v2.0+ 
  
  This example requires some changes to your config:
  
  ```
  // tailwind.config.js
  module.exports = {
    // ...
    plugins: [
      // ...
      require('@tailwindcss/forms'),
    ]
  }
  ```
*/
import { LockClosedIcon } from "@heroicons/react/solid";
import { useEffect, useState } from "react";
import { ethers } from "ethers";
import Head from "next/head";
import Minter from "../components/Minter";

declare global {
  interface Window {
    __PRELOADED_STATE__: any;
    ethereum: any;
  }
}

export default function Example() {
  const [wallet, setWallet] = useState("");

  const connectWallet = async () => {
    const provider = new ethers.providers.Web3Provider(
      window.ethereum,
      window.ethereum.givenProvider
    );
    await provider.send("eth_requestAccounts", []);
    const signer = provider.getSigner();

    let userAddress = await signer.getAddress();

    if (setWallet) {
      setWallet(userAddress);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <Head>
        <title>GateKeeper</title>
        <meta name="description" content="Generated by create next app" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <div className="max-w-md w-full space-y-8">
        <div>
          <img
            className="mx-auto h-12 w-auto"
            src="https://tailwindui.com/img/logos/workflow-mark-indigo-600.svg"
            alt="Workflow"
          />
          <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">
            Welcome to the dApp
          </h2>
        </div>
        <div>
          {!wallet ? (
            <button
              onClick={() => connectWallet()}
              className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
            >
              <span className="absolute left-0 inset-y-0 flex items-center pl-3">
                <LockClosedIcon
                  className="h-5 w-5 text-indigo-500 group-hover:text-indigo-400"
                  aria-hidden="true"
                />
              </span>
              Connect Wallet
            </button>
          ) : (
            <div>
              <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">
                Welcome {wallet}
              </h2>
              <Minter />
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
