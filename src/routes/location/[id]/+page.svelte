<script lang="ts">
  import type { PageData } from "./$types";
  import Card from "$lib/ui/Card.svelte";
  import GameForm from "./GameForm.svelte";
  
  export let data: PageData;
  let { location } = data;

  console.log(location);
</script>

<Card title={location.title}>
  {#each location.games as game}
    <p>{game.title}</p>
  {/each}
</Card>


<Card title="Add Game">
  <GameForm />
</Card>