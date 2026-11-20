"use client";

import React, { useMemo, useState } from "react";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { geoEqualEarth, geoGraticule10, geoPath } from "d3-geo";
import { feature } from "topojson-client";
import type { FeatureCollection, GeoJsonProperties, Geometry } from "geojson";
import type { Topology } from "topojson-specification";
import worldAtlas from "world-atlas/countries-110m.json";
import { Compass, MapPin, Route } from "lucide-react";
import {
  localized,
  travelDestinations,
  visitedCountryCodes,
  type Locale,
  type TravelDestination,
} from "@/data/siteContent";

const mapWidth = 1000;
const mapHeight = 530;

interface TravelMapProps {
  locale: Locale;
}

export default function TravelMap({ locale }: TravelMapProps) {
  const [activeCode, setActiveCode] = useState<TravelDestination["code"]>("ES");
  const shouldReduceMotion = useReducedMotion();

  const map = useMemo(() => {
    const topology = worldAtlas as unknown as Topology;
    const countries = feature(
      topology,
      topology.objects.countries,
    ) as FeatureCollection<Geometry, GeoJsonProperties>;
    const projection = geoEqualEarth().fitExtent(
      [
        [18, 24],
        [mapWidth - 18, mapHeight - 22],
      ],
      countries,
    );
    const path = geoPath(projection);

    return { countries, projection, path, graticule: path(geoGraticule10()) };
  }, []);

  const activeDestination =
    travelDestinations.find((destination) => destination.code === activeCode) ??
    travelDestinations[0];

  const activeRoute = activeDestination.cities
    .map((city) => map.projection(city.coordinates))
    .filter((point): point is [number, number] => Boolean(point))
    .map((point, index) => `${index === 0 ? "M" : "L"}${point[0]},${point[1]}`)
    .join(" ");

  const copy =
    locale === "zh"
      ? {
          mapLabel: "全球足迹交互地图",
          visited: "已抵达",
          places: "旅行坐标",
          prompt: "点击点亮的国家或城市坐标",
          cityCount: "个坐标",
        }
      : {
          mapLabel: "Interactive world travel map",
          visited: "Reached",
          places: "Travel coordinates",
          prompt: "Select a highlighted country or city point",
          cityCount: "places",
        };

  return (
    <div className="travel-map-stage">
      <div className="travel-map-toolbar">
        <div>
          <div className="travel-kicker">
            <Compass size={14} />
            {copy.mapLabel}
          </div>
          <p>{copy.prompt}</p>
        </div>
        <div className="travel-country-switcher" aria-label={copy.visited}>
          {travelDestinations.map((destination) => {
            const isActive = destination.code === activeCode;
            return (
              <button
                key={destination.code}
                type="button"
                data-active={isActive ? "true" : "false"}
                onClick={() => setActiveCode(destination.code)}
                style={{ "--country-accent": destination.accent } as React.CSSProperties}
              >
                <span>{destination.code}</span>
                {localized(destination.country, locale)}
              </button>
            );
          })}
        </div>
      </div>

      <div className="travel-map-layout">
        <div className="travel-map-canvas">
          <svg
            viewBox={`0 0 ${mapWidth} ${mapHeight}`}
            role="group"
            aria-label={copy.mapLabel}
            preserveAspectRatio="xMidYMid meet"
          >
            <defs>
              <filter id="travel-map-glow" x="-100%" y="-100%" width="300%" height="300%">
                <feGaussianBlur stdDeviation="5" result="blur" />
                <feMerge>
                  <feMergeNode in="blur" />
                  <feMergeNode in="SourceGraphic" />
                </feMerge>
              </filter>
            </defs>

            <path className="travel-map-graticule" d={map.graticule ?? undefined} />

            {map.countries.features.map((country, index) => {
              const numericCode = String(
                (country as { id?: string | number }).id ?? "",
              ).padStart(3, "0");
              const destination = travelDestinations.find(
                (item) => item.numericCode === numericCode,
              );
              const isVisited = visitedCountryCodes.includes(
                numericCode as (typeof visitedCountryCodes)[number],
              );
              const isActive = destination?.code === activeCode;
              const pathData = map.path(country);

              return (
                <path
                  key={`${numericCode}-${index}`}
                  d={pathData ?? undefined}
                  className="travel-country"
                  data-visited={isVisited ? "true" : "false"}
                  data-active={isActive ? "true" : "false"}
                  style={
                    destination
                      ? ({ "--country-accent": destination.accent } as React.CSSProperties)
                      : undefined
                  }
                  role={destination ? "button" : undefined}
                  tabIndex={destination ? 0 : undefined}
                  aria-label={
                    destination
                      ? `${copy.visited}: ${localized(destination.country, locale)}`
                      : undefined
                  }
                  onClick={() => destination && setActiveCode(destination.code)}
                  onKeyDown={(event) => {
                    if (destination && (event.key === "Enter" || event.key === " ")) {
                      event.preventDefault();
                      setActiveCode(destination.code);
                    }
                  }}
                />
              );
            })}

            {activeRoute && <path className="travel-active-route" d={activeRoute} />}

            {travelDestinations.flatMap((destination) =>
              destination.cities.map((city, cityIndex) => {
                const point = map.projection(city.coordinates);
                if (!point) return null;
                const isActive = destination.code === activeCode;

                return (
                  <g
                    key={`${destination.code}-${localized(city.name, locale)}`}
                    className="travel-city-marker"
                    data-active={isActive ? "true" : "false"}
                    transform={`translate(${point[0]} ${point[1]})`}
                    role="button"
                    tabIndex={0}
                    aria-label={`${localized(destination.country, locale)} / ${localized(city.name, locale)}`}
                    onClick={() => setActiveCode(destination.code)}
                    onKeyDown={(event) => {
                      if (event.key === "Enter" || event.key === " ") {
                        event.preventDefault();
                        setActiveCode(destination.code);
                      }
                    }}
                    style={{ "--country-accent": destination.accent } as React.CSSProperties}
                  >
                    <circle className="travel-city-pulse" r={isActive ? 12 : 8} />
                    <circle className="travel-city-core" r={isActive ? 4.5 : 3.2} />
                    {isActive && cityIndex === 0 && (
                      <text x="10" y="-9" className="travel-city-label">
                        {localized(destination.country, locale)}
                      </text>
                    )}
                    <title>{localized(city.name, locale)}</title>
                  </g>
                );
              }),
            )}
          </svg>

          <div className="travel-map-coordinates" aria-hidden="true">
            <span>90°W</span>
            <span>00°</span>
            <span>90°E</span>
          </div>
        </div>

        <AnimatePresence mode="wait" initial={false}>
          <motion.aside
            key={activeDestination.code}
            className="travel-map-dossier"
            initial={shouldReduceMotion ? false : { opacity: 0, x: 18 }}
            animate={{ opacity: 1, x: 0 }}
            exit={shouldReduceMotion ? { opacity: 0 } : { opacity: 0, x: -18 }}
            transition={{ duration: shouldReduceMotion ? 0 : 0.28 }}
            style={{ "--country-accent": activeDestination.accent } as React.CSSProperties}
          >
            <div className="travel-dossier-index">{activeDestination.code}</div>
            <div className="travel-kicker">
              <MapPin size={14} />
              {localized(activeDestination.region, locale)}
            </div>
            <h3>{localized(activeDestination.country, locale)}</h3>
            <p>{localized(activeDestination.summary, locale)}</p>

            <div className="travel-dossier-divider" />

            <div className="travel-dossier-meta">
              <span>
                <Route size={15} /> {copy.places}
              </span>
              <strong>
                {activeDestination.cities.length} {copy.cityCount}
              </strong>
            </div>
            <div className="travel-city-list">
              {activeDestination.cities.map((city, index) => (
                <span key={localized(city.name, locale)}>
                  <b>{String(index + 1).padStart(2, "0")}</b>
                  {localized(city.name, locale)}
                </span>
              ))}
            </div>
          </motion.aside>
        </AnimatePresence>
      </div>
    </div>
  );
}
