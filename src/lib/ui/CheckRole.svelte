<script lang="ts">
  export let user: any;
  export let role: string = "user";
</script>

{#if user && (user.role === role || (!user.role && role === "user"))}
  <slot />
{/if}
