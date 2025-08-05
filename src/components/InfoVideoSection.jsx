import React from 'react';

const InfoVideoSection = ({ title, description, videoUrl, cards, className = "" }) => (
  <section className={`section-narrow ${className}`} style={{ background: "var(--bg-card)" }}>
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
          {videoUrl.includes('youtube') || videoUrl.includes('embed') ? (
            <iframe
              src={videoUrl}
              frameBorder="0"
              allow="autoplay; encrypted-media"
              allowFullScreen
              title="YouTube video"
              style={{
                position: "absolute",
                top: 0,
                left: 0,
                width: "100%",
                height: "100%",
                borderRadius: "20px",
              }}
            ></iframe>
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
                <i
                  className={card.icon}
                  style={{ marginRight: "8px" }}
                ></i>
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
