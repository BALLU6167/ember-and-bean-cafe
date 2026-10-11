import React, { useEffect, useState } from 'react';

interface CustomCursorProps {
  enabled?: boolean;
}

export const CustomCursor: React.FC<CustomCursorProps> = ({ enabled = true }) => {
  const [pos, setPos] = useState({ x: -100, y: -100 });
  const [isHovered, setIsHovered] = useState(false);
  const [isPointerFine, setIsPointerFine] = useState(false);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    if (!enabled) return;
    const isFine = window.matchMedia('(pointer: fine)').matches;
    setIsPointerFine(isFine);
    if (!isFine) return;

    const handleMouseMove = (e: MouseEvent) => {
      setPos({ x: e.clientX, y: e.clientY });
      if (!isVisible) setIsVisible(true);
    };

    const handleMouseLeave = () => {
      setIsVisible(false);
    };

    const handleMouseOver = (e: MouseEvent) => {
      const target = e.target as HTMLElement | null;
      if (
        target?.closest(
          'a, button, input, select, textarea, [role="button"], .interactive-element'
        )
      ) {
        setIsHovered(true);
      } else {
        setIsHovered(false);
      }
    };

    window.addEventListener('mousemove', handleMouseMove, { passive: true });
    document.addEventListener('mouseleave', handleMouseLeave);
    document.addEventListener('mouseover', handleMouseOver);

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('mouseleave', handleMouseLeave);
      document.removeEventListener('mouseover', handleMouseOver);
    };
  }, [enabled, isVisible]);

  if (!enabled || !isPointerFine || !isVisible) return null;

  return (
    <div
      className="fixed top-0 left-0 pointer-events-none z-[999999] will-change-transform"
      style={{
        transform: `translate3d(${pos.x}px, ${pos.y}px, 0)`,
      }}
    >
      {/* Precision cursor ring - centered with instant transform to eliminate trailing offset rings */}
      <div
        className={`-translate-x-1/2 -translate-y-1/2 rounded-full border border-[#DFB17B]/70 transition-all duration-150 ease-out ${
          isHovered
            ? 'w-8 h-8 bg-[#DFB17B]/15 border-[#DFB17B] scale-110'
            : 'w-4 h-4 bg-transparent scale-100 opacity-60'
        }`}
      />
      {/* Center dot */}
      <div className="absolute top-0 left-0 w-1 h-1 bg-[#DFB17B] rounded-full -translate-x-1/2 -translate-y-1/2" />
    </div>
  );
};
