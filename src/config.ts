import * as path from "path";
import { checkENV } from "./utils";
import {AbiItem} from "caver-js";

export async function init() {
  const ENV = process.env.NODE_ENV;
  let option;

  await checkENV(ENV);
  if (ENV === "prod") {
    // ######## PROD ##################################
    require("dotenv").config({
      path: path.join(__dirname, "../env/prod.env"),
    });
    option = {
      headers: [
        {
          name: "Authorization",
          value:
            "Basic " +
            Buffer.from(
              process.env.KAS_ACCESS_ID + ":" + process.env.KAS_ACCESS_SECRET
            ).toString("base64"),
        },
        { name: "x-chain-id", value: 8217 },
      ],
      // ##############################################
    };
  } else {
    // ######## DEV ##################################
    require("dotenv").config({
      path: path.join(__dirname, "../env/dev.env"),
    });
    option = {
      headers: [{ name: "x-chain-id", value: 1001 }],
    };
    // ##############################################
  }

  return {
    // PRIVATE KEY
    P_KEY_BRAG: process.env.P_KEY_BRAG,
    P_KEY_CA: process.env.P_KEY_CA,

    // KLAY API ACCESS
    KAS_OPTION: option,
    NETWORK_URI: process.env.NETWORK_URI,

    // DEPLOYED ADDRESS
    CA_V1_DEPLOYED_ADDRESS: process.env.CA_V1_DEPLOYED_ADDRESS,
    BRAG_DEPLOYED_ADDRESS: process.env.BRAG_DEPLOYED_ADDRESS,
    PRESALE_DEPLOYED_ADDRESS: process.env.PRESALE_DEPLOYED_ADDRESS,

    // ABI
    CA_ABI: require("./contracts/CA_V1.json") as AbiItem,
    BRAG_ABI: require("./contracts/BRAG.json") as AbiItem,
    PRESALE_ABI: require("./contracts/PresaleSeller.json") as AbiItem,
  };
}
