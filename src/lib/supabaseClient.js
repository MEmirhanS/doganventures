import { createClient } from "@supabase/supabase-js";

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY;

// Debug environment variables
console.log("🔧 Supabase Environment Debug:");
console.log("URL:", supabaseUrl ? "✅ Loaded" : "❌ Missing");
console.log("Key:", supabaseAnonKey ? "✅ Loaded" : "❌ Missing");

if (!supabaseUrl || !supabaseAnonKey) {
  console.error("❌ Supabase config eksik:");
  console.error("URL:", supabaseUrl);
  console.error("Key:", supabaseAnonKey ? "[HIDDEN]" : "undefined");
  console.error("Lütfen .env dosyasını ve Vercel environment variables'ı kontrol edin.");
}

export const supabase = createClient(supabaseUrl, supabaseAnonKey);
