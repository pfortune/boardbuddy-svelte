<script lang="ts">
    import MenuItem from "./MenuItem.svelte"
    export let menuItems: { href: string, label: string }[];
    export let activeClass: string;
    export let inactiveClass: string;
    export let toggleMenu: () => void;
  </script>
  
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
        {#each menuItems as item}
          <MenuItem 
            href={item.href} 
            label={item.label} 
            activeClass={activeClass} 
            inactiveClass={inactiveClass} />
        {/each}
      </ul>
    </nav>
  </div>
  