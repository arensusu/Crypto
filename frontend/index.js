import { ethers } from "./ethers-5.1.esm.min.js";
import { CONTRACT_ADDRESS, CONTRACT_ABI } from "./constants.js";

const connectButton = document.getElementById("connectButton");
connectButton.onclick = connect;
const mintButton = document.getElementById("mintButton");
mintButton.onclick = mint;
const balanceButton = document.getElementById("balanceButton");
balanceButton.onclick = balance;

async function connect() {
    console.log("connecting");
    if (typeof window.ethereum !== "undefined") {
        try {
            const provider = new ethers.providers.Web3Provider(window.ethereum);
            await provider.send("eth_requestAccounts", []);
            
            const signer = provider.getSigner();
            const signerAddress = await signer.getAddress();
            connectButton.innerHTML = signerAddress;
            connectButton.setAttribute("disabled", "");
        } catch (error) {
            console.log(error);
        }
    }
}

async function mint() {
    console.log("minting");
    if (typeof window.ethereum !== "undefined") {
        try {
            const provider = new ethers.providers.Web3Provider(window.ethereum);
            await provider.send("eth_requestAccounts", []);

            const signer = await provider.getSigner();
            const contract = new ethers.Contract(CONTRACT_ADDRESS, CONTRACT_ABI, signer);
            
            const mintValue = document.getElementById("mint value").value;
            const cost = parseInt(mintValue) / 10;
            await contract.mint(ethers.utils.parseEther(mintValue), { value: ethers.utils.parseEther(cost.toString()) });
        }
        catch (error) {
            console.log(error);
        }
    }
}

async function balance() {
    if (typeof window.ethereum !== "undefined") {
        try {
            const provider = new ethers.providers.Web3Provider(window.ethereum);
            await provider.send("eth_requestAccounts", []);

            const signer = await provider.getSigner();
            const contract = new ethers.Contract(CONTRACT_ADDRESS, CONTRACT_ABI, signer);

            const balanceInWei = await contract.balanceOf(await signer.getAddress());

            let balanceInfo = document.createElement("span");
            balanceInfo.innerHTML = ethers.utils.formatEther(balanceInWei);
            balanceButton.after(balanceInfo);
        }
        catch (error) {
            console.log(error)
        }
    }
}