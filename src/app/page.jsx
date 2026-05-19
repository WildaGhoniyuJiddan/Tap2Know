"use client";
import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { ArrowLeft, ArrowRight } from 'lucide-react';

const IMAGES = [
  { src: 'https://fifth-gentle-45902158.figma.site/_components/v2/4de492f6d9cf8244ad5293233e5c6f52407d42fc/1.02464a56.png', bg: '#F4845F', panel: '#F79B7F' },
  { src: 'https://fifth-gentle-45902158.figma.site/_components/v2/4de492f6d9cf8244ad5293233e5c6f52407d42fc/2.b977faab.png', bg: '#6BBF7A', panel: '#85CC92' },
  { src: 'https://fifth-gentle-45902158.figma.site/_components/v2/4de492f6d9cf8244ad5293233e5c6f52407d42fc/3.4df853b4.png', bg: '#E882B4', panel: '#ED9DC4' },
  { src: 'https://fifth-gentle-45902158.figma.site/_components/v2/4de492f6d9cf8244ad5293233e5c6f52407d42fc/4.4457fbce.png', bg: '#6EB5FF', panel: '#8DC4FF' },
];

const HomePage = () => {
  const router = useRouter();
  const [activeIndex, setActiveIndex] = useState(0);
  const [isAnimating, setIsAnimating] = useState(false);
  const [isMobile, setIsMobile] = useState(typeof window !== 'undefined' ? window.innerWidth < 640 : false);

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 640);
    };
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  useEffect(() => {
    IMAGES.forEach(item => {
      const img = new Image();
      img.src = item.src;
    });
  }, []);

  const handleNext = () => {
    if (isAnimating) return;
    setIsAnimating(true);
    setActiveIndex(prev => (prev + 1) % 4);
    setTimeout(() => setIsAnimating(false), 650);
  };

  const handlePrev = () => {
    if (isAnimating) return;
    setIsAnimating(true);
    setActiveIndex(prev => (prev + 3) % 4);
    setTimeout(() => setIsAnimating(false), 650);
  };

  const center = activeIndex;
  const left = (activeIndex + 3) % 4;
  const right = (activeIndex + 1) % 4;
  const back = (activeIndex + 2) % 4;

  const getRoleStyles = (index) => {
    const baseStyles = {
      position: 'absolute',
      aspectRatio: '0.6 / 1',
      transition: 'transform 650ms cubic-bezier(0.4,0,0.2,1), filter 650ms, opacity 650ms, left 650ms',
      willChange: 'transform, filter, opacity',
    };

    if (index === center) {
      return {
        ...baseStyles,
        transform: `translateX(-50%) scale(${isMobile ? 1.25 : 1.68})`,
        filter: 'blur(0px)',
        opacity: 1,
        zIndex: 20,
        left: '50%',
        height: isMobile ? '60%' : '92%',
        bottom: isMobile ? '22%' : '0',
      };
    } else if (index === left) {
      return {
        ...baseStyles,
        transform: 'translateX(-50%) scale(1)',
        filter: 'blur(2px)',
        opacity: 0.85,
        zIndex: 10,
        left: isMobile ? '20%' : '30%',
        height: isMobile ? '16%' : '28%',
        bottom: isMobile ? '32%' : '12%',
      };
    } else if (index === right) {
      return {
        ...baseStyles,
        transform: 'translateX(-50%) scale(1)',
        filter: 'blur(2px)',
        opacity: 0.85,
        zIndex: 10,
        left: isMobile ? '80%' : '70%',
        height: isMobile ? '16%' : '28%',
        bottom: isMobile ? '32%' : '12%',
      };
    } else {
      return {
        ...baseStyles,
        transform: 'translateX(-50%) scale(1)',
        filter: 'blur(4px)',
        opacity: 1,
        zIndex: 5,
        left: '50%',
        height: isMobile ? '13%' : '22%',
        bottom: isMobile ? '32%' : '12%',
      };
    }
  };

  const grainDataUri = `data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='200' height='200'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' /%3E%3C/filter%3E%3Crect width='200' height='200' filter='url(%23noise)' opacity='0.08'/%3E%3C/svg%3E`;

  return (
    <>

      <div style={{
        backgroundColor: IMAGES[activeIndex].bg,
        transition: 'background-color 650ms cubic-bezier(0.4,0,0.2,1)',
        fontFamily: "'Inter', sans-serif",
        position: 'relative',
        width: '100%',
        overflow: 'hidden',
      }}>
        <div style={{ position: 'relative', width: '100%', height: '100vh', overflow: 'hidden' }}>
          
          <div style={{
            position: 'absolute',
            inset: 0,
            pointerEvents: 'none',
            userSelect: 'none',
            zIndex: 50,
            opacity: 0.4,
            backgroundImage: `url("${grainDataUri}")`,
            backgroundSize: '200px 200px',
            backgroundRepeat: 'repeat',
          }} />

          <div style={{
            position: 'absolute',
            insetInline: 0,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            pointerEvents: 'none',
            userSelect: 'none',
            zIndex: 2,
            top: '18%',
          }}>
            <div style={{
              fontFamily: "'Anton', sans-serif",
              fontSize: 'clamp(90px, 28vw, 380px)',
              fontWeight: 900,
              color: 'white',
              opacity: 1,
              lineHeight: 1,
              textTransform: 'uppercase',
              letterSpacing: '-0.02em',
              whiteSpace: 'nowrap',
            }}>
              DIGITAL ID
            </div>
          </div>

          <div className="absolute top-6 left-4 sm:left-8" style={{ zIndex: 60 }}>
            <div style={{
              fontSize: '0.75rem',
              fontWeight: 600,
              textTransform: 'uppercase',
              color: 'white',
              opacity: 0.9,
              letterSpacing: '0.18em',
            }}>
              TAP2KNOW
            </div>
          </div>

          <div style={{ position: 'absolute', inset: 0, zIndex: 3 }}>
            {IMAGES.map((item, index) => (
              <div key={index} style={getRoleStyles(index)}>
                <img
                  src={item.src}
                  alt={`TAP2KNOW digital profile character ${index + 1}`}
                  draggable={false}
                  style={{
                    width: '100%',
                    height: '100%',
                    objectFit: 'contain',
                    objectPosition: 'bottom center',
                  }}
                />
              </div>
            ))}
          </div>

          <div className="absolute bottom-6 left-4 sm:bottom-20 sm:left-24" style={{ zIndex: 60, maxWidth: '320px' }}>
            <p style={{
              fontWeight: 700,
              textTransform: 'uppercase',
              letterSpacing: '0.02em',
              marginBottom: isMobile ? '0.5rem' : '0.75rem',
              fontSize: isMobile ? '1rem' : '22px',
              color: 'white',
              opacity: 0.95,
            }}>
              TAP2KNOW PROFILE
            </p>
            <p className="hidden sm:block" style={{
              fontSize: '0.875rem',
              color: 'white',
              opacity: 0.85,
              lineHeight: 1.6,
              marginBottom: '1.25rem',
            }}>
              Buat halaman profil digital profesionalmu dalam 10 menit tanpa coding. Hubungkan ke perangkat NFC Tap2Know dan bagikan identitasmu dengan sekali tap.
            </p>
            <div style={{ display: 'flex', gap: '1rem' }}>
              <button
                onClick={handlePrev}
                aria-label="Previous character"
                style={{
                  width: isMobile ? '3rem' : '4rem',
                  height: isMobile ? '3rem' : '4rem',
                  backgroundColor: 'transparent',
                  border: '2px solid white',
                  borderRadius: '50%',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  color: 'white',
                  cursor: 'pointer',
                  transition: 'transform 150ms, background-color 150ms',
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.transform = 'scale(1.08)';
                  e.currentTarget.style.backgroundColor = 'rgba(255,255,255,0.12)';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.transform = 'scale(1)';
                  e.currentTarget.style.backgroundColor = 'transparent';
                }}
              >
                <ArrowLeft size={26} strokeWidth={2.25} />
              </button>
              <button
                onClick={handleNext}
                aria-label="Next character"
                style={{
                  width: isMobile ? '3rem' : '4rem',
                  height: isMobile ? '3rem' : '4rem',
                  backgroundColor: 'transparent',
                  border: '2px solid white',
                  borderRadius: '50%',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  color: 'white',
                  cursor: 'pointer',
                  transition: 'transform 150ms, background-color 150ms',
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.transform = 'scale(1.08)';
                  e.currentTarget.style.backgroundColor = 'rgba(255,255,255,0.12)';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.transform = 'scale(1)';
                  e.currentTarget.style.backgroundColor = 'transparent';
                }}
              >
                <ArrowRight size={26} strokeWidth={2.25} />
              </button>
            </div>
          </div>

          <div className="absolute bottom-6 right-4 sm:bottom-20 sm:right-10" style={{ zIndex: 60 }}>
            <button
              onClick={() => router.push('/login')}
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '0.5rem',
                fontFamily: "'Anton', sans-serif",
                fontSize: 'clamp(20px, 4vw, 56px)',
                fontWeight: 400,
                color: 'white',
                opacity: 0.95,
                letterSpacing: '-0.02em',
                lineHeight: 1,
                textTransform: 'uppercase',
                textDecoration: 'none',
                transition: 'opacity 200ms',
                background: 'none',
                border: 'none',
                cursor: 'pointer',
                padding: 0
              }}
              onMouseEnter={(e) => e.currentTarget.style.opacity = '1'}
              onMouseLeave={(e) => e.currentTarget.style.opacity = '0.95'}
            >
              BUAT PROFIL
              <ArrowRight className="w-5 h-5 sm:w-8 sm:h-8" strokeWidth={2.25} />
            </button>
          </div>

        </div>
      </div>
    </>
  );
};

export default HomePage;