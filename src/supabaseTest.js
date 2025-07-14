import { supabase } from "./lib/supabaseClient";

// Debug environment variables
console.log("🔧 Environment Debug:");
console.log("Supabase URL:", import.meta.env.VITE_SUPABASE_URL ? "✅ Set" : "❌ Missing");
console.log("Supabase Key:", import.meta.env.VITE_SUPABASE_ANON_KEY ? "✅ Set" : "❌ Missing");

// Test Supabase connection
async function testSupabaseConnection() {
  console.log("🔄 Testing Supabase connection...");
  
  try {
    const { data, error } = await supabase
      .from('leads')
      .select('count', { count: 'exact', head: true });
    
    if (error) {
      console.error("❌ Supabase connection error:", error);
      return false;
    }
    
    console.log("✅ Supabase connection successful");
    return true;
  } catch (err) {
    console.error("❌ Network error:", err);
    return false;
  }
}

testSupabaseConnection();
