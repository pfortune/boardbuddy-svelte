<script lang="ts">
    import SignedIn from "clerk-sveltekit/client/SignedIn.svelte";
    import SignedOut from "clerk-sveltekit/client/SignedOut.svelte";
    import { goto } from "$app/navigation";
  </script>
  
  <SignedIn>
    {goto("/dashboard")}
  </SignedIn>

  <SignedOut>
    {goto("/")}
  </SignedOut>