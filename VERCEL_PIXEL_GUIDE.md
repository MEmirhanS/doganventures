# 🌍 VERCEL DOMAIN VERIFICATION GUIDE

## Meta Business Manager'da Domain Verification

### 1️⃣ Meta Business Suite'e Git

- business.facebook.com
- Events Manager → Data Sources → Pixels

### 2️⃣ Pixel Settings

- Pixel ID: `1049814317342355` seç
- Settings → Domains sekmesi

### 3️⃣ Domain Ekle

```
Vercel URL'ini ekle:
- https://your-project.vercel.app
- https://doganventures.vercel.app (senin domain'in)
```

### 4️⃣ Verification Methods

**Seçenek 1: Meta Tag (ÖNERİLEN)**

```html
<meta name="facebook-domain-verification" content="VERIFICATION_CODE" />
```

**Seçenek 2: DNS TXT Record**

```
facebook-domain-verification=VERIFICATION_CODE
```

**Seçenek 3: HTML File Upload**

- Vercel'e upload etmen gereken dosya

---

## 🚨 ÖNEMLİ NOTLAR:

### Vercel Domain Patterns:

- `your-project.vercel.app`
- `your-project-git-main-username.vercel.app`
- Custom domain varsa onu da ekle

### Verification Süreci:

- Domain eklendikten sonra 24-48 saat bekle
- Status: "Verified" olmalı
- Test Events'te canlı data gelmeye başlayacak

---

## 🔍 TROUBLESHOOTING:

### Domain Status: "Pending"

- Meta tag doğru eklendi mi kontrol et
- Vercel'de yeni deploy yap
- 24 saat bekle

### Domain Status: "Failed"

- Meta tag kodunu kontrol et
- Cache clear yap
- Hard refresh (Ctrl+F5)

### Test Events Çalışmıyor

- Pixel Helper extension kullan
- AdBlock kapat
- Incognito mode'da test et
