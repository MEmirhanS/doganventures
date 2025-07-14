// Network debugging and fallback utilities
export class NetworkDebugger {
  static async testConnectivity() {
    const tests = [
      {
        name: "Basic HTTP",
        url: "https://httpbin.org/get",
        method: "GET"
      },
      {
        name: "Supabase API",
        url: "https://jdxhiwbdzudkrhknbbgq.supabase.co/rest/v1/",
        method: "GET",
        headers: {
          "apikey": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImpkeGhpd2JkenVka3Joa25iYmdxIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTE5NjczMTAsImV4cCI6MjA2NzU0MzMxMH0.HbWSpvwBDedksrDP3xrYTECJ3LaC5lTNkDRb-OaBmhI"
        }
      },
      {
        name: "Telegram API",
        url: "https://api.telegram.org/bot8176117792:AAHCOm0lWkGdHNgu5wGX9VB2Dr4PvGvhMzY/getMe",
        method: "GET"
      }
    ];

    const results = {};
    
    for (const test of tests) {
      try {
        console.log(`🔍 Testing ${test.name}...`);
        
        const response = await fetch(test.url, {
          method: test.method,
          headers: {
            ...test.headers,
            "Content-Type": "application/json"
          },
          mode: "cors"
        });
        
        results[test.name] = {
          success: true,
          status: response.status,
          statusText: response.statusText,
          ok: response.ok
        };
        
        console.log(`✅ ${test.name}: ${response.status} ${response.statusText}`);
      } catch (error) {
        results[test.name] = {
          success: false,
          error: error.message,
          type: error.constructor.name
        };
        
        console.error(`❌ ${test.name}: ${error.message}`);
      }
    }
    
    return results;
  }

  static async testSupabaseConnection(supabaseClient) {
    if (!supabaseClient) {
      return { success: false, error: "Supabase client not provided" };
    }

    try {
      console.log("🔗 Supabase connection test başlıyor...");
      
      // Test 1: Basic auth check
      const { data: userData, error: userError } = await supabaseClient.auth.getUser();
      console.log("👤 User test:", userError ? "❌ Error" : "✅ OK");
      
      // Test 2: Table query
      const { data, error, count } = await supabaseClient
        .from("leads")
        .select("*", { count: "exact", head: true });
        
      if (error) {
        console.error("❌ Table query error:", error);
        return { 
          success: false, 
          error: error.message,
          details: error.details,
          hint: error.hint 
        };
      }
      
      console.log(`✅ Supabase table test: ${count} records found`);
      return { success: true, count };
      
    } catch (err) {
      console.error("❌ Supabase test exception:", err);
      return { 
        success: false, 
        error: err.message,
        type: err.constructor.name 
      };
    }
  }

  static async testTelegramBot() {
    const botToken = import.meta.env.VITE_TELEGRAM_BOT_TOKEN;
    
    if (!botToken) {
      return { success: false, error: "Bot token not found" };
    }

    try {
      const response = await fetch(`https://api.telegram.org/bot${botToken}/getMe`, {
        method: "GET",
        mode: "cors"
      });
      
      if (!response.ok) {
        throw new Error(`HTTP ${response.status}`);
      }
      
      const result = await response.json();
      
      if (result.ok) {
        console.log("✅ Telegram bot active:", result.result.username);
        return { success: true, bot: result.result };
      } else {
        return { success: false, error: result.description };
      }
      
    } catch (err) {
      console.error("❌ Telegram test error:", err);
      return { success: false, error: err.message };
    }
  }
}

export default NetworkDebugger;
