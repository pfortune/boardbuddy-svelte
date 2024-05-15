<script lang="ts">
  import LeafletMap from "$lib/ui/Leaflet.svelte";
  import Card from "$lib/ui/Card.svelte";

  export let locations;
  let maps = [];
</script>

<LeafletMap
    id="map-with-layers"
    location={{ lat: 53.2734, lng: -7.7783203 }}
    locations={locations} 
    showLayers={true} 
    zoom={8}
    bind:this={maps[maps.length]}
  />

