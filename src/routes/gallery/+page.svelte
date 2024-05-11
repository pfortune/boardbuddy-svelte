<script lang="ts">
  import type { PageData } from "./$types";
  import { Gallery, Card } from "$lib/ui";

  export let data: PageData;

  let images = data.images;
</script>

<Card title="Gallery">
  <Gallery {images} />
</Card>
