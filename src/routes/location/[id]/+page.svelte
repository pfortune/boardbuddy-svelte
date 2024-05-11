<script lang="ts">
  import type { PageData } from "./$types";
  import { enhance } from "$app/forms";
  import Card from "$lib/ui/Card.svelte";
  import { Form } from "$lib/ui/forms";
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
      <div class="table-container rounded-none">
        <table class="table table-hover rounded-none">
          <thead>
            <tr>
              <th class="text-xs uppercase whitespace-nowrap">
                <i class="fas fa-dice"></i> Game
              </th>
              <th class="text-xs uppercase whitespace-nowrap">
                <i class="fas fa-users"></i> Players
              </th>
              <th class="text-xs uppercase whitespace-nowrap">
                <i class="fas fa-clock"></i> Playing Time
              </th>
              <th class="text-xs uppercase whitespace-nowrap">
                <i class="fas fa-child"></i> Age
              </th>
              <th class="text-xs uppercase whitespace-nowrap">
                Actions
              </th>
            </tr>
          </thead>
          <tbody>
            {#each location.games as game}
            <tr>
              <td>
                {game.title}
              </td>
              <td>
                {game.minPlayers} - {game.maxPlayers}
              </td>
              <td>
                {game.duration} minutes
              </td>
              <td>
                {game.age}+
              </td>
              <td>
                <Form action="?/delete-game">
                  <input type="hidden" name="id" value={game._id}>
                  <button type="submit" class="btn variant-filled-error rounded inline-flex items-center">
                      <i class="fas fa-trash-alt"></i>
                  </button>
                </Form>
              </td>
            </tr>
            {/each}
          </tbody>
        </table>
      </div>
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
