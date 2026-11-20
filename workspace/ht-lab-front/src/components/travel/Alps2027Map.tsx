"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { createRoot, type Root } from "react-dom/client";
import { useReducedMotion } from "framer-motion";
import type { FeatureCollection, LineString, Point } from "geojson";
import type {
  GeoJSONSource,
  Map as MapLibreMap,
  Marker as MapLibreMarker,
  Popup as MapLibrePopup,
} from "maplibre-gl";
import { CalendarDays, MapPin, Route } from "lucide-react";
import {
  alps2027Itinerary,
  localized,
  type AlpineItineraryDay,
  type Locale,
} from "@/data/siteContent";

const mapPoints: Record<number, [number, number]> = {
  1: [16.37, 48.21],
  2: [16.31, 48.18],
  3: [13.04, 47.8],
  4: [12.98, 47.55],
  5: [13.65, 47.56],
  6: [13.43, 47.78],
  7: [11.4, 47.27],
  8: [11.39, 47.31],
  9: [11.35, 46.5],
  10: [11.58, 46.41],
  11: [11.67, 46.57],
  12: [11.73, 46.6],
  13: [11.62, 46.54],
  14: [9.19, 45.46],
  15: [8.73, 45.63],
};

const routeGeoJson: FeatureCollection<LineString> = {
  type: "FeatureCollection",
  features: [
    {
      type: "Feature",
      properties: {},
      geometry: {
        type: "LineString",
        coordinates: alps2027Itinerary.map((day) => mapPoints[day.day]),
      },
    },
  ],
};

function pointGeoJson(activeDay: number): FeatureCollection<Point> {
  return {
    type: "FeatureCollection",
    features: alps2027Itinerary.map((day) => ({
      type: "Feature",
      properties: {
        day: day.day,
        active: day.day === activeDay ? 1 : 0,
      },
      geometry: { type: "Point", coordinates: mapPoints[day.day] },
    })),
  };
}

interface Alps2027MapProps {
  locale: Locale;
  activeDay: AlpineItineraryDay;
  onDaySelect: (day: number) => void;
}

