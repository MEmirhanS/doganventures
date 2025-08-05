import { useState, useRef, useEffect } from "react";
import Slider from "react-slick";

// Basit SVG iconlar - deployment'ta kesinlikle çalışır
const ServiceIcon = ({ type, style }) => {
  const icons = {
    strategy: (
      <svg viewBox="0 0 24 24" fill="currentColor" style={style}>
        <path d="M7 14l5-5 5 5z"/>
        <path d="M2 12h3l1-1v-1h12v1l1 1h3v8H2v-8z"/>
        <path d="M5 4h14v4H5z"/>
      </svg>
    ),
    leadership: (
      <svg viewBox="0 0 24 24" fill="currentColor" style={style}>
        <circle cx="12" cy="8" r="3"/>
        <path d="M12 11c-3 0-8 1.5-8 4.5V20h16v-4.5c0-3-5-4.5-8-4.5z"/>
        <circle cx="18" cy="8" r="2"/>
        <path d="M18 11c1.5 0 4 .75 4 2.25V16h-3v-2.5c0-1-1.5-2-3-2.5z"/>
      </svg>
    ),
    innovation: (
      <svg viewBox="0 0 24 24" fill="currentColor" style={style}>
        <path d="M12 2C8.13 2 5 5.13 5 9c0 2.38 1.19 4.47 3 5.74V17c0 .55.45 1 1 1h6c.55 0 1-.45 1-1v-2.26c1.81-1.27 3-3.36 3-5.74 0-3.87-3.13-7-7-7z"/>
        <path d="M9 19h6v1c0 .55-.45 1-1 1h-4c-.55 0-1-.45-1-1v-1z"/>
      </svg>
    ),
    excellence: (
      <svg viewBox="0 0 24 24" fill="currentColor" style={style}>
        <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/>
        <circle cx="12" cy="12" r="3"/>
      </svg>
    )
  };
  
  return icons[type] || icons.strategy;
};
import { ServiceIcons, AnimatedIcon } from "./ServiceIcons";

