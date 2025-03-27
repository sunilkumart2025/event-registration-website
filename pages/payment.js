import { useState, useEffect } from "react";
import { useRouter } from "next/router";
import { supabase } from "../utils/supabaseClient";
import { sendEmail } from "../utils/sendEmail";

export default function PaymentPage() {
  const router = useRouter();
  const [user, setUser] = useState(null);
  const [transactionId, setTransactionId] = useState("");
  const [paymentVerified, setPaymentVerified] = useState(false);
  const [loading, setLoading] = useState(false);
  const eventFee = 100; // Fixed event fee

  useEffect(() => {
    const fetchUser = async () => {
      const { data: { user } } = await supabase.auth.getUser();
      if (user) {
        setUser(user);
      } else {
        router.push("/login");
      }
    };

    fetchUser();
  }, []);

  const verifyPayment = async () => {
    if (!transactionId) {
      alert("Please enter a transaction ID.");
      return;
    }

    setLoading(true);

    // Check the transaction ID in the database
    const { data, error } = await supabase
      .from("payments")
      .select("*")
      .eq("transaction_id", transactionId)
      .eq("amount", eventFee)
      .single();

    if (data) {
      setPaymentVerified(true);
      alert("Payment verified successfully! ✅");
    } else {
      alert("Invalid transaction ID. Please try again.");
    }

    setLoading(false);
  };

  const submitFinalRegistration = async () => {
    if (!paymentVerified) {
      alert("Please complete the payment before submitting.");
      return;
    }

    await supabase
      .from("registrations")
      .update({ registration_complete: true })
      .eq("user_id", user.id);

    // Send confirmation email
    await sendEmail(
      user.email,
      "Event Registration Successful 🎉",
      `Hello ${user.email},\n\nYour payment has been received, and you are successfully registered for the event!\n\nEvent Details:\n- Event Name: XYZ Event\n- Date: 25th March 2025\n- Payment: ₹${eventFee} (Completed)\n\nThank you for registering!\n\nBest Regards,\nEvent Team`
    );

    alert("Registration Successful! 🎉 Check your email.");
    router.push("/dashboard");
  };

  return (
    <div className="container">
      <h1>Complete Your Payment</h1>

      <p>Scan the QR Code below and pay ₹{eventFee}.</p>
      <img src="/qr-code.png" alt="Payment QR Code" className="qr-code" />

      <div className="payment-input">
        <label>Enter Transaction ID:</label>
        <input
          type="text"
          value={transactionId}
          onChange={(e) => setTransactionId(e.target.value)}
          placeholder="Enter UPI Transaction ID"
        />
        <button onClick={verifyPayment} disabled={loading}>
          {loading ? "Verifying..." : "Verify Payment"}
        </button>
      </div>

      {paymentVerified && (
        <div className="success-message">
          ✅ Payment verified! You can now submit your registration.
        </div>
      )}

      <button onClick={submitFinalRegistration} disabled={!paymentVerified}>
        Submit Registration
      </button>

      <style jsx>{`
        .container {
          text-align: center;
          padding: 20px;
        }
        .qr-code {
          width: 200px;
          margin: 20px 0;
        }
        .payment-input {
          margin-top: 20px;
        }
        .payment-input input {
          padding: 10px;
          margin-right: 10px;
        }
        .success-message {
          color: green;
          margin-top: 10px;
        }
        button {
          padding: 10px 15px;
          background: blue;
          color: white;
          border: none;
          cursor: pointer;
        }
        button:disabled {
          background: grey;
          cursor: not-allowed;
        }
      `}</style>
    </div>
  );
}
