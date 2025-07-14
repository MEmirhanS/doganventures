# Vercel Environment Variables Setup Guide

## 🚨 SUPABASE "IS NOT DEFINED" SORUNU ÇÖZÜMÜ

Bu sorunu çözmek için Vercel'de environment variables'ları doğru şekilde tanımlamanız gerekiyor.

### 1️⃣ Vercel Dashboard'a Git
- https://vercel.com/dashboard
- **doganventures** projesini seç
- **Settings** → **Environment Variables**

### 2️⃣ Environment Variables'ları Ekle

**Aşağıdaki 4 değişkeni AYNI İSİMLERLE ekleyin:**

```bash
# Supabase Configuration
VITE_SUPABASE_URL=https://jdxhiwbdzudkrhknbbgq.supabase.co
VITE_SUPABASE_ANON_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImpkeGhpd2JkenVka3Joa25iYmdxIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTE5NjczMTAsImV4cCI6MjA2NzU0MzMxMH0.HbWSpvwBDedksrDP3xrYTECJ3LaC5lTNkDRb-OaBmhI

# Telegram Configuration  
VITE_TELEGRAM_BOT_TOKEN=8176117792:AAHCOm0lWkGdHNgu5wGX9VB2Dr4PvGvhMzY
VITE_TELEGRAM_CHAT_ID=-1002852578955
```

### 3️⃣ Her Değişken İçin:
1. **Name:** `VITE_SUPABASE_URL`
2. **Value:** `https://jdxhiwbdzudkrhknbbgq.supabase.co`
3. **Environment:** `Production`, `Preview`, `Development` (hepsini seç)
4. **Save** butonuna bas

### 4️⃣ Tekrar Deployment
Environment variables ekledikten sonra:
- **Deployments** sekmesine git
- Son deployment'ın yanındaki **"..."** → **Redeploy** 
- **Use existing Build Cache** ❌ (kapalı bırak)
- **Redeploy** butonuna bas

### 5️⃣ Deployment Sonrası Test
1. **Yeni Vercel URL'ini aç**
2. **F12** → **Console** aç  
3. **Şu mesajları ara:**
   ```
   🔧 Supabase Environment Debug:
   URL: ✅ Loaded
   Key: ✅ Loaded
   ```

### 6️⃣ Hala Çalışmıyorsa
Vercel'de bazen VITE_ prefix sorun çıkarabilir. Alternative approach:

**A) Vercel.json Configuration:**
```json
{
  "env": {
    "VITE_SUPABASE_URL": "https://jdxhiwbdzudkrhknbbgq.supabase.co",
    "VITE_SUPABASE_ANON_KEY": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
  }
}
```

**B) Alternative Supabase Client:**
```javascript
// src/lib/supabaseClient.js
import { createClient } from "@supabase/supabase-js";

// Fallback values for production
const supabaseUrl = import.meta.env.VITE_SUPABASE_URL || 
                   "https://jdxhiwbdzudkrhknbbgq.supabase.co";
                   
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY || 
                       "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...";

export const supabase = createClient(supabaseUrl, supabaseAnonKey);
```

### 7️⃣ Son Çare: Manual Configuration
Eğer hiçbiri çalışmazsa, environment variables'ı doğrudan koda gömebiliriz (geçici çözüm):

```javascript
// src/lib/supabaseClient.js - PRODUCTION HOTFIX
const supabaseUrl = "https://jdxhiwbdzudkrhknbbgq.supabase.co";
const supabaseAnonKey = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImpkeGhpd2JkenVka3Joa25iYmdxIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTE5NjczMTAsImV4cCI6MjA2NzU0MzMxMH0.HbWSpvwBDedksrDP3xrYTECJ3LaC5lTNkDRb-OaBmhI";
```

---

## 🎯 HANGİ YÖNTEMI DENEYECEĞİZ?

1. **Önce Vercel Environment Variables'ları düzgün tanımla**
2. **Redeploy yap**
3. **Test et** 
4. **Çalışmazsa alternative approach'ları dene**

**En muhtemel neden**: Vercel'de environment variables eksik veya yanlış tanımlanmış.
