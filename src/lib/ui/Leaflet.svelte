<script lang="ts">
  import "leaflet/dist/leaflet.css";
  import { toTitleCase } from "$lib/util";
  import type { Location } from "$lib/types/boardbuddy-types";
  import { onMount } from "svelte";
  import type { Control, Map as LeafletMap } from "leaflet";
  import { browser } from "$app/environment";

  export let id = "home-map-id"; // This will be overridden by the parent component
  export let location = { lat: 53.2734, lng: -7.7783203 };
  export let zoom = 8;
  export let minZoom = 7;
  export let activeLayer = "Terrain";
  export let locations: Location[] = []; // Array of all locations
  export let showLayers = true; // Prop to control layer display

  let imap: LeafletMap;
  let control: Control.Layers;
  let baseLayers: { [key: string]: any };
  let categoryLayers: { [key: string]: any } = {}; // Object to store category layers

  async function fetchWeatherData(lat: number, lng: number): Promise<number> {
    const apiKey = import.meta.env.VITE_OPENWEATHERAPI;
    const url = `https://api.openweathermap.org/data/3.0/onecall?lat=${lat}&lon=${lng}&exclude=minutely,hourly,daily,alerts&units=metric&appid=${apiKey}`;
    const response = await fetch(url);
    if (!response.ok) {
        throw new Error('Failed to fetch weather data');
    }
    const data = await response.json();
    console.log('Weather data:', data);
    return data.current.temp;
  }

  onMount(async () => {
    if (browser) {
      const leaflet = await import("leaflet");

      // Define custom icon
      const customIcon = leaflet.icon({
        iconRetinaUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon-2x.png',
        iconUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon.png',
        shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-shadow.png',
        iconSize: [25, 41],
        iconAnchor: [12, 41],
        popupAnchor: [1, -34],
        shadowSize: [41, 41]
      });

      baseLayers = {
        Terrain: leaflet.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
          maxZoom: 17,
        })
      };

      let defaultLayer = baseLayers[activeLayer];
      imap = leaflet.map(id, {
        center: [location.lat, location.lng],
        zoom: zoom,
        minZoom: minZoom,
        layers: [defaultLayer]
      });

      if (showLayers && locations.length > 0) {
        for (const loc of locations) {
          if (!categoryLayers[loc.category]) {
            categoryLayers[loc.category] = leaflet.layerGroup();
          }
          const marker = leaflet.marker([loc.y, loc.x], { icon: customIcon });
          const popup = leaflet.popup({ autoClose: false, closeOnClick: false });

          try {
            const temp = await fetchWeatherData(loc.y, loc.x);
            popup.setContent(`<b>${loc.title}</b><br>${toTitleCase(loc.category)}<br>Temperature: ${temp}°C<br><a href="/location/${loc._id}">View Location</a>`);
          } catch (error) {
            console.error('Error fetching weather data:', error);
            popup.setContent(`<b>${loc.title}</b><br>${toTitleCase(loc.category)}<br>Temperature: N/A<br><a href="/location/${loc._id}">View Location</a>`);
          }

          marker.bindPopup(popup);
          categoryLayers[loc.category].addLayer(marker);
        }

        // Add layers to the map
        for (let layer in categoryLayers) {
          categoryLayers[layer].addTo(imap);
        }

        // Add layer control
        control = leaflet.control.layers(baseLayers, categoryLayers).addTo(imap);
      } else if (locations.length === 1 || !showLayers) {
        for (const loc of locations) {
          const marker = leaflet.marker([loc.y, loc.x], { icon: customIcon });
          marker.addTo(imap);
        }
      }
    }
  });

  export async function addMarker(lat: number, lng: number, popupText: string) {
    const leaflet = await import("leaflet");

    // Define custom icon
    const customIcon = leaflet.icon({
      iconRetinaUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon-2x.png',
      iconUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon.png',
      shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-shadow.png',
      iconSize: [25, 41],
      iconAnchor: [12, 41],
      popupAnchor: [1, -34],
      shadowSize: [41, 41]
    });

    const marker = leaflet.marker([lat, lng], { icon: customIcon });
    marker.addTo(imap);
    const popup = leaflet.popup({ autoClose: true, closeOnClick: true });
    popup.setContent(popupText);
    marker.bindPopup(popup);
  }

  export function moveTo(lat: number, lng: number) {
    imap.flyTo({ lat: lat, lng: lng });
  }
</script>

<div {id} class="w-full h-64 md:h-96 lg:h-[500px]" />
