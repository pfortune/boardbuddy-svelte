<script lang="ts">
    import SignedIn from 'clerk-sveltekit/client/SignedIn.svelte'
    import AdminOnly from "$lib/ui/AdminOnly.svelte";

    export let data: any;
    console.log(data.user)
</script>

    <SignedIn>
        <AdminOnly user={data.user}>
            <p>Hello World</p>
        </AdminOnly>
    </SignedIn>