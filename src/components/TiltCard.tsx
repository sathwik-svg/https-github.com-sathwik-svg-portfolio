import React, { useRef } from 'react';
import { motion, useMotionValue, useSpring, useTransform } from 'framer-motion';

interface TiltCardProps {
  children: React.ReactNode;
  className?: string;
  style?: React.CSSProperties;
  onClick?: () => void;
  tiltAngle?: number; // max tilt degrees, default 7.5
  perspective?: number; // 3D perspective, default 1000
  glareEffect?: boolean;
}

/**
 * TiltCard: Premium, smooth interactive 3D tilt component powered by Framer Motion.
 * Calculates cursor position relative to the card's bounding box and smoothly animates
 * rotateX, rotateY, slight scale, and an optional subtle dynamic glare sheen.
 */
export const TiltCard: React.FC<TiltCardProps> = ({
  children,
  className = '',
  style,
  onClick,
  tiltAngle = 7.5,
  perspective = 1000,
  glareEffect = true
}) => {
  const cardRef = useRef<HTMLDivElement>(null);

  // Raw mouse coordinates normalized from -0.5 to 0.5
  const x = useMotionValue(0);
  const y = useMotionValue(0);

  // Smooth out coordinate tracking with snappy physics springs
  const springConfig = { damping: 20, stiffness: 300, mass: 0.5 };
  const smoothX = useSpring(x, springConfig);
  const smoothY = useSpring(y, springConfig);

  // Dynamic transforms: mouse at top (negative Y) tilts up (positive rotateX), etc.
  const rotateX = useTransform(smoothY, [-0.5, 0.5], [tiltAngle, -tiltAngle]);
  const rotateY = useTransform(smoothX, [-0.5, 0.5], [-tiltAngle, tiltAngle]);
  const glareOpacity = useTransform(smoothX, [-0.5, 0, 0.5], [0.15, 0, 0.15]);
  const glareX = useTransform(smoothX, [-0.5, 0.5], ['0%', '100%']);
  const glareY = useTransform(smoothY, [-0.5, 0.5], ['0%', '100%']);

  const handleMouseMove = (event: React.MouseEvent<HTMLDivElement>) => {
    if (!cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    const mouseX = event.clientX - rect.left;
    const mouseY = event.clientY - rect.top;

    // Normalize: -0.5 is leftmost/top, 0.5 is rightmost/bottom
    const xPct = mouseX / rect.width - 0.5;
    const yPct = mouseY / rect.height - 0.5;

    x.set(xPct);
    y.set(yPct);
  };

  const handleMouseLeave = () => {
    // Reset back to neutral resting state on mouse exit
    x.set(0);
    y.set(0);
  };

  return (
    <div
      style={{
        perspective: `${perspective}px`,
        transformStyle: 'preserve-3d'
      }}
      className="h-full"
    >
      <motion.div
        ref={cardRef}
        onMouseMove={handleMouseMove}
        onMouseLeave={handleMouseLeave}
        onClick={onClick}
        style={{
          rotateX,
          rotateY,
          transformStyle: 'preserve-3d',
          ...style
        }}
        whileHover={{
          scale: 1.025,
          transition: { duration: 0.2 }
        }}
        whileTap={{
          scale: 0.985
        }}
        className={`relative transition-shadow duration-300 ${className}`}
      >
        {children}

        {/* Subtle dynamic interactive glare highlight following cursor */}
        {glareEffect && (
          <motion.div
            aria-hidden="true"
            className="pointer-events-none absolute inset-0 rounded-[inherit] overflow-hidden transition-opacity duration-300"
            style={{
              opacity: glareOpacity
            }}
          >
            <motion.div
              className="absolute -inset-full rounded-full"
              style={{
                top: glareY,
                left: glareX,
                width: '150%',
                height: '150%',
                background:
                  'radial-gradient(circle at center, rgba(255, 255, 255, 0.22) 0%, rgba(255, 153, 0, 0.08) 35%, transparent 70%)',
                transform: 'translate(-50%, -50%)'
              }}
            />
          </motion.div>
        )}
      </motion.div>
    </div>
  );
};
