<script lang="ts">
  export let images;
</script>

<section class="grid grid-cols-2 md:grid-cols-3 gap-4">
  {#each images as image}
    <div>
      <img class="h-auto max-w-full rounded-lg" src={image.imgUrl} alt={image._id} loading="lazy" />
    </div>
  {/each}
</section>
