import { useState, useEffect } from "react";
import { useWeb3Contract, useMoralis } from "react-moralis";
import { ethers } from "ethers";
import abi from "constants/abi";
import contractAddresses from "constants/contractAddresses";

export default function SusuToken() {
    const { isWeb3Enabled, chainId, account } = useMoralis();
    const contractAddress =
        parseInt(chainId) in contractAddresses
            ? contractAddresses[parseInt(chainId)][0]
            : null;

    const [totalSupply, setTotalSupply] = useState("0");
    const [balance, setBalance] = useState("0");
    const [contractBalance, setContractBalance] = useState("0");

    const { runContractFunction: getTotalSupply } = useWeb3Contract({
        abi: abi,
        contractAddress: contractAddress,
        functionName: "totalSupply",
        params: {},
    });

    const { runContractFunction: getBalanceOf } = useWeb3Contract({
        abi: abi,
        contractAddress: contractAddress,
        functionName: "balanceOf",
        params: {account: account}
    })

    const { runContractFunction: mintToken } = useWeb3Contract();
    const { runContractFunction: burnToken } = useWeb3Contract();

    const { runContractFunction: withdraw } = useWeb3Contract({
        abi: abi,
        contractAddress: contractAddress,
        functionName: "withdraw",
        params: {},
    });

    useEffect(
        function () {
            if(isWeb3Enabled) {
                updateUI();
            }
        },
        [isWeb3Enabled, account]
    );

    async function updateUI() {
        if (isWeb3Enabled) {
            const totalSupplyFromCall = ethers.utils
                .formatEther(await getTotalSupply())
                .toString();
            setTotalSupply(parseInt(totalSupplyFromCall));

            const provider = new ethers.providers.Web3Provider(window.ethereum)
            const contractBalanceFromCall = await provider.getBalance(
                contractAddress
            );
            setContractBalance(
                ethers.utils.formatEther(contractBalanceFromCall).toString()
            );

            if (isWeb3Enabled) {
                const totalBalanceFromCall = ethers.utils
                    .formatEther(await getBalanceOf())
                    .toString();
                setBalance(parseInt(totalBalanceFromCall));
            }
            else {
                setBalance(0);
            }

        }
    }

    return (
        <div>
            <div className="flex">
                <span className="font-mono pb-4 pl-4 text-xl">
                    Total Supply: {totalSupply}
                </span>
            </div>
            <div className="flex">
                <span className="font-mono pb-4 pl-4 text-xl">
                    Your SusuToken: {balance}
                </span>
            </div>
            <div className="flex space-x-2 pl-4 pb-4">
                <span className="font-mono text-lg">Mint: </span>
                <input
                    type="text"
                    className="border border-purple-200 rounded-md bg-purple-100 pl-2"
                    id="mint value"
                />
                <button
                    className="font-mono border-2 border-purple-500 px-2 bg-purple-400"
                    onClick={async () => {
                        const mintAmountFromInput =
                            document.getElementById("mint value").value;
                        const mintCostFromInput = (
                            parseInt(mintAmountFromInput) / 1e9
                        ).toString();

                        const options = {
                            abi: abi,
                            contractAddress: contractAddress,
                            functionName: "mint",
                            msgValue: ethers.utils
                                .parseEther(mintCostFromInput)
                                .toString(),
                            params: {
                                _amount:
                                    ethers.utils.parseEther(
                                        mintAmountFromInput
                                    ),
                            },
                        };
                        await mintToken({
                            onSuccess: async (tx) => {
                                await tx.wait(1);
                                updateUI();
                            },
                            params: options,
                        });
                        document.getElementById("mint value").value = "";
                    }}
                >
                    Mint
                </button>
            </div>
            <div className="flex space-x-2 pl-4 pb-4">
                <span className="font-mono text-lg">Burn: </span>
                <input
                    className="border border-purple-200 rounded-md bg-purple-100 pl-2"
                    id="burn value"
                />
                <button
                    className="font-mono border-2 border-purple-500 px-2 bg-purple-400"
                    onClick={async () => {
                        const burnAmountFromInput =
                            document.getElementById("burn value").value;

                        const options = {
                            abi: abi,
                            contractAddress: contractAddress,
                            functionName: "burn",
                            params: {
                                _amount:
                                    ethers.utils.parseEther(
                                        burnAmountFromInput
                                    ),
                            },
                        };
                        await burnToken({
                            params: options,
                            onSuccess: async (tx) => {
                                await tx.wait(1);
                                updateUI();
                            },
                        });

                        document.getElementById("burn value").value = "";
                    }}
                >
                    Burn
                </button>
            </div>
            <div className="flex space-x-2 pl-4 pb-4">
                <span className="font-mono text-lg">
                    Contract Balance: {contractBalance}
                </span>
                <div>
                    <button
                        className="font-mono border-2 border-purple-500 px-2 bg-purple-400"
                        onClick={async () => {
                            await withdraw({
                                onSuccess: async (tx) => {
                                    await tx.wait(1);
                                    updateUI();
                                },
                            });
                        }}
                    >
                        Withdraw
                    </button>
                </div>
            </div>
        </div>
    );
}
