<script lang="ts">
  import { Form, Button } from "$lib/ui/forms";
  import type { Game } from "$lib/types/boardbuddy-types";
  export let games: Game[] = [];
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
            <Form action="?/delete-game" hiddenName="id" hiddenValue={game._id}>
              <Button text="" icon="fas fa-trash-alt" colour="variant-filled-error" fullWidth={false} />
            </Form>
          </td>
        </tr>
      {/each}
    </tbody>
  </table>
</div>
