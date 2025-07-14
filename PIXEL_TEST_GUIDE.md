# 🧪 FACEBOOK PIXEL TEST REHBERİ

## Deploy sonrası bu adımları takip et:

### 1️⃣ BROWSER HAZIRLIĞI (2 dakika)

- [ ] **Chrome** browser aç
- [ ] **Tüm AdBlock'ları kapat** (uBlock Origin, AdBlock Plus vb.)
- [ ] **VPN kapatılacak** (varsa)
- [ ] **Facebook Pixel Helper** extension yükle:
  - Chrome Web Store → "Facebook Pixel Helper" ara → Yükle

### 2️⃣ VERCEL URL TESTİ (5 dakika)

- [ ] Vercel deploy sonrası URL'i aç (örn: `doganventures.vercel.app`)
- [ ] **F12** → **Console** sekmesi aç
- [ ] **Bu mesajları kontrol et:**
  ```
  🔄 Facebook Pixel loading...
  🌍 Environment: doganventures.vercel.app
  ✅ No AdBlock detected
  ✅ Facebook Pixel initialized successfully
  🎯 Facebook Pixel loaded on production!
  🔥 Pixel test successful!
  ```

### 3️⃣ NETWORK KONTROLÜ (3 dakika)

- [ ] **F12** → **Network** sekmesi
- [ ] **Filter:** "facebook" yaz
- [ ] **Görmeli:**
  - `fbevents.js` script yükleniyor
  - `tr?id=1049814317342355` tracking request'leri

### 4️⃣ PIXEL HELPER KONTROLÜ (2 dakika)

- [ ] **Pixel Helper icon'una tıkla** (Chrome toolbar'da)
- [ ] **Görmeli:**
  - ✅ "1 pixel found"
  - ✅ Pixel ID: `1049814317342355`
  - ✅ Status: "Active"
  - ✅ Events: "PageView"

### 5️⃣ LEAD FORM TESTİ (5 dakika)

- [ ] Website'de **lead formunu bul**
- [ ] **Test verilerini gir:**
  ```
  Ad Soyad: Test Kullanıcı
  E-posta: test@example.com
  Telefon: 555-123-4567
  Şirket: Test Şirketi
  Sektör: Test Sektör
  Bütçe: 0-5.000 TL
  İhtiyaç: Test lead formu
  ```
- [ ] **"Gönder"** butonuna bas
- [ ] **Console'da kontrol et:**
  ```
  🎯 Facebook Lead Pixel tetiklendi!
  📝 Registration Complete eventi tetiklendi!
  ```

### 6️⃣ CTA BUTON TESTİ (3 dakika)

- [ ] **"Ücretsiz Analiz Al"** butonuna tıkla
- [ ] **"Strateji Analizi Al"** butonuna tıkla
- [ ] **Console'da kontrol et:**
  ```
  🎯 Lead Intent tracked for: [Buton Adı]
  ```

### 7️⃣ META EVENTS MANAGER KONTROLÜ (10 dakika)

- [ ] **business.facebook.com** → Events Manager
- [ ] **Data Sources** → **Pixels** → Pixel ID seç
- [ ] **Test Events** sekmesi
- [ ] **Website URL'ini gir** (Vercel URL)
- [ ] **"Test"** butonuna bas
- [ ] **Canlı eventleri kontrol et:**
  - PageView events ✅
  - Lead events ✅
  - InitiateCheckout events ✅

---

## 🚨 SORUN GİDERME:

### Pixel Helper "No pixels found" diyor:

- AdBlock'ları kapat
- Sayfayı yenile (Cmd+R)
- Incognito mode'da test et

### Console'da hata mesajları:

- CSP policy hatası → Vercel settings kontrol et
- Script loading hatası → Network connectivity kontrol et

### Meta Events Manager'da event yok:

- 5-10 dakika bekle (delay olabilir)
- Pixel Helper'da events göründüğünü kontrol et
- Domain verification gerekebilir

---

## ✅ BAŞARILI TEST SİNYALLERİ:

### Console Mesajları:

```
✅ Facebook Pixel initialized successfully
🎯 Facebook Pixel loaded on production!
🔥 Pixel test successful!
🎯 Facebook Lead Pixel tetiklendi!
```

### Pixel Helper:

- ✅ 1 pixel found
- ✅ Active status
- ✅ Events triggering

### Meta Events Manager:

- ✅ Real-time events
- ✅ PageView, Lead, InitiateCheckout
- ✅ Event details visible

**Tüm testler geçerse Facebook Pixel %100 çalışıyor demektir!** 🚀
