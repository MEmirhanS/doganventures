// lib/sendTelegramNotification.js

export async function sendTelegramNotification(formData) {
  const botToken = import.meta.env.VITE_TELEGRAM_BOT_TOKEN;
  const chatId = import.meta.env.VITE_TELEGRAM_CHAT_ID;

  console.log("🔧 Telegram Config Check:");
  console.log("Bot Token exists:", !!botToken);
  console.log("Chat ID exists:", !!chatId);

  if (!botToken || !chatId) {
    console.error("❌ Telegram yapılandırma hatası - Bot token veya chat ID eksik");
    throw new Error("Telegram yapılandırma hatası - Lütfen tekrar deneyin");
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

  console.log("📡 Telegram URL oluşturuldu");

  try {
    // AbortController ile timeout ekle
    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), 15000); // 15 saniye timeout

    const response = await fetch(telegramUrl, {
      method: 'GET',
      signal: controller.signal,
      headers: {
        'User-Agent': 'DoganVentures-Lead-System/1.0'
      }
    });

    clearTimeout(timeoutId);

    console.log("📡 Telegram API response status:", response.status);

    if (!response.ok) {
      throw new Error(`HTTP Error: ${response.status} - ${response.statusText}`);
    }

    const result = await response.json();
    console.log("📡 Telegram API response:", result);

    if (!result.ok) {
      throw new Error(`Telegram API Error: ${result.description || 'Bilinmeyen hata'}`);
    }

    console.log("✅ Telegram bildirimi başarıyla gönderildi");
    return result;

  } catch (error) {
    console.error("❌ Telegram notification error:", error);
    
    if (error.name === 'AbortError') {
      throw new Error("Telegram bildirimi zaman aşımına uğradı - Lütfen tekrar deneyin");
    } else if (error.message.includes('Failed to fetch') || error.name === 'TypeError') {
      throw new Error("İnternet bağlantısı sorunu - Telegram bildirimi gönderilemedi");
    } else {
      throw new Error(`Telegram bildirimi hatası: ${error.message}`);
    }
  }
}
