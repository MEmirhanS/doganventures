// Test Supabase connection in Node.js environment
import dotenv from 'dotenv';
import { createClient } from '@supabase/supabase-js';

// Load environment variables
dotenv.config();

const supabaseUrl = process.env.VITE_SUPABASE_URL;
const supabaseAnonKey = process.env.VITE_SUPABASE_ANON_KEY;

console.log("🔧 Environment Debug:");
console.log("Supabase URL:", supabaseUrl ? "✅ Set" : "❌ Missing");
console.log("Supabase Key:", supabaseAnonKey ? "✅ Set" : "❌ Missing");

if (!supabaseUrl || !supabaseAnonKey) {
  console.error("❌ Environment variables eksik!");
  process.exit(1);
}

const supabase = createClient(supabaseUrl, supabaseAnonKey);

// Test Supabase connection
async function testSupabaseConnection() {
  console.log("🔄 Testing Supabase connection...");
  
  try {
    const { data, error, count } = await supabase
      .from('leads')
      .select('count', { count: 'exact', head: true });
    
    if (error) {
      console.error("❌ Supabase connection error:", error);
      return false;
    }
    
    console.log("✅ Supabase connection successful!");
    console.log("📊 Total leads in database:", count);
    return true;
  } catch (err) {
    console.error("❌ Test failed:", err);
    return false;
  }
}

// Test table schema
async function testTableSchema() {
  console.log("🔄 Testing table schema...");
  
  try {
    const { data, error } = await supabase
      .from('leads')
      .select('*')
      .limit(1);
    
    if (error) {
      console.error("❌ Table schema error:", error);
      return false;
    }
    
    console.log("✅ Table schema is correct!");
    if (data && data.length > 0) {
      console.log("📋 Sample lead structure:", Object.keys(data[0]));
    }
    return true;
  } catch (err) {
    console.error("❌ Schema test failed:", err);
    return false;
  }
}

// Run tests
async function runTests() {
  console.log("🚀 Starting Supabase tests...\n");
  
  const connectionOk = await testSupabaseConnection();
  const schemaOk = await testTableSchema();
  
  console.log("\n📋 Test Results:");
  console.log("Connection:", connectionOk ? "✅ OK" : "❌ FAILED");
  console.log("Schema:", schemaOk ? "✅ OK" : "❌ FAILED");
  
  if (connectionOk && schemaOk) {
    console.log("\n🎉 All tests passed! Supabase is ready.");
  } else {
    console.log("\n🚨 Some tests failed. Check configuration.");
  }
}

runTests().catch(console.error);
