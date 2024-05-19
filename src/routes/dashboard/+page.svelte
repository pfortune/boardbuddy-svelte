<script lang="ts">
  import SignedIn from "clerk-sveltekit/client/SignedIn.svelte";
  import { enhance } from "$app/forms";
  import LocationForm from "./LocationForm.svelte";
  import { Card, Badge, CheckRole, LeafletMap } from "$lib/ui";
  import { toTitleCase, pluralize, getJoinedTitles } from "$lib/util";
  import { Accordion, AccordionItem, getModalStore, getToastStore, type ModalSettings } from "@skeletonlabs/skeleton";
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
    bar: "variant-ringed-warning",
    cafe: "variant-ringed-secondary",
    restaurant: "variant-ringed-primary",
    library: "variant-ghost-tertiary",
    bookstore: "variant-ghost-success",
    "game-store": "variant-ghost-warning",
    "social-space": "variant-ghost-primary"
  };

  $: locations = data.locations.map((location: Location) => ({
    ...location,
    colour: colours[location.category.toLowerCase()]
  }));

  function showSuccessMessage(message: string) {
    const t = {
      message: message,
      background: "variant-filled-success"
    };
    toastStore.trigger(t);
  }

  let paginationSettings = {
    page: 0,
    limit: 5,
    size: data.locations.length,
    amounts: [3, 5, 8, data.locations.length]
  };

  let openAccordionIndex: number | null = 0;

  $: paginatedLocations = locations.slice(
    paginationSettings.page * paginationSettings.limit,
    paginationSettings.page * paginationSettings.limit + paginationSettings.limit
  );

  function handlePageChange(page: number) {
    openAccordionIndex = null;
    paginationSettings.page = page;
  }

  function handleLimitChange(limit: number) {
    openAccordionIndex = null;
    paginationSettings.limit = limit;
    paginationSettings.page = 0;
  }

  function handleToggle(event) {
    const { index, open } = event.detail;
    openAccordionIndex = open ? index : null;
  }

  $: openAccordionIndex = null; // Reset accordion index on page change
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
    
      <Accordion>
        {#each paginatedLocations as location, index}
          <AccordionItem
            class="box variant-ghost-surface p-4 rounded-lg shadow-md"
            open={index === openAccordionIndex}
            on:toggle={(event) => handleToggle({ detail: { index, open: event.detail.open } })}
          >
            <svelte:fragment slot="lead">
              <i class="fas fa-map-marker-alt"></i>
            </svelte:fragment>
            <svelte:fragment slot="summary">
              <div class="flex items-center justify-between w-full">
                <span class="text-lg font-semibold">
                  {location.title} ({location.games.length}
                  {pluralize(location.games.length, "Game", "Games")})
                </span>
                
               

                <div class="media-right flex items-center">
                  <div class="mr-5">
                     <Badge colour={location.colour}>{toTitleCase(location.category)}</Badge>
                  </div>
                  <a href={`/location/${location._id}`} class="btn variant-filled-primary py-2 px-4 rounded inline-flex items-center mr-2">
                    <span class="icon text-sm">
                      <i class="fas fa-folder-open"></i>
                    </span>
                  </a>
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
                {#if location.x && location.y}
                  <LeafletMap id={`map-${index}-${paginationSettings.page}`} location={{ lat: location.y, lng: location.x }} locations={[location]} showLayers={false} zoom={15} />
                {/if}
              </div>
            </svelte:fragment>
          </AccordionItem>
        {/each}
      </Accordion>

      <div class="pagination-controls flex justify-center mt-4">
        <button
          on:click={() => handlePageChange(paginationSettings.page - 1)}
          disabled={paginationSettings.page === 0}
          class="px-4 py-2 btn variant-soft-primary rounded disabled:opacity-50"
        >
          Previous
        </button>
        {#each Array(Math.ceil(paginationSettings.size / paginationSettings.limit)) as _, i}
          <button
            on:click={() => handlePageChange(i)}
            class="px-4 py-2 mx-1 btn variant-glass-success rounded {paginationSettings.page === i ? 'font-bold' : ''}"
          >
            {i + 1}
          </button>
        {/each}
        <button
          on:click={() => handlePageChange(paginationSettings.page + 1)}
          disabled={(paginationSettings.page + 1) * paginationSettings.limit >= paginationSettings.size}
          class="px-4 py-2 rounded btn variant-soft-primary disabled:opacity-50"
        >
          Next
        </button>
      </div>

      <div class="limit-controls flex justify-center items-center mt-4">
        <label for="limit" class="label mr-2">Items per page:</label>
        <select id="limit" bind:value={paginationSettings.limit} on:change={(e) => handleLimitChange(+e.target.value)} class="w-16 select">
          {#each paginationSettings.amounts as amount}
            <option value={amount}>{amount}</option>
          {/each}
        </select>
      </div>
      
    {/if}
  </Card>

  <Card title="Add Location">
    <LocationForm />
  </Card>
</SignedIn>