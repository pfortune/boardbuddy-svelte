<script lang="ts">
  import type { Game } from "$lib/types/boardbuddy-types";
  import { enhance } from "$app/forms";
  import { getModalStore, getToastStore, type ToastSettings, type ModalSettings } from "@skeletonlabs/skeleton";
  export let games: Game[] = [];

  let gameIdToDelete: string | null = null;

  export let showSuccessMessage;

  const modalStore = getModalStore();

  const modal: ModalSettings = {
    type: "confirm",
    title: "Please Confirm Deletion",
    body: "Are you sure you want to delete this game?",
    response: (r) => {
      if (r && gameIdToDelete) {
        const form = document.getElementById(`delete-form-${gameIdToDelete}`) as HTMLFormElement;
        if (form) {
          form.requestSubmit();
          showSuccessMessage("Game deleted.");
        }
      }
    }
  };

  const triggerModal = async (gameId: string) => {
    gameIdToDelete = gameId;
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
            <form id={`delete-form-${game._id}`} action="?/delete_game" method="post" use:enhance>
              <input type="hidden" name="id" value={game._id} />
              <button
                on:click|preventDefault={() => triggerModal(game._id)}
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
