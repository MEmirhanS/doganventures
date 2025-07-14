-- 1. Eski yapı varsa temizle
DROP TRIGGER  IF EXISTS update_leads_updated_at ON leads;
DROP FUNCTION IF EXISTS update_updated_at_column;
DROP TABLE    IF EXISTS leads;

-- 2. leads tablosunu oluştur
CREATE TABLE leads (
  id                 UUID PRIMARY KEY DEFAULT uuid_generate_v4(), -- UUID v4 kullanıldı
  created_at         TIMESTAMPTZ DEFAULT timezone('utc', now()) NOT NULL,
  updated_at         TIMESTAMPTZ DEFAULT timezone('utc', now()) NOT NULL,
  full_name          TEXT NOT NULL,
  email              TEXT NOT NULL,
  phone              TEXT NOT NULL,
  company_name       TEXT,
  sector             TEXT,
  monthly_budget     TEXT,
  need_description   TEXT,
  services           TEXT[], -- Hizmet seçimleri dizisi olarak eklendi
  utm_source         TEXT,
  utm_medium         TEXT,
  utm_campaign       TEXT
);

-- 3. updated_at alanını otomatik güncelleyen trigger fonksiyonu
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at := timezone('utc', now());
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER update_leads_updated_at
BEFORE UPDATE ON leads
FOR EACH ROW
EXECUTE PROCEDURE update_updated_at_column();

-- 4. RLS (Row-Level Security) aç
ALTER TABLE leads ENABLE ROW LEVEL SECURITY;

-- 5. Anon role yetki ver
GRANT INSERT, SELECT ON leads TO anon;

-- 6. RLS politikaları oluştur
DROP POLICY IF EXISTS "Allow anon insert" ON leads;
DROP POLICY IF EXISTS "Allow anon select" ON leads;

CREATE POLICY "Allow anon insert" ON leads
FOR INSERT TO anon
WITH CHECK (true);

CREATE POLICY "Allow anon select" ON leads
FOR SELECT TO anon
USING (true);
