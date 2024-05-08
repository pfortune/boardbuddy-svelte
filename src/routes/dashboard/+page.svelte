<script lang="ts">
    import SignedIn from 'clerk-sveltekit/client/SignedIn.svelte'
    import AdminOnly from "$lib/ui/AdminOnly.svelte";

    export let data: any;
    export let locations: any[];
    $: locations = data.locations;
</script>

    <SignedIn>
        <AdminOnly user={data.user}>
            <script>
                export let locations;
              </script>
              
              <div class="locations-list">
                {#each locations as location}
                  <div class="location">
                    <h3>{location.title} ({location.category})</h3>
                    <p>Coordinates: {location.x}, {location.y}</p>
                    <a href={`/location/${location._id}`}>View Details</a>
                  </div>
                {/each}
              </div>
        </AdminOnly>
    </SignedIn>