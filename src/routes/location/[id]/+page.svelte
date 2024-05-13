<script lang="ts">
  import GameTable from './GameTable.svelte';

  import type { PageData } from "./$types";
  import { enhance } from "$app/forms";
  import { Card, Carousel, UploadWidget } from "$lib/ui";
  import GameForm from "./GameForm.svelte";

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

<div class="flex space-x-4 mb-4">
  <div class="flex-1">
    <Card title={location.title}>
      <GameTable games={location.games}/>
    </Card>
  </div>
  <div class="flex-1">
    <Card title="Photos">
      <div class="!rounded-none">
        <Carousel {images}/>
      </div>
      <UploadWidget on:uploadSuccess={handleUpload} />
    </Card>
  </div>
</div>

<Card title="Add Game">
  <GameForm />
</Card>
