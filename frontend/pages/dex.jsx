import Navibar from "../components/navibar";
import { useMoralis } from "react-moralis";
import Head from "next/head";

export default function DEX() {
    return (
        <>
            <Head>
                <title>Blockchain Project</title>
            </Head>
            <body>
                <Navibar></Navibar>
                <div>
                    DEX
                </div>
            </body>
        </>
    );
}