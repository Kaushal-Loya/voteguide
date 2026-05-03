import { Loader } from "@googlemaps/js-api-loader";

/**
 * Initializes the Google Maps JS API Loader
 * @returns {Loader} The Google Maps Loader instance
 */
export function getGoogleMapsLoader() {
  // TODO: Replace the API key in .env.local before running.
  // See README.md > Google Services Used for setup instructions.
  const apiKey = process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY || "YOUR_GOOGLE_MAPS_API_KEY_HERE";
  
  return new Loader({
    apiKey,
    version: "weekly",
    libraries: ["places"],
  });
}
