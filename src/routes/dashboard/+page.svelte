<script lang="ts">
  import SignedIn from "clerk-sveltekit/client/SignedIn.svelte";
  import CheckRole from "$lib/ui/CheckRole.svelte";
  import AddLocation from "./AddLocation.svelte";
  import Card from "$lib/ui/Card.svelte";

  export let data: any;
  export let locations: any[];
  $: locations = data.locations;
</script>

<SignedIn>
  <Card title="Locations">
    <CheckRole user={data.user} role="admin">
      <h1>All Locations:</h1>
    </CheckRole>

    <CheckRole user={data.user} role="user">
      <h1>Locations you have added:</h1>
    </CheckRole>

    <div class="locations-list">
      {#each locations as location}
        <div class="location">
          <h3>{location.title} ({location.category})</h3>
          <p>Coordinates: {location.x}, {location.y}</p>
          <a href={`/location/${location._id}`}>View Details</a>
        </div>
      {/each}
    </div>
  </Card>

  <Card title="Add Location">
    <AddLocation />
  </Card>
</SignedIn>
