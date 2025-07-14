# ✅ VERCEL DEPLOYMENT CHECKLİST

## 📦 Upload Edilecek Dosyalar:

```
dist/ klasörünün TÜM içeriği
vercel.json dosyası
VERCEL_PIXEL_GUIDE.md dosyası (referans için)
```

## 🔍 Deployment Sonrası Test Sırası:

### 1️⃣ BROWSER HAZIRLIĞI

- [ ] Chrome browser aç
- [ ] Facebook Pixel Helper extension yükle
- [ ] Tüm AdBlock'ları KAPAT
- [ ] Incognito mode'da test et

### 2️⃣ VERCEL URL TESTİ

- [ ] Vercel URL'ini aç (örn: doganventures.vercel.app)
- [ ] F12 → Console aç
- [ ] Bu mesajları kontrol et:
  ```
  🔄 Facebook Pixel loading...
  🌍 Environment: your-domain.vercel.app
  ✅ No AdBlock detected
  ✅ Facebook Pixel initialized successfully
  🎯 Facebook Pixel loaded on production!
  🔥 Pixel test successful!
  ```

### 3️⃣ PIXEL HELPER KONTROLÜ

- [ ] Pixel Helper icon'una tıkla
- [ ] "1 pixel found" görmeli
- [ ] Pixel ID: 1049814317342355
- [ ] Status: "Active"

### 4️⃣ FORM TESTİ

- [ ] Forma bilgi gir ve gönder
- [ ] Console'da lead tracking mesajlarını gör:
  ```
  🎯 Facebook Lead Pixel tetiklendi!
  📝 Registration Complete eventi tetiklendi!
  ```

### 5️⃣ META EVENTS MANAGER KONTROLÜ

- [ ] business.facebook.com → Events Manager
- [ ] Test Events sekmesi
- [ ] URL'ni gir ve "Test" butonuna bas
- [ ] Canlı pixel eventlerini gör

---

## 🚨 SORUN GİDERME:

### AdBlock Detected Mesajı:

```
🚫 AdBlock detected - Pixel may be blocked
```

➜ **Çözüm:** Tüm extension'ları kapat, incognito'da test et

### Pixel Yüklenmedi:

```
⚠️ Facebook Pixel NOT loaded on production!
🔧 Trying alternative loading method...
```

➜ **Çözüm:** Domain verification yap, 24 saat bekle

### Alternative Loading Mesajı:

```
📦 Alternative pixel script loaded
```

➜ **Durum:** Normal, backup sistem çalışıyor

---

## 📊 BAŞARILI DEPLOYMENT SINYALI:

### Console'da görmeli:

```
✅ Facebook Pixel initialized successfully
🎯 Facebook Pixel loaded on production!
🔥 Pixel test successful!
🎯 Facebook Lead Pixel tetiklendi!
```

### Meta Events Manager'da görmeli:

- PageView events
- Lead events
- InitiateCheckout events
- CompleteRegistration events

---

## 🎯 SONRAKI ADIM: DOMAIN VERIFICATION

Meta Business Manager'da domain verification yap:

1. Events Manager → Pixels → Settings → Domains
2. Vercel URL'ini ekle
3. Meta tag'i index.html'e ekle (rehber VERCEL_PIXEL_GUIDE.md'de)
4. 24-48 saat bekle

**Domain verification tamamlanınca pixel %100 stabil çalışacak!** 🚀