export default function Alps2027Map({ locale, activeDay, onDaySelect }: Alps2027MapProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const mapRef = useRef<MapLibreMap | null>(null);
  const markersRef = useRef<Map<number, MapLibreMarker>>(new Map());
  const popupRef = useRef<MapLibrePopup | null>(null);
  const popupRootRef = useRef<Root | null>(null);
  const onDaySelectRef = useRef(onDaySelect);
  const hasOpenedInitialPopupRef = useRef(false);
  const [isReady, setIsReady] = useState(false);
  const [loadFailed, setLoadFailed] = useState(false);
  const shouldReduceMotion = useReducedMotion();

  useEffect(() => {
    onDaySelectRef.current = onDaySelect;
  }, [onDaySelect]);

  const clearPopup = useCallback(() => {
    popupRef.current?.remove();
    popupRef.current = null;
    popupRootRef.current?.unmount();
    popupRootRef.current = null;
  }, []);

  const openDayPopup = useCallback(
    async (day: AlpineItineraryDay, moveCamera = true) => {
      const map = mapRef.current;
      if (!map) return;

      const maplibregl = await import("maplibre-gl");
      clearPopup();

      const popupNode = document.createElement("div");
      const popupRoot = createRoot(popupNode);
      popupRoot.render(
        <article className="alps-map-popup-card">
          <div className="alps-map-popup-kicker">
            <span>DAY {String(day.day).padStart(2, "0")}</span>
            <span>{day.date}</span>
          </div>
          <h3>{localized(day.base, locale)}</h3>
          <p>{localized(day.focus, locale)}</p>
          <div className="alps-map-popup-route">
            <Route size={13} />
            {localized(day.route, locale)}
          </div>
        </article>,
      );

      const popup = new maplibregl.Popup({
        closeButton: false,
        closeOnClick: false,
        offset: 22,
        anchor: day.day <= 2 ? "right" : day.day >= 14 ? "left" : "top",
        className: "alps-map-popup",
        maxWidth: window.matchMedia("(max-width: 767px)").matches ? "220px" : "290px",
      })
        .setLngLat(mapPoints[day.day])
        .setDOMContent(popupNode)
        .addTo(map);

      popupRef.current = popup;
      popupRootRef.current = popupRoot;

      if (moveCamera) {
        map.flyTo({
          center: mapPoints[day.day],
          zoom: day.day >= 9 && day.day <= 13 ? 8.1 : 7.1,
          bearing: day.day >= 9 && day.day <= 13 ? -16 : -7,
          pitch: 42,
          duration: shouldReduceMotion ? 0 : 1200,
          essential: !shouldReduceMotion,
        });
      }
    },
    [clearPopup, locale, shouldReduceMotion],
  );

  useEffect(() => {
    if (!containerRef.current || mapRef.current) return;

    let cancelled = false;
    const markerRegistry = markersRef.current;

    void (async () => {
      const maplibregl = await import("maplibre-gl");
      if (cancelled || !containerRef.current) return;

      const map = new maplibregl.Map({
        container: containerRef.current,
        style: "https://tiles.openfreemap.org/styles/liberty",
        center: [12.5, 47.05],
        zoom: 5.35,
        bearing: -8,
        pitch: 36,
        attributionControl: false,
        maxBounds: [
          [7.2, 44.6],
          [17.4, 49.4],
        ],
      });

      mapRef.current = map;
      map.addControl(
        new maplibregl.NavigationControl({ showCompass: true, showZoom: true }),
        "top-right",
      );
      map.addControl(
        new maplibregl.AttributionControl({ compact: true, customAttribution: "OpenFreeMap" }),
        "bottom-right",
      );

      const initializeMapLayers = () => {
        if (cancelled) return;
        if (map.getSource("alps-route")) return;

        map.addSource("alps-route", {
          type: "geojson",
          data: routeGeoJson,
          lineMetrics: true,
        });
        map.addSource("alps-days", {
          type: "geojson",
          data: pointGeoJson(alps2027Itinerary[0].day),
        });

        map.addLayer({
          id: "alps-route-shadow",
          type: "line",
          source: "alps-route",
          paint: {
            "line-color": "rgba(3, 14, 12, 0.72)",
            "line-width": 8,
            "line-blur": 5,
          },
        });

        for (const day of alps2027Itinerary) {
          const markerElement = document.createElement("button");
          markerElement.type = "button";
          markerElement.className = "alps-map-day-marker";
          markerElement.dataset.active = day.day === alps2027Itinerary[0].day ? "true" : "false";
          markerElement.style.zIndex = day.day === alps2027Itinerary[0].day ? "10" : "1";
          markerElement.setAttribute(
            "aria-label",
            `Day ${String(day.day).padStart(2, "0")} / ${localized(day.base, locale)}`,
          );

          const markerLabel = document.createElement("span");
          markerLabel.textContent = String(day.day).padStart(2, "0");
          markerElement.append(markerLabel);
          markerElement.addEventListener("click", () => onDaySelectRef.current(day.day));

          const marker = new maplibregl.Marker({
            element: markerElement,
            anchor: "center",
          })
            .setLngLat(mapPoints[day.day])
            .addTo(map);

          markerRegistry.set(day.day, marker);
        }
        map.addLayer({
          id: "alps-route-line",
          type: "line",
          source: "alps-route",
          paint: {
            "line-width": 3.4,
            "line-gradient": [
              "interpolate",
              ["linear"],
              ["line-progress"],
              0,
              "#bd7b23",
              alps2027Itinerary[0].routeProgress / 100,
              "#bd7b23",
              Math.min(1, alps2027Itinerary[0].routeProgress / 100 + 0.01),
              "rgba(29, 82, 66, 0.72)",
              1,
              "rgba(29, 82, 66, 0.72)",
            ],
          },
        });
        map.addLayer({
          id: "alps-day-halos",
          type: "circle",
          source: "alps-days",
          paint: {
            "circle-radius": ["case", ["==", ["get", "active"], 1], 14, 8],
            "circle-color": ["case", ["==", ["get", "active"], 1], "#e9c267", "#16362e"],
            "circle-opacity": ["case", ["==", ["get", "active"], 1], 0.28, 0.15],
            "circle-blur": 0.3,
          },
        });
        map.addLayer({
          id: "alps-day-points",
          type: "circle",
          source: "alps-days",
          paint: {
            "circle-radius": ["case", ["==", ["get", "active"], 1], 6.5, 4.2],
            "circle-color": ["case", ["==", ["get", "active"], 1], "#f7d783", "#54c6a3"],
            "circle-stroke-color": "#08110e",
            "circle-stroke-width": 2,
          },
        });

        map.on("mouseenter", "alps-day-points", () => {
          map.getCanvas().style.cursor = "pointer";
        });
        map.on("mouseleave", "alps-day-points", () => {
          map.getCanvas().style.cursor = "";
        });
        map.on("click", "alps-day-points", (event) => {
          const selected = Number(event.features?.[0]?.properties?.day);
          if (selected) onDaySelectRef.current(selected);
        });

        setIsReady(true);
      };

      map.on("style.load", initializeMapLayers);
      if (map.isStyleLoaded()) initializeMapLayers();

      map.on("error", (event) => {
        if (!event.error?.message?.includes("AbortError")) setLoadFailed(true);
      });
    })();

    return () => {
      cancelled = true;
      clearPopup();
      markerRegistry.clear();
      mapRef.current?.remove();
      mapRef.current = null;
    };
  }, [clearPopup, locale]);

  useEffect(() => {
    const map = mapRef.current;
    if (!map || !isReady) return;

    const source = map.getSource("alps-days") as GeoJSONSource | undefined;
    source?.setData(pointGeoJson(activeDay.day));
    for (const [day, marker] of markersRef.current) {
      marker.getElement().dataset.active = day === activeDay.day ? "true" : "false";
      marker.getElement().style.zIndex = day === activeDay.day ? "10" : "1";
    }
    map.setPaintProperty("alps-route-line", "line-gradient", [
      "interpolate",
      ["linear"],
      ["line-progress"],
      0,
      "#bd7b23",
      activeDay.routeProgress / 100,
      "#bd7b23",
      Math.min(1, activeDay.routeProgress / 100 + 0.01),
      "rgba(29, 82, 66, 0.72)",
      1,
      "rgba(29, 82, 66, 0.72)",
    ]);
    void openDayPopup(activeDay, hasOpenedInitialPopupRef.current);
    hasOpenedInitialPopupRef.current = true;
  }, [activeDay, isReady, openDayPopup]);

  const copy =
    locale === "zh"
      ? { title: "实时路线桌面", hint: "点击坐标查看每日计划", loading: "正在装载阿尔卑斯地图", failed: "地图底图暂时不可用，日程控制台仍可使用" }
      : { title: "Live route desk", hint: "Select a point for the day's plan", loading: "Loading the Alpine map", failed: "The basemap is temporarily unavailable; the itinerary remains usable" };

  return (
    <div className="alps-live-map" aria-label={copy.title}>
      <div ref={containerRef} className="alps-map-canvas" />
      <div className="alps-map-titlebar">
        <span><MapPin size={14} /> {copy.title}</span>
        <span><CalendarDays size={13} /> {copy.hint}</span>
      </div>
      {!isReady && !loadFailed && <div className="alps-map-status">{copy.loading}</div>}
      {loadFailed && <div className="alps-map-status alps-map-status-error">{copy.failed}</div>}
      <div className="alps-map-coordinates" aria-hidden="true">
        <span>45.46° N</span>
        <span>08.73° E</span>
        <span>48.21° N</span>
        <span>16.37° E</span>
      </div>
    </div>
  );
}
