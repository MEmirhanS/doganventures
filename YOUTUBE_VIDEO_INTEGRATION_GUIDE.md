# 🎥 YOUTUBE VIDEO ENTEGRASYONU REHBERİ

## 🎯 "Verdiğimiz Hizmetler & Biz Kimiz" Bölümüne Video Ekleme

### 📹 **YouTube URL Formatları**

#### **Normal YouTube URL:**

```
https://www.youtube.com/watch?v=VIDEO_ID
```

#### **Embed URL (Önerilen):**

```
https://www.youtube.com/embed/VIDEO_ID
```

---

## 🔧 **Nasıl Değiştirilir?**

### **1️⃣ YouTube Video URL'ini Al:**

1. YouTube'da videoyu aç
2. **"Paylaş"** butonuna tıkla
3. **"Yerleştir"** seçeneğini seç
4. Çıkan kodu kopyala veya URL'i al

**Örnek:**

```html
<iframe
  width="560"
  height="315"
  src="https://www.youtube.com/embed/dQw4w9WgXcQ"
  ...
></iframe>
```

**Sadece URL kısmını al:**

```
https://www.youtube.com/embed/dQw4w9WgXcQ
```

### **2️⃣ App.jsx'te URL'i Değiştir:**

```jsx
<InfoVideoSection
  title="Verdiğimiz Hizmetler & Biz Kimiz"
  description="..."
  videoUrl="https://www.youtube.com/embed/SENIN_VIDEO_ID"  // ← Burayı değiştir
  cards={[...]}
/>
```

---

## ⚙️ **Gelişmiş YouTube Parametreleri**

### **Autoplay (Otomatik Oynatma):**

```
https://www.youtube.com/embed/VIDEO_ID?autoplay=1
```

### **HD Kalite:**

```
https://www.youtube.com/embed/VIDEO_ID?quality=hd720
```

### **Kontrolleri Gizle:**

```
https://www.youtube.com/embed/VIDEO_ID?controls=0
```

### **Birden Fazla Parametre:**

```
https://www.youtube.com/embed/VIDEO_ID?autoplay=1&controls=1&quality=hd720
```

---

## 🎨 **Görünüm Özellikleri**

### **Responsive Design:**

- ✅ **16:9 aspect ratio** korunur
- ✅ **Mobile uyumlu** - tüm cihazlarda düzgün
- ✅ **Premium styling** - yuvarlak köşeler, gölgeler

### **Loading States:**

- ✅ **Video varsa:** YouTube player gösterir
- ✅ **Video yoksa:** "Video Yakında Gelecek" placeholder
- ✅ **Error handling:** Bozuk URL'lerde düzgün çalışır

---

## 📱 **Test Etme**

### **1️⃣ Local Test:**

```bash
npm run dev
```

### **2️⃣ Production Test:**

```bash
npm run build
vercel --prod
```

### **3️⃣ Tarayıcı Kontrolü:**

- Desktop'ta video oynatılıyor mu?
- Mobile'da responsive çalışıyor mu?
- Farklı tarayıcılarda sorun var mı?

---

## 🚀 **Örnekler**

### **Şirket Tanıtımı:**

```jsx
videoUrl = "https://www.youtube.com/embed/ABC123XYZ";
```

### **Hizmetler Videosu:**

```jsx
videoUrl = "https://www.youtube.com/embed/DEF456ABC";
```

### **Müşteri Hikayesi:**

```jsx
videoUrl = "https://www.youtube.com/embed/GHI789DEF";
```

---

## 🎯 **Hangi Video Türü Eklemeli?**

### **İdeal Video İçerikleri:**

1. 🏢 **Şirket tanıtımı** (2-3 dakika)
2. 🎯 **Hizmetler overview** (3-5 dakika)
3. 👥 **Ekip ve ofis turu** (1-2 dakika)
4. 💼 **Başarı hikayeleri** (2-4 dakika)
5. 🎓 **Eğitim içerikleri** (5-10 dakika)

### **Video Kalite Kriterleri:**

- ✅ **Professional çekim**
- ✅ **Temiz ses kalitesi**
- ✅ **Marka kimliği uyumlu**
- ✅ **Call-to-action içerikli**

---

## 📝 **Şu Anda Kullanılan URL:**

```jsx
videoUrl = "https://www.youtube.com/embed/dQw4w9WgXcQ";
```

**Bu örnek bir URL'dir. Kendi videonuzla değiştirin!**

---

## 🔄 **Değişiklik Sonrası**

1. **Dosyayı kaydet**
2. **Build al:** `npm run build`
3. **Deploy et:** `vercel --prod`
4. **Test et:** Canlı sitede video çalışıyor mu?

**YouTube video artık "Verdiğimiz Hizmetler & Biz Kimiz" bölümünde professional bir şekilde gösterilecek!** 🎬✨
