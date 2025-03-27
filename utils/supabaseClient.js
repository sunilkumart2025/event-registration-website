import { createClient } from "@supabase/supabase-js";

const supabaseUrl = "https://your-supabase-url.supabase.co"; // Replace with your Supabase URL
const supabaseAnonKey = "your-anon-key"; // Replace with your Supabase Key

export const supabase = createClient(supabaseUrl, supabaseAnonKey);
