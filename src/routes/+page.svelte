<script lang="ts">
  import SignedIn from "clerk-sveltekit/client/SignedIn.svelte";
  import SignedOut from "clerk-sveltekit/client/SignedOut.svelte";
  import SplashScreen from "./home/SplashScreen.svelte";
  import Map from "./home/Map.svelte";

  export let data;
</script>

<SignedOut>
  <SplashScreen />
</SignedOut>

<SignedIn>
    <Map locations={data.locations}/>
</SignedIn>