const PremiumBrandsSection = () => {
  const sliderRef = useRef(null);
  const [currentSlide, setCurrentSlide] = useState(0);

  // Basit ama etkili hizmetler verisi - SVG iconlarla
  const services = [
    {
      title: "Stratejik Büyüme",
      description:
        "Pazarlama, satış ve dijital dönüşümde sektörünüze özel, ölçülebilir büyüme stratejileri.",
      iconComponent: ServiceIcons.Strategy,
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
      iconComponent: ServiceIcons.Leadership,
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
      iconComponent: ServiceIcons.Innovation,
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
      iconComponent: ServiceIcons.Excellence,
      features: [
        "İş süreçleri analizi ve yeniden tasarımı",
        "Verimlilik ve maliyet optimizasyonu",
        "ERP/CRM sistem entegrasyonu",
        "Kalite yönetimi ve sürdürülebilirlik",
        "Operasyonel risk ve kriz yönetimi",
      ],
    },
  ];
        "Veri analitiği ve otomasyon çözümleri",
      ],
    },
    {
      title: "Operasyonel Mükemmellik",
      description:
        "Süreç optimizasyonu, verimlilik ve teknoloji entegrasyonu ile maksimum performans.",
      icon: "fas fa-cogs",
      iconSecondary: "fas fa-trophy",
      gradientColors: ["#D4AF37", "#CD853F", "#F4E4BC"],
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
          className="service-card"
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
            transition: "all 0.4s cubic-bezier(0.4, 0, 0.2, 1)",
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

          {/* Enhanced Icon Container */}
          <div
            style={{
              position: "relative",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              width: "100px",
              height: "100px",
              margin: "0 auto",
              marginBottom: "2rem",
            }}
          >
            {/* Main Icon Background */}
            <div
              style={{
                position: "relative",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                width: "90px",
                height: "90px",
                background: isActive
                  ? `linear-gradient(135deg, ${service.gradientColors[0]}40, ${service.gradientColors[1]}20, ${service.gradientColors[2]}30)`
                  : `linear-gradient(135deg, ${service.gradientColors[0]}25, ${service.gradientColors[1]}15, ${service.gradientColors[2]}20)`,
                borderRadius: "24px",
                border: isActive
                  ? `2px solid ${service.gradientColors[0]}80`
                  : `2px solid ${service.gradientColors[0]}50`,
                boxShadow: isActive
                  ? `0 20px 50px rgba(0, 0, 0, 0.4), 
                     inset 0 3px 20px ${service.gradientColors[0]}30, 
                     0 0 30px ${service.gradientColors[0]}25,
                     0 5px 15px ${service.gradientColors[0]}20`
                  : `0 15px 35px rgba(0, 0, 0, 0.3), 
                     inset 0 2px 15px ${service.gradientColors[0]}20, 
                     0 0 20px ${service.gradientColors[0]}15`,
                transition: "all 0.4s cubic-bezier(0.4, 0, 0.2, 1)",
                transform: isActive ? "scale(1.08) rotateY(5deg)" : "scale(1)",
                animation: isActive
                  ? "iconGlow 3s ease-in-out infinite alternate, iconFloat 6s ease-in-out infinite"
                  : "none",
                overflow: "hidden",
              }}
            >
              {/* Glowing Background Effect */}
              <div
                style={{
                  position: "absolute",
                  top: "-2px",
                  left: "-2px",
                  right: "-2px",
                  bottom: "-2px",
                  background: isActive
                    ? `conic-gradient(from 0deg, ${service.gradientColors[0]}60, ${service.gradientColors[1]}40, ${service.gradientColors[2]}60, ${service.gradientColors[0]}60)`
                    : "transparent",
                  borderRadius: "26px",
                  opacity: isActive ? 0.7 : 0,
                  animation: isActive ? "rotate 8s linear infinite" : "none",
                  zIndex: -1,
                  transition: "all 0.4s ease",
                }}
              />

              {/* Inner Gradient Overlay */}
              <div
                style={{
                  position: "absolute",
                  top: "10%",
                  left: "10%",
                  right: "10%",
                  bottom: "10%",
                  background: `radial-gradient(circle at 30% 30%, ${service.gradientColors[0]}20, transparent 70%)`,
                  borderRadius: "20px",
                  opacity: isActive ? 0.8 : 0.5,
                  transition: "all 0.4s ease",
                }}
              />

              {/* Main Icon */}
              <i
                className={service.icon}
                style={{
                  fontSize: "2.8rem",
                  color: isActive
                    ? service.gradientColors[0]
                    : `${service.gradientColors[0]}CC`,
                  textShadow: isActive
                    ? `0 4px 20px ${service.gradientColors[0]}50, 
                       0 2px 8px rgba(0, 0, 0, 0.6),
                       0 0 30px ${service.gradientColors[0]}30`
                    : `0 3px 15px ${service.gradientColors[0]}40, 
                       0 2px 6px rgba(0, 0, 0, 0.5)`,
                  filter: isActive
                    ? "drop-shadow(0 4px 8px rgba(0, 0, 0, 0.5)) brightness(1.2)"
                    : "drop-shadow(0 3px 6px rgba(0, 0, 0, 0.4))",
                  transition: "all 0.4s cubic-bezier(0.4, 0, 0.2, 1)",
                  transform: isActive
                    ? "translateY(-2px) scale(1.1)"
                    : "translateY(0) scale(1)",
                  zIndex: 2,
                }}
              />

              {/* Secondary Icon Overlay */}
              {service.iconSecondary && (
                <i
                  className={service.iconSecondary}
                  style={{
                    position: "absolute",
                    bottom: "-5px",
                    right: "-5px",
                    fontSize: "1.2rem",
                    color: service.gradientColors[1],
                    backgroundColor: "rgba(30, 30, 40, 0.95)",
                    padding: "6px",
                    borderRadius: "50%",
                    border: `2px solid ${service.gradientColors[0]}60`,
                    textShadow: `0 2px 8px ${service.gradientColors[1]}40`,
                    boxShadow: `0 4px 12px rgba(0, 0, 0, 0.4), 
                                0 0 15px ${service.gradientColors[1]}25`,
                    opacity: isActive ? 1 : 0.8,
                    transform: isActive ? "scale(1.1)" : "scale(1)",
                    transition: "all 0.3s ease",
                    zIndex: 3,
                  }}
                />
              )}
            </div>

            {/* Floating Particles Effect */}
            {isActive && (
              <>
                <div
                  style={{
                    position: "absolute",
                    top: "20%",
                    left: "15%",
                    width: "4px",
                    height: "4px",
                    background: service.gradientColors[0],
                    borderRadius: "50%",
                    opacity: 0.6,
                    animation: "particle1 4s ease-in-out infinite",
                    boxShadow: `0 0 8px ${service.gradientColors[0]}60`,
                  }}
                />
                <div
                  style={{
                    position: "absolute",
                    top: "60%",
                    right: "20%",
                    width: "3px",
                    height: "3px",
                    background: service.gradientColors[1],
                    borderRadius: "50%",
                    opacity: 0.5,
                    animation: "particle2 5s ease-in-out infinite",
                    boxShadow: `0 0 6px ${service.gradientColors[1]}60`,
                  }}
                />
                <div
                  style={{
                    position: "absolute",
                    top: "30%",
                    right: "10%",
                    width: "2px",
                    height: "2px",
                    background: service.gradientColors[2],
                    borderRadius: "50%",
                    opacity: 0.7,
                    animation: "particle3 3.5s ease-in-out infinite",
                    boxShadow: `0 0 4px ${service.gradientColors[2]}60`,
                  }}
                />
              </>
            )}
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

      {/* Enhanced Custom Styles with Advanced Animations */}
      <style jsx>{`
        .slick-arrow {
          z-index: 2;
          width: 50px !important;
          height: 50px !important;
          border-radius: 50% !important;
          background: rgba(212, 175, 55, 0.3) !important;
          border: 1px solid rgba(212, 175, 55, 0.6) !important;
          cursor: pointer !important;
          transition: all 0.3s ease !important;
        }

        .slick-arrow:before {
          font-size: 20px !important;
          color: rgba(212, 175, 55, 1) !important;
        }

        .slick-arrow:hover {
          background: rgba(212, 175, 55, 0.5) !important;
          transform: scale(1.1) !important;
          box-shadow: 0 8px 25px rgba(0, 0, 0, 0.4) !important;
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

        /* Enhanced Icon Animations */
        @keyframes iconGlow {
          0% {
            box-shadow: 0 20px 50px rgba(0, 0, 0, 0.4),
              inset 0 3px 20px var(--glow-color, rgba(212, 175, 55, 0.3)),
              0 0 30px var(--glow-color, rgba(212, 175, 55, 0.25)),
              0 5px 15px var(--glow-color, rgba(212, 175, 55, 0.2));
          }
          100% {
            box-shadow: 0 25px 60px rgba(0, 0, 0, 0.5),
              inset 0 4px 25px var(--glow-color, rgba(212, 175, 55, 0.4)),
              0 0 40px var(--glow-color, rgba(212, 175, 55, 0.35)),
              0 8px 25px var(--glow-color, rgba(212, 175, 55, 0.3));
          }
        }

        @keyframes iconFloat {
          0%,
          100% {
            transform: scale(1.08) rotateY(5deg) translateY(0px);
          }
          50% {
            transform: scale(1.08) rotateY(5deg) translateY(-8px);
          }
        }

        @keyframes rotate {
          0% {
            transform: rotate(0deg);
          }
          100% {
            transform: rotate(360deg);
          }
        }

        @keyframes particle1 {
          0%,
          100% {
            transform: translateY(0px) translateX(0px) scale(1);
            opacity: 0.6;
          }
          25% {
            transform: translateY(-15px) translateX(10px) scale(1.2);
            opacity: 0.8;
          }
          50% {
            transform: translateY(-25px) translateX(-5px) scale(0.8);
            opacity: 0.4;
          }
          75% {
            transform: translateY(-10px) translateX(-15px) scale(1.1);
            opacity: 0.7;
          }
        }

        @keyframes particle2 {
          0%,
          100% {
            transform: translateY(0px) translateX(0px) scale(1);
            opacity: 0.5;
          }
          33% {
            transform: translateY(20px) translateX(-12px) scale(1.3);
            opacity: 0.8;
          }
          66% {
            transform: translateY(8px) translateX(15px) scale(0.7);
            opacity: 0.3;
          }
        }

        @keyframes particle3 {
          0%,
          100% {
            transform: translateY(0px) translateX(0px) scale(1);
            opacity: 0.7;
          }
          40% {
            transform: translateY(-18px) translateX(-8px) scale(1.4);
            opacity: 0.9;
          }
          80% {
            transform: translateY(12px) translateX(8px) scale(0.6);
            opacity: 0.4;
          }
        }

        /* Hover Enhancement for Cards */
        .service-card:hover {
          transform: translateY(-12px) !important;
          box-shadow: 0 30px 60px rgba(0, 0, 0, 0.5),
            0 0 40px rgba(212, 175, 55, 0.4) !important;
        }

        /* Responsive adjustments */
        @media (max-width: 768px) {
          .slick-prev {
            left: -30px !important;
          }
          .slick-next {
            right: -30px !important;
          }
          .slick-arrow {
            width: 40px !important;
            height: 40px !important;
          }
          .slick-arrow:before {
            font-size: 16px !important;
          }
        }
      `}</style>
    </section>
  );
};

export default PremiumBrandsSection;
