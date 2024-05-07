<script lang="ts">
    import SignedIn from 'clerk-sveltekit/client/SignedIn.svelte'

    import { isAdmin } from '$lib/stores';

</script>



<SignedIn>
{#if isAdmin}
    <p>Welcome admin!</p>
{:else}
    <p>You are a buddy</p>
{/if} 
</SignedIn>