import { useState, useEffect } from "react";
import { useWallet, useWalletList } from "@meshsdk/react";
import Image from "next/image";
import { useToast } from "@/hooks/use-toast";
import router from "next/router";
import { getToken } from "@/lib/getToken";

interface Wallet {
  name: string;
  icon: string;
}

const gold = getToken().gold;
const silver = getToken().silver;
const platinum = getToken().platinum;
const policyID = getToken().policyID;

const ConnectWallet = () => {
  const { toast } = useToast();
  const [selectedWallet, setSelectedWallet] = useState<Wallet | null>(null);
  const { wallet, connect, disconnect, connecting, connected } = useWallet();
  const wallets: Wallet[] = useWalletList();
  const [address, setAddress] = useState("");
  const [assetsList, setAssetsList] = useState([
    { assetName: "", fingerPrint: "", policyId: "", quantity: "", unit: "" },
  ]);

  useEffect(() => {
    clearStates();
    const storedWallet = localStorage.getItem("selectedWallet");
    if (storedWallet) {
      const parsedWallet: Wallet = JSON.parse(storedWallet);
      setSelectedWallet(parsedWallet);
      connect(parsedWallet.name);
      getWalletAddress();
      checkNftCredentials();
    }
  }, [connected]);

  function clearStates() {
    setAssetsList([
      { assetName: "", fingerPrint: "", policyId: "", quantity: "", unit: "" },
    ]);
  }

  // Fungsi untuk memeriksa credential NFT
  async function checkNftCredentials() {
    try {
      // Mendapatkan list token-token (FT / NFT) dari wallet yang terhubung
      const _assets = await wallet.getAssets();
      console.log("ASSETS:", _assets);

      // Memfilter list token-token NFT yang sesuai dengan nama-nama token dan policyID yang sudah ditentukan di file environtment variable (.env)
      const filteredAsset: any = _assets.filter(
        (asset: { assetName: string; policyId: string }) =>
          (asset.assetName === gold ||
            asset.assetName === silver ||
            asset.assetName === platinum) &&
          asset.policyId === policyID
      );
      // console.log("FILTERED ASSETS", filteredAsset);

      // Menyimpan list token-token NFT yang sudah di filter
      setAssetsList(filteredAsset);

      // Jika tidak ada / tidak ditemukan token NFT
      if (filteredAsset.length === 0) {
        // Menampilkan notifikasi tidak bisa login karena tidak memiliki NFT
        toast({
          title: "No NFTs Detected",
          description: `Can't sign in without NFT!`,
        });
        return;
      }
      // Jika hanya ada satu token NFT
      else if (filteredAsset.length === 1) {
        // Menampilkan notifikasi selamat datang member dan diizinkan untuk bisa login
        const assetName = filteredAsset[0].assetName;
        let membershipType = "";

        // Nama token sesuai membership
        if (assetName === silver) {
          membershipType = "Silver Member";
        } else if (assetName === gold) {
          membershipType = "Gold Member";
        } else if (assetName === platinum) {
          membershipType = "Platinum Member";
        }
      }
      // Jika ada lebih dari satu token NFT
      else {
        // Menampilkan selamat datang dan diizinkan untuk login dengan memilih membership-nya
      }
    } catch (error) {
      console.error("Error fetching assets:", error);
    }
  }

  const handleWalletSelection = (wallet: Wallet) => {
    localStorage.setItem("selectedWallet", JSON.stringify(wallet));
    setSelectedWallet(wallet);
    connect(wallet.name);
  };

  const handleDisconnect = () => {
    localStorage.removeItem("selectedWallet");
    disconnect();
    setSelectedWallet(null);
    toast({
      description: `Signed out`,
    });
  };

  async function getWalletAddress() {
    if (connected) {
      const addr = await wallet.getChangeAddress();
      setAddress(addr);
    }
  }

  function needConnectHandler() {
    if (connecting) {
      return <p>Please connect your wallet through the pop-up window...</p>;
    } else {
      return <p>Please select your available wallets :</p>;
    }
  }

  function loginHandler(assetName: string) {
    const memberToken = assetName;
    if (memberToken === silver) {
      router.push("/membership/silver");
    } else if (memberToken === gold) {
      router.push("/membership/gold");
    } else if (memberToken === platinum) {
      router.push("/membership/platinum");
    }
  }

  return (
    <>
      <div>
        {selectedWallet && !connecting ? (
          <div className="grid gap-3">
            {assetsList.map((asset, index) => (
              <div key={index}>
              {asset && (
                <button
                  className={`p-2 w-full rounded-sm ${
                    asset.assetName === silver
                      ? "bg-[#c4c4c4]"
                      : asset.assetName === gold
                      ? "bg-[#efbf04]"
                      : asset.assetName === platinum
                      ? "bg-[#d9d9d9]"
                      : ""
                  }`}
                  onClick={() => {
                    loginHandler(asset.assetName);
                  }}
                >
                  <p className="text-primary">
                    {asset.assetName === silver
                      ? "Sign in as Silver Member"
                      : asset.assetName === gold
                      ? "Sign in as Gold Member"
                      : asset.assetName === platinum
                      ? "Sign in as Platinum Member"
                      : null}
                  </p>
                </button>
              )}
            </div>
            ))}
            <button
              className="border-primary border rounded-sm hover:bg-primary hover:text-secondary p-1"
              onClick={handleDisconnect}
            >
              Sign out
            </button>
          </div>
        ) : (
          // <div>
          //   <span>{selectedWallet.name}</span>
          //   <Image
          //     src={selectedWallet.icon}
          //     alt={selectedWallet.name}
          //     width={30}
          //     height={30}
          //   />
          //   <button onClick={handleDisconnect}>Disconnect</button>
          // </div>

          <div className="text-center">{needConnectHandler()}</div>
        )}
      </div>
      <div className="flex justify-center">
        {!selectedWallet && !connecting && (
          <ul className="flex gap-3">
            {wallets.map((w) => (
              <li
                key={w.name}
                onClick={() => {
                  handleWalletSelection(w);
                  toast({
                    description: `Signed in with ${w.name}`,
                  });
                }}
                className="hover:cursor-pointer hover:bg-primary hover:text-secondary hover:rounded-sm"
              >
                {/* <span>{w.name}</span> */}
                <div className="border border-primary rounded-sm p-2 h-full grid items-center">
                  <Image src={w.icon} alt={w.name} width={50} height={50} />
                  <p className="text-center">{w.name}</p>
                </div>
              </li>
            ))}
          </ul>
        )}
      </div>
    </>
  );
};

export default ConnectWallet;
