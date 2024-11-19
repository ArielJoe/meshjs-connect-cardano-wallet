import ConnectWallet from "@/components/ConnectWallet";
import { ModeToggle } from "@/components/ui/ModeToggle";
import { useWallet } from "@meshsdk/react";
import { PlugSocketIcon } from "hugeicons-react";

export default function Login() {
  const { connected } = useWallet();

  return (
    <div className="flex justify-center items-center h-screen">
      <div className="absolute left-5 top-5">
        <ModeToggle />
      </div>
      <div className="grid gap-3 border border-primary p-4">
        <h1 className="text-3xl text-center border-b border-white pb-3">
          Welcome to <span className="font-bold">Crymmerce</span>!
        </h1>
        <ConnectWallet />
      </div>
      <div className="absolute right-5 top-5 flex gap-3 items-center">
        <PlugSocketIcon
          color="primary"
          fill={connected ? "white" : "primary"}
        />
      </div>
    </div>
  );
}
