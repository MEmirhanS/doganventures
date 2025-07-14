import { createClient } from '@supabase/supabase-js';
import dotenv from 'dotenv';

// Load environment variables
dotenv.config();

// Debug environment variables
console.log("🔧 Environment Debug:");
console.log("Supabase URL:", process.env.VITE_SUPABASE_URL ? "✅ Set" : "❌ Missing");
console.log("Supabase Key:", process.env.VITE_SUPABASE_ANON_KEY ? "✅ Set" : "❌ Missing");

// Create Supabase client for Node.js
const supabase = createClient(
  process.env.VITE_SUPABASE_URL,
  process.env.VITE_SUPABASE_ANON_KEY
);

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
