import { useEffect, useState } from "react";
import { supabase } from "../utils/supabaseClient";
import { useRouter } from "next/router";
import QRCode from "qrcode.react";

export default function Payment() {
  const router = useRouter();
  const [user, setUser] = useState(null);
  const [transactionId, setTransactionId] = useState("");
  const [paymentVerified, setPaymentVerified] = useState(false);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    async function getUser() {
      const { data: { user } } = await supabase.auth.getUser();
      if (user) {
        setUser(user);
        checkPaymentStatus(user.id);
      } else {
        router.push("/login");
      }
    }
    getUser();
  }, []);

  async function checkPaymentStatus(userId) {
    const { data, error } = await supabase
      .from("registrations")
      .select("payment_status")
      .eq("user_id", userId)
      .single();

    if (data && data.payment_status === "success") {
      setPaymentVerified(true);
    }
  }

  async function submitPayment() {
    if (!transactionId) {
      alert("Please enter your Transaction ID!");
      return;
    }

    setLoading(true);

    // Store the transaction ID in Supabase (manual verification required)
    const { error } = await supabase
      .from("registrations")
      .update({ transaction_id: transactionId, payment_status: "pending" })
      .eq("user_id", user.id);

    setLoading(false);

    if (!error) {
      alert("Payment submitted for verification! It may take 10-15 minutes.");
    }
  }

  async function submitFinalRegistration() {
    if (!paymentVerified) {
      alert("Complete the payment before submitting.");
      return;
    }

    // Mark registration as complete
    await supabase
      .from("registrations")
      .update({ registration_complete: true })
      .eq("user_id", user.id);

    alert("Registration Successful! 🎉 Check your email.");
    router.push("/dashboard");
  }

  return (
    <div className="container">
      <h1>Complete Payment</h1>

      <p>Scan the QR code below to pay ₹100</p>
      <QRCode value="upi://pay?pa=your@upiid&pn=EventRegistration&mc=1234&tid=random123&tr=100" size={200} />

      <div>
        <input
          type="text"
          placeholder="Enter Transaction ID"
          value={transactionId}
          onChange={(e) => setTransactionId(e.target.value)}
        />
        <button onClick={submitPayment} disabled={loading}>
          {loading ? "Processing..." : "Submit Payment"}
        </button>
      </div>

      {paymentVerified && (
        <div>
          <p>✅ Payment Verified!</p>
          <button onClick={submitFinalRegistration}>Submit Registration</button>
        </div>
      )}
    </div>
  );
}
