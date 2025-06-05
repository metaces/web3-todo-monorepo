import { MetaMaskInpageProvider} from "@metamask/providers";
declare global {
  interface Window {
    ethereum?: MetaMaskInpageProvider;  
  }
}
import { useEffect, useState } from "react";

export function useMetaMask() {
  const [isConnected, setIsConnected] = useState(false);

  useEffect(() => {
    if (typeof window === "undefined" || !window.ethereum) {
      setIsConnected(false);
      return;
    }

    async function checkWalletConnection() {
      try {
        const accounts = await (window.ethereum as any).request({ method: "eth_accounts" });
        setIsConnected(accounts.length > 0);
      } catch {
        setIsConnected(false);
      }
    }

    checkWalletConnection();

    const handleAccountsChanged = (accounts: string[]) => {
      setIsConnected(accounts.length > 0);
    };

    (window.ethereum as any).on("accountsChanged", handleAccountsChanged);

    return () => {
      (window.ethereum as any).removeListener("accountsChanged", handleAccountsChanged);
    };
  }, []);

  const connect = async () => {
    if (window.ethereum) {
      try {
        await window.ethereum.request({ method: "eth_requestAccounts" });
        setIsConnected(true);
      } catch {
        setIsConnected(false);
      }
    } else {
      alert("MetaMask is not installed");
    }
  };

  return { isConnected, connect };
}