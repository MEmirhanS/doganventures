import { useState } from "react";
import { supabase } from "../lib/supabaseClient";
import { sendTelegramNotification } from "../lib/sendTelegramNotification";

export default function TestLeadForm() {
  const [formData, setFormData] = useState({
    full_name: "Test Kullanıcı",
    email: "test@example.com",
    phone: "5551234567",
    company_name: "Test Şirketi",
    sector: "Test Sektör",
    monthly_budget: "0-5000",
    need_description: "Test ihtiyacı",
    services: ["Pazarlama Stratejisi", "Operasyonel Verimlilik"],
    utm_source: "test_form",
    utm_medium: "test_environment",
    utm_campaign: "telegram_test",
  });
  const [result, setResult] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    setResult("Gönderiliyor...");
    try {
      const payload = { ...formData, created_at: new Date().toISOString() };

      const { data, error } = await supabase
        .from("leads")
        .insert([payload])
        .select();
      if (error) {
        setResult("Supabase Hatası: " + error.message);
        return;
      }
      setResult("Supabase'e kaydedildi!");
      try {
        await sendTelegramNotification(payload);
        setResult((r) => r + " Telegram gönderildi!");
      } catch (err) {
        setResult((r) => r + " Telegram hatası: " + err.message);
      }
    } catch (err) {
      setResult("Genel Hata: " + err.message);
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      style={{
        maxWidth: 400,
        margin: "2rem auto",
        padding: 24,
        background: "#fff",
        borderRadius: 12,
        boxShadow: "0 2px 12px #0001",
      }}
    >
      <h3>Test Lead Form</h3>
      <button
        type="submit"
        style={{
          padding: 12,
          background: "#0070f3",
          color: "#fff",
          border: 0,
          borderRadius: 6,
          width: "100%",
          fontWeight: 600,
        }}
      >
        Test Başvuru Gönder
      </button>
      {result && (
        <div
          style={{
            marginTop: 16,
            color: result.includes("Hata") ? "#c00" : "#090",
          }}
        >
          {result}
        </div>
      )}
    </form>
  );
}
