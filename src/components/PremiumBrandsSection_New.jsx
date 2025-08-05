import { useState, useRef } from "react";
import Slider from "react-slick";

// Basit SVG iconlar - deployment'ta kesinlikle çalışır
const ServiceIcon = ({ type, isActive }) => {
  const iconColor = isActive ? "#D4AF37" : "rgba(212, 175, 55, 0.8)";

  const icons = {
    strategy: (
      <svg
        viewBox="0 0 24 24"
        fill={iconColor}
        style={{ width: "48px", height: "48px" }}
      >
        <path d="M7 14l5-5 5 5z" />
        <path d="M2 12h3l1-1v-1h12v1l1 1h3v8H2v-8z" />
        <path d="M5 4h14v4H5z" />
      </svg>
    ),
    leadership: (
      <svg
        viewBox="0 0 24 24"
        fill={iconColor}
        style={{ width: "48px", height: "48px" }}
      >
        <circle cx="12" cy="8" r="3" />
        <path d="M12 11c-3 0-8 1.5-8 4.5V20h16v-4.5c0-3-5-4.5-8-4.5z" />
        <circle cx="18" cy="8" r="2" />
        <path d="M18 11c1.5 0 4 .75 4 2.25V16h-3v-2.5c0-1-1.5-2-3-2.5z" />
      </svg>
    ),
    innovation: (
      <svg
        viewBox="0 0 24 24"
        fill={iconColor}
        style={{ width: "48px", height: "48px" }}
      >
        <path d="M12 2C8.13 2 5 5.13 5 9c0 2.38 1.19 4.47 3 5.74V17c0 .55.45 1 1 1h6c.55 0 1-.45 1-1v-2.26c1.81-1.27 3-3.36 3-5.74 0-3.87-3.13-7-7-7z" />
        <path d="M9 19h6v1c0 .55-.45 1-1 1h-4c-.55 0-1-.45-1-1v-1z" />
      </svg>
    ),
    excellence: (
      <svg
        viewBox="0 0 24 24"
        fill={iconColor}
        style={{ width: "48px", height: "48px" }}
      >
        <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
        <circle cx="12" cy="12" r="3" />
      </svg>
    ),
  };

  return icons[type] || icons.strategy;
};

const PremiumBrandsSection = () => {
  const sliderRef = useRef(null);
  const [currentSlide, setCurrentSlide] = useState(0);

  // Basit ama etkili hizmetler verisi
  const services = [
    {
      title: "Stratejik Büyüme",
      description:
        "Pazarlama, satış ve dijital dönüşümde sektörünüze özel, ölçülebilir büyüme stratejileri.",
      iconType: "strategy",
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
      iconType: "leadership",
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
      iconType: "innovation",
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
      iconType: "excellence",
      features: [
        "İş süreçleri analizi ve yeniden tasarımı",
        "Verimlilik ve maliyet optimizasyonu",
        "ERP/CRM sistem entegrasyonu",
        "Kalite yönetimi ve sürdürülebilirlik",
        "Operasyonel risk ve kriz yönetimi",
      ],
    },
  ];

  const sliderSettings = {
    dots: false,
    infinite: true,
    speed: 500,
    slidesToShow: 2,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 6000,
    pauseOnHover: true,
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

          {/* Simple Icon Container */}
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
            }}
          >
            <ServiceIcon type={service.iconType} isActive={isActive} />
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
      <div
        className="container"
        style={{ maxWidth: "1200px", margin: "0 auto", padding: "0 20px" }}
      >
        {/* Header */}
        <div style={{ textAlign: "center", marginBottom: "4rem" }}>
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
              color: "#ffffff",
              fontSize: "2.8rem",
              marginBottom: "1.5rem",
              fontWeight: "800",
              textShadow: "0 2px 10px rgba(0, 0, 0, 0.3)",
              letterSpacing: "0.5px",
              textAlign: "center",
            }}
          >
            Danışmanlık Hizmetlerimiz
          </h2>

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
            sunuyoruz.
          </p>
        </div>

        {/* Services Carousel */}
        <div
          style={{
            background:
              "linear-gradient(to right, rgba(10, 10, 15, 0.9), rgba(25, 25, 40, 0.9), rgba(10, 10, 15, 0.9))",
            borderRadius: "24px",
            padding: "3rem 2rem",
            border: "1px solid rgba(212, 175, 55, 0.3)",
            boxShadow:
              "0 30px 100px rgba(0, 0, 0, 0.4), 0 0 40px rgba(212, 175, 55, 0.2)",
          }}
        >
          <Slider ref={sliderRef} {...sliderSettings}>
            {services.map((service, index) => (
              <ServiceCard key={index} service={service} index={index} />
            ))}
          </Slider>
        </div>
      </div>

      {/* Custom Styles */}
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
      `}</style>
    </section>
  );
};

export default PremiumBrandsSection;
