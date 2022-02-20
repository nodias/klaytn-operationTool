import * as fs from "fs";
import { ABI, AbiItem, Contract } from "caver-js";

const Caver = require("caver-js");

export default async function init(config) {
  const cav = new Caver(
    new Caver.providers.HttpProvider(config.NETWORK_URI, config.KAS_OPTION)
  );
  const BRAG_ABI = require("./contracts/BRAG.json");
  const PRESALE_ABI = require("./contracts/PresaleSeller.json");

  const BragInstance: Contract = new cav.klay.Contract(
    BRAG_ABI.abi,
    config.BRAG_DEPLOYED_ADDRESS
  );

  const PresaleInstance: Contract = new cav.klay.Contract(
    PRESALE_ABI.abi,
    config.PRESALE_DEPLOYED_ADDRESS
  );

  //login
  const wallet = cav.klay.accounts.wallet;
  wallet.add(cav.klay.accounts.privateKeyToAccount(config.P_KEY_BRAG));
  wallet.add(cav.klay.accounts.privateKeyToAccount(config.P_KEY_CA));

  return {
    BragInstance: BragInstance,
    PresaleInstance: PresaleInstance,
    CaverWallet: wallet,
  };
}
