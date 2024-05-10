<script lang="ts">
  export let title: string = "";
  export let icon: string = "fa-map-marker-alt";
</script>

<div class="card shadow-lg mb-5">
  <header class="card-header px-4 py-2 flex">
    <span class="icon mr-2">
      <i class="fas {icon}"></i>
    </span>
    <p class="font-semibold">{title}</p>
  </header>
  <hr class="!border-dashed" />
  <div class="p-4">
    <p>
      <slot />
    </p>
  </div>
</div>
