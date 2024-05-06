<script lang="ts">
    import SignOutButton from 'clerk-sveltekit/client/SignOutButton.svelte'
    export let data;
</script>

{#if data.userRole === 'admin'}
    <p>Welcome admin!</p>
{:else}
    <p>You are a buddy</p>
{/if}

<SignOutButton />