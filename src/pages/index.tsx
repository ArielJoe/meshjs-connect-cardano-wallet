import Image from "next/image";
import { CardanoWallet, useWallet } from "@meshsdk/react";
import router, { useRouter } from "next/router";
import ConnectWallet from "@/components/ConnectWallet";
import { useEffect, useState } from "react";

export default function Home() {
  const { connected } = useWallet();

  useEffect(() => {
    router.push("/login");
  }, []);

  return (
    <div>
      {connected && (
        <></>
        // <button
        //   className="border-primary border mt-2 p-3 rounded-sm hover:bg-primary hover:text-secondary"
        //   onClick={handleDisconnect}
        // >
        //   Sign out
        // </button>

        // <div className="bg-slate-200 min-h-screen">
        //   <div className="bg-black p-6 text-white flex justify-between items-center">
        //     <div className="flex justify-center items-center">
        //       <Image
        //         src="/image1.png"
        //         alt="logo"
        //         width={100}
        //         height={100}
        //         className="rounded-full mr-6"
        //       />
        //       <h1 className="text-3xl font-bold">
        //         Cardano Developer Workshop MCU
        //       </h1>
        //     </div>
        //     <div></div>
        //   </div>
        //   {!connected && (
        //     <p className="text-red-500 text-center font-bold mt-20">
        //       Dompet tidak terhubung
        //     </p>
        //   )}
        //   {connected && (
        //     <p className="text-green-500 text-center font-bold mt-20">
        //       Dompet terhubung
        //     </p>
        //   )}
        // </div>
      )}
    </div>
  );
}
