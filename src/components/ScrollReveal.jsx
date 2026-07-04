import { useEffect, useRef, useState } from 'react';

/**
 * ScrollReveal — wraps children and animates them into view with a real
 * 3D transform (rotateX / translateZ / scale) driven by IntersectionObserver,
 * not a one-time mount animation. Re-usable across the whole site.
 *
 * direction: "up" | "left" | "right" | "flip" | "zoom"
 */
export default function ScrollReveal({
  children,
  direction = "up",
  delay = 0,
  duration = 0.8,
  threshold = 0.15,
  once = true,
  className = "",
  style = {},
  as: Tag = "div",
}) {
  const ref = useRef(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const node = ref.current;
    if (!node) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setVisible(true);
            if (once) observer.unobserve(node);
          } else if (!once) {
            setVisible(false);
          }
        });
      },
      { threshold, rootMargin: "0px 0px -8% 0px" }
    );

    observer.observe(node);
    return () => observer.disconnect();
  }, [threshold, once]);

  const transforms = {
    up: visible
      ? "perspective(1200px) translateY(0) rotateX(0deg) scale(1)"
      : "perspective(1200px) translateY(70px) rotateX(18deg) scale(0.94)",
    left: visible
      ? "perspective(1200px) translateX(0) rotateY(0deg) scale(1)"
      : "perspective(1200px) translateX(-90px) rotateY(-22deg) scale(0.94)",
    right: visible
      ? "perspective(1200px) translateX(0) rotateY(0deg) scale(1)"
      : "perspective(1200px) translateX(90px) rotateY(22deg) scale(0.94)",
    flip: visible
      ? "perspective(1200px) rotateX(0deg) scale(1)"
      : "perspective(1200px) rotateX(-90deg) scale(0.9)",
    zoom: visible
      ? "perspective(1200px) scale(1) translateZ(0)"
      : "perspective(1200px) scale(0.8) translateZ(-120px)",
  };

  return (
    <Tag
      ref={ref}
      className={className}
      style={{
        ...style,
        opacity: visible ? 1 : 0,
        transform: transforms[direction] || transforms.up,
        transformStyle: "preserve-3d",
        transitionProperty: "opacity, transform",
        transitionDuration: `${duration}s`,
        transitionTimingFunction: "cubic-bezier(0.16, 1, 0.3, 1)",
        transitionDelay: `${delay}s`,
        willChange: "transform, opacity",
      }}
    >
      {children}
    </Tag>
  );
}
