<script lang="ts">
  import ImageModal from "./ImageModal.svelte";

  let elemCarousel: HTMLDivElement;
  export let images;

  let showModal = false;
  let currentImage = "";
  let currentImageId = "";

  function carouselLeft(): void {
    const x =
      elemCarousel.scrollLeft === 0
        ? elemCarousel.scrollWidth - elemCarousel.clientWidth
        : elemCarousel.scrollLeft - elemCarousel.clientWidth;
    elemCarousel.scrollTo({ left: x, behavior: 'smooth' });
  }

  function carouselRight(): void {
    const x =
      elemCarousel.scrollLeft === elemCarousel.scrollWidth - elemCarousel.clientWidth
        ? 0
        : elemCarousel.scrollLeft + elemCarousel.clientWidth;
    elemCarousel.scrollTo({ left: x, behavior: 'smooth' });
  }

  function carouselThumbnail(index: number) {
    elemCarousel.scrollTo({ left: elemCarousel.clientWidth * index, behavior: 'smooth' });
  }

  function getOptimizedImageUrl(url: string, width: number, quality: number) {
    return url.replace(/(\/upload\/)(.*)/, `$1w_${width},q_${quality}/$2`);
  }

  function openModal(imageUrl: string, imageId: string) {
    currentImage = imageUrl;
    currentImageId = imageId;
    showModal = true;
  }

  function closeModal() {
    showModal = false;
  }
</script>

<div class="relative card overflow-hidden !rounded-none">
  <div bind:this={elemCarousel} class="snap-x snap-mandatory scroll-smooth flex overflow-x-auto relative z-0 !rounded-none">
    {#each images as image}
      <img
        class="snap-center rounded-container-token w-full h-auto !rounded-none cursor-pointer"
        src="{getOptimizedImageUrl(image.imgUrl, 800, 80)}"
        alt="carousel image"
        loading="lazy"
        on:click={() => openModal(image.imgUrl, image._id)}
      />
    {/each}
  </div>
  <button 
    type="button" 
    class="absolute left-0 top-1/2 transform -translate-y-1/2 z-10 btn-icon variant-filled"
    on:click={carouselLeft}
    aria-label="Previous image">
    <i class="fa-solid fa-arrow-left" />
  </button>
  <button 
    type="button" 
    class="absolute right-0 top-1/2 transform -translate-y-1/2 z-10 btn-icon variant-filled"
    on:click={carouselRight}
    aria-label="Next image">
    <i class="fa-solid fa-arrow-right" />
  </button>
</div>

{#if showModal}
  <ImageModal imgUrl={currentImage} imageId={currentImageId} />
{/if}
