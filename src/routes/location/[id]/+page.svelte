<script lang="ts">
  import type { PageData } from "./$types";
  import { enhance } from "$app/forms";
  import Card from "$lib/ui/Card.svelte";
  import GameForm from "./GameForm.svelte";
  import UploadWidget from "$lib/ui/UploadWidget.svelte";

  export let data: PageData;

  console.log("data is in here: ", data);

  let formElement;

  export function handleUpload(event) {
    formElement.imageUrls.value = JSON.stringify(event.detail.urls);
    formElement.requestSubmit();
  }

  $: location = data.location;
  $: images = data.images;
</script>

<form bind:this={formElement} action="?/image" method="post" use:enhance>
  <input type="hidden" name="imageUrls">
</form>

<div class="flex space-x-4 mb-4">
  <div class="flex-1">
    <Card title={location.title}>
      {#each location.games as game}
        <p>{game.title}</p>
      {/each}
    </Card>
  </div>
  <div class="flex-1">
    <Card title="Photos">
      {#if images[0]}
        <img src={images[0].imgUrl} alt="" />
      {/if}
      <UploadWidget on:uploadSuccess={handleUpload}/>
    </Card>
  </div>
</div>

<Card title="Add Game">
  <GameForm />
</Card>
