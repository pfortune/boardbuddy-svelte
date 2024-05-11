<script lang="ts">
  import type { PageData } from "./$types";
  import Card from "$lib/ui/Card.svelte";
  import GameForm from "./GameForm.svelte";
  import UploadWidget from "$lib/ui/UploadWidget.svelte";

  export let data: PageData;

  $: location = data.location;
</script>

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
      {#if location.img}
        <img src={location.img} alt="" />
      {/if}
      <UploadWidget />
    </Card>
  </div>
</div>

<Card title="Add Game">
  <GameForm />
</Card>
