import { useState, useRef, useEffect } from "react";
import Slider from "react-slick";

const PremiumBrandsSection = () => {
  const sliderRef = useRef(null);
  const [currentSlide, setCurrentSlide] = useState(0);

  // Gerçek danışmanlık hizmetleri verisi
  const services = [
    {
      title: "Stratejik Büyüme",
      description:
        "Pazarlama, satış ve dijital dönüşümde sektörünüze özel, ölçülebilir büyüme stratejileri.",
      icon: "fas fa-rocket",
      features: [
        "Hedef pazar ve müşteri analizi",
        "Gelir artırıcı strateji planları",
        "Çok kanallı büyüme yol haritası",
        "Rakip analizi ve konumlandırma",
        "Yatırım ve ölçeklenme danışmanlığı",
      ],
    },
    {
      title: "Yönetici & Ekip Gelişimi",
      description:
        "Liderlik, ekip motivasyonu ve kurumsal kültürde sürdürülebilir gelişim programları.",
      icon: "fas fa-users-cog",
      features: [
        "Yönetici koçluğu ve mentorluk",
        "Takım içi iletişim ve motivasyon",
        "Yetkinlik ve performans yönetimi",
        "Kurumsal kültür dönüşümü",
        "Çatışma yönetimi ve liderlik atölyeleri",
      ],
    },
    {
      title: "İnovasyon & Dijitalleşme",
      description:
        "Yeni nesil iş modelleri, dijitalleşme ve inovasyon odaklı dönüşüm projeleri.",
      icon: "fas fa-brain",
      features: [
        "İnovasyon kültürü ve Ar-Ge danışmanlığı",
        "Dijital ürün ve servis geliştirme",
        "Teknoloji adaptasyonu ve entegrasyon",
        "Start-up ve kurumsal inovasyon programları",
        "Veri analitiği ve otomasyon çözümleri",
      ],
    },
    {
      title: "Operasyonel Mükemmellik",
      description:
        "Süreç optimizasyonu, verimlilik ve teknoloji entegrasyonu ile maksimum performans.",
      icon: "fas fa-cogs",
      features: [
        "İş süreçleri analizi ve yeniden tasarımı",
        "Verimlilik ve maliyet optimizasyonu",
        "ERP/CRM sistem entegrasyonu",
        "Kalite yönetimi ve sürdürülebilirlik",
        "Operasyonel risk ve kriz yönetimi",
      ],
    },
  ];

  // Optimized slider settings
  const sliderSettings = {
    dots: false,
    infinite: true,
    speed: 500,
    slidesToShow: 2,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 6000,
    pauseOnHover: true,
    lazyLoad: "ondemand",
    arrows: true,
    beforeChange: (_, next) => setCurrentSlide(next),
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
        },
      },
    ],
  };

  // Optimized card component
  const ServiceCard = ({ service, index }) => {
    const isActive = currentSlide === index;

    return (
      <div style={{ padding: "0 15px" }}>
        <div
          style={{
            background:
              "linear-gradient(145deg, rgba(30, 30, 40, 0.95), rgba(20, 20, 30, 0.95))",
            borderRadius: "20px",
            padding: "2.5rem 2rem",
            height: "auto",
            minHeight: "480px",
            display: "flex",
            flexDirection: "column",
            border: "1px solid rgba(212, 175, 55, 0.3)",
            boxShadow: isActive
              ? "0 25px 50px rgba(0, 0, 0, 0.4), 0 0 30px rgba(212, 175, 55, 0.3)"
              : "0 15px 30px rgba(0, 0, 0, 0.3)",
            transition: "all 0.3s ease",
            transform: isActive ? "translateY(-8px)" : "translateY(0)",
            position: "relative",
            overflow: "hidden",
          }}
        >
          {/* Top accent line */}
          <div
            style={{
              position: "absolute",
              top: 0,
              left: 0,
              right: 0,
              height: "3px",
              background:
                "linear-gradient(90deg, transparent, rgba(212, 175, 55, 0.8), transparent)",
            }}
          />

          {/* Icon */}
          <div
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              width: "80px",
              height: "80px",
              margin: "0 auto",
              background: isActive
                ? "linear-gradient(135deg, rgba(212, 175, 55, 0.3), rgba(212, 175, 55, 0.15))"
                : "linear-gradient(135deg, rgba(212, 175, 55, 0.2), rgba(212, 175, 55, 0.1))",
              borderRadius: "20px",
              border: isActive
                ? "2px solid rgba(212, 175, 55, 0.5)"
                : "2px solid rgba(212, 175, 55, 0.3)",
              boxShadow: isActive
                ? "0 15px 40px rgba(0, 0, 0, 0.3), inset 0 2px 15px rgba(212, 175, 55, 0.2), 0 0 20px rgba(212, 175, 55, 0.15)"
                : "0 10px 30px rgba(0, 0, 0, 0.2), inset 0 2px 10px rgba(212, 175, 55, 0.1)",
              marginBottom: "1.5rem",
              transition: "all 0.3s ease",
              transform: isActive ? "scale(1.05)" : "scale(1)",
              animation: isActive
                ? "iconGlow 2s ease-in-out infinite alternate"
                : "none",
            }}
          >
            <i
              className={service.icon}
              style={{
                fontSize: "2.8rem",
                color: isActive
                  ? "rgba(212, 175, 55, 1)"
                  : "rgba(212, 175, 55, 0.9)",
                textShadow: isActive
                  ? "0 3px 15px rgba(212, 175, 55, 0.4)"
                  : "0 2px 10px rgba(212, 175, 55, 0.3)",
                filter: isActive
                  ? "drop-shadow(0 3px 6px rgba(0, 0, 0, 0.4))"
                  : "drop-shadow(0 2px 4px rgba(0, 0, 0, 0.3))",
                transition: "all 0.3s ease",
              }}
            />
          </div>

          {/* Title */}
          <h3
            style={{
              color: "#ffffff",
              fontSize: "1.5rem",
              fontWeight: "700",
              marginBottom: "1rem",
              textAlign: "center",
              minHeight: "60px",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            {service.title}
          </h3>

          {/* Description */}
          <p
            style={{
              color: "rgba(255, 255, 255, 0.85)",
              fontSize: "1rem",
              lineHeight: "1.6",
              marginBottom: "2rem",
              textAlign: "center",
              minHeight: "80px",
            }}
          >
            {service.description}
          </p>

          {/* Features */}
          <div style={{ flex: 1 }}>
            {service.features.map((feature, idx) => (
              <div
                key={idx}
                style={{
                  display: "flex",
                  alignItems: "flex-start",
                  marginBottom: "1rem",
                  color: "rgba(255, 255, 255, 0.9)",
                  fontSize: "0.9rem",
                }}
              >
                <div
                  style={{
                    width: "8px",
                    height: "8px",
                    background: "rgba(212, 175, 55, 0.8)",
                    borderRadius: "50%",
                    marginRight: "12px",
                    marginTop: "6px",
                    flexShrink: 0,
                  }}
                />
                {feature}
              </div>
            ))}
          </div>
        </div>
      </div>
    );
  };

  return (
    <section
      style={{
        background:
          "linear-gradient(135deg, rgba(5, 5, 15, 0.98) 0%, rgba(25, 25, 35, 0.98) 100%)",
        padding: "6rem 0",
        position: "relative",
        borderTop: "1px solid rgba(212, 175, 55, 0.15)",
        borderBottom: "1px solid rgba(212, 175, 55, 0.15)",
      }}
    >
      {/* Gold accent element */}
      <div
        style={{
          position: "absolute",
          width: "100%",
          height: "1px",
          top: "0",
          background:
            "linear-gradient(90deg, transparent, rgba(212, 175, 55, 0.8), transparent)",
          opacity: "0.8",
        }}
      />

      {/* Background luxury pattern */}
      <div
        style={{
          position: "absolute",
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          backgroundImage: `
          linear-gradient(135deg, rgba(212, 175, 55, 0.03) 25%, transparent 25%),
          linear-gradient(225deg, rgba(212, 175, 55, 0.03) 25%, transparent 25%),
          linear-gradient(315deg, rgba(212, 175, 55, 0.03) 25%, transparent 25%),
          linear-gradient(45deg, rgba(212, 175, 55, 0.03) 25%, transparent 25%)
        `,
          backgroundSize: "60px 60px",
          opacity: 0.2,
          pointerEvents: "none",
        }}
      />

      <div
        className="container"
        style={{ maxWidth: "1200px", margin: "0 auto", padding: "0 20px" }}
      >
        {/* Header */}
        <div style={{ textAlign: "center", marginBottom: "4rem" }}>
          {/* Luxury badge */}
          <div
            style={{
              display: "inline-block",
              padding: "8px 20px",
              background:
                "linear-gradient(135deg, rgba(212, 175, 55, 0.9), rgba(244, 228, 188, 0.9))",
              color: "#000",
              fontSize: "0.8rem",
              fontWeight: "bold",
              borderRadius: "25px",
              letterSpacing: "1.5px",
              textTransform: "uppercase",
              marginBottom: "1.5rem",
              boxShadow: "0 4px 12px rgba(0,0,0,0.3)",
            }}
          >
            Premium Danışmanlık
          </div>

          <h2
            style={{
              color: "var(--primary-white)",
              fontSize: "2.8rem",
              marginBottom: "1.5rem",
              fontWeight: "800",
              textShadow: "0 2px 10px rgba(0, 0, 0, 0.3)",
              letterSpacing: "0.5px",
              background:
                "linear-gradient(to right, #ffffff, #f5e7a3, #ffffff)",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
              textAlign: "center",
            }}
          >
            Danışmanlık Hizmetlerimiz
          </h2>

          {/* Ornamental flourishes */}
          <div
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              margin: "1.5rem auto",
              maxWidth: "500px",
            }}
          >
            <div
              style={{
                height: "1px",
                flex: "1",
                background:
                  "linear-gradient(to right, rgba(212, 175, 55, 0.1), rgba(212, 175, 55, 0.5))",
              }}
            />
            <div
              style={{
                padding: "0 1rem",
              }}
            >
              <span
                style={{
                  fontSize: "1.8rem",
                  color: "rgba(212, 175, 55, 0.8)",
                  margin: "0 0.5rem",
                }}
              >
                ✦
              </span>
            </div>
            <div
              style={{
                height: "1px",
                flex: "1",
                background:
                  "linear-gradient(to left, rgba(212, 175, 55, 0.1), rgba(212, 175, 55, 0.5))",
              }}
            />
          </div>

          <p
            style={{
              color: "rgba(255, 255, 255, 0.9)",
              fontSize: "1.1rem",
              fontWeight: "500",
              letterSpacing: "0.05em",
              maxWidth: "800px",
              margin: "0 auto",
              lineHeight: "1.6",
            }}
          >
            Sektör liderlerine özel, ölçülebilir büyüme ve maksimum rekabet
            avantajı sağlayan, tamamen kişiselleştirilmiş danışmanlık çözümleri
            sunuyoruz. Her projede, global standartlarda strateji, inovasyon ve
            sürdürülebilir başarı odaklı, premium bir hizmet deneyimi
            yaşatıyoruz.
          </p>
        </div>

        {/* Services Carousel Container */}
        <div
          style={{
            background:
              "linear-gradient(to right, rgba(10, 10, 15, 0.9), rgba(25, 25, 40, 0.9), rgba(10, 10, 15, 0.9))",
            borderRadius: "24px",
            padding: "3rem 2rem",
            border: "1px solid rgba(212, 175, 55, 0.3)",
            backdropFilter: "blur(15px)",
            boxShadow:
              "0 30px 100px rgba(0, 0, 0, 0.4), 0 0 40px rgba(212, 175, 55, 0.2)",
          }}
        >
          {/* Decorative top line */}
          <div
            style={{
              position: "absolute",
              top: "0",
              left: "0",
              right: "0",
              height: "1px",
              background:
                "linear-gradient(90deg, transparent, rgba(255, 255, 255, 0.1), transparent)",
            }}
          />

          <Slider ref={sliderRef} {...sliderSettings}>
            {services.map((service, index) => (
              <ServiceCard key={index} service={service} index={index} />
            ))}
          </Slider>
        </div>

        {/* Bottom Note */}
        <div
          style={{
            textAlign: "center",
            marginTop: "3rem",
            padding: "1.5rem",
            background: "rgba(212, 175, 55, 0.1)",
            borderRadius: "12px",
            border: "1px solid rgba(212, 175, 55, 0.2)",
          }}
        >
          <p
            style={{
              color: "rgba(255, 255, 255, 0.9)",
              fontSize: "0.95rem",
              fontStyle: "italic",
              margin: "0",
            }}
          >
            Her danışmanlık sürecimizde gizlilik, şeffaflık ve sonuç odaklılık
            esastır.
          </p>
        </div>
      </div>

      {/* Custom Slider Styles */}
      <style jsx>{`
        .slick-arrow {
          z-index: 2;
          width: 50px !important;
          height: 50px !important;
          border-radius: 50% !important;
          background: rgba(212, 175, 55, 0.3) !important;
          border: 1px solid rgba(212, 175, 55, 0.6) !important;
          cursor: pointer !important;
        }

        .slick-arrow:before {
          font-size: 20px !important;
          color: rgba(212, 175, 55, 1) !important;
        }

        .slick-arrow:hover {
          background: rgba(212, 175, 55, 0.3) !important;
          transform: none !important;
        }

        .slick-prev {
          left: -70px !important;
        }

        .slick-next {
          right: -70px !important;
        }

        .slick-track {
          display: flex !important;
        }
        .slick-slide {
          height: inherit !important;
        }
        .slick-slide > div {
          height: 100%;
        }

        @keyframes iconGlow {
          0% {
            box-shadow: 0 15px 40px rgba(0, 0, 0, 0.3),
              inset 0 2px 15px rgba(212, 175, 55, 0.2),
              0 0 20px rgba(212, 175, 55, 0.15);
          }
          100% {
            box-shadow: 0 20px 50px rgba(0, 0, 0, 0.4),
              inset 0 3px 20px rgba(212, 175, 55, 0.3),
              0 0 30px rgba(212, 175, 55, 0.25);
          }
        }
      `}</style>
    </section>
  );
};

export default PremiumBrandsSection;
