# 🌐 DOMAIN BAĞLAMA REHBERİ

## 🎯 Adım Adım Domain Bağlama Süreci

### 1️⃣ **VERCEL'DE DOMAIN AYARLARI**

#### Vercel Dashboard'a Git:
- vercel.com → Login
- Projen seç (doganventures)
- **Settings** → **Domains** sekmesi

#### Domain Ekle:
```
yourdomain.com
www.yourdomain.com
```

### 2️⃣ **DNS AYARLARI (Domain Sağlayıcısında)**

Vercel size DNS kayıtları verecek, bunları domain sağlayıcınızda (GoDaddy, Namecheap, vs.) ekleyeceksiniz:

#### A Record:
```
Type: A
Name: @
Value: 76.76.19.61 (Vercel IP)
TTL: 3600
```

#### CNAME Record:
```
Type: CNAME
Name: www
Value: cname.vercel-dns.com
TTL: 3600
```

### 3️⃣ **SSL SERTİFİKA OTOMATIK**

Vercel otomatik olarak:
- SSL sertifikası oluşturur
- HTTPS yönlendirmesi yapar
- CDN optimizasyonu sağlar

### 4️⃣ **META PIXEL DOMAIN VERIFICATION**

#### Meta Business Manager'da:
1. Events Manager → Pixels → Settings → Domains
2. Yeni domaininizi ekle: `yourdomain.com`
3. Verification tag'i al

#### index.html'e Ekle:
```html
<meta name="facebook-domain-verification" content="VERIFICATION_CODE" />
```

### 5️⃣ **GOOGLE ANALYTICS GÜNCELLEMESİ**

Eğer Google Analytics kullanıyorsanız:
- Property Settings → Property Details
- Website URL'i güncelle: `https://yourdomain.com`

---

## ⚡ HIZLI KONTROL LİSTESİ

### Vercel'de:
- [ ] Domain eklendi
- [ ] DNS kayıtları gösterildi
- [ ] SSL status: "Issued"

### Domain Sağlayıcısında:
- [ ] A record eklendi
- [ ] CNAME record eklendi
- [ ] TTL ayarlandı

### Test:
- [ ] `yourdomain.com` açılıyor
- [ ] `www.yourdomain.com` açılıyor
- [ ] HTTPS çalışıyor
- [ ] Form çalışıyor
- [ ] Facebook Pixel aktif

---

## 🕐 BEKLENTİLER

### DNS Propagation Süresi:
- **Hızlı**: 10-30 dakika
- **Normal**: 2-6 saat
- **Maksimum**: 24-48 saat

### SSL Sertifika:
- Vercel otomatik oluşturur
- 5-10 dakika içinde aktif

### Meta Domain Verification:
- 24-48 saat sürebilir
- Bu sürede pixel çalışmaya devam eder

---

## 🚨 SORUN GİDERME

### Domain Açılmıyor:
1. DNS kayıtlarını kontrol et
2. `nslookup yourdomain.com` test et
3. 24 saat bekle

### SSL Hatası:
1. Vercel dashboard'da SSL status kontrol et
2. Hard refresh yap (Ctrl+F5)
3. Incognito mode'da test et

### Pixel Çalışmıyor:
1. Console'da hata var mı kontrol et
2. Domain verification status kontrol et
3. Meta Events Manager'da test et

---

## 🎉 BAŞARILI DOMAIN BAĞLAMA SİNYALLERİ

### Browser'da:
```
✅ yourdomain.com açılıyor
✅ www.yourdomain.com açılıyor
✅ HTTPS kilit simgesi görünüyor
✅ Sayfa hızlı yükleniyor
```

### Console'da:
```
✅ Facebook Pixel initialized successfully
🎯 Facebook Pixel loaded on production!
🔥 Pixel test successful!
```

### Meta Events Manager'da:
```
✅ Domain Status: Verified
✅ Test Events aktif
✅ PageView events geliyor
```

**Domain başarıyla bağlandı! 🚀**
