import { useEffect, useState } from "react";
import { supabase } from "../utils/supabaseClient";
import { useRouter } from "next/router";

export default function Register() {
  const router = useRouter();
  const [user, setUser] = useState(null);
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState({ name: "", email: "", phone: "", file: null });

  useEffect(() => {
    // Get current user
    async function getUser() {
      const { data: { user } } = await supabase.auth.getUser();
      if (user) {
        setUser(user);
        loadProgress(user.id); // Load saved progress
      } else {
        router.push("/login");
      }
    }
    getUser();
  }, []);

  async function loadProgress(userId) {
    const { data, error } = await supabase
      .from("registrations")
      .select("*")
      .eq("user_id", userId)
      .single();

    if (data) {
      setFormData(data);
      setStep(data.step || 1);
    }
  }

  async function saveProgress() {
    if (!user) return;
    
    await supabase.from("registrations").upsert({
      user_id: user.id,
      ...formData,
      step
    });
  }

  function handleNext() {
    setStep((prevStep) => prevStep + 1);
    saveProgress();
  }

  function handlePrev() {
    if (step > 1) {
      setStep((prevStep) => prevStep - 1);
    }
  }

  function handleChange(e) {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  }

  return (
    <div className="container">
      <h1>Event Registration</h1>
      <p>Progress: {Math.round((step / 3) * 100)}%</p>

      {step === 1 && (
        <div>
          <h2>Step 1: Personal Info</h2>
          <input type="text" name="name" placeholder="Full Name" value={formData.name} onChange={handleChange} required />
          <input type="email" name="email" placeholder="Email" value={formData.email} onChange={handleChange} required />
          <button onClick={handleNext}>Next</button>
        </div>
      )}

      {step === 2 && (
        <div>
          <h2>Step 2: Contact Details</h2>
          <input type="text" name="phone" placeholder="Phone Number" value={formData.phone} onChange={handleChange} required />
          <button onClick={handlePrev}>Back</button>
          <button onClick={handleNext}>Next</button>
        </div>
      )}

      {step === 3 && (
        <div>
          <h2>Step 3: Upload Documents</h2>
          <input type="file" name="file" onChange={(e) => setFormData({ ...formData, file: e.target.files[0] })} required />
          <button onClick={handlePrev}>Back</button>
          <button onClick={() => router.push("/payment")}>Proceed to Payment</button>
        </div>
      )}
    </div>
  );
}
