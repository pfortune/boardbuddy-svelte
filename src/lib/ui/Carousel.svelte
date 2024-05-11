<script lang="ts">
  let elemCarousel: HTMLDivElement;
  export let images;

  function carouselLeft(): void {
    const x =
      elemCarousel.scrollLeft === 0
        ? elemCarousel.clientWidth * elemCarousel.childElementCount // loop
        : elemCarousel.scrollLeft - elemCarousel.clientWidth; // step left
    elemCarousel.scroll(x, 0);
  }

  function carouselRight(): void {
    const x =
      elemCarousel.scrollLeft === elemCarousel.scrollWidth - elemCarousel.clientWidth
        ? 0 // loop
        : elemCarousel.scrollLeft + elemCarousel.clientWidth; // step right
    elemCarousel.scroll(x, 0);
  }

  function carouselThumbnail(index: number) {
    elemCarousel.scroll(elemCarousel.clientWidth * index, 0);
  }
</script>

<div class="relative card overflow-hidden !rounded-none"> <!-- Ensure this has a relative positioning and overflow hidden if needed -->
  <!-- Full Images -->
  <div bind:this={elemCarousel} class="snap-x snap-mandatory scroll-smooth flex overflow-x-auto relative z-0 !rounded-none">
    {#each images as image}
      <img class="snap-center rounded-container-token w-full h-auto !rounded-none" src="{image.imgUrl}" alt loading="lazy" />
    {/each}
  </div>
  <!-- Button: Left -->
  <button 
    type="button" 
    class="absolute left-0 top-1/2 transform -translate-y-1/2 z-10 btn-icon variant-filled"
    on:click={carouselLeft}>
    <i class="fa-solid fa-arrow-left" />
  </button>
  <!-- Button: Right -->
  <button 
    type="button" 
    class="absolute right-0 top-1/2 transform -translate-y-1/2 z-10 btn-icon variant-filled"
    on:click={carouselRight}>
    <i class="fa-solid fa-arrow-right" />
  </button>
</div>
