<script lang="ts">
  import { onMount, createEventDispatcher } from "svelte";

  let widget: { open: () => void };
  let imageUrls: string[] = [];
  let dispatch = createEventDispatcher();

  onMount(() => {
    const cloudinaryName = import.meta.env.VITE_CLOUDINARY_NAME;
    const uploadPreset = "boardbuddy";

    if ("cloudinary" in window) {
      widget = window.cloudinary.createUploadWidget(
        {
          cloudName: cloudinaryName,
          uploadPreset: uploadPreset,
          sources: ['local', 'url', 'camera'],
        },
        (error: Error | null, result: any) => {
          if (error) {
            console.error("Error during upload:", error);
            dispatch("uploadError", { error: error.message });
            return;
          }
          if (result.event === "queues-end" && result.info.files) {
            imageUrls = result.info.files
              .filter(file => file.status === 'success')
              .map(file => file.uploadInfo.secure_url);
            dispatch("uploadSuccess", { urls: imageUrls });
          }
        }
      );
    } else {
      console.error("Cloudinary script not loaded in window");
      dispatch("loadError", { error: "Cloudinary script not loaded" });
    }
  });

  function handleClick() {
    if (widget && typeof widget.open === "function") {
      widget.open();
    } else {
      console.error("Widget not initialised or open not a function");
      dispatch("widgetError", { error: "Widget not initialised or cannot open" });
    }
  }
</script>

<button class="btn variant-filled-primary mt-2" on:click|preventDefault={handleClick}>Upload Image</button>
