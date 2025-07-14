# 🚀 VERCEL DEPLOYMENT REHBERİ

## ✅ **GITHUB PUSH TAMAMLANDI!**

**Repository:** https://github.com/MEmirhanS/doganventures
**Son Commit:** Marquee optimizasyonu tamamlandı - Vercel deploy hazır

---

## 📋 **VERCEL DEPLOYMENT ADIMLARI:**

### **1️⃣ Vercel'e Giriş Yap:**
- **Website:** https://vercel.com
- **GitHub ile giriş yap** butonuna tık

### **2️⃣ Yeni Proje Oluştur:**
- **"Add New"** → **"Project"** seç
- **"Import Git Repository"** bölümünde
- **"MEmirhanS/doganventures"** repository'sini bul
- **"Import"** butonuna tık

### **3️⃣ Proje Ayarları:**
```
Framework Preset: Vite
Build Command: npm run build
Output Directory: dist
Install Command: npm install
```

### **4️⃣ Environment Variables Ekle:**
Deploy etmeden önce **"Environment Variables"** bölümünde şunları ekle:

```
VITE_SUPABASE_URL = https://jdxhiwbdzudkrhknbbgq.supabase.co
VITE_SUPABASE_ANON_KEY = eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImpkeGhpd2JkenVka3Joa25iYmdxIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTE5NjczMTAsImV4cCI6MjA2NzU0MzMxMH0.HbWSpvwBDedksrDP3xrYTECJ3LaC5lTNkDRb-OaBmhI
VITE_TELEGRAM_BOT_TOKEN = 8176117792:AAHCOm0lWkGdHNgu5wGX9VB2Dr4PvGvhMzY
VITE_TELEGRAM_CHAT_ID = -1002852578955
```

### **5️⃣ Deploy:**
- **"Deploy"** butonuna bas
- 2-3 dakika bekle ⏱️

---

## 🎯 **DEPLOYMENT SONRASI TEST:**

### **🔍 Vercel URL'i Al:**
Deploy tamamlandıktan sonra:
- **URL örneği:** `https://doganventures-xyz123.vercel.app`

### **📊 Test Checklist:**

#### ✅ **Genel Site Testi:**
- [ ] Ana sayfa açılıyor
- [ ] Marquee logoları akıyor (60s animasyon)
- [ ] Formlar çalışıyor
- [ ] Responsive tasarım OK

#### ✅ **Facebook Pixel Testi:**
- [ ] F12 → Console aç
- [ ] Bu mesajları gör:
  ```
  🔄 Facebook Pixel loading...
  ✅ Facebook Pixel initialized successfully
  🎯 Facebook Pixel loaded on production!
  ```

#### ✅ **Lead Form Testi:**
- [ ] Forma test bilgileri gir
- [ ] "Gönder" butonuna bas
- [ ] Console'da pixel events'leri gör:
  ```
  🎯 Facebook Lead Pixel tetiklendi!
  📝 Registration Complete eventi tetiklendi!
  ```

#### ✅ **Facebook Events Manager Testi:**
- [ ] https://business.facebook.com → Events Manager
- [ ] Test Events → Vercel URL'ini gir
- [ ] Canlı events'leri gözlemle

---

## 🎉 **BAŞARILI DEPLOYMENT SİNYALLERİ:**

### **GitHub ✅:**
- [x] Repository: https://github.com/MEmirhanS/doganventures
- [x] Son push: 30 objects uploaded
- [x] Marquee optimizasyonu active

### **Vercel ✅:**
- [ ] Deploy successful
- [ ] URL active
- [ ] Facebook Pixel working
- [ ] Forms functional

---

### **🚨 SORUN ÇÖZME:**

### **Supabase "not defined" Error:**
```bash
# Vercel'de Environment Variables kontrol et:
Settings → Environment Variables → şunları ekle:
VITE_SUPABASE_URL
VITE_SUPABASE_ANON_KEY
VITE_TELEGRAM_BOT_TOKEN
VITE_TELEGRAM_CHAT_ID
```

### **Build Error Alırsan:**
```bash
# Yerel test yap
cd /Users/yunusemredogan/Desktop/doganventures
npm run build
```

### **Pixel Çalışmıyorsa:**
- Vercel'de Environment Variables bölümünü kontrol et
- Facebook App ID doğru olmalı

### **404 Error:**
- Vercel'de "Functions and Middleware" → "Rewrites" kontrol et
- SPA routing için `/*` → `/index.html` rewrite olmalı

---

## 🎯 **SONRAKI ADIMLAR:**

1. **URL'i al** (örn: doganventures-xyz.vercel.app)
2. **Custom domain bağla** (isteğe bağlı)
3. **Facebook Pixel'i test et**
4. **Analytics ekle** (Google Analytics vb.)
5. **SEO optimizasyonu**

---

**🚀 VERCEL'E GİT VE DEPLOY ET:** https://vercel.com
