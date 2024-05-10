<script lang="ts">
  import { enhance } from "$app/forms";
  import TextInput from "$lib/ui/Form/TextInput.svelte";
  import SelectInput from "$lib/ui/Form/SelectInput.svelte";
  import Button from "$lib/ui/Form/Button.svelte";

  let title: string = "";
  let category: string = "";
  let x: string = "";
  let y: string = "";
  const categories = [
    { value: "bar", label: "Bar" },
    { value: "cafe", label: "Cafe" },
    { value: "restaurant", label: "Restaurant" },
    { value: "library", label: "Library" },
    { value: "bookstore", label: "Bookstore" }
  ];
</script>

<form action="?/add" method="POST" use:enhance>
  <TextInput label="Location Title" placeholder="Enter location title" bind:value={title} name="title" icon="fas fa-map-marker-alt" />
  <SelectInput label="Category" bind:selected={category} options={categories} name="category" icon="fas fa-layer-group" />
  <div class="flex space-x-4 mb-4">
    <div class="flex-1">
      <TextInput
        label="X Coordinate (Longitude)"
        placeholder="Enter X coordinate"
        bind:value={x}
        name="x"
        pattern={"^-?([0-9]{1,2}|1[0-7][0-9]|180)(.[0-9]{1,10})?$"}
        title="Enter a valid longitude."
      />
    </div>
    <div class="flex-1">
      <TextInput
        label="Y Coordinate (Latitude)"
        placeholder="Enter Y coordinate"
        bind:value={y}
        name="y"
        pattern={"^-?([0-8]?[0-9]|90)(.[0-9]{(1, 10)})?"}
        title="Enter a valid latitude."
      />
    </div>
  </div>
  <Button text="Add Location" fullWidth={true} />
</form>
