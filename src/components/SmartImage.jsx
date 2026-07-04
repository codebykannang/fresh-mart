import { useState } from 'react';

/**
 * SmartImage — shows a shimmering skeleton placeholder until the real
 * image has finished loading, exactly like Amazon / DMart product grids.
 * Prevents layout jump and gives the storefront a native-app feel.
 */
export default function SmartImage({ src, alt, style = {}, wrapStyle = {}, className = "", loading = "lazy" }) {
  const [loaded, setLoaded] = useState(false);

  return (
    <div className={`img-skeleton-wrap ${!loaded ? "is-loading" : ""}`} style={{ width: "100%", height: "100%", ...wrapStyle }}>
      <img
        src={src}
        alt={alt}
        loading={loading}
        onLoad={() => setLoaded(true)}
        className={`${className} ${loaded ? "img-loaded" : ""}`}
        style={{ width: "100%", height: "100%", ...style }}
      />
    </div>
  );
}
