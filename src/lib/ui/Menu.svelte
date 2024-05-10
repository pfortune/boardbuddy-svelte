<script lang="ts">
  import { page } from "$app/stores";
  import UserButton from "clerk-sveltekit/client/UserButton.svelte";
  import { AppBar } from "@skeletonlabs/skeleton";
  import { LightSwitch } from "@skeletonlabs/skeleton";

  export let username: string;
  let active: string = "filled-primary";
  let notActive:string = "soft-primary";
</script>

<AppBar gridColumns="grid-cols-[auto_1fr_auto]">
  <svelte:fragment slot="lead">
    <nav>
      <ul class="flex space-x-4">
        <li><a href="/dashboard" class="btn variant-{$page.url.pathname === '/dashboard' ? active : notActive}">Dashboard</a></li>
        <li><a href="/search" class="btn variant-{$page.url.pathname === '/search' ? active : notActive}">Search</a></li>
        <li><a href="/about" class="btn variant-{$page.url.pathname === '/about' ? active : notActive}">About</a></li>
      </ul>
    </nav>
  </svelte:fragment>

  <svelte:fragment slot="trail">
    <div>
      <LightSwitch />
    </div>

    <div class="flex">
      <p class="mr-4">Welcome {username}!</p>
      <UserButton afterSignOutUrl="/" />
    </div>
  </svelte:fragment>
</AppBar>
