<script lang="ts">
    import '../app.postcss';
	import Menu from '$lib/ui/Menu.svelte';
	import SignedIn from 'clerk-sveltekit/client/SignedIn.svelte';
	import ClerkLoaded from 'clerk-sveltekit/client/ClerkLoaded.svelte';

	export let data: any;
	console.log("+layout.svelte: ", data);
</script>

<div class="container mx-auto p-4">
    <SignedIn>
		<ClerkLoaded let:clerk>
			<Menu username={clerk?.user?.firstName} />
		</ClerkLoaded>
	</SignedIn>
    <slot />
</div>
