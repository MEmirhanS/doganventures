import "./index.css";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { useState, useEffect, memo, useRef } from "react";
import Slider from "react-slick";
import PremiumBrandsSection from "./components/PremiumBrandsSection";
import NotificationSystem from "./components/NotificationSystem";
import { sendTelegramNotification } from "./lib/sendTelegramNotification";
import { supabase } from "./lib/supabaseClient";

const ServiceCarousel = memo(({ services }) => {
  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 3,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 5000,
    pauseOnHover: true,
    centerMode: false,
    centerPadding: "0px",
    arrows: true,
    className: "center",
    adaptiveHeight: false,
    responsive: [
      {
        breakpoint: 1200,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 1,
          arrows: true,
        },
      },
      {
        breakpoint: 768,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
          arrows: false,
        },
      },
    ],
  };

  return (
    <div
      className="service-carousel"
      style={{ position: "relative", margin: "0 auto", maxWidth: "100%" }}
    >
      <Slider {...settings}>
        {services.map((service, index) => (
          <div
            key={index}
            className="carousel-slide"
            style={{ height: "auto", padding: "15px 10px" }}
          >
            <ServiceCard service={service} />
          </div>
        ))}
      </Slider>
    </div>
  );
});

const CompanyLogo = ({ src, alt, href, index = 0 }) => {
  const [isHovered, setIsHovered] = useState(false);
  const [isLoaded, setIsLoaded] = useState(false);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [ref, isVisible] = useIntersectionObserver();

  // Check if this is a client's own logo
  const isClientLogo =
    src.includes("north sofa") ||
    src.includes("metin bingöl") ||
    src.includes("ispanyolca online");

  // Calculate animation delay based on index
  const animationDelay = index * 0.15; // 150ms delay between each logo

  // Handle mouse movement for 3D effect
  const handleMouseMove = (e) => {
    if (!isHovered) return;

    const rect = e.currentTarget.getBoundingClientRect();
    const x = (e.clientX - rect.left) / rect.width;
    const y = (e.clientY - rect.top) / rect.height;

    setMousePosition({ x, y });
  };

  // Calculate rotation based on mouse position
  const rotateX = isHovered ? (mousePosition.y - 0.5) * 20 : 0;
  const rotateY = isHovered ? (mousePosition.x - 0.5) * -20 : 0;

  // Theme color for subtle animation
  const themeColor = isClientLogo
    ? "rgba(212, 175, 55, 0.9)" // Gold for client logos
    : "rgba(160, 160, 160, 0.7)"; // Silver for other logos

  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      style={{ textDecoration: "none" }}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      onMouseMove={handleMouseMove}
      ref={ref}
    >
      <div
        className="company-logo"
        style={{
          position: "relative",
          perspective: "1000px",
          transformStyle: "preserve-3d",
          margin: "1rem",
          zIndex: isHovered ? 5 : 1,
          opacity: isVisible ? 1 : 0,
          transform: isVisible
            ? "translateY(0) scale(1)"
            : "translateY(40px) scale(0.9)",
          transition: `opacity 0.7s ease ${animationDelay}s, transform 0.7s ease ${animationDelay}s`,
        }}
      >
        <div
          style={{
            width: "220px",
            height: "130px",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            borderRadius: "18px",
            background: isClientLogo
              ? `linear-gradient(145deg, 
                  rgba(40, 40, 40, ${isHovered ? "0.97" : "0.85"}), 
                  rgba(25, 25, 25, ${isHovered ? "0.97" : "0.85"})
                )`
              : `linear-gradient(145deg, 
                  rgba(35, 35, 35, ${isHovered ? "0.97" : "0.85"}), 
                  rgba(20, 20, 20, ${isHovered ? "0.97" : "0.85"})
                )`,
            boxShadow: isHovered
              ? isClientLogo
                ? "0 40px 80px rgba(0, 0, 0, 0.5), 0 0 50px rgba(212, 175, 55, 0.45), 0 15px 30px rgba(255, 255, 255, 0.15)"
                : "0 30px 70px rgba(0, 0, 0, 0.45), 0 0 40px rgba(212, 175, 55, 0.35), 0 10px 25px rgba(255, 255, 255, 0.12)"
              : isClientLogo
              ? "0 25px 50px rgba(0, 0, 0, 0.4), 0 0 35px rgba(212, 175, 55, 0.25)"
              : "0 20px 45px rgba(0, 0, 0, 0.35), 0 0 30px rgba(212, 175, 55, 0.18)",
            border: isClientLogo
              ? `1.5px solid rgba(212, 175, 55, ${isHovered ? "0.75" : "0.4"})`
              : `1px solid rgba(212, 175, 55, ${isHovered ? "0.5" : "0.25"})`,
            padding: "20px",
            transform: isHovered
              ? `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) translateZ(20px) scale(1.15)`
              : "perspective(1000px) rotateX(0) rotateY(0) translateZ(0) scale(1)",
            transition: "all 0.6s cubic-bezier(0.175, 0.885, 0.32, 1.275)",
            backdropFilter: "blur(12px)",
            overflow: "hidden",
            animation: isClientLogo ? "subtlePulse 6s infinite alternate" : "",
          }}
        >
          {/* Logo image */}
          <img
            src={src}
            alt={alt}
            loading="lazy"
            decoding="async"
            onLoad={() => setIsLoaded(true)}
            style={{
              maxWidth: "90%",
              maxHeight: "80%",
              objectFit: "contain",
              opacity: isLoaded ? (isHovered ? "1" : "0.9") : "0",
              filter: isHovered
                ? isClientLogo
                  ? "brightness(1.8) contrast(1.5) drop-shadow(0 10px 15px rgba(0, 0, 0, 0.6))"
                  : "brightness(1.6) contrast(1.4) drop-shadow(0 8px 10px rgba(0, 0, 0, 0.5))"
                : isClientLogo
                ? "brightness(1.6) contrast(1.4) drop-shadow(0 6px 10px rgba(0, 0, 0, 0.4))"
                : "brightness(1.4) contrast(1.3) drop-shadow(0 4px 8px rgba(0, 0, 0, 0.3))",
              transition:
                "all 0.5s cubic-bezier(0.23, 1, 0.32, 1.275), opacity 0.3s ease",
              transform: isHovered ? "scale(1.1) translateY(-2px)" : "scale(1)",
            }}
          />

          {/* Gold accent top edge */}
          <div
            style={{
              position: "absolute",
              top: 0,
              left: "5%",
              right: "5%",
              height: "2px",
              background: isClientLogo
                ? `linear-gradient(90deg, transparent, ${themeColor}, transparent)`
                : "linear-gradient(90deg, transparent, rgba(212, 175, 55, 0.7), transparent)",
              opacity: isHovered
                ? isClientLogo
                  ? "1"
                  : "0.9"
                : isClientLogo
                ? "0.7"
                : "0.5",
              transition: "opacity 0.5s ease",
              animation: isClientLogo ? "shimmer 3s infinite" : "",
            }}
          />

          {/* Gold accent bottom edge */}
          <div
            style={{
              position: "absolute",
              bottom: 0,
              left: "5%",
              right: "5%",
              height: "2px",
              background: isClientLogo
                ? `linear-gradient(90deg, transparent, ${themeColor}, transparent)`
                : "linear-gradient(90deg, transparent, rgba(212, 175, 55, 0.7), transparent)",
              opacity: isHovered
                ? isClientLogo
                  ? "1"
                  : "0.9"
                : isClientLogo
                ? "0.7"
                : "0.5",
              transition: "opacity 0.5s ease",
              animation: isClientLogo ? "shimmer 3s infinite reverse" : "",
            }}
          />

          {/* Corner accents for client logos */}
          {isClientLogo && (
            <>
              <div
                style={{
                  position: "absolute",
                  top: "3px",
                  left: "3px",
                  width: "15px",
                  height: "15px",
                  borderTop: `2px solid ${themeColor}`,
                  borderLeft: `2px solid ${themeColor}`,
                  borderTopLeftRadius: "5px",
                  opacity: isHovered ? "1" : "0.7",
                  transition: "opacity 0.5s ease",
                  animation: "float 3s ease-in-out infinite",
                }}
              />
              <div
                style={{
                  position: "absolute",
                  top: "3px",
                  right: "3px",
                  width: "15px",
                  height: "15px",
                  borderTop: `2px solid ${themeColor}`,
                  borderRight: `2px solid ${themeColor}`,
                  borderTopRightRadius: "5px",
                  opacity: isHovered ? "1" : "0.7",
                  transition: "opacity 0.5s ease",
                  animation: "float 3s ease-in-out infinite 0.3s",
                }}
              />
              <div
                style={{
                  position: "absolute",
                  bottom: "3px",
                  left: "3px",
                  width: "15px",
                  height: "15px",
                  borderBottom: `2px solid ${themeColor}`,
                  borderLeft: `2px solid ${themeColor}`,
                  borderBottomLeftRadius: "5px",
                  opacity: isHovered ? "1" : "0.7",
                  transition: "opacity 0.5s ease",
                  animation: "float 3s ease-in-out infinite 0.6s",
                }}
              />
              <div
                style={{
                  position: "absolute",
                  bottom: "3px",
                  right: "3px",
                  width: "15px",
                  height: "15px",
                  borderBottom: `2px solid ${themeColor}`,
                  borderRight: `2px solid ${themeColor}`,
                  borderBottomRightRadius: "5px",
                  opacity: isHovered ? "1" : "0.7",
                  transition: "opacity 0.5s ease",
                  animation: "float 3s ease-in-out infinite 0.9s",
                }}
              />
            </>
          )}

          {/* Premium badge for client logos */}
          {isClientLogo && isHovered && (
            <div
              style={{
                position: "absolute",
                top: "8px",
                right: "8px",
                background: "linear-gradient(135deg, #d4af37, #f4e4bc)",
                color: "#000",
                fontSize: "8px",
                fontWeight: "bold",
                padding: "2px 6px",
                borderRadius: "4px",
                textTransform: "uppercase",
                letterSpacing: "0.5px",
                opacity: "0.9",
                boxShadow: "0 2px 4px rgba(0,0,0,0.3)",
                animation: "fadeIn 0.3s ease",
              }}
            >
              Premium
            </div>
          )}

          {/* Gold emblem for client logos */}
          {isClientLogo && !isHovered && (
            <div
              style={{
                position: "absolute",
                bottom: "8px",
                right: "8px",
                width: "14px",
                height: "14px",
                borderRadius: "50%",
                background: "linear-gradient(135deg, #d4af37, #f4e4bc)",
                boxShadow: "0 2px 4px rgba(0,0,0,0.3)",
                opacity: "0.85",
                animation: "simplePulse 2s infinite alternate",
              }}
            />
          )}

          {/* Loading pulse animation */}
          {!isLoaded && (
            <div
              style={{
                position: "absolute",
                top: "50%",
                left: "50%",
                width: "35px",
                height: "35px",
                borderRadius: "50%",
                border: "2px solid rgba(212, 175, 55, 0.2)",
                borderTopColor: "rgba(212, 175, 55, 0.8)",
                transform: "translate(-50%, -50%)",
                animation: "spin 1s linear infinite",
              }}
            />
          )}

          {/* Floor reflection */}
          <div
            style={{
              position: "absolute",
              bottom: "-30px",
              left: "10%",
              width: "80%",
              height: "40px",
              background: isClientLogo
                ? `linear-gradient(to bottom, rgba(212, 175, 55, ${
                    isHovered ? 0.35 : 0.2
                  }), transparent)`
                : `linear-gradient(to bottom, rgba(212, 175, 55, ${
                    isHovered ? 0.25 : 0.15
                  }), transparent)`,
              filter: "blur(8px)",
              borderRadius: "50%",
              opacity: isHovered
                ? isClientLogo
                  ? "1"
                  : "0.8"
                : isClientLogo
                ? "0.7"
                : "0.5",
              transform: "scaleY(0.3)",
              transition: "all 0.5s ease",
            }}
          />

          {/* Glare effect - visible on hover */}
          {isHovered && (
            <div
              style={{
                position: "absolute",
                top: 0,
                left: 0,
                right: 0,
                height: "100%",
                background: `linear-gradient(135deg, 
                rgba(255, 255, 255, ${isClientLogo ? 0.15 : 0.1}) 0%, 
                transparent 50%, 
                transparent 100%)`,
                pointerEvents: "none",
              }}
            />
          )}
        </div>
      </div>
    </a>
  );
};

