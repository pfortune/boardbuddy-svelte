<script lang="ts">
  import type { PageData } from "./$types";
  import { enhance } from "$app/forms";
  import { Card, Carousel, UploadWidget, LeafletMap, Rating } from "$lib/ui";
  import { getToastStore, type ToastSettings } from "@skeletonlabs/skeleton";
  import GameForm from "./GameForm.svelte";
  import GameTable from "./GameTable.svelte";

  export let data: PageData;

  let formElement: HTMLFormElement;

  const toastStore = getToastStore();

  function showSuccessMessage(message: string) {
    const t: ToastSettings = {
      message: message,
      background: "variant-filled-success"
    };
    toastStore.trigger(t);
  }

  export function handleUpload(event: CustomEvent) {
    formElement.imageUrls.value = JSON.stringify(event.detail.urls);
    formElement.requestSubmit();
    showSuccessMessage("Image uploaded.");
  }

  $: location = data.location;
  $: images = data.images;
</script>

<form bind:this={formElement} action="?/image" method="post" use:enhance>
  <input type="hidden" name="imageUrls" />
</form>

<div class="p-4">
  <ol class="breadcrumb">
    <li class="crumb"><a class="anchor" href="/">Home</a></li>
    <li class="crumb-separator" aria-hidden="true">&rsaquo;</li>
    <li class="crumb"><a class="anchor" href="/dashboard">Dashboard</a></li>
    <li class="crumb-separator" aria-hidden="true">&rsaquo;</li>
    <li class="crumb">{location.title}</li>
  </ol>
</div>

<div class="card flex justify-between items-center p-4 mb-4 rounded shadow">
  <h2 class="text-2xl font-semibold">{location.title}</h2>

  <Rating />
</div>

<Card title="Map">
  <LeafletMap id={`map`} location={{ lat: location.x, lng: location.y }} locations={[location]} showLayers={false} zoom={15} class="w-full h-64 md:h-96 lg:h-[500px]" />
</Card>

<div class="flex space-x-4 mb-4">
  <div class="flex-1">
    <Card title="Board Games at {location.title}">
      {#if !location.games || location.games.length === 0}
        <p>No games added yet. Why not add one.</p>
      {:else}
        <GameTable {showSuccessMessage} games={location.games} />
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
