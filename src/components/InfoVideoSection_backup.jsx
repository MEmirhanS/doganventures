import React from "react";

const InfoVideoSection = ({
  title,
  description,
  videoUrl,
  cards,
  className = "",
}) => (
  <section
    className={`section-narrow ${className}`}
    style={{ background: "var(--bg-card)" }}
  >
    <div className="container text-center">
      <h2 className="mb-4">{title}</h2>
      <p
        style={{
          maxWidth: "700px",
          margin: "0 auto 2rem",
          color: "var(--text-light)",
          fontSize: "1.1rem",
          lineHeight: "1.6",
        }}
      >
        {description}
      </p>
      <div
        style={{
          maxWidth: "800px",
          margin: "0 auto",
          borderRadius: "20px",
          overflow: "hidden",
          boxShadow: "var(--shadow-heavy)",
        }}
      >
        <div
          style={{
            position: "relative",
            paddingBottom: "56.25%",
            height: 0,
          }}
        >
          {/* YouTube Embed veya Video */}
          {videoUrl && videoUrl.trim() ? (
            videoUrl.includes("youtube") || videoUrl.includes("embed") ? (
              <iframe
                src={videoUrl}
                frameBorder="0"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                allowFullScreen
                title="YouTube video player"
                style={{
                  position: "absolute",
                  top: 0,
                  left: 0,
                  width: "100%",
                  height: "100%",
                  borderRadius: "20px",
                  border: "none",
                }}
                onError={(e) => {
                  console.log("Video yükleme hatası:", e);
                  e.target.style.display = 'none';
                  // Hata durumunda alternatif göster
                  const fallback = e.target.parentNode.querySelector('.video-fallback');
                  if (fallback) fallback.style.display = 'block';
                }}
              ></iframe>
              {/* Video yüklenemezse gösterilecek alternatif */}
              <div 
                className="video-fallback"
                style={{
                  position: "absolute",
                  top: 0,
                  left: 0,
                  width: "100%",
                  height: "100%",
                  background: "linear-gradient(135deg, rgba(212, 175, 55, 0.1), rgba(212, 175, 55, 0.05))",
                  borderRadius: "20px",
                  display: "none",
                  alignItems: "center",
                  justifyContent: "center",
                  flexDirection: "column",
                  border: "2px dashed rgba(212, 175, 55, 0.3)",
                  color: "var(--text-primary)",
                  textAlign: "center",
                  padding: "2rem"
                }}
              >
                <div style={{ fontSize: "3rem", marginBottom: "1rem" }}>📹</div>
                <h3 style={{ margin: "0 0 1rem 0", color: "var(--primary)" }}>
                  Video Şu Anda Kullanılamıyor
                </h3>
                <p style={{ margin: "0 0 1.5rem 0", opacity: 0.8 }}>
                  Video yüklenirken bir sorun oluştu. Lütfen daha sonra tekrar deneyin.
                </p>
                <a 
                  href="https://youtu.be/QEvquw75a_o" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  style={{
                    background: "var(--primary)",
                    color: "white",
                    padding: "0.75rem 1.5rem",
                    borderRadius: "25px",
                    textDecoration: "none",
                    fontWeight: "600",
                    transition: "all 0.3s ease"
                  }}
                  onMouseOver={(e) => e.target.style.transform = "translateY(-2px)"}
                  onMouseOut={(e) => e.target.style.transform = "translateY(0)"}
                >
                  YouTube'da İzle
                </a>
              </div>
            ) : (
              <video
                src={videoUrl}
                controls
                style={{
                  position: "absolute",
                  top: 0,
                  left: 0,
                  width: "100%",
                  height: "100%",
                  borderRadius: "20px",
                }}
              >
                Tarayıcınız video etiketini desteklemiyor.
              </video>
            )
          ) : (
            <div
              style={{
                position: "absolute",
                top: 0,
                left: 0,
                width: "100%",
                height: "100%",
                background:
                  "linear-gradient(135deg, rgba(212, 175, 55, 0.1), rgba(212, 175, 55, 0.05))",
                borderRadius: "20px",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                border: "2px dashed rgba(212, 175, 55, 0.3)",
              }}
            >
              <div
                style={{
                  textAlign: "center",
                  color: "rgba(255, 255, 255, 0.7)",
                }}
              >
                <i
                  className="fas fa-play-circle"
                  style={{
                    fontSize: "4rem",
                    marginBottom: "1rem",
                    color: "rgba(212, 175, 55, 0.8)",
                  }}
                ></i>
                <p style={{ fontSize: "1.1rem", fontWeight: "500" }}>
                  Video Yakında Gelecek
                </p>
                <p style={{ fontSize: "0.9rem", opacity: "0.8" }}>
                  Premium içeriklerimizi hazırlıyoruz...
                </p>
              </div>
            </div>
          )}
        </div>
      </div>
      {cards && cards.length > 0 && (
        <div
          style={{
            display: "flex",
            justifyContent: "center",
            flexWrap: "wrap",
            gap: "2rem",
            marginTop: "3rem",
          }}
        >
          {cards.map((card, index) => (
            <div
              key={index}
              style={{
                maxWidth: "350px",
                padding: "1.5rem",
                background: "rgba(30, 30, 35, 0.6)",
                borderRadius: "16px",
                border: "1px solid rgba(212, 175, 55, 0.2)",
                boxShadow: "0 10px 30px rgba(0, 0, 0, 0.15)",
                textAlign: "left",
              }}
            >
              <h3
                style={{
                  fontSize: "1.2rem",
                  color: "var(--primary-accent)",
                  marginBottom: "1rem",
                }}
              >
                <i className={card.icon} style={{ marginRight: "8px" }}></i>
                {card.title}
              </h3>
              <p
                style={{
                  color: "var(--text-light)",
                  fontSize: "0.95rem",
                  lineHeight: "1.6",
                }}
              >
                {card.description}
              </p>
            </div>
          ))}
        </div>
      )}
    </div>
  </section>
);

export default InfoVideoSection;