// Memoized components for better performance
const ServiceCard = memo(({ service }) => {
  const [ref, isVisible] = useIntersectionObserver();

  return (
    <div
      ref={ref}
      className={`card service-card perf-opt ${
        isVisible ? "fade-in-up visible" : ""
      }`}
      style={{
        height: "100%",
        margin: "0 10px",
        padding: "2rem",
        borderRadius: "16px",
        boxShadow:
          "0 12px 28px rgba(0, 0, 0, 0.18), 0 0 0 1px rgba(212, 175, 55, 0.25)",
        background:
          "linear-gradient(145deg, rgba(35, 35, 40, 0.92), rgba(22, 22, 27, 0.92))",
        border: "1px solid rgba(212, 175, 55, 0.25)",
        position: "relative",
        overflow: "hidden",
      }}
    >
      {/* Enhanced golden accent corner */}
      <div
        style={{
          position: "absolute",
          top: 0,
          right: 0,
          width: "70px",
          height: "70px",
          overflow: "hidden",
        }}
      >
        <div
          style={{
            position: "absolute",
            top: 0,
            right: 0,
            width: "120px",
            height: "120px",
            background: "rgba(212, 175, 55, 0.25)",
            boxShadow: "0 0 20px rgba(212, 175, 55, 0.3)",
            transform: "rotate(45deg) translate(40px, -40px)",
            zIndex: 1,
          }}
        />
      </div>

      <div
        className="icon"
        style={{
          fontSize: "2.5rem",
          marginBottom: "1.5rem",
          color: "var(--primary-accent)",
          background: "rgba(212, 175, 55, 0.15)",
          width: "80px",
          height: "80px",
          borderRadius: "50%",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          boxShadow:
            "0 0 20px rgba(212, 175, 55, 0.25), inset 0 0 15px rgba(212, 175, 55, 0.1)",
          border: "1px solid rgba(212, 175, 55, 0.3)",
        }}
      >
        <i className={service.icon}></i>
      </div>

      <h3
        className="mb-3"
        style={{
          fontSize: "1.5rem",
          fontWeight: "700",
          color: "#fff",
          marginBottom: "1rem",
        }}
      >
        {service.title}
      </h3>

      <p
        className="service-description mb-4"
        style={{
          color: "var(--text-light)",
          fontSize: "1rem",
          lineHeight: "1.6",
          marginBottom: "1.8rem",
        }}
      >
        {service.description}
      </p>

      <ul
        className="service-features"
        style={{
          listStyle: "none",
          padding: 0,
          margin: 0,
        }}
      >
        {service.features.map((feature, idx) => (
          <li
            key={idx}
            className="service-feature-item"
            style={{
              marginBottom: "0.75rem",
              display: "flex",
              alignItems: "center",
              fontSize: "0.95rem",
              color: "var(--text-light)",
            }}
          >
            <i
              className="fas fa-check"
              style={{
                color: "var(--accent-emerald)",
                marginRight: "0.75rem",
                background: "rgba(46, 213, 115, 0.15)",
                width: "24px",
                height: "24px",
                borderRadius: "50%",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                fontSize: "0.8rem",
              }}
            ></i>
            {feature}
          </li>
        ))}
      </ul>

      <div
        style={{
          marginTop: "1.8rem",
          textAlign: "right",
        }}
      >
        <span
          onClick={() => trackCtaClick("Service Card - Detaylı Bilgi")}
          style={{
            color: "var(--primary-accent)",
            fontSize: "0.9rem",
            fontWeight: "600",
            cursor: "pointer",
            display: "inline-flex",
            alignItems: "center",
            background: "rgba(212, 175, 55, 0.1)",
            padding: "8px 16px",
            borderRadius: "8px",
            boxShadow: "0 2px 10px rgba(212, 175, 55, 0.15)",
          }}
        >
          Detaylı Bilgi
          <i
            className="fas fa-arrow-right"
            style={{ marginLeft: "0.5rem", fontSize: "0.8rem" }}
          ></i>
        </span>
      </div>
    </div>
  );
});

const TestimonialCard = memo(({ testimonial }) => {
  const [ref, isVisible] = useIntersectionObserver();

  // Professional business photos array for random backgrounds
  const professionalBackgrounds = [
    // Use existing testimonial photos as base (different combinations)
    "/testimonials/mehmet-ozkan.jpg",
    "/testimonials/ayse-demir.jpg",
    "/testimonials/can-yilmaz.jpg",
    "/testimonials/zeynep-kaya.jpg",
    "/testimonials/ahmet-yildiz.jpg",
    "/testimonials/elif-sahin.jpg",
    "/testimonials/burak-demir.jpg",
    "/testimonials/selin-aydin.jpg",
    "/testimonials/murat-ozturk.jpg",
    // Add business/office themed images from other assets
    "/assets/proofs/training-1.jpg",
    "/assets/proofs/training-2.jpg",
    // Professional stock images for variety
    "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop&crop=face",
    "https://images.unsplash.com/photo-1494790108755-2616b612b786?w=150&h=150&fit=crop&crop=face",
    "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop&crop=face",
    "https://images.unsplash.com/photo-1560250097-0b93528c311a?w=150&h=150&fit=crop&crop=face",
    "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=150&h=150&fit=crop&crop=face",
    "https://images.unsplash.com/photo-1580489944761-15a19d654956?w=150&h=150&fit=crop&crop=face",
    "https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?w=150&h=150&fit=crop&crop=face",
    "https://images.unsplash.com/photo-1507591064344-4c6ce005b128?w=150&h=150&fit=crop&crop=face",
    // Additional professional variety
    "https://images.unsplash.com/photo-1566492031773-4f4e44671d66?w=150&h=150&fit=crop&crop=face",
    "https://images.unsplash.com/photo-1582750433449-648ed127bb54?w=150&h=150&fit=crop&crop=face",
    "https://images.unsplash.com/photo-1607990281513-2c110a25bd8c?w=150&h=150&fit=crop&crop=face",
    "https://images.unsplash.com/photo-1584999734482-0361aecad844?w=150&h=150&fit=crop&crop=face",
  ];

  // Get consistent random background for each testimonial
  const getConsistentBackground = (name) => {
    // Use name hash to get consistent random selection
    let hash = 0;
    for (let i = 0; i < name.length; i++) {
      const char = name.charCodeAt(i);
      hash = (hash << 5) - hash + char;
      hash = hash & hash; // Convert to 32bit integer
    }

    // Filter out the testimonial's own image path
    const normalizedName = name
      .toLowerCase()
      .replace(/\s+/g, "-")
      .replace(/ş/g, "s")
      .replace(/ç/g, "c")
      .replace(/ğ/g, "g")
      .replace(/ü/g, "u")
      .replace(/ö/g, "o")
      .replace(/ı/g, "i");

    const availablePhotos = professionalBackgrounds.filter(
      (photo) => !photo.includes(normalizedName)
    );

    const index = Math.abs(hash) % availablePhotos.length;
    return availablePhotos[index];
  };

  const backgroundImage = getConsistentBackground(testimonial.name);

  // State for image loading
  const [backgroundLoaded, setBackgroundLoaded] = useState(false);
  const [testimonialLoaded, setTestimonialLoaded] = useState(false);

  return (
    <div
      ref={ref}
      className={`testimonial-card card card-white perf-opt ${
        isVisible ? "fade-in-up visible" : ""
      }`}
      style={{
        boxShadow:
          "0 15px 30px rgba(0, 0, 0, 0.1), 0 0 0 1px rgba(212, 175, 55, 0.2)",
        borderRadius: "16px",
        overflow: "hidden",
        position: "relative",
      }}
    >
      <div className="testimonial-header">
        <div
          style={{
            position: "relative",
            width: "60px",
            height: "60px",
            marginRight: "1rem",
            borderRadius: "50%",
            overflow: "hidden",
            border: "2px solid var(--primary-accent)",
            boxShadow: "0 0 15px rgba(212, 175, 55, 0.3)",
          }}
        >
          {/* Background layer with professional image */}
          <div
            style={{
              position: "absolute",
              top: 0,
              left: 0,
              width: "100%",
              height: "100%",
              backgroundImage: `url(${backgroundImage})`,
              backgroundSize: "cover",
              backgroundPosition: "center",
              zIndex: 1,
              filter: "brightness(0.9) contrast(1.1)",
              opacity: backgroundLoaded ? 1 : 0,
              transition: "opacity 0.3s ease",
            }}
            onLoad={() => setBackgroundLoaded(true)}
          />

          {/* Loading placeholder */}
          {!backgroundLoaded && (
            <div
              style={{
                position: "absolute",
                top: 0,
                left: 0,
                width: "100%",
                height: "100%",
                background:
                  "linear-gradient(135deg, rgba(212, 175, 55, 0.1), rgba(30, 30, 35, 0.2))",
                zIndex: 1,
              }}
            />
          )}

          {/* Hidden image for loading detection */}
          <img
            src={backgroundImage}
            alt=""
            style={{ display: "none" }}
            onLoad={() => setBackgroundLoaded(true)}
            onError={() => setBackgroundLoaded(true)}
          />

          {/* Color overlay for brand consistency */}
          <div
            style={{
              position: "absolute",
              top: 0,
              left: 0,
              width: "100%",
              height: "100%",
              background:
                "linear-gradient(135deg, rgba(212, 175, 55, 0.15) 0%, rgba(30, 30, 35, 0.25) 100%)",
              zIndex: 2,
            }}
          />

          {/* Blurred testimonial photo overlay */}
          <img
            src={testimonial.image}
            alt={testimonial.name}
            loading="lazy"
            style={{
              position: "absolute",
              top: 0,
              left: 0,
              width: "100%",
              height: "100%",
              objectFit: "cover",
              filter: "blur(4px) brightness(0.7) saturate(0.8)",
              transform: "scale(1.2)",
              zIndex: 3,
              opacity: testimonialLoaded ? 0.5 : 0, // More transparency to show background blend
              mixBlendMode: "soft-light", // Softer blend for more natural look
              transition: "opacity 0.3s ease",
            }}
            onLoad={() => setTestimonialLoaded(true)}
            onError={() => setTestimonialLoaded(true)}
          />

          {/* Final glow accent */}
          <div
            style={{
              position: "absolute",
              top: 0,
              left: 0,
              width: "100%",
              height: "100%",
              background:
                "radial-gradient(circle at 30% 40%, rgba(212, 175, 55, 0.3) 0%, transparent 60%)",
              zIndex: 4,
              opacity: 0.6,
            }}
          />
        </div>
        <div className="testimonial-info">
          <div className="testimonial-name">{testimonial.name}</div>
          <div className="testimonial-company">{testimonial.company}</div>
        </div>
      </div>
      <div className="testimonial-content">
        <p className="testimonial-text">"{testimonial.text}"</p>
        <div
          className="testimonial-result"
          style={
            testimonial.result === "10X Büyüme"
              ? {
                  position: "relative",
                  backgroundColor: "var(--primary-accent)",
                  color: "var(--primary-white)",
                  padding: "0.75rem 1.5rem",
                  borderRadius: "20px",
                  fontSize: "1rem",
                  fontWeight: "700",
                  textAlign: "center",
                  marginTop: "auto",
                  textDecoration: "none",
                  paddingBottom: "10px",
                  display: "inline-block",
                }
              : {}
          }
        >
          {testimonial.result}
          {testimonial.result === "10X Büyüme" && (
            <div
              style={{
                position: "absolute",
                bottom: "-2px",
                left: "15%",
                right: "15%",
                height: "12px",
                backgroundImage:
                  'url(\'data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 20" preserveAspectRatio="none"><path d="M0,10 Q15,17 30,5 T60,12 T90,8 T100,15" stroke="%23ffffff" stroke-width="2.5" fill="none" stroke-linecap="round" /></svg>\')',
                backgroundSize: "100% 100%",
                backgroundRepeat: "no-repeat",
                opacity: 0.85,
                zIndex: 2,
                transform: "scale(1.05)",
                filter: "drop-shadow(0 1px 1px rgba(0,0,0,0.2))",
              }}
            ></div>
          )}
        </div>
      </div>
    </div>
  );
});

