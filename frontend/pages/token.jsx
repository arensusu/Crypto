import { useMoralis } from "react-moralis";
import Head from "next/head";

import SusuToken from "../components/SusuToken";
import Navibar from "../components/navibar";

export default function Token() {
    const { isWeb3Enabled } = useMoralis();
    return (
        <>
            <Head>
                <title>Blockchain Project</title>
            </Head>
            <Navibar></Navibar>
            <div>
                {isWeb3Enabled ? (
                    <SusuToken />
                ) : (
                    <div className="pl-8 text-2xl">
                        Please connect to supported Chain.
                    </div>
                )}
            </div>
        </>
    );
}