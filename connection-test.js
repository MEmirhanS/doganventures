// Test file to check Supabase connection
import { supabase } from './src/lib/supabaseClient.js';

async function testSupabaseConnection() {
  try {
    console.log('🔄 Testing Supabase connection...');
    
    // Test basic connection
    const { data, error } = await supabase
      .from('leads')
      .select('count', { count: 'exact', head: true });
    
    if (error) {
      console.error('❌ Supabase connection error:', error);
      return false;
    }
    
    console.log('✅ Supabase connection successful');
    return true;
  } catch (err) {
    console.error('❌ Network error:', err);
    return false;
  }
}

// Test Telegram API
async function testTelegramAPI() {
  try {
    console.log('🔄 Testing Telegram API...');
    
    const botToken = import.meta.env.VITE_TELEGRAM_BOT_TOKEN;
    const url = `https://api.telegram.org/bot${botToken}/getMe`;
    
    const response = await fetch(url);
    const result = await response.json();
    
    if (result.ok) {
      console.log('✅ Telegram API connection successful');
      return true;
    } else {
      console.error('❌ Telegram API error:', result);
      return false;
    }
  } catch (err) {
    console.error('❌ Telegram API network error:', err);
    return false;
  }
}

// Run tests
async function runTests() {
  console.log('🧪 Starting connection tests...');
  
  const supabaseResult = await testSupabaseConnection();
  const telegramResult = await testTelegramAPI();
  
  console.log('\n📊 Test Results:');
  console.log(`Supabase: ${supabaseResult ? '✅' : '❌'}`);
  console.log(`Telegram: ${telegramResult ? '✅' : '❌'}`);
  
  if (supabaseResult && telegramResult) {
    console.log('🎉 All connections working!');
  } else {
    console.log('⚠️ Some connections failed');
  }
}

// Only run if in browser environment
if (typeof window !== 'undefined') {
  runTests();
}
