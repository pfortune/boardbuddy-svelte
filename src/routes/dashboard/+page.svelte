<script lang="ts">
  import SignedIn from "clerk-sveltekit/client/SignedIn.svelte";
  import { enhance } from "$app/forms";
  import LocationForm from "./LocationForm.svelte";
  import { Card, Badge, CheckRole } from "$lib/ui";
  import { toTitleCase } from "$lib/util";
  import { Accordion, AccordionItem, getModalStore, getToastStore } from "@skeletonlabs/skeleton";
  import type { ModalSettings, ToastSettings } from "@skeletonlabs/skeleton";
  import LeafletMap from "$lib/ui/Leaflet.svelte";
  import type { Location } from "$lib/types/boardbuddy-types";

  type Data = {
    locations: Location[];
    user: any;
  };

  let locationIdToDelete: string | null = null;

  const toastStore = getToastStore();
  const modalStore = getModalStore();

  const modal: ModalSettings = {
    type: "confirm",
    title: "Please Confirm",
    body: "Are you sure you wish to proceed?",
    response: (r) => {
      if (r && locationIdToDelete) {
        const form = document.getElementById(`delete-form-${locationIdToDelete}`) as HTMLFormElement;
        if (form) {
          form.requestSubmit();
          showSuccessMessage("Location deleted.");
        }
      }
    }
  };

  const triggerModal = async (locationId: string) => {
    locationIdToDelete = locationId;
    await modalStore.trigger(modal);
  };

  export let data: Data;

  const colours = {
    bar: "variant-soft-warning",
    cafe: "variant-soft-secondary",
    restaurant: "variant-soft-primary",
    library: "variant-soft-tertiary",
    bookstore: "variant-soft-success",
    "game-store": "variant-ghost-warning",
    "social-space": "variant-ghost-primary",
  };

  $: locations = data.locations.map((location: Location) => ({
    ...location,
    games: location.games || [],
    colour: colours[location.category.toLowerCase() as keyof typeof colours]
  }));

  function showErrorMessage(message: string) {
    const t: ToastSettings = {
      message: message,
      background: "variant-filled-error"
    };
    toastStore.trigger(t);
  }

  function showSuccessMessage(message:string) {
    console.log("showing success message");
    const t: ToastSettings = {
      message: message,
      background: "variant-filled-success"
    };
    toastStore.trigger(t);
  }

  const pluralize = (count: number, singular: string, plural: string): string => {
    return count === 1 ? singular : plural;
  };

  const getJoinedTitles = (games: any[]): string => {
    return games.map((game) => game.title).join(", ");
  };
</script>

<SignedIn>
  <div class="p-4">
    <ol class="breadcrumb">
      <li class="crumb"><a class="anchor" href="/">Home</a></li>
      <li class="crumb-separator" aria-hidden="true">&rsaquo;</li>
      <li class="crumb">Dashboard</li>
    </ol>
  </div>

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
                {pluralize(location.games.length, "Game", "Games")})
              </span>
              <Badge colour={location.colour}>{toTitleCase(location.category)}</Badge>
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
                    <form id={`delete-form-${location._id}`} action="?/delete" method="post" use:enhance>
                      <input type="hidden" name="id" value={location._id} />
                      <button on:click|preventDefault={() => triggerModal(location._id)} class="btn variant-filled-error py-2 px-4 rounded-sm inline-flex items-center">
                        <span class="icon text-sm">
                          <i class="fas fa-trash-alt"></i>
                        </span>
                      </button>
                    </form>
                  </CheckRole>
                </div>
              </div>
              <div>
                {#if location.games.length === 0}
                  <p>Games at this location: None</p>
                {:else if location.games.length <= 3}
                  <p>Games at this location: {getJoinedTitles(location.games)}</p>
                {:else}
                  <p>
                    Games at this location: {location.games
                      .slice(0, 3)
                      .map((game) => game.title)
                      .join(", ")} and more
                  </p>
                {/if}
              </div>
              <LeafletMap id={`map-${index}`} location={{ lat: location.y, lng: location.x }} locations={[location]} showLayers={false} zoom={15} />
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
