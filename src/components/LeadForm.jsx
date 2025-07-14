import { useState, useEffect } from "react";
import { supabase } from "../lib/supabaseClient";
import { sendTelegramNotification } from "../lib/sendTelegramNotification";

export default function LeadForm() {
  const initialFormState = {
    full_name: "",
    email: "",
    phone: "",
    company_name: "",
    sector: "",
    monthly_budget: "",
    need_description: "",
    services: [],
    utm_source: "",
    utm_medium: "",
    utm_campaign: "",
  };

  const [formData, setFormData] = useState(initialFormState);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState(null);

  useEffect(() => {
    const urlParams = new URLSearchParams(window.location.search);
    setFormData((prev) => ({
      ...prev,
      utm_source: urlParams.get("utm_source") || "doganventures_website",
      utm_medium: urlParams.get("utm_medium") || "website_form",
      utm_campaign: urlParams.get("utm_campaign") || "lead_form",
    }));
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const resetForm = () => {
    setFormData(initialFormState);
    setSubmitError(null);
    setIsSubmitting(false);
  };

  const validateForm = (data) => {
    if (!data.full_name.trim()) throw new Error("Ad Soyad alanı zorunludur");
    if (!data.email.trim()) throw new Error("E-posta alanı zorunludur");
    if (!data.phone.trim()) throw new Error("Telefon alanı zorunludur");

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(data.email)) {
      throw new Error("Geçerli bir e-posta adresi giriniz");
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    setSubmitError(null);

    try {
      validateForm(formData);

      const payload = {
        ...formData,
        created_at: new Date().toISOString(),
      };

      const { data, error } = await supabase
        .from("leads")
        .insert([payload])
        .select();

      if (error) {
        console.error("❌ Supabase hatası:", error);
        throw new Error(error.message);
      }

      console.log("✅ Supabase'e kaydedildi:", data);

      // Facebook Pixel Lead Event - Potansiyel Müşteri Avlama
      if (typeof fbq !== 'undefined') {
        fbq('track', 'Lead', {
          content_name: 'DOGANVENTURES Premium Consultation Lead',
          content_category: 'Business Consultation',
          value: 1000,
          currency: 'TRY',
          predicted_ltv: 10000, // Müşteri yaşam boyu değeri
          // Lead kalitesi için ekstra parametreler
          custom_data: {
            monthly_budget: payload.monthly_budget,
            company_name: payload.company_name,
            sector: payload.sector,
            lead_source: payload.utm_source || 'doganventures_website'
          }
        });
        
        // Konsol'a başarılı pixel tetikleme mesajı
        console.log('🎯 Facebook Lead Pixel tetiklendi - Potansiyel müşteri kaydedildi!');
        
        // Ek olarak CompleteRegistration eventi - daha iyi optimizasyon için
        fbq('track', 'CompleteRegistration', {
          content_name: 'DOGANVENTURES Lead Registration Complete',
          value: 1000,
          currency: 'TRY'
        });
        
        console.log('📝 Registration Complete eventi tetiklendi!');
      } else {
        console.warn('⚠️ Facebook Pixel bulunamadı - Lead tracking çalışmıyor!');
        console.log('🔧 Alternative tracking method için manual request gönderiliyor...');
        
        // Alternative method - direct fetch to Facebook
        try {
          fetch(`https://www.facebook.com/tr?id=1049814317342355&ev=Lead&noscript=1&cd[content_name]=DOGANVENTURES Lead Form&cd[value]=1000&cd[currency]=TRY`, {
            method: 'GET',
            mode: 'no-cors'
          });
          console.log('📊 Alternative Facebook tracking sent');
        } catch (altError) {
          console.warn('⚠️ Alternative tracking de çalışmadı:', altError);
        }
      }

      try {
        await sendTelegramNotification(payload);
        console.log("✅ Telegram bildirimi gönderildi");
      } catch (telegramErr) {
        console.warn("⚠️ Telegram bildirimi gönderilemedi:", telegramErr);
      }

      alert("✅ Başvurunuz başarıyla alındı!");
      resetForm();
    } catch (err) {
      console.error("❌ Hata:", err);
      setSubmitError(err.message);
      alert(`Hata: ${err.message}`);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="max-w-xl mx-auto bg-white p-8 rounded-lg shadow space-y-4"
    >
      {submitError && (
        <div className="bg-red-100 text-red-700 p-3 border-l-4 border-red-500">
          {submitError}
        </div>
      )}

      <input
        type="text"
        name="full_name"
        placeholder="Ad Soyad *"
        value={formData.full_name}
        onChange={handleChange}
        required
        className="w-full p-3 border rounded"
        disabled={isSubmitting}
      />

      <input
        type="email"
        name="email"
        placeholder="E-posta *"
        value={formData.email}
        onChange={handleChange}
        required
        className="w-full p-3 border rounded"
        disabled={isSubmitting}
      />

      <input
        type="tel"
        name="phone"
        placeholder="Telefon *"
        value={formData.phone}
        onChange={handleChange}
        required
        className="w-full p-3 border rounded"
        disabled={isSubmitting}
      />

      <input
        type="text"
        name="company_name"
        placeholder="Şirket Adı"
        value={formData.company_name}
        onChange={handleChange}
        className="w-full p-3 border rounded"
        disabled={isSubmitting}
      />

      <input
        type="text"
        name="sector"
        placeholder="Sektör"
        value={formData.sector}
        onChange={handleChange}
        className="w-full p-3 border rounded"
        disabled={isSubmitting}
      />

      <select
        name="monthly_budget"
        value={formData.monthly_budget}
        onChange={handleChange}
        className="w-full p-3 border rounded"
        disabled={isSubmitting}
      >
        <option value="">Aylık Reklam Bütçesi Seçin</option>
        <option value="0-5000">0-5.000 TL</option>
        <option value="5000-10000">5.000-10.000 TL</option>
        <option value="10000-25000">10.000-25.000 TL</option>
        <option value="25000+">25.000+ TL</option>
      </select>

      <textarea
        name="need_description"
        placeholder="İhtiyacınız / Talebiniz"
        value={formData.need_description}
        onChange={handleChange}
        rows="4"
        className="w-full p-3 border rounded"
        disabled={isSubmitting}
      />

      <button
        type="submit"
        disabled={isSubmitting}
        className={`w-full p-3 font-semibold text-white rounded ${
          isSubmitting ? "bg-blue-400" : "bg-blue-600 hover:bg-blue-700"
        }`}
      >
        {isSubmitting ? "Gönderiliyor..." : "Gönder"}
      </button>
      <button
        type="button"
        onClick={async () => {
          // Test başvurusu gönder
          const testData = {
            full_name: "Test Kullanıcı",
            email: "test@example.com",
            phone: "5551234567",
            company_name: "Test Şirketi",
            sector: "Test Sektör",
            monthly_budget: "0-5000",
            need_description: "Test ihtiyacı",
            services: ["Dijital Pazarlama", "İş Geliştirme & Satış"],
            utm_source: "test_form",
            utm_medium: "test_environment",
            utm_campaign: "telegram_test",
            created_at: new Date().toISOString(),
          };
          setIsSubmitting(true);
          setSubmitError(null);
          try {
            const { data, error } = await supabase
              .from("leads")
              .insert([testData])
              .select();
            if (error) throw new Error(error.message);
            await sendTelegramNotification(testData);
            alert("✅ Test başvurusu başarıyla gönderildi!");
          } catch (err) {
            setSubmitError(err.message);
            alert(`Test Hatası: ${err.message}`);
          } finally {
            setIsSubmitting(false);
          }
        }}
        className="w-full p-3 font-semibold text-white rounded bg-green-600 hover:bg-green-700 mt-2"
        disabled={isSubmitting}
      >
        Test Başvuru Gönder
      </button>
    </form>
  );
}
