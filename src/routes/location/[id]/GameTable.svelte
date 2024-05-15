<script lang="ts">
  import type { Game } from "$lib/types/boardbuddy-types";
  import { enhance } from "$app/forms";
  import { getModalStore, type ModalSettings } from "@skeletonlabs/skeleton";
  export let games: Game[] = [];

  let deleteGameForm: HTMLFormElement;

  export let showSuccessMessage;

  const modalStore = getModalStore();

  const modal: ModalSettings = {
    type: "confirm",
    title: "Please Confirm Deletion",
    body: "Are you sure you delete this game?",
    response: (r) => {
      if (r) {
        if (deleteGameForm && typeof deleteGameForm.submit === "function") {
          deleteGameForm.requestSubmit();
          showSuccessMessage("Game deleted.");
        }
      }
    }
  };

  const triggerModal = async () => {
    await modalStore.trigger(modal);
  };
</script>

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
        <th class="text-xs uppercase whitespace-nowrap"> Actions </th>
      </tr>
    </thead>
    <tbody>
      {#each games as game}
        <tr>
          <td>{game.title}</td>
          <td>{game.minPlayers} - {game.maxPlayers}</td>
          <td>{game.duration} minutes</td>
          <td>{game.age}+</td>
          <td>
            <form action="?/delete_game" method="post" bind:this={deleteGameForm} use:enhance>
              <input type="hidden" name="id" value={game._id} />
              <button
                on:click|preventDefault={triggerModal}
                class="btn variant-filled-error py-2 px-4 rounded-sm inline-flex items-center"
              >
                <span class="icon text-sm">
                  <i class="fas fa-trash-alt"></i>
                </span>
              </button>
            </form>
          </td>
        </tr>
      {/each}
    </tbody>
  </table>
</div>
