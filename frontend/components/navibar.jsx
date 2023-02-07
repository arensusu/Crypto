import { ConnectButton } from "web3uikit";

export default function Navibar() {
    return (
        <div className="flex flex-row p-4 items-end space-x-8">
            <h1 className="font-mono text-3xl font-bold text-purple-700 w-fit">
                <a href="/">Blockchain Project</a>
            </h1>
            <div className="space-x-3 text-xl font-mono text-purple-600">
                <a href="/token" className="px-2 rounded-md hover:bg-purple-100">SusuToken</a>
                <a href="/dex" className="px-2 rounded-md hover:bg-purple-100">Dex</a>
                <a href="/lending" className="px-2 rounded-md hover:bg-purple-100">Lending</a>
            </div>
            <div>
                <ConnectButton moralisAuth={false} />
            </div>
        </div>
    );
}
