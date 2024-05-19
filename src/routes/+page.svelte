<script lang="ts">
  import SignedIn from "clerk-sveltekit/client/SignedIn.svelte";
  import SignedOut from "clerk-sveltekit/client/SignedOut.svelte";
  import SplashScreen from "./home/SplashScreen.svelte";
  import { Card } from "$lib/ui";
  import Map from "./home/Map.svelte";

  export let data;
</script>

<SignedOut>
  <SplashScreen />
</SignedOut>

<SignedIn>
  <Card title="Locations near you">
    <Map locations={data.locations} />
  </Card>
</SignedIn>
