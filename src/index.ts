import { readCSV, TXErrorTrace } from "./utils";
import init from "./caver";
import { logger } from "./logger";
import * as fs from "fs";

const env = require("./config");

app().then((r) => process.exit(0));

async function app() {
  const config = await env.init();
  const cav = await init(config);

  let parsingData = [];
  let errorAccounts = [];

  // const accountList: unknown = await readCSV(parsingData);

  TXErrorTrace("start");
  // await mint("4", "1", cav);
  TXErrorTrace("end");
}

async function mint(id: string, amount: string, cav: any) {
  try {
    const receipt = await cav.AgendaInstance.methods.mint(id, amount).send({
      gas: 210000,
      from: cav.CaverWallet[0].address,
    });
    logger.info(JSON.stringify(receipt));
  } catch (e) {
    logger.error(e);
  }
}

async function toAccount(account: string, cav: any) {
  try {
    logger.info(`account is ${account}`);
    const receipt = await cav.BragInstance.methods.mint(account, "").send({
      gas: 210000,
      from: cav.CaverWallet[0].address,
    });
    logger.info(JSON.stringify(receipt));

    let result = await cav.BragInstance.methods.balanceOf(account).call();
    logger.info("balanceOf" + result);
  } catch (e) {
    TXErrorTrace(account);
    logger.error(e);
  }
}

async function loopList(accountList: unknown, cav: any) {
  for (const account of accountList as string[]) {
    try {
      logger.info(`account is ${account}`);
      const receipt = await cav.PresaleInstance.methods
        .changeWhiteList(account, "1")
        .send({
          gas: 210000,
          from: cav.CaverWallet[0].address,
        });
      logger.info(JSON.stringify(receipt));

      let result = await cav.PresaleInstance.methods.whitelists(account).call();
      if (result == 1) {
        logger.info(`result expected 1, result is : ${result}`);
      } else {
        TXErrorTrace(account);
        logger.error(`result expected 1, result is : ${result}`);
      }
    } catch (e) {
      TXErrorTrace(account);
      logger.error(e);
    }
  }
}
