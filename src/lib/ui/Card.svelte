<script lang="ts">
  export let title: string = "";
  export let icon: string = "fa-map-marker-alt";
</script>

<div class="card shadow-lg mb-5 text-primary-500 border border-primary-500">
  <header class="card-header px-4 py-2 flex items-center">
    <span class="icon mr-2">
      <i class="fas {icon} dark:text-primary-400 text-primary-900"></i>
    </span>
    <p class="dark:font-bold font-semibold dark:text-primary-200 text-primary-800">{title}</p>
  </header>
  <hr class="!border-dashed"/>
  <div class="p-4 text-primary-500">
    <slot />
  </div>
</div>
