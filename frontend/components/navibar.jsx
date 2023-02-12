import { ConnectButton } from "web3uikit";
import Link from "next/link"

export default function Navibar() {
    return (
        <div className="flex flex-row p-4 items-end space-x-8">
            <h1 className="font-mono text-3xl font-bold text-purple-700 w-fit">
                <Link href="/">Blockchain Project</Link>
            </h1>
            <div className="space-x-3 text-xl font-mono text-purple-600">
                <Link href="/token" className="px-2 rounded-md hover:bg-purple-100">SusuToken</Link>
                <Link href="/dex" className="px-2 rounded-md hover:bg-purple-100">Dex</Link>
                <Link href="/lending" className="px-2 rounded-md hover:bg-purple-100">Lending</Link>
            </div>
            <div>
                <ConnectButton moralisAuth={false} />
            </div>
        </div>
    );
}
