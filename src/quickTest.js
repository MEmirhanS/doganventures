// Simplified test without table dependency
console.log("🔧 Testing APIs without table dependency...");

// Test 1: Telegram API
async function testTelegramOnly() {
  console.log("📱 Testing Telegram API...");
  
  const botToken = import.meta.env.VITE_TELEGRAM_BOT_TOKEN;
  const chatId = import.meta.env.VITE_TELEGRAM_CHAT_ID;
  
  if (!botToken || !chatId) {
    console.error("❌ Telegram credentials missing");
    return false;
  }
  
  try {
    const testMessage = "🧪 Test message from DoganVentures - " + new Date().toLocaleString();
    const telegramUrl = `https://api.telegram.org/bot${botToken}/sendMessage?chat_id=${chatId}&text=${encodeURIComponent(testMessage)}`;
    
    const response = await fetch(telegramUrl);
    const result = await response.json();
    
    if (result.ok) {
      console.log("✅ Telegram API working!");
      return true;
    } else {
      console.error("❌ Telegram API error:", result);
      return false;
    }
  } catch (err) {
    console.error("❌ Telegram network error:", err);
    return false;
  }
}

// Test 2: Environment Variables
function testEnvironment() {
  console.log("🔧 Checking environment variables...");
  
  const checks = {
    supabaseUrl: !!import.meta.env.VITE_SUPABASE_URL,
    supabaseKey: !!import.meta.env.VITE_SUPABASE_ANON_KEY,
    telegramToken: !!import.meta.env.VITE_TELEGRAM_BOT_TOKEN,
    telegramChat: !!import.meta.env.VITE_TELEGRAM_CHAT_ID
  };
  
  console.log("Environment check:", checks);
  
  const allPresent = Object.values(checks).every(Boolean);
  console.log(allPresent ? "✅ All env vars present" : "❌ Missing env vars");
  
  return allPresent;
}

// Run tests
testEnvironment();
testTelegramOnly();

console.log("🎯 Quick fix test completed. Check console for results.");
