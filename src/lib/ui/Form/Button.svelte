<script lang="ts">
  export let text: string = 'Click me'; // Default button text
  export let color: string = 'blue'; // Default colour, but you can pass 'red', 'green', etc.
  export let icon: string = ''; // Optional icon from FontAwesome or similar
  export let fullWidth: boolean = false; // Optional full width parameter
</script>

<button class={`btn ${fullWidth ? 'w-full' : ''} bg-${color}-500 hover:bg-${color}-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline inline-flex items-center justify-center`}>
  {#if icon}
    <span class="icon mr-2">
      <i class={icon}></i>
    </span>
  {/if}
  {text}
</button>
