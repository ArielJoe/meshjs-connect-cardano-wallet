import Image from "next/image";
import { CardanoWallet, useWallet } from "@meshsdk/react";

export default function Home() {
  const { connected } = useWallet();

  return (
    <div className="bg-slate-200 min-h-screen">
      <div className="bg-black p-6 text-white flex justify-between items-center">
        <div className="flex justify-center items-center">
          <Image
            src="/image1.png" alt="logo" width={100} height={100} className="rounded-full mr-6"
          />
          <h1 className="text-3xl font-bold">Cardano Developer Workshop MCU</h1>
        </div>
        <div>
          <CardanoWallet label="Hubungkan Wallet" isDark={false} metamask={{ network: "preprod" }} />
        </div>
      </div>
      {!connected && (
        <p className="text-red-500 text-center font-bold mt-20">
          Dompet tidak terhubung
        </p>
      )}
      {connected && (
        <p className="text-green-500 text-center font-bold mt-20">
          Dompet terhubung
        </p>
      )}
    </div>
  );
}
