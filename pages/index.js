import { useEffect } from "react";
import { useRouter } from "next/router";

export default function Home() {
  const router = useRouter();

  useEffect(() => {
    router.push("/register"); // Redirects to event registration page
  }, []);

  return null; // No UI needed since it redirects immediately
}
