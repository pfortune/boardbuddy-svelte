<script lang="ts">
  import type { PageData } from "./$types";
  import { Gallery, Card } from "$lib/ui";

  export let data: PageData;

  let images = data.images;
</script>

<div class="p-4">
  <ol class="breadcrumb">
    <li class="crumb"><a class="anchor" href="/">Home</a></li>
    <li class="crumb-separator" aria-hidden="true">&rsaquo;</li>
    <li class="crumb">Gallery</li>
  </ol>
</div>

<Card title="Gallery">
  <Gallery {images} />
</Card>
