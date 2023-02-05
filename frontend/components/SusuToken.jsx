import { useState, useEffect } from "react"
import { useWeb3Contract, useMoralis } from "react-moralis"
import { ethers } from "ethers"
import abi from "constants/abi"
import contractAddresses from "constants/contractAddresses"

export default function SusuToken() {
    const { isWeb3Enabled, chainId } = useMoralis()
    const contractAddress = parseInt(chainId) in contractAddresses ? contractAddresses[parseInt(chainId)][0] : null

    const [totalSupply, setTotalSupply] = useState("0")
    const [contractBalance, setContractBalance] = useState("0")

    const { runContractFunction: getTotalSupply } = useWeb3Contract({
        abi: abi,
        contractAddress: contractAddress,
        functionName: "totalSupply",
        params: {}
    })

    const { runContractFunction: mintToken } = useWeb3Contract()
    const { runContractFunction: burnToken } = useWeb3Contract()

    const { runContractFunction: withdraw } = useWeb3Contract({
        abi: abi,
        contractAddress: contractAddress,
        functionName: "withdraw",
        params: {}
    })

    useEffect(function () {
        updateUI()
    }, [isWeb3Enabled])

    async function updateUI() {
        if (isWeb3Enabled) {
            const totalSupplyFromCall = ethers.utils.formatEther(await getTotalSupply()).toString()
            setTotalSupply(totalSupplyFromCall)

            const provider = new ethers.providers.Web3Provider(window.ethereum)
            const contractBalanceFromCall = await provider.getBalance(contractAddress)
            setContractBalance(ethers.utils.formatEther(contractBalanceFromCall).toString())
        }
    }

    return (
        <>
            <div>
                <span>Total Supply: {totalSupply}</span>
            </div>
            <div>
                <span>Mint: </span>
                <input id="mint value" />
                <button onClick={async () => {
                    const mintAmountFromInput = document.getElementById("mint value").value
                    const mintCostFromInput = (parseInt(mintAmountFromInput) / 1e9).toString()

                    const options = {
                        abi: abi,
                        contractAddress: contractAddress,
                        functionName: "mint",
                        msgValue: ethers.utils.parseEther(mintCostFromInput).toString(),
                        params: { _amount: ethers.utils.parseEther(mintAmountFromInput) }
                    }
                    await mintToken({onSuccess: async (tx) => {
                        await tx.wait(1)
                        updateUI()
                    }, params: options})
                    document.getElementById("mint value").value = ""
                }}>Mint</button>
            </div>
            <div>
                <span>Burn: </span>
                <input id="burn value" />
                <button onClick={async () => {
                    const burnAmountFromInput = document.getElementById("burn value").value

                    const options = {
                        abi: abi,
                        contractAddress: contractAddress,
                        functionName: "burn",
                        params: { _amount: ethers.utils.parseEther(burnAmountFromInput) }
                    }
                    await burnToken({
                        params: options,
                        onSuccess: async (tx) => {
                            await tx.wait(1)
                            updateUI()
                        }
                    })

                    document.getElementById("burn value").value = ""
                }}>Burn</button>
            </div>
            <div>
                <span>Contract Balance: {contractBalance}</span>
                <div>
                    <button onClick={async () => {
                        await withdraw({
                            onSuccess: async (tx) => {
                                await tx.wait(1)
                                updateUI()
                            }
                        })
                    }}>Withdraw</button>
                </div>
            </div>
        </>
    )
}