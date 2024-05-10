<script lang="ts">
  export let text: string = 'Click me'; // Default button text
  export let icon: string = ''; // Optional icon from FontAwesome or similar
  export let fullWidth: boolean = false; // Optional full width parameter
</script>

<button type="submit" class={`btn ${fullWidth ? 'w-full' : ''} variant-filled-primary rounded-md`}>
  {#if icon}
    <span class="icon mr-2">
      <i class={icon}></i>
    </span>
  {/if}
  {text}
</button>
