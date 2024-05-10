<script lang="ts">
    import { enhance } from "$app/forms";
    import TextInput from "$lib/ui/Form/TextInput.svelte";
    import Button from "$lib/ui/Form/Button.svelte";
  
    let title: string = "";
    let age: string = "";
    let duration: string = "";
    let minPlayers: string = "";
    let maxPlayers: string = "";
  </script>
  
  <form action="?/add" method="POST" use:enhance>
    <TextInput label="Game Title" placeholder="Enter Game Title" bind:value={title} name="title" icon="fas fa-map-marker-alt" />
    <div class="flex space-x-4 mb-4">
      <div class="flex-1">
        <TextInput
          label="Age"
          placeholder="Enter Age"
          bind:value={age}
          name="age"
          pattern="^[0-9]+$"
          title="Enter a valid age."
        />
      </div>
      <div class="flex-1">
        <TextInput
          label="Play Time"
          placeholder="Enter Play Time"
          bind:value={duration}
          name="duration"
          pattern="^[0-9]+$"
          title="Enter a valid play time."
        />
      </div>
    </div>

    <div class="flex space-x-4 mb-4">
      <div class="flex-1">
        <TextInput
          label="Min Players"
          placeholder="Enter Min Players"
          bind:value={minPlayers}
          name="minPlayers"
          pattern="^[0-9]+$"
          title="Enter a valid min player count."
        />
      </div>
      <div class="flex-1">
        <TextInput
          label="Max Players"
          placeholder="Enter Max Players"
          bind:value={maxPlayers}
          name="maxPlayers"
          pattern="^[0-9]+$"
          title="Enter a valid max player count."
        />
      </div>
    </div>
    <Button text="Add Game" fullWidth={true} />
  </form>
  