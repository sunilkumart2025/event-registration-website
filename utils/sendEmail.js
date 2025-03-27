import { supabase } from "./supabaseClient";

export async function sendEmail(to, subject, message) {
  const { error } = await supabase.rpc("send_email", {
    recipient: to,
    email_subject: subject,
    email_message: message,
  });

  if (error) {
    console.error("Email sending failed:", error);
  } else {
    console.log("Email sent successfully!");
  }
}
