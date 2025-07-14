// lib/sendTelegramNotification.js

export async function sendTelegramNotification(formData) {
  const botToken = import.meta.env.VITE_TELEGRAM_BOT_TOKEN;
  const chatId = import.meta.env.VITE_TELEGRAM_CHAT_ID;

  console.log("📱 Telegram Debug:");
  console.log("Bot Token:", botToken ? "✅ Available" : "❌ Missing");
  console.log("Chat ID:", chatId ? "✅ Available" : "❌ Missing");

  if (!botToken || !chatId) {
    throw new Error("Telegram bot bilgileri eksik - ENV variables kontrolü gerekli");
  }

  const message = `
📩 Yeni Başvuru Geldi!
👤 Ad Soyad: ${formData.full_name}
📧 E-posta: ${formData.email}
📱 Telefon: ${formData.phone}
🏢 Şirket: ${formData.company_name || "-"}
🏷️ Sektör: ${formData.sector || "-"}
💰 Bütçe: ${formData.monthly_budget || "-"}
🔧 Hizmetler: ${
    formData.services && formData.services.length > 0
      ? formData.services.join(", ")
      : "-"
  }
📝 İhtiyaç: ${formData.need_description || "-"}
🔗 Kaynak: ${formData.utm_source || "-"} / ${formData.utm_medium || "-"} / ${
    formData.utm_campaign || "-"
  }
  `;

  const encodedMessage = encodeURIComponent(message);
  const telegramUrl = `https://api.telegram.org/bot${botToken}/sendMessage?chat_id=${chatId}&text=${encodedMessage}`;

  console.log("📤 Telegram API çağrısı yapılıyor...");
  
  try {
    const response = await fetch(telegramUrl, {
      method: "GET",
      mode: "cors",
      headers: {
        "Content-Type": "application/json",
      },
    });
    
    console.log("📡 Telegram response status:", response.status);
    console.log("📡 Telegram response ok:", response.ok);
    
    if (!response.ok) {
      throw new Error(`HTTP ${response.status}: ${response.statusText}`);
    }
    
    const result = await response.json();
    console.log("📨 Telegram response:", result);

    if (!result.ok) {
      throw new Error(`Telegram API Error: ${result.description || "Unknown error"}`);
    }
    
    console.log("✅ Telegram notification successfully sent");
    return result;
  } catch (fetchError) {
    console.error("❌ Telegram fetch error:", {
      message: fetchError.message,
      type: fetchError.constructor.name,
      stack: fetchError.stack
    });
    throw new Error(`Telegram iletişim hatası: ${fetchError.message}`);
  }
}
