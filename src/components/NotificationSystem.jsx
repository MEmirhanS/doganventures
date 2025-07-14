import { useState, useEffect } from "react";
import "./notificationStyles.css";

const NotificationSystem = () => {
  const [notifications, setNotifications] = useState([]);
  const [visible, setVisible] = useState(false);

  // İsimler listesi
  const names = [
    "Ahmet Y.",
    "Mehmet K.",
    "Ayşe D.",
    "Fatma Ç.",
    "Ali T.",
    "Zeynep B.",
    "Mustafa Ö.",
    "Emine Ş.",
    "Hüseyin A.",
    "Hatice Y.",
    "İbrahim K.",
    "Sibel T.",
    "Murat S.",
    "Elif G.",
    "Hakan P.",
    "Gülşen R.",
    "Serkan M.",
    "Ebru Ö.",
    "Cem U.",
    "Özge V.",
  ];

  // Rastgele telefon numarası oluşturma fonksiyonu
  const generatePhoneNumber = () => {
    // 0531 ile başlayıp rastgele 7 hane ekliyoruz, son 4 hane gizleniyor
    const prefix = "0" + (Math.floor(Math.random() * 7) + 50).toString(); // 050-056 arası prefix
    const mid =
      Math.floor(Math.random() * 10).toString() +
      Math.floor(Math.random() * 10).toString() +
      Math.floor(Math.random() * 10).toString();
    // Gerçek numarayı yıldızlayarak gizliyoruz
    return `${prefix}${mid}****${Math.floor(Math.random() * 10)}`;
  };

  const services = [
    "İş Geliştirme & Satış",
    "Pazarlama Stratejisi",
    "Dijital Pazarlama",
    "Operasyonel Verimlilik",
    "Ekip Geliştirme",
    "İnovasyon Danışmanlığı",
  ];

  // Yeni bildirim oluşturma fonksiyonu
  const createNotification = () => {
    const phone = generatePhoneNumber();
    const name = names[Math.floor(Math.random() * names.length)];
    const service = services[Math.floor(Math.random() * services.length)];
    const timeAgo = Math.floor(Math.random() * 30) + 1;

    console.log("Created notification with phone:", phone); // Debug log

    // Başvuru durumu - 'Değerlendiriliyor', 'Onaylandı', veya 'Beklemede'
    const statuses = ["Değerlendiriliyor", "Onaylandı", "Beklemede"];
    const statusColors = {
      Değerlendiriliyor: {
        bg: "rgba(255, 193, 7, 0.2)",
        border: "rgba(255, 193, 7, 0.3)",
        text: "rgba(255, 193, 7, 0.9)",
      },
      Onaylandı: {
        bg: "rgba(46, 213, 115, 0.2)",
        border: "rgba(46, 213, 115, 0.3)",
        text: "rgba(46, 213, 115, 0.9)",
      },
      Beklemede: {
        bg: "rgba(108, 117, 125, 0.2)",
        border: "rgba(108, 117, 125, 0.3)",
        text: "rgba(108, 117, 125, 0.9)",
      },
    };

    // 70% değerlendiriliyor, 20% onaylandı, 10% beklemede olsun
    let status;
    const rnd = Math.random();
    if (rnd < 0.7) {
      status = statuses[0]; // Değerlendiriliyor
    } else if (rnd < 0.9) {
      status = statuses[1]; // Onaylandı
    } else {
      status = statuses[2]; // Beklemede
    }

    return {
      id: Date.now(),
      name,
      phone,
      service,
      timeAgo,
      status,
      statusColors: statusColors[status],
      fadeOut: false,
    };
  };

  // Bildirim ekleme ve kaldırma mantığı
  useEffect(() => {
    // İlk bildirim gösterimi için 3 saniye bekle
    const initialDelay = 3000;

    // Rastgele görünüm süresi hesaplama fonksiyonu (10-15 saniye arası)
    const getRandomDisplayTime = () => {
      return Math.floor(Math.random() * 6000) + 10000; // 10000ms + (0-5999ms) = 10-15.9 saniye
    };

    // Rastgele döngü süresi hesaplama fonksiyonu (15-20 saniye arası)
    const getRandomLoopTime = () => {
      return Math.floor(Math.random() * 6000) + 15000; // 15000ms + (0-5999ms) = 15-20.9 saniye
    };

    // İlk bildirimi göstermek için timeout
    const initialTimer = setTimeout(() => {
      const newNotification = createNotification();
      setNotifications([newNotification]);
      setVisible(true);

      // Rastgele süre sonra bildirimi kaldır (10-15 saniye)
      const displayTime = getRandomDisplayTime();
      setTimeout(() => {
        setVisible(false);
        // Geçiş animasyonu için 500ms bekle
        setTimeout(() => {
          setNotifications([]);
        }, 500);
      }, displayTime);
    }, initialDelay);

    // Ana bildirim döngüsünü başlat
    const startNotificationLoop = () => {
      const loopTime = getRandomLoopTime();

      const notificationTimer = setTimeout(() => {
        // Yeni bildirim oluştur
        const newNotification = createNotification();

        // Bildirimi göster
        setNotifications([newNotification]);
        setVisible(true);

        // Rastgele süre sonra bildirimi kaldır (10-15 saniye)
        const displayTime = getRandomDisplayTime();
        setTimeout(() => {
          setVisible(false);
          // Geçiş animasyonu için 500ms bekle
          setTimeout(() => {
            setNotifications([]);
          }, 500);
        }, displayTime);

        // Bir sonraki döngüyü başlat
        startNotificationLoop();
      }, loopTime);

      return notificationTimer;
    };

    // İlk döngüyü başlat
    const loopTimer = setTimeout(() => {
      startNotificationLoop();
    }, initialDelay + getRandomDisplayTime() + 1000);

    return () => {
      clearTimeout(initialTimer);
      clearTimeout(loopTimer);
    };
  }, []);

  // Ekranda hiç bildirim yoksa null döndür
  if (notifications.length === 0) return null;

  console.log("Rendering notification with phone:", notifications[0]?.phone); // Debug log

  return (
    <div
      className="notification-container"
      style={{
        maxWidth: "320px",
        width: "calc(100vw - 40px)",
        transform: visible ? "translateY(0)" : "translateY(120px)",
        opacity: visible ? 1 : 0,
        transition: "all 0.5s cubic-bezier(0.175, 0.885, 0.32, 1.275)",
        filter: "drop-shadow(0 10px 25px rgba(0, 0, 0, 0.3))",
      }}
    >
      {notifications.map((notification) => (
        <div
          key={notification.id}
          style={{
            background:
              "linear-gradient(145deg, rgba(25, 25, 30, 0.97), rgba(15, 15, 20, 0.97))",
            backdropFilter: "blur(10px)",
            borderRadius: "12px",
            boxShadow:
              "0 10px 30px rgba(0, 0, 0, 0.25), 0 0 0 1px rgba(212, 175, 55, 0.2)",
            padding: "12px",
            marginBottom: "10px",
            display: "flex",
            alignItems: "center",
            position: "relative",
            overflow: "hidden",
            border: "1px solid rgba(212, 175, 55, 0.25)",
            animation: "fadeIn 0.5s ease-out",
            // Mobile responsive adjustments
            minHeight: "70px",
          }}
        >
          {/* Gold accent corner */}
          <div
            style={{
              position: "absolute",
              top: 0,
              right: 0,
              width: "40px",
              height: "40px",
              overflow: "hidden",
            }}
          >
            <div
              style={{
                position: "absolute",
                top: 0,
                right: 0,
                width: "80px",
                height: "80px",
                background: "rgba(212, 175, 55, 0.2)",
                transform: "rotate(45deg) translate(30px, -30px)",
                zIndex: 1,
              }}
            />
          </div>

          {/* Profile icon */}
          <div
            className="profile-icon"
            style={{
              width: "42px",
              height: "42px",
              borderRadius: "50%",
              background: "rgba(212, 175, 55, 0.1)",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              marginRight: "10px",
              border: "1px solid rgba(212, 175, 55, 0.3)",
              boxShadow:
                "0 5px 15px rgba(0, 0, 0, 0.2), 0 0 0 rgba(212, 175, 55, 0.4)",
              flexShrink: 0,
              animation: "iconPulse 2s infinite",
            }}
          >
            <i
              className="fas fa-user-circle"
              style={{
                fontSize: "20px",
                color: "var(--primary-accent)",
              }}
            ></i>
          </div>

          <div style={{ flex: 1 }}>
            <div
              className="notification-name"
              style={{
                color: "#fff",
                fontSize: "0.85rem",
                fontWeight: "600",
                marginBottom: "1px",
                textShadow: "0 1px 2px rgba(0, 0, 0, 0.3)",
                paddingRight: "70px", // Reduce padding for mobile
                lineHeight: "1.2",
              }}
            >
              {notification.name}
            </div>
            <div
              style={{
                color: "rgba(212, 175, 55, 0.9)",
                fontSize: "0.75rem",
                fontWeight: "500",
                marginBottom: "3px",
                lineHeight: "1.1",
              }}
            >
              {notification.phone}
            </div>
            <div
              style={{
                color: "var(--text-light)",
                fontSize: "0.75rem",
                marginBottom: "1px",
                lineHeight: "1.2",
              }}
            >
              <span
                style={{
                  color: "var(--primary-accent)",
                  fontWeight: "600",
                  textShadow: "0 1px 2px rgba(0, 0, 0, 0.3)",
                }}
              >
                {notification.service}
              </span>{" "}
              için başvurdu.
            </div>
            <div
              style={{
                color: "var(--text-muted)",
                fontSize: "0.7rem",
                display: "flex",
                alignItems: "center",
                lineHeight: "1.1",
              }}
            >
              <i
                className="fas fa-clock"
                style={{
                  fontSize: "0.65rem",
                  marginRight: "3px",
                  color: "rgba(212, 175, 55, 0.6)",
                }}
              ></i>
              {notification.timeAgo} dakika önce
            </div>
          </div>

          {/* Pulse animation dot ve durum etiketi */}
          <div
            style={{
              position: "absolute",
              top: "8px",
              right: "8px",
              display: "flex",
              alignItems: "center",
              zIndex: 5, // Ensure it's above other elements
            }}
          >
            <div
              className="status-label"
              style={{
                padding: "2px 6px",
                borderRadius: "3px",
                background: notification.statusColors.bg,
                border: `1px solid ${notification.statusColors.border}`,
                color: notification.statusColors.text,
                fontSize: "0.6rem",
                fontWeight: "600",
                marginRight: "6px",
                whiteSpace: "nowrap",
                boxShadow: "0 2px 4px rgba(0,0,0,0.1)",
                lineHeight: "1.1",
              }}
            >
              {notification.status}
            </div>
            <div
              style={{
                width: "6px",
                height: "6px",
                borderRadius: "50%",
                background: notification.statusColors.text,
                boxShadow: `0 0 0 ${notification.statusColors.text.replace(
                  "0.9",
                  "0.4"
                )}`,
                animation: "pulse 2s infinite",
              }}
            ></div>
          </div>

          {/* Gold accent line */}
          <div
            style={{
              position: "absolute",
              left: 0,
              top: "20%",
              bottom: "20%",
              width: "3px",
              background:
                "linear-gradient(to bottom, var(--primary-accent), transparent)",
              borderRadius: "4px",
            }}
          ></div>
        </div>
      ))}
    </div>
  );
};

export default NotificationSystem;
