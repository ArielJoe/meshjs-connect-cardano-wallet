import { useEffect, useState } from "react";
import { getToken } from "@/lib/getToken";
import { useWallet } from "@meshsdk/react";
import router from "next/router";

export default function Gold() {
  const { wallet, connecting } = useWallet();
  const [filteredAsset, setFilteredAsset] = useState<string>("");

  useEffect(() => {
    async function fetchAndValidateAssets() {
      await fetchAssets().then(() => {
        if (filteredAsset !== getToken().gold) {
          router.push("/login");
        }
      });
    }

    fetchAndValidateAssets();
  }, []);

  async function fetchAssets() {
    try {
      // Fetch list of assets from the connected wallet
      const _assets = await wallet.getAssets();
      console.log("Fetched assets:", _assets);

      // Filter assets based on asset names and policy ID from environment variables
      if (
        _assets.find(
          (asset: { assetName: string }) => asset.assetName === getToken().gold
        )
      ) {
        setFilteredAsset(getToken().gold!);
      }
      console.log("Filtered assets:", filteredAsset);
    } catch (error) {
      console.error("Error fetching assets:", error);
    }
  }

  return (
    connecting && (
      <div>
        <h1>Gold</h1>
      </div>
    )
  );
}
