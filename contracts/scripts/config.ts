import * as dotenv from "dotenv";

dotenv.config();

export const config = {
  network: process.env.NETWORK,
  rinkeby: {
    url: process.env.ALCHEMY_RINKEBY_URL || "",
  },
  privateKey: process.env.PRIVATE_KEY || "",
  coinmarketcap: process.env.COINMARKETCAP_API_KEY || "",
};
