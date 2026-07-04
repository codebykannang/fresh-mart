import { useEffect, useRef } from 'react';

/**
 * Parallax — moves its children at a fraction of scroll speed to create
 * real depth on scroll (not just a static background-attachment: fixed,
 * which iOS Safari does not support). Uses rAF for smooth 60fps updates.
 */
export default function Parallax({ children, speed = 0.35, className = "", style = {} }) {
  const ref = useRef(null);

  useEffect(() => {
    const node = ref.current;
    if (!node) return;
    let ticking = false;

    const update = () => {
      const rect = node.parentElement.getBoundingClientRect();
      const offset = rect.top * speed;
      node.style.transform = `translate3d(0, ${offset}px, 0) scale(1.15)`;
      ticking = false;
    };

    const onScroll = () => {
      if (!ticking) {
        window.requestAnimationFrame(update);
        ticking = true;
      }
    };

    update();
    window.addEventListener('scroll', onScroll, { passive: true });
    window.addEventListener('resize', onScroll);
    return () => {
      window.removeEventListener('scroll', onScroll);
      window.removeEventListener('resize', onScroll);
    };
  }, [speed]);

  return (
    <div ref={ref} className={className} style={{ willChange: "transform", ...style }}>
      {children}
    </div>
  );
}
