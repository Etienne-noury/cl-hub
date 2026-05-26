interface Props {
  lat: number | null;
  lng: number | null;
  address?: string;
  className?: string;
}

export function GoogleMiniMap({ lat, lng, address, className = '' }: Props) {
  const key = import.meta.env.VITE_LOVABLE_CONNECTOR_GOOGLE_MAPS_BROWSER_KEY as string | undefined;

  // Fallback: simple OpenStreetMap iframe if Google key not available
  if (!key) {
    if (lat == null || lng == null) return null;
    const bbox = `${lng - 0.005},${lat - 0.005},${lng + 0.005},${lat + 0.005}`;
    return (
      <iframe
        title="Carte"
        className={`w-full h-48 rounded-xl border border-border ${className}`}
        src={`https://www.openstreetmap.org/export/embed.html?bbox=${bbox}&layer=mapnik&marker=${lat},${lng}`}
        loading="lazy"
      />
    );
  }

  const q =
    lat != null && lng != null
      ? `${lat},${lng}`
      : encodeURIComponent(address ?? '');

  return (
    <iframe
      title="Carte Google Maps"
      className={`w-full h-48 rounded-xl border border-border ${className}`}
      src={`https://www.google.com/maps/embed/v1/place?key=${key}&q=${q}`}
      loading="lazy"
      referrerPolicy="no-referrer-when-downgrade"
      allowFullScreen
    />
  );
}
