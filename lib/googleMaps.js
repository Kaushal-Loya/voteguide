import { setOptions, importLibrary } from "@googlemaps/js-api-loader";

/**
 * Initializes the Google Maps JS API options
 * @returns {Function} The importLibrary function
 */
export function loadGoogleMaps() {
  // TODO: Replace the API key in .env.local before running.
  // See README.md > Google Services Used for setup instructions.
  const apiKey = process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY || "YOUR_GOOGLE_MAPS_API_KEY_HERE";
  
  setOptions({
    key: apiKey,
    version: "weekly",
  });

  return importLibrary;
}
