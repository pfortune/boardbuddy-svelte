<script lang="ts">
  import UserButton from "clerk-sveltekit/client/UserButton.svelte";
  import { AppBar } from "@skeletonlabs/skeleton";
  import { LightSwitch } from "@skeletonlabs/skeleton";
  import Menu from "./Menu.svelte";
  import MenuItem from "./MenuItem.svelte";
  import ThemeSwitcher from "./ThemeSwitcher.svelte";

  export let username: string;
  let active: string = "variant-filled-primary";
  let notActive: string = "variant-soft-primary";
  let isOpen = false;

  const toggleMenu = () => {
    isOpen = !isOpen;
  };

  const menuItems = [
    { href: "/", label: "Home" },
    { href: "/dashboard", label: "Dashboard" },
    { href: "/reports", label: "Reports" },
    { href: "/gallery", label: "Gallery" },
    { href: "/about", label: "About" }
  ];
</script>

<AppBar gridColumns="grid-cols-3" slotDefault="place-self-center" slotTrail="place-content-end">
  <svelte:fragment slot="lead">
    <div class="flex items-center justify-start w-full">
      <a href="/"><img src="/logo.png" alt="Board Buddy Logo" class="h-16" /></a>
    </div>
  </svelte:fragment>

  <svelte:fragment slot="default">
    <Menu {menuItems} activeClass={active} inactiveClass={notActive} {toggleMenu} />
  </svelte:fragment>

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
      {#each menuItems as item}
        <MenuItem href={item.href} label={item.label} activeClass={active} inactiveClass={notActive} additionalClasses="block text-left" />
      {/each}
      <ThemeSwitcher />
    </ul>
  </nav>
{/if}
