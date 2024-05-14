<script lang="ts">
import "leaflet/dist/leaflet.css";
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

onMount(async () => {
  if (browser) {
    const leaflet = await import("leaflet");
    baseLayers = {
      Terrain: leaflet.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
        maxZoom: 17,
        attribution:
          'Map data: &copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors, <a href="http://viewfinderpanoramas.org">SRTM</a> | Map style: &copy; <a href="https://opentopomap.org">OpenTopoMap</a> (<a href="https://creativecommons.org/licenses/by-sa/3.0/">CC-BY-SA</a>)'
      })
    };
    let defaultLayer = baseLayers[activeLayer];
    imap = leaflet.map(id, {
      center: [location.lat, location.lng],
      zoom: zoom,
      minZoom: minZoom,
      layers: [defaultLayer]
    });

    if (showLayers && locations.length > 1) {
      locations.forEach((loc) => {
        if (!categoryLayers[loc.category]) {
          categoryLayers[loc.category] = leaflet.layerGroup();
        }
        const marker = leaflet.marker([loc.x, loc.y]);
        const popup = leaflet.popup({ autoClose: false, closeOnClick: false });
        popup.setContent(`<b>${loc.title}</b><br>${loc.category}<br><a href="/location/${loc._id}">View Location</a>`);
        marker.bindPopup(popup);
        categoryLayers[loc.category].addLayer(marker);
      });

      // Add layers to the map
      for (let layer in categoryLayers) {
        categoryLayers[layer].addTo(imap);
      }

      // Add layer control
      control = leaflet.control.layers(baseLayers, categoryLayers).addTo(imap);
    } else if (locations.length === 1 || !showLayers) {
      locations.forEach((loc) => {
        const marker = leaflet.marker([loc.x, loc.y]);
        marker.addTo(imap);
      });
    }
  }
});

export async function addMarker(lat: number, lng: number, popupText: string) {
  const leaflet = await import("leaflet");
  const marker = leaflet.marker([lat, lng]);
  marker.addTo(imap);
  const popup = leaflet.popup({ autoClose: false, closeOnClick: false });
  popup.setContent(popupText);
  marker.bindPopup(popup);
}

export function moveTo(lat: number, lng: number) {
  imap.flyTo({ lat: lat, lng: lng });
}
  </script>
  
  <div {id} class="w-full h-64 md:h-96 lg:h-[500px]" />
  