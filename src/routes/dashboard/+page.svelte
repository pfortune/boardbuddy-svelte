<script lang="ts">
  import { Form, Button } from "$lib/ui/forms";
  import SignedIn from "clerk-sveltekit/client/SignedIn.svelte";
  import LocationForm from "./LocationForm.svelte";
  import { Card, Badge, CheckRole } from "$lib/ui";
  import { Accordion, AccordionItem } from "@skeletonlabs/skeleton";
  import LeafletMap from "$lib/ui/Leaflet.svelte";

  type Data = {
    locations: Location[];
    user;
  };

  export let data: Data;

  console.log(data)

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
    <CheckRole role="admin" user={data.user}>
      <p class="text-xl font-semibold mb-4">
        All locations that have been added:
      </p>
    </CheckRole>

    <CheckRole user={data.user}>
      <p class="text-xl font-semibold mb-4">
        Locations you have added:
      </p>
    </CheckRole>

    <Accordion>
      {#each locations as location, index}
        <AccordionItem class="box variant-ghost-surface p-4 rounded-lg shadow-md" open={index === 0}>
          <svelte:fragment slot="lead">
            <i class="fas fa-map-marker-alt"></i>
          </svelte:fragment>
          <svelte:fragment slot="summary">
            <div class="flex items-center justify-between w-full">
              <span class="text-lg font-semibold">
                {location.title} ({location.games.length} {location.games.length === 1 ? 'Game' : 'Games'})
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
                  <Form action="?/delete" hiddenName="id" hiddenValue={location._id}>
                    <Button text="" icon="fas fa-trash-alt" colour="variant-filled-error" fullWidth={false} />
                  </Form>
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
