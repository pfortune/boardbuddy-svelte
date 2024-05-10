<script lang="ts">
  import { page } from "$app/stores";
  import UserButton from "clerk-sveltekit/client/UserButton.svelte";
  import { AppBar } from "@skeletonlabs/skeleton";

  export let username: string;
</script>

<AppBar gridColumns="grid-cols-[auto_1fr_auto]">
  <svelte:fragment slot="lead">
    <nav>
      <ul class="flex space-x-4">
        <li><a href="/dashboard" class="btn variant-ghost-{$page.url.pathname === '/dashboard' ? 'tertiary' : 'primary'}">Dashboard</a></li>
        <li><a href="/search" class="btn variant-ghost-{$page.url.pathname === '/search' ? 'tertiary' : 'primary'}">Search</a></li>
        <li><a href="/about" class="btn variant-ghost-{$page.url.pathname === '/about' ? 'tertiary' : 'primary'}">About</a></li>
      </ul>
    </nav>
  </svelte:fragment>

  <svelte:fragment slot="trail">
    <div class="flex">
      <p class="mr-4">Welcome {username}!</p>
      <UserButton afterSignOutUrl="/" />
    </div>
  </svelte:fragment>
</AppBar>
