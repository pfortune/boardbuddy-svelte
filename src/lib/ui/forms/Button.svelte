<script lang="ts">
  export let text: string = 'Click me'; // Default button text
  export let icon: string = ''; // Optional icon from FontAwesome or similar
  export let fullWidth: boolean = false; // Optional full width parameter
  export let colour = `variant-filled-primary`; // Optional colour parameter
</script>

<button class={`btn ${fullWidth ? 'w-full rounded-md' : 'py-2 px-4 rounded-sm'} ${colour} ${icon ? 'inline-flex items-center' : ''}`}>
  {#if icon}
    <span class="icon text-sm">
      <i class={icon}></i>
    </span>
  {/if}
  {text}
</button>
