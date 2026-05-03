"use client";

import React, { useEffect, useRef, useState } from "react";
import { loadGoogleMaps } from "../lib/googleMaps";
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
        const importLibrary = loadGoogleMaps();
        
        const { Map } = await importLibrary("maps");
        const { PlacesService } = await importLibrary("places");
        const { Geocoder } = await importLibrary("geocoding");

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
              // The new Places API sometimes uses window.google.maps.places.PlacesServiceStatus.OK 
              // but we can just check if places is returned and status is "OK"
              if (searchStatus === "OK" && places) {
                // Show nearest 3
                const topPlaces = places.slice(0, 3);
                
                topPlaces.forEach(async (place) => {
                  const { Marker } = await importLibrary("marker");
                  new Marker({
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
    <Card className="w-full bg-white/60 backdrop-blur-xl border-white/40 shadow-glass rounded-3xl overflow-hidden">
      <CardHeader className="bg-gradient-to-r from-blue-500 to-indigo-600 p-8">
        <CardTitle className="text-3xl font-bold text-white tracking-tight flex items-center gap-3">
          <MapPin className="w-8 h-8 text-white" />
          Find Your Polling Booth
        </CardTitle>
      </CardHeader>
      <CardContent className="p-0 overflow-hidden">
        {loading && (
          <div className="p-12 text-center text-slate-600 font-bold text-xl flex flex-col items-center gap-4">
            <div className="w-12 h-12 border-4 border-indigo-600/30 border-t-indigo-600 rounded-full animate-spin"></div>
            Searching for booths...
          </div>
        )}
        {error ? (
          <div className="p-12 text-center relative overflow-hidden">
             <div className="absolute inset-0 bg-mesh-indigo opacity-20 pointer-events-none"></div>
             <div className="relative z-10">
              <div className="text-slate-800 font-bold text-xl mb-6 bg-white/80 backdrop-blur-md border border-white/40 rounded-2xl p-6 shadow-glass-sm max-w-2xl mx-auto">{error}</div>
              <div className="font-bold text-2xl text-slate-800 tracking-tight mt-8">Polling booths for {district}, {state}</div>
              <p className="text-lg font-medium text-slate-600 mt-4 bg-white/60 backdrop-blur-sm p-6 rounded-2xl border border-white/40 shadow-sm max-w-2xl mx-auto">
                Please check your state&apos;s Chief Electoral Officer (CEO) website or the NVSP portal to find your exact polling location.
              </p>
            </div>
          </div>
        ) : (
          <div ref={mapRef} className="w-full h-[500px]" />
        )}
      </CardContent>
    </Card>
  );
}
