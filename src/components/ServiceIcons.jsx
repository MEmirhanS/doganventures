// Basit SVG iconlar - CDN'den bağımsız, deploy'da kesinlikle çalışır
export const ServiceIcons = {
  Strategy: () => (
    <svg viewBox="0 0 24 24" fill="currentColor" style={{ width: '100%', height: '100%' }}>
      <path d="M7 14l5-5 5 5z"/>
      <path d="M2 12h3l1-1v-1h12v1l1 1h3v8H2v-8z"/>
      <path d="M5 4h14v4H5z"/>
    </svg>
  ),
  
  Leadership: () => (
    <svg viewBox="0 0 24 24" fill="currentColor" style={{ width: '100%', height: '100%' }}>
      <circle cx="12" cy="8" r="3"/>
      <path d="M12 11c-3 0-8 1.5-8 4.5V20h16v-4.5c0-3-5-4.5-8-4.5z"/>
      <circle cx="18" cy="8" r="2"/>
      <path d="M18 11c1.5 0 4 .75 4 2.25V16h-3v-2.5c0-1-1.5-2-3-2.5z"/>
      <circle cx="6" cy="8" r="2"/>
      <path d="M6 11c-1.5 0-4 .75-4 2.25V16h3v-2.5c0-1 1.5-2 3-2.5z"/>
    </svg>
  ),
  
  Innovation: () => (
    <svg viewBox="0 0 24 24" fill="currentColor" style={{ width: '100%', height: '100%' }}>
      <path d="M12 2C8.13 2 5 5.13 5 9c0 2.38 1.19 4.47 3 5.74V17c0 .55.45 1 1 1h6c.55 0 1-.45 1-1v-2.26c1.81-1.27 3-3.36 3-5.74 0-3.87-3.13-7-7-7z"/>
      <path d="M9 19h6v1c0 .55-.45 1-1 1h-4c-.55 0-1-.45-1-1v-1z"/>
      <path d="M9 21h6v.5c0 .83-.67 1.5-1.5 1.5h-3c-.83 0-1.5-.67-1.5-1.5V21z"/>
    </svg>
  ),
  
  Excellence: () => (
    <svg viewBox="0 0 24 24" fill="currentColor" style={{ width: '100%', height: '100%' }}>
      <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/>
      <circle cx="12" cy="12" r="3"/>
    </svg>
  )
};

// Basit animasyon komponenti
export const AnimatedIcon = ({ IconComponent, isActive = false }) => {
  return (
    <div 
      style={{
        width: '80px',
        height: '80px',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        background: isActive 
          ? 'linear-gradient(135deg, rgba(212, 175, 55, 0.3), rgba(212, 175, 55, 0.1))'
          : 'linear-gradient(135deg, rgba(212, 175, 55, 0.2), rgba(212, 175, 55, 0.05))',
        borderRadius: '20px',
        border: `2px solid rgba(212, 175, 55, ${isActive ? '0.6' : '0.3'})`,
        boxShadow: isActive 
          ? '0 15px 40px rgba(0, 0, 0, 0.3), 0 0 20px rgba(212, 175, 55, 0.2)'
          : '0 10px 30px rgba(0, 0, 0, 0.2)',
        transition: 'all 0.3s ease',
        transform: isActive ? 'scale(1.05)' : 'scale(1)',
        color: isActive ? '#D4AF37' : 'rgba(212, 175, 55, 0.8)',
        fontSize: '2.5rem',
        cursor: 'pointer'
      }}
    >
      <div style={{ width: '60%', height: '60%' }}>
        <IconComponent />
      </div>
    </div>
  );
};
