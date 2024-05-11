<script lang="ts">
  export let label: string = "";
  export let placeholder: string = "";
  export let value: string = "";
  export let name: string = "";
  export let icon: string = "";
  export let pattern: string | undefined = undefined;
  export let title: string = "";
</script>

<div class="field mb-4">
  <label class="label text-lg font-semibold mb-2" for={name}>{label}</label>

  <div class="control relative">
    {#if pattern}
      <input
        class="input rounded-md"
        type="text"
        {placeholder}
        bind:value
        {name}
        {pattern}
        {title}
        required
      />
    {:else}
      <input
        class="input rounded-md pl-10 pr-4 py-2"
        type="text"
        {placeholder}
        bind:value
        {name}
        {title}
        required
      />
    {/if}
    {#if icon}
      <span class="icon is-small is-left absolute inset-y-0 left-0 flex items-center pl-3">
        <i class={icon}></i>
      </span>
    {/if}
  </div>
</div>
