# 🌐 VERCEL DOMAIN YÖNLENDİRME REHBERİ

## 🎯 HEDEF: doganventures.vercel.app → www.doganventures.net

### 1️⃣ **VERCEL DASHBOARD'DA DOMAIN EKLEME**

#### Adım 1: Vercel'e Login
```
1. vercel.com → Login
2. doganventures projesini seç
3. Settings → Domains sekmesine git
```

#### Adım 2: Domain Ekle
```
Domain alanına yaz: doganventures.net
Add butonuna bas

Sonra:
Domain alanına yaz: www.doganventures.net
Add butonuna bas
```

#### Adım 3: DNS Kayıtları Al
Vercel size şu bilgileri verecek:
```
doganventures.net için:
Type: A
Name: @
Value: 76.76.19.61

www.doganventures.net için:
Type: CNAME
Name: www
Value: cname.vercel-dns.com
```

### 2️⃣ **DOMAIN SAĞLAYICINIZDA DNS AYARLARI**

#### GoDaddy İçin:
```
1. GoDaddy.com → My Products → Domains
2. doganventures.net → DNS yönetimi
3. Mevcut kayıtları sil/güncelle:

A Record:
- Host: @
- Points to: 76.76.19.61
- TTL: 1 hour

CNAME Record:
- Host: www
- Points to: cname.vercel-dns.com
- TTL: 1 hour
```

#### Namecheap İçin:
```
1. Namecheap.com → Domain List
2. doganventures.net → Manage → Advanced DNS
3. Host Records ekle:

A Record:
- Host: @
- Value: 76.76.19.61
- TTL: Automatic

CNAME Record:
- Host: www
- Value: cname.vercel-dns.com
- TTL: Automatic
```

#### Cloudflare İçin:
```
1. Cloudflare.com → doganventures.net
2. DNS → Records

A Record:
- Name: doganventures.net
- IPv4 address: 76.76.19.61
- Proxy status: Proxied (Orange cloud)

CNAME Record:
- Name: www
- Target: cname.vercel-dns.com
- Proxy status: Proxied (Orange cloud)
```

### 3️⃣ **VERCEL'DE DOMAIN DOĞRULAMA**

#### Status Kontrolü:
```
Vercel Dashboard → Settings → Domains

Görmeli:
✅ doganventures.net - Valid Configuration
✅ www.doganventures.net - Valid Configuration
```

#### SSL Sertifika Kontrolü:
```
Vercel otomatik olarak:
- SSL sertifikası oluşturur
- HTTPS yönlendirmesi yapar
- Both domains için geçerli olur
```

### 4️⃣ **WWW YÖNLENDİRME AYARI**

#### Primary Domain Belirleme:
```
Vercel Dashboard → Settings → Domains
www.doganventures.net → Set as Primary Domain

Bu ayar:
- doganventures.net → www.doganventures.net yönlendirir
- doganventures.vercel.app → www.doganventures.net yönlendirir
```

### 5️⃣ **TEST AŞAMASI**

#### 1. DNS Propagation Test:
```bash
# Terminal'de test et:
nslookup doganventures.net
nslookup www.doganventures.net

# Online test:
# dnschecker.org sitesinde domain'i test et
```

#### 2. Browser Test:
```
✅ https://doganventures.net → https://www.doganventures.net yönlendirir
✅ https://www.doganventures.net direkt açılır
✅ https://doganventures.vercel.app → https://www.doganventures.net yönlendirir
```

#### 3. SSL Test:
```
✅ Kilit simgesi görünür
✅ "Connection is secure" mesajı
✅ Sertifika www.doganventures.net için geçerli
```

---

## ⚡ HIZLI KONTROL LİSTESİ

### Vercel'de Tamamlanacaklar:
- [ ] doganventures.net domain eklendi
- [ ] www.doganventures.net domain eklendi
- [ ] DNS kayıtları alındı
- [ ] www.doganventures.net primary domain olarak ayarlandı

### Domain Sağlayıcısında:
- [ ] A record eklendi (@)
- [ ] CNAME record eklendi (www)
- [ ] Eski kayıtlar silindi/güncellendi
- [ ] TTL ayarlandı

### Test Sonuçları:
- [ ] DNS propagation tamamlandı
- [ ] SSL sertifikası aktif
- [ ] Tüm yönlendirmeler çalışıyor
- [ ] Facebook Pixel aktif

---

## 🕐 BEKLENTİLER

### DNS Propagation:
- **Hızlı**: 10-30 dakika
- **Normal**: 2-6 saat  
- **Maksimum**: 24-48 saat

### SSL Sertifika:
- Vercel otomatik oluşturur
- 5-10 dakika içinde aktif

### Yönlendirme:
- DNS propagation tamamlandıktan hemen sonra
- Vercel otomatik yönlendirme yapar

---

## 🚨 SORUN GİDERME

### Domain Status "Invalid Configuration":
1. DNS kayıtlarını kontrol et
2. TTL süresini bekle
3. DNS cache temizle: `ipconfig /flushdns` (Windows) / `sudo dscacheutil -flushcache` (Mac)

### Yönlendirme Çalışmıyor:
1. Primary domain ayarını kontrol et
2. Browser cache temizle (Ctrl+F5)
3. Incognito mode'da test et

### SSL Hatası:
1. Vercel'de SSL status kontrol et
2. 24 saat bekle
3. Vercel support'a ticket aç

---

## 🎉 BAŞARILI YÖNLENDİRME SİNYALLERİ

### Browser Test:
```
✅ doganventures.vercel.app → www.doganventures.net
✅ doganventures.net → www.doganventures.net  
✅ www.doganventures.net direkt açılır
✅ HTTPS kilit simgesi aktif
✅ Sayfa hızlı yüklenir
```

### Console Test:
```
✅ Facebook Pixel initialized successfully
🎯 Facebook Pixel loaded on production!
🔥 Pixel test successful!
```

**Domain yönlendirme başarıyla tamamlandı! 🚀**

---

## 📋 SONRAKİ ADIMLAR

### 1. Facebook Pixel Domain Update:
```
Meta Business Manager → Events Manager → Pixels → Settings → Domains
www.doganventures.net domain'ini ekle
```

### 2. Google Analytics Update:
```
GA4 → Admin → Property Settings → Property Details
Website URL: https://www.doganventures.net
```

### 3. Search Console:
```
Google Search Console'a www.doganventures.net ekle
Sitemap gönder: https://www.doganventures.net/sitemap.xml
```

**Tüm süreç tamamlandı! Artık www.doganventures.net ile yayındasınız! 🎉**
