# 🔍 CHROME PIXEL TESTİ - ADIM ADIM

## 🎯 ŞİMDİ YAPILACAKLAR

### 1️⃣ **MEVCUT SİTE TESTİ**

#### Adım 1: Siteyi Aç

```
Chrome'da şu adresi aç:
https://doganventures.vercel.app
(veya yeni domain'iniz varsa onu)
```

#### Adım 2: Console Kontrol

```
F12 → Console sekmesi
Şu mesajları görüyor musunuz?

BEKLENTİ:
✅ 🔄 Facebook Pixel loading...
✅ 🌍 Environment: doganventures.vercel.app
✅ ✅ No AdBlock detected
✅ ✅ Facebook Pixel initialized successfully
✅ 🎯 Facebook Pixel loaded on production!
✅ 🔥 Pixel test successful!
```

#### Adım 3: Pixel Helper Kontrol

```
Chrome toolbar'da Pixel Helper icon'una tıklayın
Görmeli:
✅ 1 pixel found
✅ Pixel ID: 1049814317342355
✅ Status: Active
✅ Events: PageView
```

### 2️⃣ **MANUEL PIXEL TESTİ**

#### Console'da Test Komutları:

```javascript
// 1. Pixel yüklü mü?
console.log("Pixel loaded:", typeof fbq !== "undefined");

// 2. Pixel ID doğru mu?
console.log("Pixel available:", typeof fbq === "function");

// 3. Manuel event test
if (typeof fbq !== "undefined") {
  fbq("track", "PageView");
  console.log("✅ Manual PageView sent!");
} else {
  console.log("❌ Pixel not available!");
}
```

### 3️⃣ **NETWORK ANALİZİ**

#### Network Sekmesi:

```
F12 → Network → Filter: "facebook"
Sayfayı yenileyin (Cmd+R)

Görmeli:
✅ fbevents.js (Status: 200)
✅ tr?id=1049814317342355&ev=PageView (Status: 200)
```

### 4️⃣ **FORM TEST**

#### Lead Form Testi:

```
1. Sayfadaki forma tıklayın
2. Bilgileri doldurun
3. "Gönder" butonuna basın
4. Console'da görmeli:

✅ 🎯 Facebook Lead Pixel tetiklendi!
✅ 📝 Registration Complete eventi tetiklendi!
```

---

## 🚨 SORUN DURUMUNDA

### Eğer Console'da Hata Mesajları Görürseniz:

#### "Facebook Pixel NOT loaded" Hatası:

```javascript
// Console'da bu kodu çalıştırın:
const script = document.createElement("script");
script.src = "https://connect.facebook.net/en_US/fbevents.js";
script.onload = function () {
  fbq("init", "1049814317342355");
  fbq("track", "PageView");
  console.log("✅ Manuel fix başarılı!");
};
document.head.appendChild(script);
```

#### "CSP Policy" Hatası:

```
Bu Vercel ayar sorunu demektir
Environment variables kontrol edilmeli
```

#### "Script Loading Failed" Hatası:

```
İnternet bağlantısı veya Facebook server sorunu
5 dakika bekleyip tekrar deneyin
```

---

## 🎯 TEST SONUÇLARINIZI PAYLAŞIN

Lütfen şu bilgileri verin:

### Console Mesajları:

```
Hangi mesajları görüyorsunuz?
❌ Facebook Pixel NOT loaded
✅ Facebook Pixel initialized successfully
⚠️ Başka bir hata mesajı
```

### Pixel Helper Durumu:

```
🔴 No pixels found
🟡 1 pixel found but inactive
🟢 1 pixel found and active
```

### Network Durumu:

```
🔴 fbevents.js yüklenmiyor
🟡 fbevents.js yüklendi ama tracking request yok
🟢 Her şey normal yükleniyor
```

---

## ⚡ HIZLI ÇÖZÜMLER

### Çözüm 1: Cache Temizleme

```
Cmd+Shift+R (Hard refresh)
Veya
Settings → Privacy → Clear browsing data
```

### Çözüm 2: Incognito Test

```
Cmd+Shift+N (Incognito mode)
Siteyi incognito'da test edin
```

### Çözüm 3: Manual Pixel Load

```javascript
// Console'da çalıştırın
window.fbAsyncInit = function () {
  fbq("init", "1049814317342355");
  fbq("track", "PageView");
  console.log("Async pixel loaded!");
};
```

**Test sonuçlarınızı paylaşın, hemen çözelim! 🚀**
