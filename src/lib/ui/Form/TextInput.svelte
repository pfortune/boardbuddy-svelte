<script lang="ts">
  export let label: string = '';
  export let placeholder: string = '';
  export let value: string = '';
  export let name: string = '';
  export let icon: string = '';
  export let pattern: string | undefined = undefined; 
  export let title: string = '';
</script>

<div class="field mb-4">
  <label class="label block text-lg font-semibold mb-2">{label}</label>
  <div class="control relative">
    {#if pattern}
      <input class="input form-input block w-full pl-10 pr-4 py-2 rounded border-gray-300 focus:border-indigo-500 focus:ring focus:ring-indigo-500 focus:ring-opacity-50" 
             type="text" 
             placeholder={placeholder} 
             bind:value={value}
             name={name}
             pattern={pattern}
             title={title}
             required>
    {:else}
      <input class="input form-input block w-full pl-10 pr-4 py-2 rounded border-gray-300 focus:border-indigo-500 focus:ring focus:ring-indigo-500 focus:ring-opacity-50" 
             type="text" 
             placeholder={placeholder} 
             bind:value={value}
             name={name}
             title={title}
             required>
    {/if}
    {#if icon}
      <span class="icon is-small is-left absolute inset-y-0 left-0 flex items-center pl-3">
        <i class={icon}></i>
      </span>
    {/if}
  </div>
</div>
