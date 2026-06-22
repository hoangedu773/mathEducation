"use client";

import { useEffect, useRef } from "react";

interface MarkerData {
  lat: number;
  lon: number;
  ip: string;
  city?: string;
  score?: number;
  flags?: number;
}

interface Props {
  markers: MarkerData[];
}

export default function LeafletMap({ markers }: Props) {
  const mapRef = useRef<HTMLDivElement>(null);
  const mapInstance = useRef<unknown>(null);

  useEffect(() => {
    if (typeof window === "undefined" || !mapRef.current || markers.length === 0) return;

    let L: typeof import("leaflet");
    import("leaflet").then((leaflet) => {
      L = leaflet;
      if (mapInstance.current) return;

      const map = L.map(mapRef.current!).setView([16.0, 108.0], 5);
      mapInstance.current = map;

      L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
        attribution: "&copy; OpenStreetMap",
        maxZoom: 18,
      }).addTo(map);

      markers.forEach((m) => {
        if (!m.lat || !m.lon) return;
        const color = (m.flags ?? 0) > 0 ? "red" : m.score && m.score >= 8 ? "green" : "gold";
        const marker = L.circleMarker([m.lat, m.lon], {
          radius: 7,
          fillColor: color,
          color: "#fff",
          weight: 1.5,
          fillOpacity: 0.8,
        }).addTo(map);
        marker.bindPopup(
          `<b>${m.ip}</b><br/>${m.city || "—"}${m.score !== undefined ? `<br/>Score: ${m.score}` : ""}`
        );
      });

      const bounds = L.latLngBounds(markers.filter((m) => m.lat && m.lon).map((m) => [m.lat, m.lon] as [number, number]));
      if (bounds.isValid()) map.fitBounds(bounds, { padding: [30, 30] });
    });

    return () => {
      if (mapInstance.current) {
        (mapInstance.current as { remove: () => void }).remove();
        mapInstance.current = null;
      }
    };
  }, [markers]);

  if (markers.length === 0) {
    return <p className="py-10 text-center text-sm text-[var(--color-text-secondary)]">Chưa có dữ liệu bản đồ</p>;
  }

  return <div ref={mapRef} className="h-80 w-full rounded-xl" />;
}
