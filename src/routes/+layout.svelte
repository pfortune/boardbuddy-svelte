<script lang="ts">
  // Global Stylesheets
  import "../app.postcss";

  // Layout Components
  import Menu from "$lib/ui/Menu.svelte";

  // Clerk Auth
  import SignedIn from "clerk-sveltekit/client/SignedIn.svelte";
  import ClerkLoaded from "clerk-sveltekit/client/ClerkLoaded.svelte";

  // Skeleton UI
  import { AppShell, Toast, getToastStore, initializeStores } from "@skeletonlabs/skeleton";
  import type { ToastSettings, ToastStore } from "@skeletonlabs/skeleton";

  initializeStores();

  const toastStore = getToastStore();

  // SEO Meta tags
  const metaDefaults = {
    title: "Board Buddy - Connecting board game lovers with local gaming venues",
    description: "A social platform to connect board game enthusiasts with local gaming venues and groups in their area."
  };

  const meta = {
    title: metaDefaults.title,
    description: metaDefaults.description
  };
</script>

<svelte:head>
  <title>{meta.title}</title>
  <meta name="title" content={meta.title} />
  <meta name="description" content={meta.description} />
</svelte:head>

<Toast />
<AppShell class="h-screen">
  <svelte:fragment slot="header">
  <SignedIn>
    <ClerkLoaded let:clerk>
      <Menu username={clerk?.user?.firstName || "Back"} />
    </ClerkLoaded>
  </SignedIn>
  </svelte:fragment>

  <div class="container mx-auto p-4">
    <slot />
  </div>
</AppShell>
