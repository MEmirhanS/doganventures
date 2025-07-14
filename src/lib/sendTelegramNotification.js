// lib/sendTelegramNotification.js

export async function sendTelegramNotification(formData) {
  const botToken = import.meta.env.VITE_TELEGRAM_BOT_TOKEN;
  const chatId = import.meta.env.VITE_TELEGRAM_CHAT_ID;

  if (!botToken || !chatId) {
    throw new Error("Telegram bot bilgileri eksik");
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

  try {
    const response = await fetch(telegramUrl);
    const result = await response.json();

    if (!result.ok) {
      throw new Error(`Telegram bildirimi başarısız: ${result.description}`);
    }
    
    console.log("✅ Telegram bildirimi başarıyla gönderildi");
    return result;
  } catch (error) {
    if (error.message.includes('Failed to fetch') || error.name === 'TypeError') {
      console.error("🌐 Network hatası - Telegram bildirimi gönderilemedi:", error.message);
      throw new Error("İnternet bağlantısı sorunu - Telegram bildirimi gönderilemedi");
    } else {
      console.error("❌ Telegram bildirimi hatası:", error);
      throw error;
    }
  }
}
