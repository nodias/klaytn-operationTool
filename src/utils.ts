import * as fs from "fs";
import * as csv from "csv-parser";

export async function sleep(ms) {
  const wakeUpTime = Date.now() + ms;
  while (Date.now() < wakeUpTime) {}
}

export async function readInput() {
  const readline = require("readline");
  const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout,
  });
  const it = await rl[Symbol.asyncIterator]();
  return await it.next();
}

export async function checkENV(env: string) {
  if (env === "prod") {
    if ((await readInput()).value !== "go") {
      process.exit(0);
    }
    console.log("WARNINGWARNINGWARNINGWARNINGWARNINGWARNINGWARNING");
    console.log("PRODPRODPRODPRODPRODPRODPRODPRODPRODPRODPROD");
    console.log("PRODPRODPRODPRODPRODPRODPRODPRODPRODPRODPROD");
    console.log("PRODPRODPRODPRODPRODPRODPRODPRODPRODPRODPROD");
    console.log("WARNINGWARNINGWARNINGWARNINGWARNINGWARNINGWARNING");

    // await sleep(5000);
  }
}

// parsingData에 원본 들어가고, return으로는 중복제거 데이터 들어감
export function readCSV(parsingData) {
  return new Promise(function (resolve, reject) {
    let counts = 0;
    fs.createReadStream("./docs/test.csv")
      .pipe(csv(["val"]))
      .on("data", (data) => {
        parsingData.push(data["val"]);
        counts = counts + 2;
      })
      .on("end", () => {
        resolve(removeDuplication(parsingData));
      });
  });
}

function removeDuplication(arr) {
  let uniqueArr = [];
  arr.forEach((element) => {
    if (!uniqueArr.includes(element)) {
      uniqueArr.push(element);
    } else {
      console.log("# DUPLICATED ADDRESS #");
      console.log(element);
      console.log("# DUPLICATED ADDRESS #");
    }
  });
  return uniqueArr;
}

export function TXErrorTrace(input: string) {
  let text: string;
  switch (input) {
    case "start":
      text =
        "\n\n# START @@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@";
      break;
    case "end":
      text =
        "# END @@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@";
      break;
    default:
      text = input;
      break;
  }
  const txt = fs.readFileSync("./error-account.txt", "utf8");
  fs.writeFileSync("./error-account.txt", txt + "\n" + text);
}
