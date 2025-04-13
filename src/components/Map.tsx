import React, { useEffect, useRef } from 'react';
import { CountryData } from '../types';
import mapboxgl from 'mapbox-gl';
import 'mapbox-gl/dist/mapbox-gl.css';
import './Map.css';

// Set the access token
mapboxgl.accessToken = 'pk.eyJ1IjoiaGFycnkxMjM0OTgiLCJhIjoiY2s4OXh1c3BqMGFsZzNvbXA3YmYyaGFhYSJ9.wmVMiMxlSqpzJPsj-UXr3Q';

interface MapProps {
  countries: CountryData[];
}

const Map: React.FC<MapProps> = ({ countries }) => {
  const mapContainer = useRef<HTMLDivElement>(null);
  const map = useRef<mapboxgl.Map | null>(null);
  const markers = useRef<mapboxgl.Marker[]>([]);

  useEffect(() => {
    if (!mapContainer.current) return;

    // Initialize the map
    map.current = new mapboxgl.Map({
      container: mapContainer.current,
      style: 'mapbox://styles/mapbox/streets-v11',
      center: [9, 20],
      zoom: 1.55
    });

    // Add navigation controls
    map.current.addControl(new mapboxgl.NavigationControl());

    // Add markers
    updateMarkers();

    // Cleanup function
    return () => {
      if (map.current) {
        map.current.remove();
      }
    };
  }, []);

  const updateMarkers = () => {
    if (!map.current) return;

    // Remove existing markers
    markers.current.forEach(marker => marker.remove());
    markers.current = [];

    // Add new markers
    countries.forEach(country => {
      const { lat, long } = country.countryInfo;
      const { cases, deaths, recovered } = country;
      const countryName = country.country;

      let color;
      if (deaths >= 2000) {
        color = "rgb(255, 0, 0)";
      } else if (deaths <= 100) {
        color = "rgb(33, 178, 12)";
      } else {
        color = `rgb(${deaths}, 0, 0)`;
      }

      const marker = new mapboxgl.Marker({
        color: color,
        draggable: false,
      })
        .setLngLat([long, lat])
        .addTo(map.current!);

      const popup = new mapboxgl.Popup({
        offset: 25,
        closeButton: false,
        closeOnClick: false,
      }).setHTML(`
        <div style="
          background: rgba(255, 255, 255, 0.95);
          border-radius: 10px;
          padding: 10px 15px;
          font-family: 'Segoe UI', sans-serif;
          color: #333;
          font-size: 14px;
          box-shadow: 0 4px 12px rgba(0, 0, 0, 0.2);
        ">
          <strong style="font-size: 16px;">${countryName}</strong><br/>
          <span>🦠 Cases: <strong>${cases.toLocaleString()}</strong></span><br/>
          <span>💀 Deaths: <strong>${deaths.toLocaleString()}</strong></span><br/>
          <span>💚 Recovered: <strong>${recovered.toLocaleString()}</strong></span>
        </div>
      `);

      marker.getElement().addEventListener('mouseenter', () => {
        popup.addTo(map.current!).setLngLat([long, lat]);
      });
      marker.getElement().addEventListener('mouseleave', () => {
        popup.remove();
      });

      markers.current.push(marker);
    });
  };

  // Update markers when countries data changes
  useEffect(() => {
    if (map.current) {
      updateMarkers();
    }
  }, [countries]);

  return (
    <div className="map-container">
      <div ref={mapContainer} className="map" />
    </div>
  );
};

export default Map; 