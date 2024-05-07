<script lang="ts">
	import '../app.postcss';

	import Heading from "$lib/ui/Heading.svelte";
  	import Menu from "$lib/ui/Menu.svelte";
	import UserButton from 'clerk-sveltekit/client/UserButton.svelte'
	import SignedIn from 'clerk-sveltekit/client/SignedIn.svelte'
</script>

<div class="container">
	<SignedIn>
    <div class="bg-blue-500 text-white p-2 rounded">
        <UserButton afterSignOutUrl="/" />
    </div>
	</SignedIn>

	<slot />
</div>







