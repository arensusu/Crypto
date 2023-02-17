const line = require("@line/bot-sdk");
require("dotenv").config();

const LINE_ACCESS_TOKEN = process.env.LINE_ACCESS_TOKEN;
const LINE_SECRET = process.env.LINE_SECRET;
const LINE_USER_ID = process.env.LINE_USER_ID;

const ETHERSCAN_API_KEY = process.env.ETHERSCAN_API_KEY;
const ethGasApi =
    `https://api.etherscan.io/api?module=gastracker&action=gasoracle&apikey=${ETHERSCAN_API_KEY}`;

let gasHistory = 0;
let count = 0;

function sleep(ms) {
    return new Promise((resolve) => setTimeout(resolve, ms));
}

async function main() {
    const config = {
        channelAccessToken: LINE_ACCESS_TOKEN,
        channelSecret: LINE_SECRET,
    }
    const client = new line.Client(config);
    
    while (true) {
        fetch(ethGasApi)
            .then((response) => {
                if (response.ok) {
                    return response.json();
                } else {
                    throw new Error("Error: " + response.status);
                }
            })
            .then((data) => {
                gasPrice = data['result']['ProposeGasPrice'];
                if (gasPrice <= 25) {
                    client.pushMessage(LINE_USER_ID, { type: "text", text: `Current Ethereum Gas Price is ${gasPrice}` });
                }
                console.log(gasPrice);
            })
            .catch((error) => console.error(error));

        const waitingTime = 5 * 60 * 1000;
        await sleep(waitingTime);
    }
}

main();