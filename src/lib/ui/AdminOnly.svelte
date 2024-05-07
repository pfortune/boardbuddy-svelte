<script>
    import { isAdmin, updateAdminStatus } from '$lib/stores';
    import { onMount } from 'svelte';

    export let user;

    onMount(() => {
        if (user && user.role) {
            updateAdminStatus(user.role);
        }
    });
</script>

{#if $isAdmin}
    <slot />
{/if}
