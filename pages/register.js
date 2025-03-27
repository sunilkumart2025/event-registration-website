import { useState } from "react";
import { useRouter } from "next/router";
import Link from "next/link";
import ProgressBar from "../components/ProgressBar";

export default function Register() {
  const router = useRouter();
  const [progress, setProgress] = useState(0); // Track form completion

  const handleRegisterClick = () => {
    router.push("/login"); // Redirect to login/signup
  };

  return (
    <div className="container">
      <h1>Event Registration</h1>
      <ProgressBar progress={progress} />
      <p>Register now to book your spot!</p>
      <button onClick={handleRegisterClick} className="register-btn">
        Register for Event
      </button>
      <p>Already registered? <Link href="/login">Login here</Link></p>
    </div>
  );
}
