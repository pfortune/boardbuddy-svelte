<script lang="ts">
  import LeafletMap from "$lib/ui/Leaflet.svelte";
  import type { PageData } from "./$types";
  import { enhance } from "$app/forms";
  import { Card, Carousel, UploadWidget } from "$lib/ui";
  import GameForm from "./GameForm.svelte";
  import GameTable from "./GameTable.svelte";

  export let data: PageData;

  let formElement: HTMLFormElement;

  export function handleUpload(event: CustomEvent) {
    formElement.imageUrls.value = JSON.stringify(event.detail.urls);
    formElement.requestSubmit();
  }

  $: location = data.location;
  $: images = data.images;
</script>

<form bind:this={formElement} action="?/image" method="post" use:enhance>
  <input type="hidden" name="imageUrls" />
</form>

<Card title={location.title}>
  <LeafletMap id={`map`} location={{ lat: location.x, lng: location.y }} locations={[location]} showLayers={false} zoom={15} class="w-full h-64 md:h-96 lg:h-[500px]" />
</Card>

<div class="flex space-x-4 mb-4">
  <div class="flex-1">
    <Card title="Board Games at {location.title}">
      {#if !location.games || location.games.length === 0}
        <p>No games added yet. Why not add one.</p>
      {:else}
        <GameTable games={location.games} />
      {/if}
    </Card>
  </div>
  <div class="flex-1">
    <Card title="Photos">
      <div class="!rounded-none">
        <Carousel {images} />
      </div>
      <UploadWidget on:uploadSuccess={handleUpload} />
    </Card>
  </div>
</div>

<Card title="Add Game">
  <GameForm />
</Card>
