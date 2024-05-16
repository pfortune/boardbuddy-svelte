<script lang="ts">
  import { getModeUserPrefers } from "@skeletonlabs/skeleton";
  import { themeStore } from "$lib/stores";
  import { onMount } from "svelte";
  import { get } from "svelte/store";

  const themes: string[] = ["Dusk","Rocket", "Modern", "Vintage", "Skeleton", "Wintry", "Sahara", "Crimson", "Seafoam", "Hamlindigo"];

  export let width: string = "";

  let selectedTheme: string;
  
  // Subscribe to the theme store and set the initial selected value
  themeStore.subscribe((value) => {
    selectedTheme = value;
    if (typeof document !== "undefined") {
      document.body.setAttribute("data-theme", value);
    }
  });

  // Update the theme when a new theme is selected
  function updateTheme(event: Event) {
    const target = event.target as HTMLSelectElement;
    if (target.value !== "choose") {
      themeStore.set(target.value);
    }
  }

  // Ensure the theme is set on mount (in case the page is reloaded)
  onMount(() => {
  const currentTheme = get(themeStore); // Get the current value from the store
  document.body.setAttribute("data-theme", currentTheme);
  
  const darkMode = getModeUserPrefers() ?? false; 
  const htmlElement = document.querySelector('html');
  
  if (htmlElement) {
    htmlElement.classList.toggle('dark', !darkMode);
  }
});

</script>

<select class="select {width} pl-5 pr-4" bind:value={selectedTheme} on:change={updateTheme}>
  {#each themes as theme}
    <option value={theme.toLowerCase()}>{theme}</option>
  {/each}
</select>
