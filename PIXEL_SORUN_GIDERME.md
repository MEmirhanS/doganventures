# 🚨 FACEBOOK PIXEL SORUN GİDERME REHBERİ

## 🔍 ANLİK PIXEL TEST KOMUTLARI

### 1️⃣ **HIZLI BROWSER TESTİ**

#### Console Testi (F12):
```javascript
// Pixel yüklü mü kontrol et
console.log("Pixel loaded:", typeof fbq !== 'undefined');

// Pixel ID kontrol et
console.log("Pixel ID:", fbq && fbq._pixelId);

// Manuel PageView test et
if (typeof fbq !== 'undefined') {
  fbq('track', 'PageView');
  console.log("✅ PageView test successful!");
} else {
  console.log("❌ Pixel not loaded!");
}
```

#### Network Testi:
```
F12 → Network → "facebook" filtresi
Görmeli:
✅ fbevents.js yükleniyor
✅ tr?id=1049814317342355 istekleri
```

### 2️⃣ **PIXELİ MANUEL YÜKLEMİE**

#### Console'da Çalıştır:
```javascript
// Pixel script'ini manuel yükle
const script = document.createElement('script');
script.src = 'https://connect.facebook.net/en_US/fbevents.js';
script.onload = function() {
  // Pixel'i başlat
  fbq('init', '1049814317342355');
  fbq('track', 'PageView');
  console.log('✅ Manuel pixel yükleme başarılı!');
};
document.head.appendChild(script);
```

### 3️⃣ **ADBLOCK KONTROLÜ**

#### AdBlock Test:
```javascript
// AdBlock kontrol et
const testAd = document.createElement('div');
testAd.className = 'adsbox';
testAd.style.position = 'absolute';
testAd.style.left = '-9999px';
document.body.appendChild(testAd);

const isBlocked = testAd.offsetHeight === 0;
document.body.removeChild(testAd);

console.log("AdBlock aktif:", isBlocked);
```

---

## 🔧 HIZLI DÜZELTİCİLER

### Çözüm 1: Script Loading Timeout Arttır
```javascript
// index.html'de timeout'u 5 saniyeye çıkar
setTimeout(function () {
  // Pixel verification kodu
}, 5000); // 3000'den 5000'e çıkar
```

### Çözüm 2: Alternative Loading Method
```javascript
// Eğer normal yöntem çalışmazsa
function loadPixelAlternative() {
  window.fbAsyncInit = function() {
    fbq('init', '1049814317342355');
    fbq('track', 'PageView');
    console.log('Alternative pixel loaded!');
  };
}
```

### Çözüm 3: CDN Değiştir
```javascript
// connect.facebook.net yerine farklı CDN dene
"https://www.facebook.com/tr/fbevents.js"
```

---

## 🎯 TEST SONUÇLARI

### ✅ BAŞARILI SİNYALLER:
```
Console'da:
✅ Facebook Pixel initialized successfully
🎯 Facebook Pixel loaded on production!
🔥 Pixel test successful!

Network'te:
✅ fbevents.js (200 OK)
✅ tr?id=1049814317342355 requests

Pixel Helper'da:
✅ 1 pixel found
✅ Active status
```

### ❌ SORUN SİNYALLERI:
```
Console'da:
❌ Facebook Pixel NOT loaded on production!
❌ Pixel initialization failed
⚠️ AdBlock detected

Network'te:
❌ fbevents.js (failed to load)
❌ No tracking requests

Pixel Helper'da:
❌ No pixels found
```

---

## 🚀 ACİL MÜDAHALE PLANI

### Adım 1: Browser Hazırlığı
- [ ] Tüm AdBlock'ları kapat
- [ ] Browser cache temizle (Cmd+Shift+R)
- [ ] Incognito mode'da test et

### Adım 2: Console Test
- [ ] F12 → Console aç
- [ ] `typeof fbq` yaz, "function" dönmeli
- [ ] `fbq('track', 'PageView')` yaz

### Adım 3: Network Test
- [ ] F12 → Network aç  
- [ ] "facebook" filtrele
- [ ] Sayfayı yenile
- [ ] fbevents.js yüklendiğini kontrol et

### Adım 4: Manuel Fix
- [ ] Console'da manuel pixel yükleme kodunu çalıştır
- [ ] Test et

---

## 📞 DESTEK BİLGİLERİ

### Meta Business Suite:
- business.facebook.com
- Events Manager → Data Sources → Pixels
- Pixel ID: `1049814317342355`

### Test Tools:
- Pixel Helper Chrome Extension
- Facebook Test Events Tool
- Meta Events Manager Real-time

**Yukarıdaki testleri sırayla yapın ve sonuçları paylaşın!** 🔧
