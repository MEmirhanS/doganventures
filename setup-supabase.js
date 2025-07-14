import { createClient } from '@supabase/supabase-js';
import dotenv from 'dotenv';
import fs from 'fs';

// Load environment variables
dotenv.config();

const supabase = createClient(
  process.env.VITE_SUPABASE_URL,
  process.env.VITE_SUPABASE_ANON_KEY
);

async function setupSupabaseSchema() {
  console.log("🔄 Setting up Supabase schema...");
  
  try {
    // First, check if leads table exists
    console.log("📋 Checking if leads table exists...");
    const { data, error } = await supabase
      .from('leads')
      .select('count', { count: 'exact', head: true });
    
    if (error && error.code === 'PGRST116') {
      console.log("❌ Leads table doesn't exist. Need to create it.");
      console.log("📝 Please run the following SQL in your Supabase SQL Editor:");
      console.log("=" .repeat(50));
      
      // Read and display the schema
      const schema = fs.readFileSync('./supabase-schema.sql', 'utf8');
      console.log(schema);
      console.log("=" .repeat(50));
      console.log("🔗 Supabase SQL Editor: https://supabase.com/dashboard/project/jdxhiwbdzudkrhknbbgq/sql");
      
    } else if (error) {
      console.error("❌ Unexpected error:", error);
    } else {
      console.log("✅ Leads table exists and is accessible!");
      console.log(`📊 Current record count: ${data?.length || 0}`);
      
      // Test insert
      console.log("🧪 Testing insert operation...");
      const testData = {
        full_name: "Test User",
        email: "test@example.com",
        phone: "+90 555 123 4567",
        company_name: "Test Company",
        sector: "Test Sector",
        monthly_budget: "10,000-25,000 TL",
        need_description: "Test need description",
        services: ["Digital Marketing", "Web Development"],
        utm_source: "test",
        utm_medium: "test",
        utm_campaign: "test"
      };
      
      const { data: insertData, error: insertError } = await supabase
        .from('leads')
        .insert([testData])
        .select();
      
      if (insertError) {
        console.error("❌ Insert test failed:", insertError);
      } else {
        console.log("✅ Insert test successful!");
        console.log("📄 Inserted data:", insertData);
        
        // Clean up test data
        if (insertData && insertData[0]) {
          await supabase
            .from('leads')
            .delete()
            .eq('id', insertData[0].id);
          console.log("🗑️ Test data cleaned up.");
        }
      }
    }
    
  } catch (error) {
    console.error("❌ Setup failed:", error);
  }
}

setupSupabaseSchema();
