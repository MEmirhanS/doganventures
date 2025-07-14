# 🚀 GITHUB PUSH KOMUTLARI

## Repo oluşturduktan sonra çalıştır:

```bash
cd /Users/yunusemredogan/Desktop/doganventures

# Remote'u tekrar ekle (temizleme)
git remote remove origin 2>/dev/null || true
git remote add origin https://github.com/theyunusdogan/doganventures.git

# Branch'i main yap
git branch -M main

# Push et
git push -u origin main
```

## ✅ Push Başarılı Olunca:

1. GitHub'da projen görünecek
2. Vercel'e git: vercel.com
3. "Import Git Repository" bas
4. GitHub → "doganventures" seç
5. Deploy butonuna bas

## 🎯 Vercel Ayarları:

Framework: Vite
Build Command: npm run build
Output Directory: dist
Install Command: npm install

**Bu ayarlar otomatik gelecek!**

## 📊 Deploy Sonrası:

- Vercel URL: https://doganventures.vercel.app (veya benzeri)
- Facebook Pixel çalışacak
- Canlı site hazır!

---

**İlk GitHub'da repo oluştur, sonra bu komutları çalıştır!** 🚀
