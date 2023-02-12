import Head from "next/head";
import { useMoralis } from "react-moralis";

import Navibar from "../components/navibar";

export default function Home() {
    const { isWeb3Enabled } = useMoralis();
    return (
        <>
            <Head>
                <title>Blockchain Project</title>
            </Head>
            <Navibar></Navibar>
            <div>Welcome!</div>
        </>
    );
}
