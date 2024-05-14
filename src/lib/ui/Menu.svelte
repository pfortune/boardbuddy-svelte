<script lang="ts">
  import { page } from "$app/stores";
  import UserButton from "clerk-sveltekit/client/UserButton.svelte";
  import { AppBar } from "@skeletonlabs/skeleton";
  import { LightSwitch } from "@skeletonlabs/skeleton";

  export let username: string;
  let active: string = "filled-primary";
  let notActive: string = "soft-primary";
  let isOpen = false;

  const toggleMenu = () => {
    isOpen = !isOpen;
  };
</script>

<AppBar gridColumns="grid-cols-3" slotDefault="place-self-center" slotTrail="place-content-end">
  <svelte:fragment slot="lead">
    <div class="flex items-center justify-between w-full">
      <img src="/logo.png" alt="Board Buddy Logo" class="h-16"/>
    </div>
  </svelte:fragment>

  <div class="flex items-center justify-center w-full">
    <!-- Mobile menu button -->
    <button class="md:hidden" on:click={toggleMenu}>
      <svg class="h-6 w-7" stroke="currentColor" xmlns="http://www.w3.org/2000/svg">
        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 12h16M4 18h16"></path>
      </svg>
    </button>

    <!-- Desktop menu -->
    <nav class="hidden md:flex">
      <ul class="flex space-x-4">
        <li><a href="/" class="btn variant-{$page.url.pathname === '/' ? active : notActive}">Home</a></li>
        <li><a href="/dashboard" class="btn variant-{$page.url.pathname === '/dashboard' ? active : notActive}">Dashboard</a></li>
        <li><a href="/search" class="btn variant-{$page.url.pathname === '/search' ? active : notActive}">Search</a></li>
        <li><a href="/gallery" class="btn variant-{$page.url.pathname === '/gallery' ? active : notActive}">Gallery</a></li>
        <li><a href="/about" class="btn variant-{$page.url.pathname === '/about' ? active : notActive}">About</a></li>
      </ul>
    </nav>
  </div>

  <svelte:fragment slot="trail">
    <div class="flex items-center space-x-4">
      <LightSwitch />
      <p class="hidden md:block mr-4">Welcome {username}!</p>
      <UserButton afterSignOutUrl="/" />
    </div>
  </svelte:fragment>
</AppBar>

<!-- Mobile menu -->
{#if isOpen}
  <nav class="md:hidden mt-4">
    <ul class="flex flex-col space-y-2">
      <li><a href="/" class="btn block text-left variant-{$page.url.pathname === '/' ? active : notActive}">Home</a></li>
      <li><a href="/dashboard" class="btn block text-left variant-{$page.url.pathname === '/dashboard' ? active : notActive}">Dashboard</a></li>
      <li><a href="/search" class="btn block text-left variant-{$page.url.pathname === '/search' ? active : notActive}">Search</a></li>
      <li><a href="/gallery" class="btn block text-left variant-{$page.url.pathname === '/gallery' ? active : notActive}">Gallery</a></li>
      <li><a href="/about" class="btn block text-left variant-{$page.url.pathname === '/about' ? active : notActive}">About</a></li>
    </ul>
  </nav>
{/if}
