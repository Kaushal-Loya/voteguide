"use client";

import React, { useEffect, useRef, useState } from "react";
import { getGoogleMapsLoader } from "../lib/googleMaps";
import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";
import { MapPin } from "lucide-react";

export default function PollingBoothMap({ district, state }) {
  const mapRef = useRef(null);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!district || !state) {
      setError("Location context missing.");
      setLoading(false);
      return;
    }

    const initMap = async () => {
      try {
        const loader = getGoogleMapsLoader();
        await loader.load();
        
        const { Map } = await window.google.maps.importLibrary("maps");
        const { PlacesService } = await window.google.maps.importLibrary("places");
        const { Geocoder } = await window.google.maps.importLibrary("geocoding");

        const geocoder = new Geocoder();
        const address = `${district}, ${state}, India`;
        
        geocoder.geocode({ address }, (results, status) => {
          if (status === "OK" && results[0]) {
            const location = results[0].geometry.location;
            
            const map = new Map(mapRef.current, {
              center: location,
              zoom: 12,
              mapId: "DEMO_MAP_ID",
            });

            const request = {
              location: location,
              radius: '5000',
              query: `polling booth in ${district} ${state}`,
            };

            const service = new PlacesService(map);
            service.textSearch(request, (places, searchStatus) => {
              if (searchStatus === window.google.maps.places.PlacesServiceStatus.OK && places) {
                // Show nearest 3
                const topPlaces = places.slice(0, 3);
                
                topPlaces.forEach((place) => {
                  new window.google.maps.Marker({
                    map,
                    position: place.geometry.location,
                    title: place.name,
                  });
                });
              }
              setLoading(false);
            });
          } else {
            setError("Could not geocode location. Displaying text address fallback.");
            setLoading(false);
          }
        });
      } catch (e) {
        console.error("Maps error", e);
        setError("Failed to load Google Maps. Please ensure the API key is configured in .env.local.");
        setLoading(false);
      }
    };

    initMap();
  }, [district, state]);

  return (
    <Card className="w-full shadow-lg overflow-hidden border-zinc-200">
      <CardHeader className="bg-zinc-50 border-b border-zinc-100">
        <CardTitle className="text-lg flex items-center gap-2">
          <MapPin className="w-5 h-5 text-blue-600" />
          Find Your Polling Booth
        </CardTitle>
      </CardHeader>
      <CardContent className="p-0">
        {loading && <div className="p-8 text-center text-zinc-500 animate-pulse">Loading map...</div>}
        {error ? (
          <div className="p-8 text-center">
            <div className="text-red-500 mb-2">{error}</div>
            <div className="font-semibold text-lg">Polling booths for {district}, {state}</div>
            <p className="text-sm text-zinc-600 mt-2">
              Please check your state's Chief Electoral Officer (CEO) website or the NVSP portal to find your exact polling location.
            </p>
          </div>
        ) : (
          <div ref={mapRef} style={{ width: "100%", height: "400px" }} />
        )}
      </CardContent>
    </Card>
  );
}
