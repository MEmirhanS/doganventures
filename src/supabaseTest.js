import { supabase } from "./lib/supabaseClient";

// Önce mevcut tablo yapısını kontrol edelim
console.log("Mevcut leads tablosunu kontrol ediyorum...");

supabase
  .from("leads")
  .select("*")
  .limit(1)
  .then(({ data, error }) => {
    if (error) {
      console.error("❌ Tablo kontrol hatası:", error);
    } else {
      console.log("✅ Mevcut tablo yapısı:", data);
      if (data && data.length > 0) {
        console.log("Mevcut kolonlar:", Object.keys(data[0]));
      }
    }
  });
