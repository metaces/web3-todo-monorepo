import { MetaMaskInpageProvider} from "@metamask/providers";
declare global {
  interface Window {
    ethereum?: MetaMaskInpageProvider;  
  }
}
import { createPublicClient, createWalletClient, custom, http } from "viem";
import { sepolia } from "viem/chains";


/**
 * Connect to the MetaMask wallet and request account access.
 * This function prompts the user to connect their MetaMask wallet and returns the connected accounts.
 * @returns {Promise<string[]>} A promise that resolves to an array of connected account addresses.
 */
export async function connectWallet() {
  if (!window.ethereum) {
    throw new Error("MetaMask is not installed. Please install it to use this feature.");
  }
  try {
    // get wallet client
    const walletClient = getWalletClient();
    if (!walletClient) {
      throw new Error("Failed to create wallet client. Ensure MetaMask is installed and connected.");
    }
    // Request addresses from MetaMask
    const [address] = await walletClient.requestAddresses();
    if (!address) {
      throw new Error("No address found. Please ensure your MetaMask wallet is connected.");
    }
    return [address];
  } catch (error) {
    console.error(error);
    throw error;
  }
}

/**
 * Disconnects the MetaMask wallet by resetting the provider.
 * This function clears the current provider, effectively disconnecting the wallet.
 * @return {void}
 */
export function disconnectWallet() {
  if (window.ethereum) {
    // Reset the provider to disconnect the wallet
    window.ethereum.request({ method: 'wallet_requestPermissions', params: [{ eth_accounts: {} }] })
      .then(() => {
        console.log("Wallet disconnected.");
      })
      .catch((error) => {
        console.error("Error disconnecting wallet:", error);
      });
  } else {
    console.warn("MetaMask is not installed. Cannot disconnect.");
  }
}


/**
 * Creates a public client for interacting with the Sepolia testnet.
 * This client can be used to send transactions, query balances, etc.
 */
export const publicClient = createPublicClient({
  chain: sepolia,
  transport: http(),
});

/**
 * Creates a wallet client for interacting with the Sepolia testnet using MetaMask.
 * This client allows for signing transactions and messages directly from the wallet.
 *
 * @returns {Object|null} The wallet client or null if MetaMask is not available.
 */
export function getWalletClient() {
  if (typeof window !== "undefined" && window.ethereum) {
    return createWalletClient({
      chain: sepolia,
      transport: custom(window.ethereum),
    });
  }
  return null;
}

