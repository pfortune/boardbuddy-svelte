<script lang="ts">
  import { onMount } from "svelte";

  let widget: { open: () => void };

  onMount(() => {
    const cloudinaryName = import.meta.env.VITE_CLOUDINARY_NAME;
    const uploadPreset = 'boardbuddy'; // Assuming this is a static value or perhaps also an env var

    if ("cloudinary" in window) {
      widget = window.cloudinary.createUploadWidget(
        {
          cloudName: cloudinaryName,
          uploadPreset: uploadPreset
        },
        (error: any, result: any) => {
          if (error) {
            console.error('Upload Error:', error);
          } else {
            console.log('Upload Result:', result);
          }
        }
      );
      console.log('Widget initialized:', widget);
    } else {
      console.error('Cloudinary script not loaded in window');
    }
  });

  function handleClick() {
    if (widget && typeof widget.open === 'function') {
      widget.open();
    } else {
      console.error('Widget not initialized or open not a function');
    }
  }
</script>

<button class="btn variant-filled-primary mt-2" on:click|preventDefault={handleClick}>Upload Image</button>
