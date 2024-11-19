import { useWallet } from "@meshsdk/react";
import router from "next/router";
import { useEffect } from "react";

export default function Membership() {
  const { connected } = useWallet();

  useEffect(() => {
    router.push("/login");
  }, []);
}
