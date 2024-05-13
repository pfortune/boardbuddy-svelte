<script lang="ts">
  export let colour = "variant-soft-primary";
  export let iconColour = "variant-ringed-primary";
  export let icon: string | false = false;
</script>

<span class="badge {colour} px-3 py-1 text-sm">
  {#if icon}
    <span class="badge-icon {iconColour} mr-2">
      <i class={`fas ${icon}`}></i>
    </span>
  {/if}
  <slot />
</span>