const TypewriterText = memo(() => {
  const [displayText, setDisplayText] = useState("");
  const [currentTextIndex, setCurrentTextIndex] = useState(0);
  const [isDeleting, setIsDeleting] = useState(false);

  const texts = [
    "Şirketinizi",
    "Kişisel Markanızı",
    "Ajansınızı",
    "Danışmanlığınızı",
    "Gelirinizi",
  ];

  useEffect(() => {
    const typingSpeed = 100; // Yazma hızı (ms)
    const deletingSpeed = 50; // Silme hızı (ms)
    const pauseTime = 2000; // Bekleme süresi (ms)

    let timer;

    const type = () => {
      const currentText = texts[currentTextIndex];

      if (isDeleting) {
        // Metin siliniyor
        if (displayText.length > 0) {
          setDisplayText((prev) => prev.slice(0, -1));
          timer = setTimeout(type, deletingSpeed);
        } else {
          setIsDeleting(false);
          setCurrentTextIndex((prev) => (prev + 1) % texts.length);
          timer = setTimeout(type, typingSpeed);
        }
      } else {
        // Metin yazılıyor
        if (displayText.length < currentText.length) {
          setDisplayText((prev) => currentText.slice(0, prev.length + 1));
          timer = setTimeout(type, typingSpeed);
        } else {
          timer = setTimeout(() => {
            setIsDeleting(true);
            type();
          }, pauseTime);
        }
      }
    };

    timer = setTimeout(type, typingSpeed);
    return () => clearTimeout(timer);
  }, [displayText, currentTextIndex, isDeleting]);

  return (
    <span>
      {displayText}
      <span
        className="cursor"
        style={{
          borderRight: "2px solid var(--primary-accent)",
          marginLeft: "2px",
          animation: "blink 1s step-end infinite",
        }}
      ></span>
    </span>
  );
});

const useIntersectionObserver = (options = {}) => {
  const [isVisible, setIsVisible] = useState(false);
  const elementRef = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        setIsVisible(entry.isIntersecting);
      },
      { threshold: 0.1, ...options }
    );

    const currentElement = elementRef.current;
    if (currentElement) {
      observer.observe(currentElement);
    }

    return () => {
      if (currentElement) {
        observer.unobserve(currentElement);
      }
    };
  }, [options]);

  return [elementRef, isVisible];
};

const RemainingSlots = () => {
  const calculateRemainingSlots = () => {
    // 15 kişilik başvuru kontenjanı - değerlendirmeye alınacak başvurular
    const fixedSlots = 15;

    // Zamanı kaydet
    const now = new Date().getTime();
    localStorage.setItem("lastVisitTime", now);

    // Sabit sayıyı localStorage'da sakla
    localStorage.setItem("remainingSlots", fixedSlots);

    return fixedSlots;
  };

  const [remainingSlots] = useState(calculateRemainingSlots);
  const [showTooltip, setShowTooltip] = useState(false);

  return (
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        gap: "1.5rem",
        flexWrap: "wrap",
      }}
    >
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          padding: "1.5rem",
          background:
            "linear-gradient(145deg, rgba(20, 20, 25, 0.95), rgba(15, 15, 20, 0.95))",
          borderRadius: "16px",
          border: "1px solid rgba(212, 175, 55, 0.2)",
          boxShadow: "0 15px 35px rgba(0, 0, 0, 0.2)",
          minWidth: "180px",
          position: "relative",
        }}
        onMouseEnter={() => setShowTooltip(true)}
        onMouseLeave={() => setShowTooltip(false)}
      >
        {showTooltip && (
          <div
            style={{
              position: "absolute",
              bottom: "calc(100% + 15px)",
              left: "50%",
              transform: "translateX(-50%)",
              backgroundColor: "rgba(30, 30, 35, 0.95)",
              color: "#fff",
              padding: "12px 16px",
              borderRadius: "8px",
              boxShadow: "0 5px 20px rgba(0, 0, 0, 0.3)",
              maxWidth: "250px",
              zIndex: 10,
              fontSize: "0.9rem",
              lineHeight: "1.4",
              textAlign: "center",
              border: "1px solid rgba(212, 175, 55, 0.3)",
              animation: "fadeIn 0.3s ease",
            }}
          >
            15 başvuruyu detaylı değerlendiriyoruz. Programımıza en uygun
            adayları seçerek premium hizmetimizden faydalanma fırsatı sunuyoruz.
            <div
              style={{
                position: "absolute",
                bottom: "-6px",
                left: "50%",
                transform: "translateX(-50%) rotate(45deg)",
                width: "12px",
                height: "12px",
                backgroundColor: "rgba(30, 30, 35, 0.95)",
                borderRight: "1px solid rgba(212, 175, 55, 0.3)",
                borderBottom: "1px solid rgba(212, 175, 55, 0.3)",
              }}
            />
          </div>
        )}
        <span
          style={{
            fontSize: "0.8rem",
            color: "rgba(212, 175, 55, 0.8)",
            marginBottom: "0.5rem",
            fontWeight: "600",
            textTransform: "uppercase",
            letterSpacing: "1px",
          }}
        >
          Premium Başvuru
        </span>
        <span
          style={{
            fontSize: "2.5rem",
            fontWeight: "800",
            color: "#fff",
            textShadow: "0 2px 10px rgba(0, 0, 0, 0.3)",
          }}
        >
          {remainingSlots}
        </span>
        <span
          style={{
            fontSize: "0.8rem",
            color: "rgba(255, 255, 255, 0.6)",
            marginTop: "0.5rem",
            textAlign: "center",
            lineHeight: "1.3",
          }}
        >
          Değerlendirmeye Alınacak
          <br />
          Başvuru Kontenjanı
        </span>
      </div>

      <div
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          padding: "1.5rem",
          background:
            "linear-gradient(145deg, rgba(20, 20, 25, 0.95), rgba(15, 15, 20, 0.95))",
          borderRadius: "16px",
          border: "1px solid rgba(212, 175, 55, 0.2)",
          boxShadow: "0 15px 35px rgba(0, 0, 0, 0.2)",
          minWidth: "180px",
          position: "relative",
          overflow: "hidden",
        }}
      >
        {/* Gold accent corner */}
        <div
          style={{
            position: "absolute",
            top: 0,
            right: 0,
            width: "30px",
            height: "30px",
            overflow: "hidden",
          }}
        >
          <div
            style={{
              position: "absolute",
              top: 0,
              right: 0,
              width: "60px",
              height: "60px",
              background: "rgba(212, 175, 55, 0.7)",
              transform: "rotate(45deg) translate(20px, -20px)",
              boxShadow: "0 0 10px rgba(0,0,0,0.2)",
            }}
          />
        </div>

        <span
          style={{
            fontSize: "0.8rem",
            color: "rgba(212, 175, 55, 0.8)",
            marginBottom: "0.5rem",
            fontWeight: "600",
            textTransform: "uppercase",
            letterSpacing: "1px",
          }}
        >
          Başarı Oranı
        </span>
        <span
          style={{
            fontSize: "2.5rem",
            fontWeight: "800",
            color: "#fff",
            textShadow: "0 2px 10px rgba(0, 0, 0, 0.3)",
            background: "linear-gradient(to right, #ffffff, #f5e7a3)",
            WebkitBackgroundClip: "text",
            WebkitTextFillColor: "transparent",
          }}
        >
          %98.5
        </span>
        <span
          style={{
            fontSize: "0.8rem",
            color: "rgba(255, 255, 255, 0.6)",
            marginTop: "0.5rem",
          }}
        >
          Müşteri Memnuniyeti
        </span>
      </div>
    </div>
  );
};

