<script lang="ts">
    import SignIn from 'clerk-sveltekit/client/SignIn.svelte';
</script>

<div class="flex justify-center items-center min-h-screen">
    <SignIn redirectUrl="/dashboard" />
</div>
