'use client';

import { useAccount, useConnect, useDisconnect } from 'wagmi';
import { injected } from 'wagmi/connectors';

export function ConnectWallet() {
  const { address, isConnected } = useAccount();
  const { connect } = useConnect();
  const { disconnect } = useDisconnect();

  if (isConnected) {
    return (
      <div className="flex items-center gap-4">
        <span className="text-sm">
          Connected: {address?.slice(0, 6)}...{address?.slice(-4)}
        </span>
        <button
          onClick={() => disconnect()}
          className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded"
        >
          Disconnect
        </button>
      </div>
    );
  }

  return (
    <button
      onClick={() => connect({ connector: injected() })}
      className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
    >
      Connect Wallet
    </button>
  );
}
