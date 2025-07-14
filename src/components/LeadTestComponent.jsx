import { supabase } from "../lib/supabaseClient";

export default function LeadTest() {
  const testSupabase = async () => {
    try {
      console.log("🧪 Supabase test başlıyor...");
      
      const testData = {
        full_name: "Test User",
        email: "test@example.com",
        phone: "5551234567",
        company_name: "Test Company",
        sector: "Test Sector", 
        monthly_budget: "5000-10000",
        need_description: "Test description",
        utm_source: "test",
        utm_medium: "test",
        utm_campaign: "test",
        created_at: new Date().toISOString()
      };

      const { data, error } = await supabase
        .from("leads")
        .insert([testData])
        .select();

      if (error) {
        console.error("❌ Test hatası:", error);
        alert(`Test hatası: ${error.message}`);
      } else {
        console.log("✅ Test başarılı:", data);
        alert("✅ Supabase bağlantısı çalışıyor!");
      }
    } catch (err) {
      console.error("❌ Test exception:", err);
      alert(`Test exception: ${err.message}`);
    }
  };

  const testTelegram = async () => {
    try {
      console.log("📱 Telegram test başlıyor...");
      
      const { sendTelegramNotification } = await import("../lib/sendTelegramNotification");
      
      const testData = {
        full_name: "Test User Telegram",
        email: "telegram@test.com",
        phone: "5551234567",
        company_name: "Test Company TG",
        sector: "Test Sector TG",
        monthly_budget: "5000-10000", 
        need_description: "Telegram test message",
        utm_source: "telegram_test",
        utm_medium: "test_component",
        utm_campaign: "debug_test"
      };

      await sendTelegramNotification(testData);
      console.log("✅ Telegram test başarılı");
      alert("✅ Telegram bağlantısı çalışıyor!");
    } catch (err) {
      console.error("❌ Telegram test hatası:", err);
      alert(`Telegram test hatası: ${err.message}`);
    }
  };

  return (
    <div className="max-w-md mx-auto bg-gray-100 p-6 rounded-lg mt-8">
      <h3 className="text-lg font-bold mb-4">🧪 Lead Tracking Test</h3>
      
      <div className="space-y-3">
        <button
          onClick={testSupabase}
          className="w-full bg-green-600 text-white py-2 px-4 rounded hover:bg-green-700"
        >
          Test Supabase Connection
        </button>
        
        <button
          onClick={testTelegram}
          className="w-full bg-blue-600 text-white py-2 px-4 rounded hover:bg-blue-700"
        >
          Test Telegram Notification
        </button>
      </div>
      
      <p className="text-xs text-gray-600 mt-4">
        Console'ı açın (F12) ve test sonuçlarını görün
      </p>
    </div>
  );
}
