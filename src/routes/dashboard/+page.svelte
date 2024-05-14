<script lang="ts">
  import { Form, Button } from "$lib/ui/forms";
  import SignedIn from "clerk-sveltekit/client/SignedIn.svelte";
  import LocationForm from "./LocationForm.svelte";
  import { Card, Badge, CheckRole } from "$lib/ui";
  import { Accordion, AccordionItem } from "@skeletonlabs/skeleton";
  import LeafletMap from "$lib/ui/Leaflet.svelte";
  import type { Location } from "$lib/types/boardbuddy-types";

  type Data = {
    locations: Location[];
    user: any;
  };

  export let data: Data;

  const colours = {
    Bar: "variant-soft-warning",
    Cafe: "variant-soft-secondary",
    Restaurant: "variant-soft-primary",
    Library: "variant-soft-tertiary",
    Bookstore: "variant-soft-success"
  };

  $: locations = data.locations.map((location: Location) => ({
    ...location,
    colour: colours[location.category.toLowerCase()]
  }));
</script>

<SignedIn>
  <Card title="Locations">
    {#if locations.length === 0}
      <p>No locations yet.</p>
    {:else}
      <CheckRole role="admin" user={data.user}>
        <p class="text-xl font-semibold mb-4">All locations that have been added:</p>
      </CheckRole>

      <CheckRole user={data.user}>
        <p class="text-xl font-semibold mb-4">Locations you have added:</p>
      </CheckRole>
    {/if}

    <Accordion>
      {#each locations as location, index}
        <AccordionItem class="box variant-ghost-surface p-4 rounded-lg shadow-md" open={index === 0}>
          <svelte:fragment slot="lead">
            <i class="fas fa-map-marker-alt"></i>
          </svelte:fragment>
          <svelte:fragment slot="summary">
            <div class="flex items-center justify-between w-full">
              <span class="text-lg font-semibold">
                {location.title} ({location.games.length}
                {location.games.length === 1 ? "Game" : "Games"})
              </span>
              <Badge colour={location.colour}>{location.category}</Badge>
            </div>
          </svelte:fragment>
          <svelte:fragment slot="content">
            <div class="space-y-4">
              <div class="flex items-center justify-between">
                <div class="media-content">
                  {#if location.x && location.y}
                    <Badge icon="fa-map-marker-alt">
                      Coords: X: {location.x}, Y: {location.y}
                    </Badge>
                  {/if}
                </div>
                <div class="media-right flex items-center">
                  <a href={`/location/${location._id}`} class="btn variant-filled-primary py-2 px-4 rounded inline-flex items-center mr-2">
                    <span class="icon text-sm">
                      <i class="fas fa-folder-open"></i>
                    </span>
                  </a>
                  <!-- Conditionally render delete button for admins -->
                  <CheckRole role="admin" user={data.user}>
                    <Form action="?/delete" hiddenName="id" hiddenValue={location._id}>
                      <Button text="" icon="fas fa-trash-alt" colour="variant-filled-error" fullWidth={false} />
                    </Form>
                  </CheckRole>
                </div>
              </div>
              <div>
                {#if location.games && location.games.length === 0}
                  <p>Games at this location: None</p>
                {:else if location.games && location.games.length <= 3}
                  <p>Games at this location: {location.games.map((game) => game.title).join(", ")}</p>
                {:else}
                  <p>
                    Games at this location: {location.games
                      .slice(0, 3)
                      .map((game) => game.title)
                      .join(", ")} and more
                  </p>
                {/if}
              </div>
              <LeafletMap
                id={`map-${index}`}
                location={{ lat: location.x, lng: location.y }}
                locations={[location]}
                showLayers={false}
                zoom={15}
                class="w-full h-64 md:h-96 lg:h-[500px]"
              />
            </div>
          </svelte:fragment>
        </AccordionItem>
      {/each}
    </Accordion>
  </Card>

  <Card title="Add Location">
    <LocationForm />
  </Card>
</SignedIn>
