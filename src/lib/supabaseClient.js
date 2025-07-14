import { createClient } from "@supabase/supabase-js";

// Environment variables with fallback for production
const supabaseUrl = import.meta.env.VITE_SUPABASE_URL || 
                   "https://jdxhiwbdzudkrhknbbgq.supabase.co";
                   
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY || 
                       "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImpkeGhpd2JkenVka3Joa25iYmdxIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTE5NjczMTAsImV4cCI6MjA2NzU0MzMxMH0.HbWSpvwBDedksrDP3xrYTECJ3LaC5lTNkDRb-OaBmhI";

// Debug environment variables
console.log("🔧 Supabase Environment Debug:");
console.log("URL Source:", import.meta.env.VITE_SUPABASE_URL ? "ENV" : "FALLBACK");
console.log("Key Source:", import.meta.env.VITE_SUPABASE_ANON_KEY ? "ENV" : "FALLBACK");
console.log("Final URL:", supabaseUrl ? "✅ Loaded" : "❌ Missing");
console.log("Final Key:", supabaseAnonKey ? "✅ Loaded" : "❌ Missing");

if (!supabaseUrl || !supabaseAnonKey) {
  console.error("❌ Supabase config tamamen eksik - kritik hata!");
  console.error("URL:", supabaseUrl);
  console.error("Key:", supabaseAnonKey ? "[HIDDEN]" : "undefined");
}

export const supabase = createClient(supabaseUrl, supabaseAnonKey);
