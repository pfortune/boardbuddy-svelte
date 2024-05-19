<script lang="ts">
  export let imgUrl: string;
  export let imageId: string;
  let deleteFormElement: HTMLFormElement;

  function closeModal() {
    const modal = document.querySelector('.modal-overlay');
    if (modal) {
      modal.remove();
    }
  }

  function deleteImage() {
    deleteFormElement.imgUrl.value = imgUrl;
    deleteFormElement.imageId.value = imageId;
    deleteFormElement.requestSubmit();
  }

  function handleBackdropClick(event: MouseEvent) {
    if (event.target === event.currentTarget) {
      closeModal();
    }
  }
</script>

<div class="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50 modal-overlay" on:click={handleBackdropClick}>
  <div class="relative bg-white p-4 rounded shadow-lg max-w-2xl w-full">
    <button class="absolute top-2 right-2 text-black" on:click={closeModal} aria-label="Close">
      <i class="fas fa-times"></i>
    </button>
    <img src={imgUrl} alt="Expanded image" class="w-full h-auto" />
    <div class="flex justify-end space-x-4 mt-4">
      <button class="btn variant-filled-secondary" on:click={closeModal}>Close</button>
      <button class="btn variant-filled-warning" on:click={deleteImage}>Delete</button>
    </div>
    <!-- Hidden form for image deletion -->
    <form bind:this={deleteFormElement} action="?/delete_image" method="post" class="hidden">
      <input type="hidden" name="imgUrl" />
      <input type="hidden" name="imageId" />
    </form>
  </div>
</div>

<style>
  .fixed {
    z-index: 1000; /* Ensure it is above other content */
  }
</style>
