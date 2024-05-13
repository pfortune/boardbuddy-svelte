<script lang="ts">
    import { enhance } from "$app/forms";
  
    export let action: string = "";
    export let method: string = "POST";
    export let hiddenName: string = "";
    export let hiddenValue: string = "";
  </script>
  
  <form {action} {method} use:enhance>
    {#if hiddenName && hiddenValue}
      <input type="hidden" name={hiddenName} value={hiddenValue} />
    {/if}
    <slot />
  </form>
  