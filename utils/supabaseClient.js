import { createClient } from "@supabase/supabase-js";

const supabaseUrl = "https://bbxondugevthazwvltmt.supabase.co"; // Replace with your Supabase URL
const supabaseAnonKey = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImJieG9uZHVnZXZ0aGF6d3ZsdG10Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDI4MTA1OTIsImV4cCI6MjA1ODM4NjU5Mn0.9GflPODSw1CPl-3VaNj4fUCoresMH3HaX4dUcEifaZo"; // Replace with your Supabase Key

export const supabase = createClient(supabaseUrl, supabaseAnonKey);
