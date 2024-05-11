<script lang="ts">
  import { Form } from "$lib/ui/forms";
  import SignedIn from "clerk-sveltekit/client/SignedIn.svelte";
  import LocationForm from "./LocationForm.svelte";
  import { Card } from "$lib/ui";

  type Data = {
    locations: Location[];
  };

  export let data: Data;

  const colours = {
    bar: "variant-soft-warning",
    cafe: "variant-soft-secondary",
    restaurant: "variant-soft-primary",
    library: "variant-soft-tertiary",
    bookstore: "variant-soft-success"
  };

  $: locations = data.locations.map((location: Location) => ({
    ...location,
    colour: colours[location.category.toLowerCase()]
  }));
</script>

<SignedIn>
  <Card title="Locations">
    <div class="space-y-4">
      {#each locations as location}
        <div class="box variant-ghost-surface p-4 rounded-lg shadow-md">
          <div class="flex items-center justify-between">
            <div class="media-content">
              <p class="text-lg pb-3 font-semibold">
                {location.title}
                <span class="badge {location.colour}">
                  <!-- Dynamic colouring based on category -->
                  {location.category}
                </span>
              </p>
              <p>
                {#if location.x && location.y}
                  <span class="badge variant-soft-primary px-3 py-1 text-sm">
                    <span class="badge-icon variant-ringed-primary mr-2">
                      <i class="fas fa-map-marker-alt"></i>
                    </span>
                    Coords: X: {location.x}, Y: {location.y}
                  </span>
                {/if}
              </p>
            </div>
            <div class="media-right flex items-center">
              <a href={`/location/${location._id}`} class="btn variant-filled-primary py-2 px-4 rounded inline-flex items-center mr-2">
                <span class="icon text-sm">
                  <i class="fas fa-folder-open"></i>
                </span>
              </a>
              <Form action="?/delete">
                <input type="hidden" name="id" value={location._id} />
                <button type="submit" class="btn variant-filled-error py-2 px-4 rounded inline-flex items-center">
                  <span class="icon text-sm">
                    <i class="fas fa-trash-alt"></i>
                  </span>
                </button>
              </Form>
            </div>
          </div>
        </div>
      {/each}
    </div>
  </Card>
  <Card title="Add Location">
    <LocationForm />
  </Card>
</SignedIn>
