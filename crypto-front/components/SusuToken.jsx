import { useState, useEffect } from "react"
import { useWeb3Contract, useMoralis } from "react-moralis"
import { ethers } from "ethers"
import abi from "constants/abi"
import contractAddress from "constants/contractAddress"

export default function SusuToken() {
    const { isWeb3Enabled } = useMoralis()

    const [totalSupply, setTotalSupply] = useState("0")

    const { runContractFunction: getTotalSupply } = useWeb3Contract({
        abi: abi,
        contractAddress: contractAddress,
        functionName: "totalSupply",
        params: {}
    })

    const { runContractFunction: mintNewToken } = useWeb3Contract()

    useEffect(function () {
        updateUI()
    }, [isWeb3Enabled])

    async function updateUI() {
        if (isWeb3Enabled) {
            const totalSupplyFromCall = ethers.utils.formatEther(await getTotalSupply()).toString()
            setTotalSupply(totalSupplyFromCall)
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
                    const mintCostFromInput = (parseInt(mintAmountFromInput) / 10).toString()

                    const options = {
                        abi: abi,
                        contractAddress: contractAddress,
                        functionName: "mint",
                        msgValue: ethers.utils.parseEther(mintCostFromInput).toString(),
                        params: { _amount: ethers.utils.parseEther(mintAmountFromInput).toString() }
                    }
                    await mintNewToken({onSuccess: async (tx) => {
                        await tx.wait(1)
                        updateUI()
                    }, params: options})
                    document.getElementById("mint value").value = ""
                }}>Mint</button>
            </div>
            <div>
                <span>Burn: </span>
                <input id="burn value" />
                <button id="burnButton">Burn</button>
            </div>
            <div>
                <button id="contractBalance">Contract Balance</button>
                <div>
                    <button id="withdraw">Withdraw</button>
                </div>
            </div>
        </>
    )
}