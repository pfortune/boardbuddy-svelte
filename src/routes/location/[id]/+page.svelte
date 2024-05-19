<script lang="ts">
  import type { PageData } from "./$types";
  import { enhance } from "$app/forms";
  import { toTitleCase } from "$lib/util";
  import { Card, Carousel, UploadWidget, LeafletMap } from "$lib/ui";
  import { getModalStore, getToastStore, type ToastSettings, type ModalSettings } from "@skeletonlabs/skeleton";
  import GameTable from "./GameTable.svelte";
  import GameModal from './GameModal.svelte';

  export let data: PageData;

  let formElement: HTMLFormElement;
  let gameFormElement: HTMLFormElement; 

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

  const modalStore = getModalStore();

  function triggerModal() {
    const modal = {
      type: 'component',
      component: {
        ref: GameModal
      },
      title: 'Add New Game',
      body: '',
      response: (gameDetails) => {
        if (gameDetails && gameDetails.name) {
          // Populate the hidden form with game details
          gameFormElement.title.value = toTitleCase(gameDetails.name);
          gameFormElement.age.value = gameDetails.age;
          gameFormElement.duration.value = gameDetails.playingTime;
          gameFormElement.minPlayers.value = gameDetails.minPlayers;
          gameFormElement.maxPlayers.value = gameDetails.maxPlayers;
          // Submit the form
          gameFormElement.requestSubmit();
          showSuccessMessage(`Game added: ${gameDetails.name}`);
        } else {
          showSuccessMessage('Game added: Details missing');
        }
      }
    };
    modalStore.trigger(modal);
  }

  $: location = data.location;
  $: images = data.images;
</script>

<!-- Existing image upload form -->
<form bind:this={formElement} action="?/image" method="post" use:enhance>
  <input type="hidden" name="imageUrls" />
</form>

<!-- Hidden form for game details -->
<form bind:this={gameFormElement} action="?/add" method="post" use:enhance>
  <input type="hidden" name="title" />
  <input type="hidden" name="age" />
  <input type="hidden" name="duration" />
  <input type="hidden" name="minPlayers" />
  <input type="hidden" name="maxPlayers" />
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
  <button on:click={triggerModal} class="btn variant-filled-primary py-2 px-4 rounded inline-flex items-center">
    <span class="icon text-sm mr-2">
      <i class="fas fa-plus"></i>
    </span>
    Add New Game
  </button>
</div>

<Card title="Map">
  <LeafletMap id={`map`} location={{ lat: location.y, lng: location.x }} locations={[location]} showLayers={false} zoom={15} class="w-full h-64 md:h-96 lg:h-[500px]" />
</Card>

<div class="flex flex-col md:flex-row space-y-4 md:space-y-0 md:space-x-4 mb-4">
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