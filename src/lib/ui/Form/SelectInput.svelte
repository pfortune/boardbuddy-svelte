<script lang="ts">
  export let label: string = "";
  export let options: Array<{ value: string; label: string }> = [];
  export let selected: string = "";
  export let name: string = "";
  export let icon: string = "";
</script>

<div class="field mb-4">
  <label class="label text-lg font-semibold mb-2" for={name}>{label}</label>
  <div class="control relative">
    <select
      bind:value={selected}
      {name}
      class="select rounded-md pl-10 pr-4 py-2" 
      required
    >
      {#each options as option}
        <option value={option.value}>{option.label}</option>
      {/each}
    </select>
    {#if icon}
      <span class="icon is-small is-left absolute inset-y-0 left-0 flex items-center pl-3">
        <i class={icon}></i>
      </span>
    {/if}
  </div>
</div>
