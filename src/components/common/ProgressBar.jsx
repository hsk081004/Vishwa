import { useEffect, useState } from 'react';

export default function ProgressBar() {
  const [scrollProgress, setScrollProgress] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      const totalScroll = document.documentElement.scrollTop || document.body.scrollTop;
      const windowHeight = document.documentElement.scrollHeight - document.documentElement.clientHeight;
      if (windowHeight > 0) {
        setScrollProgress((totalScroll / windowHeight) * 100);
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <div className="fixed top-0 left-0 w-full h-[4px] z-50 pointer-events-none bg-vishwa-blush/30">
      <div
        className="h-full bg-gradient-to-r from-vishwa-rose via-vishwa-hotpink to-vishwa-deeprose transition-all duration-75 ease-out shadow-[0_0_12px_rgba(255,77,141,0.7)]"
        style={{ width: `${scrollProgress}%` }}
      />
    </div>
  );
}

