import { createClient } from "@supabase/supabase-js";

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY;

// Debug logging for environment variables
console.log("🔧 Supabase Config Debug:");
console.log("URL exists:", !!supabaseUrl);
console.log("Key exists:", !!supabaseAnonKey);
console.log("Environment:", import.meta.env.MODE);

if (!supabaseUrl || !supabaseAnonKey) {
  console.error("❌ Supabase config eksik. .env dosyasını kontrol edin.");
  console.error("Missing URL:", !supabaseUrl);
  console.error("Missing Key:", !supabaseAnonKey);
}

export const supabase = createClient(supabaseUrl, supabaseAnonKey, {
  auth: {
    persistSession: false, // Disable session persistence for better compatibility
  },
  db: {
    schema: "public",
  },
  global: {
    headers: {
      "x-client-info": "doganventures-web",
    },
  },
});