function App() {
  const INITIAL_SLOTS = 50;
  const CAMPAIGN_END_TIME = new Date("2025-07-05T23:59:59").getTime();

  // Pixel Tracking Functions
  const trackPageView = () => {
    // Facebook Pixel
    if (typeof fbq !== "undefined") {
      fbq("track", "PageView");
    }
  };

  const trackVideoPlay = () => {
    // Facebook Pixel
    if (typeof fbq !== "undefined") {
      fbq("track", "ViewContent", {
        content_type: "video",
        content_name: "Hero Video - DOGANVENTURES",
      });
    }
  };

  const trackCtaClick = (ctaName) => {
    // Facebook Pixel
    if (typeof fbq !== "undefined") {
      fbq("track", "InitiateCheckout", {
        content_name: ctaName,
        value: 1000,
        currency: "TRY",
      });

      // Önemli CTA'lar için Lead Intent tracking
      if (
        ctaName.includes("Ücretsiz Analiz") ||
        ctaName.includes("Strateji Analizi") ||
        ctaName.includes("Hediye Analiz")
      ) {
        fbq("track", "Lead", {
          content_name: `Lead Intent - ${ctaName}`,
          value: 500,
          currency: "TRY",
        });
        console.log(`🎯 Lead Intent tracked for: ${ctaName}`);
      }
    }
  };

  // Component load tracking
  useEffect(() => {
    trackPageView();
  }, []);

  const calculateRemainingSlots = () => {
    // 15 kişilik başvuru kontenjanı - değerlendirmeye alınacak başvurular
    const fixedSlots = 15;

    // Zamanı kaydet
    const now = new Date().getTime();
    localStorage.setItem("lastVisitTime", now);

    // Sabit sayıyı localStorage'da sakla
    localStorage.setItem("remainingSlots", fixedSlots);

    return fixedSlots;
  };

  const [remainingSlots, setRemainingSlots] = useState(calculateRemainingSlots);

  useEffect(() => {
    const timer = setInterval(() => {
      setRemainingSlots(calculateRemainingSlots());
    }, 60000); // Update every minute

    return () => clearInterval(timer);
  }, []);

  const [showModal, setShowModal] = useState(false);
  const [currentStep, setCurrentStep] = useState(1);
  const [activeProofTab, setActiveProofTab] = useState(0);

  // FAQ Accordion state - her sorunun açık/kapalı durumu
  const [faqOpenStates, setFaqOpenStates] = useState({
    0: false,
    1: false,
    2: false,
    3: false,
    4: false,
  });

  // FAQ toggle function
  const toggleFaq = (index) => {
    setFaqOpenStates((prev) => ({
      ...prev,
      [index]: !prev[index],
    }));
  };
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    company: "",
    industry: "",
    monthlyBudget: "",
    services: [],
    goals: "",
    timeline: "",
    challenges: "",
  });
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [urgencyTimer, setUrgencyTimer] = useState(3600); // 1 hour in seconds

  // Countdown timer effect
  useEffect(() => {
    const timer = setInterval(() => {
      setUrgencyTimer((prev) => (prev > 0 ? prev - 1 : 0));
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  // Format timer
  const formatTime = (seconds) => {
    const hrs = Math.floor(seconds / 3600);
    const mins = Math.floor((seconds % 3600) / 60);
    const secs = seconds % 60;
    return `${hrs.toString().padStart(2, "0")}:${mins
      .toString()
      .padStart(2, "0")}:${secs.toString().padStart(2, "0")}`;
  };

  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;

    if (type === "checkbox") {
      setFormData((prev) => ({
        ...prev,
        services: checked
          ? [...prev.services, value]
          : prev.services.filter((service) => service !== value),
      }));
    } else {
      setFormData((prev) => ({
        ...prev,
        [name]: value,
      }));
    }
  };

  const nextStep = () => {
    if (currentStep < 3) {
      setCurrentStep(currentStep + 1);
    }
  };

  const prevStep = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    // Only submit if on the last step (now step 3)
    if (currentStep < 3) {
      nextStep();
      return;
    }
    // Step 3: At least one service must be selected
    if (!formData.services || formData.services.length === 0) {
      // alert("Lütfen en az bir hizmet tercihi seçin.");
      return;
    }
    // Formu gönder, bildirim gösterme
    setIsSubmitted(true);

    console.log("📝 Form submission başlıyor...");

    // Map frontend fields to Supabase schema
    const payload = {
      full_name: formData.name,
      email: formData.email,
      phone: formData.phone,
      company_name: formData.company,
      sector: formData.industry,
      monthly_budget: formData.monthlyBudget,
      need_description: formData.goals,
      services: formData.services,
      utm_source:
        new URLSearchParams(window.location.search).get("utm_source") ||
        "doganventures_website",
      utm_medium:
        new URLSearchParams(window.location.search).get("utm_medium") ||
        "website_form",
      utm_campaign:
        new URLSearchParams(window.location.search).get("utm_campaign") ||
        "main_contact_form",
      created_at: new Date().toISOString(),
    };

    console.log("📊 Lead payload hazır:", payload);

    try {
      // Validate required fields
      if (
        !payload.full_name ||
        !payload.email ||
        !payload.phone ||
        !payload.company_name ||
        !payload.sector ||
        !payload.monthly_budget
      ) {
        alert("Lütfen tüm zorunlu alanları doldurun.");
        return;
      }

      // Insert to Supabase
      const { data, error } = await supabase
        .from("leads")
        .insert([payload])
        .select();
      if (error) throw new Error(error.message);

      console.log("✅ Lead Supabase'e kaydedildi:", data);

      // Facebook Pixel Lead Event - LEAD TRACKING
      if (typeof fbq !== "undefined") {
        fbq("track", "Lead", {
          content_name: "DOGANVENTURES Premium Consultation Lead",
          content_category: "Business Consultation",
          value: 1000,
          currency: "TRY",
          custom_data: {
            monthly_budget: payload.monthly_budget,
            company_name: payload.company_name,
            sector: payload.sector,
            lead_source: payload.utm_source || "doganventures_website",
          },
        });
        console.log("🎯 Facebook Lead Pixel tetiklendi - LEAD ALGILANDI!");
      } else {
        console.warn(
          "⚠️ Facebook Pixel bulunamadı - Lead tracking çalışmıyor!"
        );
      }
      // Send Telegram notification
      try {
        const { sendTelegramNotification } = await import(
          "./lib/sendTelegramNotification"
        );
        await sendTelegramNotification(payload);
      } catch (telegramErr) {
        // Telegram error is not fatal for user
        console.warn("Telegram bildirimi gönderilemedi:", telegramErr);
      }
      // Bildirim veya alert gösterme, sadece formu gönder ve teşekkür ekranı göster
    } catch (err) {
      alert("Hata: " + err.message);
    }
  };

  const testimonials = [
    {
      name: "Mehmet Özkan",
      company: "TechStart A.Ş.",
      image: "/testimonials/mehmet-ozkan.jpg",
      text: "DOGANVENTURES ile çalıştıktan sonra satışlarımız 280% arttı. RO'imiz hiç bu kadar yüksek olmamıştı.",
      result: "280% Satış Artışı",
    },
    {
      name: "Ayşe Demir",
      company: "Fashion Plus",
      image: "/testimonials/ayse-demir.jpg",
      text: "3 ayda 50.000 yeni müşteri kazandık. Profesyonel yaklaşımları ve sonuç odaklı stratejileri mükemmel.",
      result: "50K Yeni Müşteri",
    },
    {
      name: "Can Yılmaz",
      company: "HealthCare Pro",
      image: "/testimonials/can-yilmaz.jpg",
      text: "Dijital dönüşümümüzü başarıyla tamamladık. Artık sektörde lider konumdayız.",
      result: "Sektör Lideri",
    },
    {
      name: "Zeynep Kaya",
      company: "EduTech Solutions",
      image: "/testimonials/zeynep-kaya.jpg",
      text: "Online eğitim platformumuzun kullanıcı sayısı 6 ayda 10 katına çıktı. Müthiş bir büyüme stratejisi!",
      result: "10X Büyüme",
    },
    {
      name: "Ahmet Yıldız",
      company: "SmartRetail",
      image: "/testimonials/ahmet-yildiz.jpg",
      text: "E-ticaret operasyonlarımız tamamen optimize edildi. Kâr marjımız %150 artış gösterdi.",
      result: "150% Kâr Artışı",
    },
    {
      name: "Elif Şahin",
      company: "GreenEnergy Ltd.",
      image: "/testimonials/elif-sahin.jpg",
      text: "Sürdürülebilir enerji projelerimizin verimliliği inanılmaz arttı. Pazar payımız 3 kat büyüdü.",
      result: "3X Pazar Payı",
    },
    {
      name: "Burak Demir",
      company: "FinTech Plus",
      image: "/testimonials/burak-demir.jpg",
      text: "Finansal teknoloji çözümlerimiz sayesinde işlem hacmimiz %400 büyüdü. Rakiplerimizden açık ara öndeyiz.",
      result: "400% Hacim Artışı",
    },
    {
      name: "Selin Aydın",
      company: "BeautyBox",
      image: "/testimonials/selin-aydin.jpg",
      text: "Kozmetik markamızın online satışları 5 kat arttı. Sosyal medya stratejimiz tam isabet oldu.",
      result: "5X Online Satış",
    },
    {
      name: "Murat Öztürk",
      company: "AutoTech",
      image: "/testimonials/murat-ozturk.jpg",
      text: "Otomotiv teknolojileri sektöründe 1 numaraya yükseldik. Bayi ağımız %200 genişledi.",
      result: "200% Ağ Büyümesi",
    },
  ];

  const services = [
    {
      title: "İş Geliştirme & Satış",
      description:
        "Modern CRM sistemleri ve veri analitiği ile satış performansınızı maksimize ediyor, gelir akışlarınızı artırıyoruz.",
      icon: "fas fa-chart-line",
      features: [
        "Satış Süreç Optimizasyonu",
        "CRM Entegrasyonu",
        "Satış Ekibi Gelişimi",
        "Lead Generation",
        "Performans Analizi",
      ],
    },
    {
      title: "Pazarlama Stratejisi",
      description:
        "Kapsamlı pazar araştırması ve rekabet analizi ile markanızı sektörde öne çıkaracak güçlü stratejiler geliştiriyoruz.",
      icon: "fas fa-bullhorn",
      features: [
        "360° Marka Konumlandırma",
        "Detaylı Rekabet Analizi",
        "Hedef Kitle Segmentasyonu",
        "Pazar Penetrasyonu Planı",
        "ROI Odaklı Kampanyalar",
      ],
    },
    {
      title: "Dijital Pazarlama",
      description:
        "Entegre dijital pazarlama çözümleri ile online varlığınızı güçlendiriyor, dönüşüm oranlarınızı artırıyoruz.",
      icon: "fas fa-mobile-alt",
      features: [
        "Social Media Marketing",
        "Google Ads Optimizasyonu",
        "SEO & İçerik Stratejisi",
        "E-mail Marketing",
        "Conversion Rate Optimization",
      ],
    },
    {
      title: "Operasyonel Verimlilik",
      description:
        "Yapay zeka ve otomasyon teknolojileri ile iş süreçlerinizi optimize ederek maliyetlerinizi düşürüyoruz.",
      icon: "fas fa-cogs",
      features: [
        "Süreç Otomasyonu",
        "ERP Entegrasyonu",
        "Tedarik Optimizasyonu",
        "Kalite Kontrol",
        "Maliyet Yönetimi",
      ],
    },
    {
      title: "Ekip Geliştirme",
      description:
        "İnsan kaynaklarınızın potansiyelini açığa çıkaran gelişmiş eğitim ve koçluk programları sunuyoruz.",
      icon: "fas fa-users",
      features: [
        "Liderlik Gelişim Programı",
        "Yetenek Yönetimi",
        "Performans Değerlendirme",
        "Ekip Motivasyon Sistemleri",
        "Organizasyonel Gelişim",
      ],
    },
    {
      title: "İnovasyon Danışmanlığı",
      description:
        "Sektörünüzde öncü olmanızı sağlayacak yenilikçi çözümler ve dijital dönüşüm stratejileri geliştiriyoruz.",
      icon: "fas fa-lightbulb",
      features: [
        "Dijital Dönüşüm Planı",
        "AR/VR Çözümleri",
        "IoT Entegrasyonu",
        "Big Data Analytics",
        "Yapay Zeka Uygulamaları",
      ],
    },
  ];

  // Using the RemainingSlots component that's already defined at the top level

  return (
    <div className="App">
      {/* Navigation Bar */}
      <nav
        style={{
          position: "fixed",
          top: 0,
          width: "100%",
          background: "rgba(10, 10, 10, 0.95)",
          backdropFilter: "blur(10px)",
          zIndex: 100,
          padding: "1rem 0",
          borderBottom: "1px solid var(--border-color)",
        }}
      >
        <div
          className="container"
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
          }}
        >
          <div
            style={{
              height: "80px",
              display: "flex",
              alignItems: "center",
            }}
          >
            <img
              src="/logo.jpg"
              alt="DOGANVENTURES Logo"
              style={{
                height: "100%",
                objectFit: "contain",
              }}
            />
          </div>
          <button
            className="btn btn-primary"
            onClick={() => {
              trackCtaClick("Header CTA - Ücretsiz Analiz");
              setShowModal(true);
            }}
            style={{ padding: "0.75rem 1.5rem" }}
          >
            Ücretsiz Analiz Al
          </button>
        </div>
      </nav>
      {/* Hero Section */}
      <section
        className="section"
        style={{
          paddingTop: "8rem",
          background:
            "linear-gradient(135deg, rgba(10, 10, 10, 0.9) 0%, rgba(26, 26, 26, 0.9) 100%)",
          position: "relative",
        }}
      >
        <div className="container text-center">
          {/* Urgency Timer */}
          <div
            onClick={() => {
              trackCtaClick("Urgency Timer - ACİL FIRSAT Click");
              setShowModal(true);
            }}
            className="pulse"
            style={{
              backgroundColor: "rgba(255, 59, 48, 0.95)",
              color: "var(--primary-white)",
              padding: "1rem 2rem",
              borderRadius: "50px",
              display: "inline-flex",
              alignItems: "center",
              marginBottom: "2rem",
              fontWeight: "800",
              fontSize: "1.1rem",
              transform: "translateZ(0)",
              willChange: "transform",
              cursor: "pointer",
              boxShadow: "0 4px 15px rgba(255, 59, 48, 0.3)",
              transition: "all 0.3s ease",
              border: "2px solid rgba(255, 255, 255, 0.2)",
              maxWidth: "90%",
              flexWrap: "wrap",
              justifyContent: "center",
              gap: "0.5rem",
              animation: "pulse 2s infinite, glow 3s infinite",
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.transform = "translateZ(0) scale(1.03)";
              e.currentTarget.style.boxShadow =
                "0 6px 20px rgba(255, 59, 48, 0.4)";
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.transform = "translateZ(0) scale(1)";
              e.currentTarget.style.boxShadow =
                "0 4px 15px rgba(255, 59, 48, 0.3)";
            }}
          >
            <i
              className="fas fa-exclamation-circle"
              style={{ marginRight: "0.75rem", fontSize: "1.2em" }}
            ></i>
            <span>
              <strong style={{ color: "#FFE66D" }}>ACİL FIRSAT:</strong> Son{" "}
              {formatTime(urgencyTimer)} • Son {remainingSlots} Başvuru
              Kontenjanı!
            </span>
          </div>

          <h1 className="mb-4">
            <TypewriterText /> Dijitalde
            <br />
            <span
              style={{
                color: "var(--primary-accent)",
                fontWeight: "bold",
              }}
            >
              10X BÜYÜTÜN
            </span>
          </h1>

          <p
            style={{
              fontSize: "1.25rem",
              maxWidth: "600px",
              margin: "0 auto 3rem",
              color: "var(--text-light)",
            }}
          >
            Türkiye'nin en prestijli danışmanlık şirketi ile işinizi sektörde
            lider yapın. 1000+ başarılı projeyle kanıtlanmış yöntemlerimizle
            garantili büyüme.
          </p>

          <div
            style={{
              display: "flex",
              gap: "1rem",
              justifyContent: "center",
              flexWrap: "wrap",
              marginBottom: "3rem",
            }}
          >
            <button
              className="btn btn-primary btn-large"
              onClick={() => {
                trackCtaClick("Hero CTA - Ücretsiz Strateji Analizi");
                setShowModal(true);
              }}
            >
              <i
                className="fas fa-rocket"
                style={{ marginRight: "0.5rem" }}
              ></i>
              Ücretsiz Strateji Analizi Al
            </button>
            <button
              className="btn btn-secondary btn-large"
              onClick={() => {
                trackCtaClick("Hero Section - Başarı Hikayelerini İzle");
                document
                  .getElementById("case-studies")
                  .scrollIntoView({ behavior: "smooth" });
              }}
            >
              <i className="fas fa-play" style={{ marginRight: "0.5rem" }}></i>
              Başarı Hikayelerini İzle
            </button>
          </div>

          {/* Trust Indicators */}
          <div
            style={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              gap: "3rem",
              flexWrap: "wrap",
            }}
          >
            <div className="text-center">
              <div className="stat-number">1000+</div>
              <div className="stat-label">Başarılı Proje</div>
            </div>
            <div className="text-center">
              <div className="stat-number">₺50M+</div>
              <div className="stat-label">Yönetilen Bütçe</div>
            </div>
            <div className="text-center">
              <div className="stat-number">300%</div>
              <div className="stat-label">Ortalama ROI Artışı</div>
            </div>
            <div className="text-center">
              <div className="stat-number">7/24</div>
              <div className="stat-label">Premium Destek</div>
            </div>
          </div>
        </div>
      </section>
      {/* Services & Information Video Section */}
      <section
        className="section-narrow"
        style={{ background: "var(--bg-card)" }}
      >
        <div className="container text-center">
          <h2 className="mb-4">Verdiğimiz Hizmetler & Biz Kimiz</h2>
          <p
            style={{
              maxWidth: "700px",
              margin: "0 auto 2rem",
              color: "var(--text-light)",
              fontSize: "1.1rem",
              lineHeight: "1.6",
            }}
          >
            Profesyonel ekibimiz ve benzersiz yaklaşımımızla, dijital pazarlama
            ve iş geliştirme alanında doğru bilinen yanlışları düzeltiyoruz.
            İşte fark yaratan metodolojimiz:
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
              <video
                controls
                autoPlay={false}
                muted
                preload="metadata"
                poster="/assets/proofs/funnel-1.gif"
                onPlay={() => trackVideoPlay()}
                style={{
                  position: "absolute",
                  top: 0,
                  left: 0,
                  width: "100%",
                  height: "100%",
                  objectFit: "cover",
                  borderRadius: "20px",
                }}
              >
                <source
                  src="/assets/videos/satis-egitimi.mp4"
                  type="video/mp4"
                />
                Your browser does not support the video tag.
              </video>
            </div>
          </div>
          <div
            style={{
              display: "flex",
              justifyContent: "center",
              flexWrap: "wrap",
              gap: "2rem",
              marginTop: "3rem",
            }}
          >
            <div
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
                  className="fas fa-check-circle"
                  style={{ marginRight: "8px" }}
                ></i>
                Doğru Bilinen Yanlışlar
              </h3>
              <p
                style={{
                  color: "var(--text-light)",
                  fontSize: "0.95rem",
                  lineHeight: "1.6",
                }}
              >
                Dijital pazarlamada sadece reklam harcaması yapmanın yeterli
                olduğu, hızlı sonuçlar alabileceğiniz ve herkesin aynı
                stratejilerle başarılı olabileceği gibi yaygın yanılgıları
                ortadan kaldırıyoruz.
              </p>
            </div>
            <div
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
                  className="fas fa-lightbulb"
                  style={{ marginRight: "8px" }}
                ></i>
                Benzersiz Yaklaşımımız
              </h3>
              <p
                style={{
                  color: "var(--text-light)",
                  fontSize: "0.95rem",
                  lineHeight: "1.6",
                }}
              >
                Veri odaklı stratejilerimiz, sektör uzmanlığımız ve
                kişiselleştirilmiş çözümlerimizle işletmenizin gerçek
                potansiyelini ortaya çıkarıyor, sürdürülebilir büyüme
                sağlıyoruz.
              </p>
            </div>
          </div>
        </div>
      </section>
      {/* Premium Brands Section - Danışmanlık Hizmetleri */}
      <PremiumBrandsSection />
      
      {/* Premium Partner Brands Section */}
      <section
        style={{
          background: "linear-gradient(135deg, rgba(5, 5, 15, 0.98) 0%, rgba(25, 25, 35, 0.98) 100%)",
          padding: "6rem 0",
          position: "relative",
          borderTop: "1px solid rgba(212, 175, 55, 0.15)",
          borderBottom: "1px solid rgba(212, 175, 55, 0.15)",
          overflow: "hidden",
        }}
      >
        {/* Premium Background Pattern */}
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

        {/* Gold Accent Elements */}
        <div
          style={{
            position: "absolute",
            top: "10%",
            right: "5%",
            width: "300px",
            height: "300px",
            borderRadius: "50%",
            background: "radial-gradient(circle, rgba(212, 175, 55, 0.08) 0%, transparent 70%)",
            pointerEvents: "none",
            filter: "blur(40px)",
          }}
        />
        <div
          style={{
            position: "absolute",
            bottom: "15%",
            left: "10%",
            width: "250px",
            height: "250px",
            borderRadius: "50%",
            background: "radial-gradient(circle, rgba(212, 175, 55, 0.06) 0%, transparent 70%)",
            pointerEvents: "none",
            filter: "blur(40px)",
          }}
        />

        {/* Top Accent Line */}
        <div
          style={{
            position: "absolute",
            width: "100%",
            height: "1px",
            top: "0",
            background: "linear-gradient(90deg, transparent, rgba(212, 175, 55, 0.8), transparent)",
            opacity: "0.8",
          }}
        />

        <div className="container" style={{ maxWidth: "1200px", margin: "0 auto", padding: "0 20px", position: "relative", zIndex: 2 }}>
          {/* Premium Header */}
          <div style={{ textAlign: "center", marginBottom: "4rem" }}>
            {/* Luxury Badge */}
            <div
              style={{
                display: "inline-block",
                padding: "8px 20px",
                background: "linear-gradient(135deg, rgba(212, 175, 55, 0.9), rgba(244, 228, 188, 0.9))",
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
              Trusted Partners
            </div>

            <h2
              style={{
                color: "var(--primary-white)",
                fontSize: "2.8rem",
                marginBottom: "1.5rem",
                fontWeight: "800",
                textShadow: "0 2px 10px rgba(0, 0, 0, 0.3)",
                letterSpacing: "0.5px",
                background: "linear-gradient(to right, #ffffff, #f5e7a3, #ffffff)",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
                textAlign: "center",
              }}
            >
              Bizimle Çalışan Markalar
            </h2>

            {/* Ornamental Flourishes */}
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
                  background: "linear-gradient(to right, rgba(212, 175, 55, 0.1), rgba(212, 175, 55, 0.5))",
                }}
              />
              <div style={{ padding: "0 1rem" }}>
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
                  background: "linear-gradient(to left, rgba(212, 175, 55, 0.1), rgba(212, 175, 55, 0.5))",
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
              Türkiye'nin önde gelen markalarının güvendiği çözüm ortağıyız. 
              Sektör liderlerine özel, premium danışmanlık hizmetleri sunuyoruz.
            </p>
          </div>

          {/* Premium Logo Showcase Container */}
          <div
            style={{
              background: "linear-gradient(to right, rgba(10, 10, 15, 0.9), rgba(25, 25, 40, 0.9), rgba(10, 10, 15, 0.9))",
              borderRadius: "24px",
              padding: "3rem 2rem",
              border: "1px solid rgba(212, 175, 55, 0.3)",
              backdropFilter: "blur(15px)",
              boxShadow: "0 30px 100px rgba(0, 0, 0, 0.4), 0 0 40px rgba(212, 175, 55, 0.2)",
              position: "relative",
              overflow: "hidden",
            }}
          >
            {/* Inner Top Accent */}
            <div
              style={{
                position: "absolute",
                top: "0",
                left: "0",
                right: "0",
                height: "1px",
                background: "linear-gradient(90deg, transparent, rgba(212, 175, 55, 0.8), transparent)",
              }}
            />

            {/* Premium Marquee Animation */}
            <div
              style={{
                position: "relative",
                overflow: "hidden",
                mask: "linear-gradient(90deg, transparent 0%, black 15%, black 85%, transparent 100%)",
                WebkitMask: "linear-gradient(90deg, transparent 0%, black 15%, black 85%, transparent 100%)",
                padding: "1rem 0",
              }}
            >
              <div
                className="brands-marquee"
                style={{
                  display: "flex",
                  animation: "marqueeScroll 60s linear infinite",
                  width: "200%",
                  gap: "4rem",
                  alignItems: "center",
                }}
              >
                {/* First set of premium logo cards */}
                <div
                  style={{
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center",
                    width: "50%",
                    gap: "2.5rem",
                    padding: "0 1rem",
                  }}
                >
                  {[
                    "alkış.png",
                    "artife.png", 
                    "besttem.png",
                    "freemen.png",
                    "gülfem.png",
                    "ispanyolcaonline.png",
                    "kutsalhaber.png"
                  ].map((logo, index) => (
                    <div
                      key={`premium-first-${index}`}
                      style={{
                        background: "linear-gradient(145deg, rgba(212, 175, 55, 0.9), rgba(244, 228, 188, 0.85))",
                        borderRadius: "16px",
                        padding: "1.2rem",
                        border: "1px solid rgba(212, 175, 55, 0.6)",
                        boxShadow: `
                          0 8px 32px rgba(0, 0, 0, 0.15),
                          inset 0 1px 0 rgba(255, 255, 255, 0.3),
                          0 0 0 1px rgba(212, 175, 55, 0.4),
                          0 0 15px rgba(212, 175, 55, 0.3)
                        `,
                        transition: "all 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.275)",
                        minWidth: "150px",
                        width: "150px",
                        height: "100px",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        position: "relative",
                        backdropFilter: "blur(10px)",
                        overflow: "hidden",
                        flexShrink: 0,
                      }}
                      onMouseEnter={(e) => {
                        e.currentTarget.style.transform = "translateY(-6px) scale(1.03)";
                        e.currentTarget.style.boxShadow = `
                          0 15px 35px rgba(0, 0, 0, 0.25),
                          inset 0 1px 0 rgba(255, 255, 255, 1),
                          0 0 0 1px rgba(212, 175, 55, 0.5),
                          0 0 25px rgba(212, 175, 55, 0.3)
                        `;
                      }}
                      onMouseLeave={(e) => {
                        e.currentTarget.style.transform = "translateY(0) scale(1)";
                        e.currentTarget.style.boxShadow = `
                          0 8px 32px rgba(0, 0, 0, 0.15),
                          inset 0 1px 0 rgba(255, 255, 255, 0.9),
                          0 0 0 1px rgba(212, 175, 55, 0.3),
                          0 0 15px rgba(212, 175, 55, 0.2)
                        `;
                      }}
                    >
                      {/* Premium Badge */}
                      <div
                        style={{
                          position: "absolute",
                          top: "6px",
                          right: "6px",
                          width: "8px",
                          height: "8px",
                          borderRadius: "50%",
                          background: "linear-gradient(135deg, #d4af37, #f4e4bc)",
                          boxShadow: "0 2px 4px rgba(0,0,0,0.3)",
                          opacity: "0.8",
                        }}
                      />
                      
                      <img
                        src={`/assets/company-logos/${logo}`}
                        alt={`${logo.replace('.png', '')} Premium Partner`}
                        style={{
                          maxWidth: "100%",
                          maxHeight: "100%",
                          objectFit: "contain",
                          filter: "brightness(1) saturate(1.1) contrast(1.1)",
                          transition: "filter 0.3s ease",
                        }}
                        loading="lazy"
                      />
                    </div>
                  ))}
                </div>

                {/* Second set of premium logo cards */}
                <div
                  style={{
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center",
                    width: "50%",
                    gap: "2.5rem",
                    padding: "0 1rem",
                  }}
                >
                  {[
                    "metinbingöl.png",
                    "mialosi.png",
                    "nortsofa.png",
                    "özgüvenakademi.png",
                    "pelda.png",
                    "personaljesus.png",
                    "supx.png"
                  ].map((logo, index) => (
                    <div
                      key={`premium-second-${index}`}
                      style={{
                        background: "linear-gradient(145deg, rgba(212, 175, 55, 0.9), rgba(244, 228, 188, 0.85))",
                        borderRadius: "16px",
                        padding: "1.2rem",
                        border: "1px solid rgba(212, 175, 55, 0.6)",
                        boxShadow: `
                          0 8px 32px rgba(0, 0, 0, 0.15),
                          inset 0 1px 0 rgba(255, 255, 255, 0.3),
                          0 0 0 1px rgba(212, 175, 55, 0.4),
                          0 0 15px rgba(212, 175, 55, 0.3)
                        `,
                        transition: "all 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.275)",
                        minWidth: "150px",
                        width: "150px",
                        height: "100px",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        position: "relative",
                        backdropFilter: "blur(10px)",
                        overflow: "hidden",
                        flexShrink: 0,
                      }}
                      onMouseEnter={(e) => {
                        e.currentTarget.style.transform = "translateY(-6px) scale(1.03)";
                        e.currentTarget.style.boxShadow = `
                          0 15px 35px rgba(0, 0, 0, 0.25),
                          inset 0 1px 0 rgba(255, 255, 255, 0.4),
                          0 0 0 1px rgba(212, 175, 55, 0.6),
                          0 0 25px rgba(212, 175, 55, 0.4)
                        `;
                        e.currentTarget.style.background = "linear-gradient(145deg, rgba(212, 175, 55, 0.95), rgba(244, 228, 188, 0.9))";
                      }}
                      onMouseLeave={(e) => {
                        e.currentTarget.style.transform = "translateY(0) scale(1)";
                        e.currentTarget.style.boxShadow = `
                          0 8px 32px rgba(0, 0, 0, 0.15),
                          inset 0 1px 0 rgba(255, 255, 255, 0.3),
                          0 0 0 1px rgba(212, 175, 55, 0.4),
                          0 0 15px rgba(212, 175, 55, 0.3)
                        `;
                        e.currentTarget.style.background = "linear-gradient(145deg, rgba(212, 175, 55, 0.9), rgba(244, 228, 188, 0.85))";
                      }}
                    >
                      {/* Premium Badge */}
                      <div
                        style={{
                          position: "absolute",
                          top: "6px",
                          right: "6px",
                          width: "8px",
                          height: "8px",
                          borderRadius: "50%",
                          background: "linear-gradient(135deg, #d4af37, #f4e4bc)",
                          boxShadow: "0 2px 4px rgba(0,0,0,0.3)",
                          opacity: "0.8",
                        }}
                      />
                      
                      <img
                        src={`/assets/company-logos/${logo}`}
                        alt={`${logo.replace('.png', '')} Premium Partner`}
                        style={{
                          maxWidth: "100%",
                          maxHeight: "100%",
                          objectFit: "contain",
                          filter: "brightness(0.8) saturate(1.1) contrast(1.2)",
                          transition: "filter 0.3s ease",
                        }}
                        loading="lazy"
                      />
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* Premium Bottom Note */}
          <div
            style={{
              textAlign: "center",
              marginTop: "3rem",
              padding: "1.5rem",
              background: "rgba(212, 175, 55, 0.08)",
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
              Her partneri, sektöründe öncü olan markalardan oluşur. Güven, 
              kalite ve sürdürülebilir başarı odaklı işbirlikleri kuruyoruz.
            </p>
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section
        id="case-studies"
        className="section"
        style={{
          background: "var(--bg-card)",
          contain: "content",
          contentVisibility: "auto",
        }}
      >
        <div className="container">
          <div className="text-center mb-5">
            <h2 className="mb-3">Müşteri Yorumları</h2>
            <p
              style={{
                maxWidth: "600px",
                margin: "0 auto",
                fontSize: "1.1rem",
                color: "var(--text-light)",
              }}
            >
              Bizimle çalışan şirketlerin gerçek deneyimleri ve elde ettikleri
              sonuçlar.
            </p>
          </div>

          <div style={{ maxWidth: "100%", margin: "0 auto" }}>
            <Slider
              {...{
                dots: true,
                infinite: true,
                speed: 500,
                slidesToShow: 3,
                slidesToScroll: 1,
                autoplay: true,
                autoplaySpeed: 3000,
                pauseOnHover: true,
                responsive: [
                  {
                    breakpoint: 1024,
                    settings: {
                      slidesToShow: 2,
                      slidesToScroll: 1,
                    },
                  },
                  {
                    breakpoint: 600,
                    settings: {
                      slidesToShow: 1,
                      slidesToScroll: 1,
                    },
                  },
                ],
              }}
            >
              {testimonials.map((testimonial, index) => (
                <div key={index} style={{ padding: "1rem" }}>
                  <TestimonialCard testimonial={testimonial} />
                </div>
              ))}
            </Slider>
          </div>
        </div>
      </section>
      {/* Başarı Hikayeleri ve Kanıtlar Bölümü */}
      <section className="section" style={{ background: "var(--bg-card)" }}>
        <div className="container">
          <div className="text-center mb-5">
            <h2 className="mb-3">Başarılarımızı Rakamlarla Görün</h2>
            <p
              style={{
                maxWidth: "800px",
                margin: "0 auto",
                fontSize: "1.1rem",
                color: "var(--text-light)",
              }}
            >
              Müşterilerimizle elde ettiğimiz gerçek sonuçlar, metrikler ve
              büyüme hikayeleri
            </p>
          </div>

          <div className="proof-tabs">
            <div className="proof-tab-buttons">
              {[
                "Funnellar & Dönüşümler",
                "Reklam Performansı",
                "Eğitim & Workshoplar",
                "Dokümanlar & Raporlar",
              ].map((tab, index) => (
                <button
                  key={index}
                  className={`proof-tab-button ${
                    activeProofTab === index ? "active" : ""
                  }`}
                  onClick={() => {
                    trackCtaClick(`Proof Tab - ${tab}`);
                    setActiveProofTab(index);
                  }}
                >
                  <i
                    className={`fas ${
                      index === 0
                        ? "fa-filter"
                        : index === 1
                        ? "fa-chart-line"
                        : index === 2
                        ? "fa-graduation-cap"
                        : "fa-file-alt"
                    } me-2`}
                  ></i>
                  {tab}
                </button>
              ))}
            </div>

            <div className="proof-tab-content">
              {/* Funnel & Dönüşümler */}
              {activeProofTab === 0 && (
                <div className="proof-grid">
                  <div className="proof-item">
                    <div className="proof-media">
                      <img
                        src="/assets/proofs/funnel-1.gif"
                        alt="E-ticaret Funnel Optimizasyonu"
                        loading="lazy"
                      />
                    </div>
                    <div className="proof-info">
                      <h4>E-ticaret Funnel Optimizasyonu</h4>
                      <p>Dönüşüm oranı: 1.2% → 4.8%</p>
                      <span className="proof-tag">+300% Artış</span>
                    </div>
                  </div>
                  <div className="proof-item">
                    <div className="proof-media">
                      <img
                        src="/assets/proofs/funnel-2.gif"
                        alt="SaaS Müşteri Yolculuğu"
                        loading="lazy"
                      />
                    </div>
                    <div className="proof-info">
                      <h4>SaaS Müşteri Yolculuğu</h4>
                      <p>Trial'dan ödemeye geçiş: 5% → 15%</p>
                      <span className="proof-tag">+200% Artış</span>
                    </div>
                  </div>
                  <div className="proof-item">
                    <div className="proof-media">
                      <img
                        src="/assets/proofs/funnel-3.gif"
                        alt="Lead Generation Funnel"
                        loading="lazy"
                      />
                    </div>
                    <div className="proof-info">
                      <h4>Lead Generation Funnel</h4>
                      <p>Form doldurma oranı: 2.5% → 8.9%</p>
                      <span className="proof-tag">+256% Artış</span>
                    </div>
                  </div>
                </div>
              )}

              {/* Reklam Performansı */}
              {activeProofTab === 1 && (
                <div className="proof-grid">
                  <div className="proof-item">
                    <div className="proof-media">
                      <img
                        src="/assets/proofs/ads-1.jpg"
                        alt="Facebook Ads ROAS"
                        loading="lazy"
                      />
                    </div>
                    <div className="proof-info">
                      <h4>Facebook Ads Performansı</h4>
                      <p>ROAS: 2.1 → 6.4</p>
                      <span className="proof-tag">+205% ROAS Artışı</span>
                    </div>
                  </div>
                  <div className="proof-item">
                    <div className="proof-media">
                      <img
                        src="/assets/proofs/ads-2.jpg"
                        alt="Google Ads Performansı"
                        loading="lazy"
                      />
                    </div>
                    <div className="proof-info">
                      <h4>Google Ads Optimizasyonu</h4>
                      <p>CPA: ₺180 → ₺45</p>
                      <span className="proof-tag">-75% Maliyet Düşüşü</span>
                    </div>
                  </div>
                  <div className="proof-item">
                    <div className="proof-media">
                      <img
                        src="/assets/proofs/ads-3.jpg"
                        alt="TikTok Ads Sonuçları"
                        loading="lazy"
                      />
                    </div>
                    <div className="proof-info">
                      <h4>TikTok Ads Kampanyası</h4>
                      <p>CTR: 0.8% → 3.2%</p>
                      <span className="proof-tag">+300% Tıklama Oranı</span>
                    </div>
                  </div>
                </div>
              )}

              {/* Eğitim & Workshoplar */}
              {activeProofTab === 2 && (
                <div className="proof-grid">
                  <div className="proof-item">
                    <div className="proof-media video">
                      <video
                        controls
                        autoPlay={false}
                        muted
                        preload="metadata"
                        poster="/assets/proofs/funnel-1.gif"
                        onPlay={() => trackVideoPlay()}
                        style={{
                          width: "100%",
                          height: "100%",
                          objectFit: "cover",
                          borderRadius: "8px",
                        }}
                      >
                        <source
                          src="/assets/videos/satis-egitimi.mp4"
                          type="video/mp4"
                        />
                        Your browser does not support the video tag.
                      </video>
                    </div>
                    <div className="proof-info">
                      <h4>Satış Ekibi Eğitimi</h4>
                      <p>200+ Katılımcı, 15+ Şirket</p>
                      <span className="proof-tag">Canlı Workshop</span>
                    </div>
                  </div>
                  <div className="proof-item">
                    <div className="proof-media">
                      <img
                        src="/assets/proofs/training-1.jpg"
                        alt="Dijital Pazarlama Eğitimi"
                        loading="lazy"
                      />
                    </div>
                    <div className="proof-info">
                      <h4>Dijital Pazarlama Masterclass</h4>
                      <p>8 Haftalık Program, 50+ Mezun</p>
                      <span className="proof-tag">Sertifikalı Eğitim</span>
                    </div>
                  </div>
                  <div className="proof-item">
                    <div className="proof-media">
                      <img
                        src="/assets/proofs/training-2.jpg"
                        alt="Growth Hacking Workshop"
                        loading="lazy"
                      />
                    </div>
                    <div className="proof-info">
                      <h4>Growth Hacking Workshop</h4>
                      <p>3 Günlük Yoğun Program</p>
                      <span className="proof-tag">Hands-on Pratik</span>
                    </div>
                  </div>
                </div>
              )}

              {/* Dokümanlar & Raporlar */}
              {activeProofTab === 3 && (
                <div className="proof-grid">
                  <div className="proof-item document">
                    <div className="proof-media document">
                      <i className="fas fa-file-pdf fa-3x"></i>
                    </div>
                    <div className="proof-info">
                      <h4>2025 Dijital Pazarlama Trendleri</h4>
                      <p>38 Sayfa Detaylı Analiz</p>
                      <a
                        href="#"
                        className="proof-download-btn"
                        onClick={(e) => {
                          e.preventDefault();
                          trackCtaClick("Proof Download - PDF Trends Report");
                        }}
                      >
                        <i className="fas fa-download me-2"></i>
                        PDF İndir
                      </a>
                    </div>
                  </div>
                  <div className="proof-item document">
                    <div className="proof-media document">
                      <i className="fas fa-file-powerpoint fa-3x"></i>
                    </div>
                    <div className="proof-info">
                      <h4>Vaka Analizi: E-ticaret Büyüme</h4>
                      <p>12 Aylık Başarı Hikayesi</p>
                      <a
                        href="#"
                        className="proof-download-btn"
                        onClick={(e) => {
                          e.preventDefault();
                          trackCtaClick(
                            "Proof Download - PowerPoint E-ticaret Vaka"
                          );
                        }}
                      >
                        <i className="fas fa-download me-2"></i>
                        Sunum İndir
                      </a>
                    </div>
                  </div>
                  <div className="proof-item document">
                    <div className="proof-media document">
                      <i className="fas fa-file-excel fa-3x"></i>
                    </div>
                    <div className="proof-info">
                      <h4>ROI Hesaplama Araçları</h4>
                      <p>Detaylı Metrik Takibi</p>
                      <a
                        href="#"
                        className="proof-download-btn"
                        onClick={(e) => {
                          e.preventDefault();
                          trackCtaClick(
                            "Proof Download - Excel ROI Calculator"
                          );
                        }}
                      >
                        <i className="fas fa-download me-2"></i>
                        Excel İndir
                      </a>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </section>
      {/* CTA Section */}
      <section className="section text-center">
        <div className="container">
          <h2 className="mb-3">Şirketinizi Zirveye Taşımaya Hazır mısınız?</h2>
          <p
            style={{
              maxWidth: "600px",
              margin: "0 auto 3rem",
              fontSize: "1.1rem",
              color: "var(--text-light)",
            }}
          >
            Bugün başvuran ilk 15 şirket için{" "}
            <strong style={{ color: "var(--accent-purple)" }}>
              ₺25.000 değerinde
            </strong>
            strategi analizi tamamen ücretsiz!
          </p>

          <button
            className="btn btn-primary btn-large"
            onClick={() => {
              trackCtaClick("CTA Section - Hediye Analizimi Hemen Al");
              setShowModal(true);
            }}
            style={{ fontSize: "1.2rem", padding: "1.5rem 3rem" }}
          >
            <i className="fas fa-gift" style={{ marginRight: "0.5rem" }}></i>
            Hediye Analizimi Hemen Al
          </button>

          <div
            style={{
              marginTop: "2rem",
              color: "var(--text-muted)",
              fontSize: "0.9rem",
            }}
          >
            <i
              className="fas fa-shield-alt"
              style={{ marginRight: "0.5rem" }}
            ></i>
            100% Gizlilik Garantisi • Satış Baskısı Yok • Anında Sonuç
          </div>
        </div>
      </section>
      {/* SSS - Sık Sorulan Sorular */}
      <section
        style={{
          background:
            "linear-gradient(145deg, rgba(22, 22, 27, 0.95), rgba(15, 15, 20, 0.95))",
          padding: "5rem 0",
          position: "relative",
          overflow: "hidden",
        }}
      >
        {/* Gold accent element */}
        <div
          style={{
            position: "absolute",
            top: "50px",
            right: "5%",
            width: "150px",
            height: "150px",
            background:
              "radial-gradient(circle, rgba(212, 175, 55, 0.15) 0%, transparent 70%)",
            borderRadius: "50%",
            filter: "blur(40px)",
          }}
        />

        <div className="container">
          <div className="text-center mb-5">
            <h2
              style={{
                fontSize: "2.5rem",
                marginBottom: "1.5rem",
                background: "linear-gradient(90deg, #d4af37, #f4e4bc, #d4af37)",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
                display: "inline-block",
              }}
            >
              Sık Sorulan Sorular
            </h2>
            <p
              style={{
                maxWidth: "700px",
                margin: "0 auto",
                color: "var(--text-light)",
                fontSize: "1.1rem",
              }}
            >
              Danışmanlık hizmetlerimiz hakkında merak ettiğiniz tüm soruların
              cevapları
            </p>
          </div>

          <div
            style={{
              maxWidth: "900px",
              margin: "0 auto",
            }}
          >
            {/* FAQ Items */}
            {[
              {
                question: "Danışmanlık süreciniz nasıl işliyor?",
                answer:
                  "Sürecimiz 4 aşamadan oluşuyor: (1) Ücretsiz keşif görüşmesi ile ihtiyaçlarınızı belirliyoruz, (2) Kapsamlı analiz ve strateji planı hazırlıyoruz, (3) Özel çözümler geliştirip uygulamaya alıyoruz, (4) Sürekli izleme ve optimizasyon ile sonuçları maksimize ediyoruz.",
              },
              {
                question: "Fiyatlandırma politikanız nasıl?",
                answer:
                  "Her işletmenin ihtiyaçları farklı olduğu için özel fiyatlandırma sunuyoruz. Projenin kapsamı, hedefler ve çalışma süresi gibi faktörlere göre şeffaf bir fiyatlandırma planı oluşturuyoruz. Standart paketlerimiz olsa da, size özel çözümler için ücretsiz keşif görüşmesinde detaylı bilgi veriyoruz.",
              },
              {
                question: "Ne kadar sürede sonuç almaya başlayabiliriz?",
                answer:
                  "İlk sonuçları genellikle 30-60 gün içinde görmeye başlarsınız. Ancak kapsamlı ve kalıcı sonuçlar için 3-6 aylık bir süreç öneriyoruz. Dijital pazarlama stratejileri, SEO çalışmaları ve marka konumlandırması gibi uzun vadeli stratejiler, zaman içinde katlanan etkiler yaratır ve kalıcı başarı sağlar.",
              },
              {
                question: "Hangi sektörlerde hizmet veriyorsunuz?",
                answer:
                  "E-ticaret, SaaS, fintech, gayrimenkul, sağlık, eğitim ve profesyonel hizmetler başta olmak üzere çok çeşitli sektörlerde deneyimimiz bulunmaktadır. Sektör spesifik zorluklara özel çözümler geliştiriyor, her işletmenin kendi pazarındaki rekabet avantajını artırıyoruz.",
              },
              {
                question: "Anlaşma süresince nasıl iletişim kuruyoruz?",
                answer:
                  "Her müşterimize özel bir proje yöneticisi atıyoruz. Haftalık durum raporları, aylık strateji toplantıları ve acil durumlar için 7/24 destek hattı sunuyoruz. Ayrıca özel portal üzerinden projenizdeki tüm gelişmeleri gerçek zamanlı olarak takip edebilirsiniz.",
              },
            ].map((faq, index) => (
              <div
                key={index}
                style={{
                  marginBottom: "1.5rem",
                  background: "rgba(30, 30, 35, 0.6)",
                  borderRadius: "12px",
                  border: "1px solid rgba(212, 175, 55, 0.2)",
                  boxShadow: "0 10px 30px rgba(0, 0, 0, 0.15)",
                  transition: "all 0.3s ease",
                  position: "relative",
                  overflow: "hidden",
                }}
              >
                <div
                  style={{
                    position: "absolute",
                    top: 0,
                    left: 0,
                    width: "4px",
                    height: "100%",
                    background:
                      "linear-gradient(to bottom, var(--primary-accent), transparent)",
                  }}
                />

                {/* Question Header - Clickable */}
                <div
                  onClick={() => toggleFaq(index)}
                  style={{
                    padding: "1.5rem",
                    cursor: "pointer",
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center",
                    transition: "all 0.2s ease",
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.background = "rgba(40, 40, 45, 0.4)";
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.background = "transparent";
                  }}
                >
                  <h3
                    style={{
                      fontSize: "1.2rem",
                      fontWeight: "700",
                      color: "var(--primary-white)",
                      margin: "0",
                      paddingLeft: "1rem",
                      flex: "1",
                    }}
                  >
                    <i
                      className="fas fa-angle-right"
                      style={{
                        color: "var(--primary-accent)",
                        marginRight: "0.75rem",
                        transform: faqOpenStates[index]
                          ? "rotate(90deg)"
                          : "rotate(0deg)",
                        transition: "transform 0.3s ease",
                      }}
                    ></i>
                    {faq.question}
                  </h3>

                  {/* Expand/Collapse Icon */}
                  <i
                    className={`fas ${
                      faqOpenStates[index] ? "fa-minus" : "fa-plus"
                    }`}
                    style={{
                      color: "var(--primary-accent)",
                      fontSize: "1rem",
                      transition: "all 0.3s ease",
                      transform: faqOpenStates[index]
                        ? "rotate(180deg)"
                        : "rotate(0deg)",
                    }}
                  ></i>
                </div>

                {/* Answer Content - Collapsible */}
                <div
                  style={{
                    maxHeight: faqOpenStates[index] ? "500px" : "0",
                    overflow: "hidden",
                    transition: "max-height 0.4s ease, padding 0.3s ease",
                    padding: faqOpenStates[index]
                      ? "0 1.5rem 1.5rem 1.5rem"
                      : "0 1.5rem",
                  }}
                >
                  <div
                    style={{
                      color: "var(--text-light)",
                      lineHeight: "1.6",
                      paddingLeft: "2.5rem",
                      paddingTop: faqOpenStates[index] ? "0.5rem" : "0",
                      borderTop: faqOpenStates[index]
                        ? "1px solid rgba(212, 175, 55, 0.1)"
                        : "none",
                      transition: "all 0.3s ease",
                    }}
                  >
                    <p style={{ margin: "0" }}>{faq.answer}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>

          <div className="text-center mt-5">
            <button
              className="btn btn-primary btn-premium"
              onClick={() => {
                trackCtaClick(
                  "FAQ Section - Sormak İstediğiniz Başka Bir Soru"
                );
                setShowModal(true);
              }}
              style={{
                fontSize: "1.1rem",
                padding: "1rem 2rem",
                background:
                  "linear-gradient(135deg, rgba(212, 175, 55, 0.1), rgba(212, 175, 55, 0.25))",
                border: "1px solid rgba(212, 175, 55, 0.3)",
                color: "var(--primary-accent)",
                transition: "all 0.3s ease",
              }}
            >
              <i
                className="fas fa-comment-dots"
                style={{ marginRight: "0.5rem" }}
              ></i>
              Sormak İstediğiniz Başka Bir Soru Mu Var?
            </button>
          </div>
        </div>
      </section>
      {/* Footer */}
      <footer
        style={{
          background: "var(--primary-dark)",
          borderTop: "1px solid var(--border-color)",
          padding: "3rem 0",
        }}
      >
        <div className="container text-center">
          <div
            style={{
              height: "100px",
              display: "flex",
              justifyContent: "center",
              marginBottom: "1rem",
            }}
          >
            <img
              src="/logo.jpg"
              alt="DOGANVENTURES Logo"
              style={{
                height: "100%",
                objectFit: "contain",
              }}
            />
          </div>
          <p style={{ color: "var(--text-muted)", marginBottom: "2rem" }}>
            Türkiye'nin en prestijli danışmanlık şirketi
          </p>
          <div
            style={{
              display: "flex",
              justifyContent: "center",
              gap: "2rem",
              flexWrap: "wrap",
              marginBottom: "2rem",
            }}
          >
            <a
              href="mailto:info@doganventures.com"
              style={{ color: "var(--primary-accent)" }}
            >
              <i
                className="fas fa-envelope"
                style={{ marginRight: "0.5rem" }}
              ></i>
              info@doganventures.com
            </a>
            <a
              href="tel:+902123456789"
              style={{ color: "var(--primary-accent)" }}
            >
              <i className="fas fa-phone" style={{ marginRight: "0.5rem" }}></i>
              +90 212 345 67 89
            </a>
          </div>
          <div style={{ color: "var(--text-muted)", fontSize: "0.9rem" }}>
            © 2025 DOGANVENTURES. Tüm hakları saklıdır.
          </div>
        </div>
      </footer>
      {/* Multi-Step Modal */}
      {showModal && (
        <div
          className="modal-overlay"
          onClick={(e) => e.target === e.currentTarget && setShowModal(false)}
        >
          <div className="modal">
            <button className="modal-close" onClick={() => setShowModal(false)}>
              &times;
            </button>

            {!isSubmitted ? (
              <>
                {/* Progress Bar */}
                <div style={{ marginBottom: "2rem" }}>
                  <div
                    style={{
                      display: "flex",
                      justifyContent: "space-between",
                      marginBottom: "0.5rem",
                      fontSize: "0.9rem",
                      color: "var(--text-muted)",
                    }}
                  >
                    <span>Adım {currentStep}/3</span>
                    <span>
                      {Math.round((currentStep / 3) * 100)}% Tamamlandı
                    </span>
                  </div>
                  <div
                    style={{
                      background: "#E5E7EB",
                      height: "6px",
                      borderRadius: "3px",
                      overflow: "hidden",
                    }}
                  >
                    <div
                      style={{
                        backgroundColor: "var(--primary-accent)",
                        height: "100%",
                        width: `${(currentStep / 3) * 100}%`,
                        transition: "width 0.2s ease",
                      }}
                    ></div>
                  </div>
                </div>

                <form onSubmit={handleSubmit} className="form">
                  {currentStep === 1 && (
                    <>
                      <h3>İletişim Bilgileriniz</h3>
                      <div className="form-group">
                        <label className="form-label">Ad Soyad *</label>
                        <input
                          type="text"
                          name="name"
                          value={formData.name}
                          onChange={handleInputChange}
                          className="form-input"
                          placeholder="Adınızı ve soyadınızı girin"
                          required
                          style={{
                            backgroundColor: "var(--primary-white)",
                            border: "2px solid var(--border-color)",
                            borderRadius: "8px",
                            padding: "0.75rem 1rem",
                            fontSize: "1rem",
                            width: "100%",
                            color: "var(--text-dark)",
                            transition: "all 0.2s ease",
                            outline: "none",
                          }}
                        />
                      </div>
                      <div className="form-group">
                        <label className="form-label">E-posta Adresi *</label>
                        <input
                          type="email"
                          name="email"
                          value={formData.email}
                          onChange={handleInputChange}
                          className="form-input"
                          placeholder="ornek@sirket.com"
                          required
                        />
                      </div>
                      <div className="form-group">
                        <label className="form-label">Telefon Numarası *</label>
                        <input
                          type="tel"
                          name="phone"
                          value={formData.phone}
                          onChange={handleInputChange}
                          className="form-input"
                          placeholder="+90 5XX XXX XX XX"
                          required
                        />
                      </div>
                    </>
                  )}

                  {currentStep === 2 && (
                    <>
                      <h3>Şirket Bilgileri</h3>
                      <div className="form-group">
                        <label className="form-label">Şirket Adı *</label>
                        <input
                          type="text"
                          name="company"
                          value={formData.company}
                          onChange={handleInputChange}
                          className="form-input"
                          placeholder="Şirket adınızı girin"
                          required
                        />
                      </div>
                      <div className="form-group">
                        <label className="form-label">Sektör *</label>
                        <select
                          name="industry"
                          value={formData.industry}
                          onChange={handleInputChange}
                          className="form-select"
                          required
                        >
                          <option value="">Sektörünüzü seçin</option>
                          <option value="e-commerce">E-Ticaret</option>
                          <option value="healthcare">Sağlık</option>
                          <option value="education">Eğitim</option>
                          <option value="finance">Finans</option>
                          <option value="real-estate">Emlak</option>
                          <option value="automotive">Otomotiv</option>
                          <option value="food">Gıda & İçecek</option>
                          <option value="technology">Teknoloji</option>
                          <option value="other">Diğer</option>
                        </select>
                      </div>
                      <div className="form-group">
                        <label className="form-label">
                          Aylık Pazarlama Bütçeniz *
                        </label>
                        <select
                          name="monthlyBudget"
                          value={formData.monthlyBudget}
                          onChange={handleInputChange}
                          className="form-select"
                          required
                        >
                          <option value="">Bütçe aralığınızı seçin</option>
                          <option value="10k-25k">₺10.000 - ₺25.000</option>
                          <option value="25k-50k">₺25.000 - ₺50.000</option>
                          <option value="50k-100k">₺50.000 - ₺100.000</option>
                          <option value="100k-250k">₺100.000 - ₺250.000</option>
                          <option value="250k+">₺250.000+</option>
                        </select>
                      </div>
                    </>
                  )}

                  {currentStep === 3 && (
                    <>
                      <h3>Hizmet Tercihleri</h3>
                      <div className="form-group">
                        <label className="form-label">
                          İhtiyacınız Olan Hizmetler (Çoklu seçim)
                        </label>
                        <div style={{ display: "grid", gap: "0.75rem" }}>
                          {[
                            "İş Geliştirme & Satış",
                            "Pazarlama Stratejisi",
                            "Dijital Pazarlama",
                            "Operasyonel Verimlilik",
                            "Ekip Geliştirme",
                            "İnovasyon Danışmanlığı",
                            "Dijital Dönüşüm",
                            "Liderlik Koçluğu",
                          ].map((service) => (
                            <label
                              key={service}
                              style={{
                                display: "flex",
                                alignItems: "center",
                                cursor: "pointer",
                                padding: "0.75rem",
                                border: "2px solid var(--border-color)",
                                borderRadius: "8px",
                                transition: "all 0.2s ease",
                              }}
                            >
                              <input
                                type="checkbox"
                                value={service}
                                checked={formData.services.includes(service)}
                                onChange={handleInputChange}
                                style={{ marginRight: "0.75rem" }}
                              />
                              {service}
                            </label>
                          ))}
                        </div>
                      </div>

                      <div className="form-group">
                        <label className="form-label">
                          Hedefleriniz / İhtiyacınız (Opsiyonel)
                        </label>
                        <textarea
                          name="goals"
                          value={formData.goals}
                          onChange={handleInputChange}
                          placeholder="Şirketinizin hedefleri, karşılaştığınız zorluklar veya beklentilerinizi açıklayabilirsiniz..."
                          className="form-textarea"
                          rows="4"
                          style={{
                            width: "100%",
                            padding: "0.75rem",
                            border: "2px solid var(--border-color)",
                            borderRadius: "8px",
                            resize: "vertical",
                            fontFamily: "inherit",
                          }}
                        />
                      </div>
                    </>
                  )}

                  {/* Navigation Buttons */}
                  <div
                    style={{ display: "flex", gap: "1rem", marginTop: "2rem" }}
                  >
                    {currentStep > 1 && (
                      <button
                        type="button"
                        onClick={prevStep}
                        className="btn btn-secondary"
                        style={{ flex: 1 }}
                      >
                        Geri
                      </button>
                    )}

                    {currentStep < 3 ? (
                      <button
                        type="button"
                        onClick={nextStep}
                        className="btn btn-primary"
                        style={{ flex: 1 }}
                        disabled={
                          (currentStep === 1 &&
                            (!formData.name ||
                              !formData.email ||
                              !formData.phone)) ||
                          (currentStep === 2 &&
                            (!formData.company ||
                              !formData.industry ||
                              !formData.monthlyBudget))
                        }
                      >
                        Devam Et
                      </button>
                    ) : (
                      <button
                        type="submit"
                        className="btn btn-primary"
                        style={{ flex: 1 }}
                      >
                        <i
                          className="fas fa-paper-plane"
                          style={{ marginRight: "0.5rem" }}
                        ></i>
                        Ücretsiz Analizimi Al
                      </button>
                    )}
                  </div>
                </form>
              </>
            ) : (
              <div className="text-center" style={{ padding: "2rem 0" }}>
                <div
                  style={{
                    fontSize: "3rem",
                    color: "var(--accent-emerald)",
                    marginBottom: "1rem",
                  }}
                >
                  <i className="fas fa-check-circle"></i>
                </div>
                <h3 style={{ color: "var(--text-dark)", marginBottom: "1rem" }}>
                  Başvurunuz Alındı!
                </h3>
                <p
                  style={{ color: "var(--text-dark)", marginBottom: "1.5rem" }}
                >
                  Uzman ekibimiz 24 saat içinde sizinle iletişime geçecek ve
                  <strong> ₺25.000 değerindeki</strong> ücretsiz strateji
                  analizinizi hazırlayacak.
                </p>
                <div
                  style={{
                    background: "#F3F4F6",
                    padding: "1rem",
                    borderRadius: "8px",
                    fontSize: "0.9rem",
                    color: "var(--text-dark)",
                    marginBottom: "2rem",
                  }}
                >
                  <i
                    className="fas fa-info-circle"
                    style={{
                      marginRight: "0.5rem",
                      color: "var(--primary-accent)",
                    }}
                  ></i>
                  E-posta adresinizi kontrol etmeyi unutmayın!
                </div>
                <button
                  onClick={() => {
                    setShowModal(false);
                    setIsSubmitted(false);
                    setCurrentStep(1);
                    setFormData({
                      name: "",
                      email: "",
                      phone: "",
                      company: "",
                      industry: "",
                      monthlyBudget: "",
                      services: [],
                      goals: "",
                      timeline: "",
                      challenges: "",
                    });
                  }}
                  className="btn btn-primary"
                  style={{ width: "100%" }}
                >
                  <i
                    className="fas fa-check"
                    style={{ marginRight: "0.5rem" }}
                  ></i>
                  Tamam, Anladım
                </button>
              </div>
            )}
          </div>
        </div>
      )}
      <style jsx>{`
        @keyframes glow {
          0% {
            box-shadow: 0 4px 15px rgba(255, 59, 48, 0.3);
          }
          50% {
            box-shadow: 0 4px 25px rgba(255, 59, 48, 0.5),
              0 0 40px rgba(255, 59, 48, 0.2);
          }
          100% {
            box-shadow: 0 4px 15px rgba(255, 59, 48, 0.3);
          }
        }

        @keyframes pulse {
          0%,
          100% {
            transform: scale(1);
          }
          50% {
            transform: scale(1.02);
          }
        }

        @keyframes blink {
          0%,
          100% {
            border-color: transparent;
          }
          50% {
            border-color: var(--primary-accent);
          }
        }

        @keyframes shimmer {
          0% {
            background-position: -200%;
          }
          100% {
            background-position: 200%;
          }
        }

        @keyframes float {
          0%,
          100% {
            transform: translateY(0);
          }
          50% {
            transform: translateY(-5px);
          }
        }

        @keyframes simplePulse {
          0%,
          100% {
            transform: scale(1);
          }
          50% {
            transform: scale(1.1);
          }
        }

        .cursor {
          display: inline-block;
          width: 2px;
          height: 1em;
          vertical-align: middle;
        }

        /* Form stil güncellemeleri */
        .form-input,
        .form-select,
        .form-textarea {
          background-color: var(--primary-white);
          border: 2px solid var(--border-color);
          border-radius: 8px;
          padding: 0.75rem 1rem;
          font-size: 1rem;
          width: 100%;
          color: var(--text-dark);
          transition: all 0.2s ease;
          outline: none;
        }

        .form-input:focus,
        .form-select:focus,
        .form-textarea:focus {
          border-color: var(--primary-accent);
          box-shadow: 0 0 0 2px rgba(212, 175, 55, 0.1);
        }

        .form-input:hover,
        .form-select:hover,
        .form-textarea:hover {
          border-color: var(--primary-accent);
        }

        .form-input::placeholder,
        .form-textarea::placeholder {
          color: var(--text-muted);
          opacity: 0.8;
        }

        .form-select {
          appearance: none;
          background-image: url("data:image/svg+xml;charset=UTF-8,%3csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24' fill='none' stroke='currentColor' stroke-width='2' stroke-linecap='round' stroke-linejoin='round'%3e%3cpolyline points='6 9  12 15 18 9'%3e%3c/polyline%3e%3c/svg%3e");
          background-repeat: no-repeat;
          background-position: right 1rem center;
          background-size: 1em;
          padding-right: 2.5rem;
        }

        .form-textarea {
          min-height: 100px;
          resize: vertical;
        }

        .form-label {
          color: var(--text-dark);
          font-weight: 600;
          margin-bottom: 0.5rem;
          display: block;
        }

        /* Checkbox stil güncellemesi */
        input[type="checkbox"] {
          width: 1.2rem;
          height: 1.2rem;
          border: 2px solid var(--border-color);
          border-radius: 4px;
          cursor: pointer;
          position: relative;
          transition: all 0.2s ease;
          appearance: none;
          background-color: var(--primary-white);
        }

        input[type="checkbox"]:checked {
          background-color: var(--primary-accent);
          border-color: var(--primary-accent);
        }

        input[type="checkbox"]:checked::after {
          content: "✓";
          position: absolute;
          top: 50%;
          left: 50%;
          transform: translate(-50%, -50%);
          color: var(--primary-white);
          font-size: 0.8rem;
        }

        input[type="checkbox"]:hover {
          border-color: var(--primary-accent);
        }

        /* Marquee Animation Styles */
        .marquee-container {
          overflow: hidden;
          position: relative;
          width: 100%;
          background: rgba(10, 10, 10, 0.5);
          border-top: 1px solid rgba(255, 255, 255, 0.1);
          border-bottom: 1px solid rgba(255, 255, 255, 0.1);
        }

        .marquee-content {
          display: flex;
          animation: marquee 30s linear infinite;
          white-space: nowrap;
        }

        .company-logo {
          flex: 0 0 auto;
          height: 60px;
          width: 180px;
          display: flex;
          align-items: center;
          justify-content: center;
          padding: 0 1rem;
          background: rgba(255, 255, 255, 0.02);
          border-radius: 8px;
          transition: all 0.3s ease;
        }

        .company-logo:hover {
          background: rgba(255, 255, 255, 0.05);
          transform: translateY(-2px);
        }

        @keyframes marquee {
          0% {
            transform: translateX(0);
          }
          100% {
            transform: translateX(-50%);
          }
        }

        .marquee-content:hover {
          animation-play-state: paused;
        }
      `}</style>
      {/* Notification System */}
      <NotificationSystem />
    </div>
  );
}

// Export CompanyLogo, RemainingSlots, useIntersectionObserver for use in PremiumBrandsSection
export { CompanyLogo, RemainingSlots, useIntersectionObserver };

export default App;
