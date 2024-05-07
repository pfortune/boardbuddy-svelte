<script lang="ts">
	import '../app.postcss';

	import UserButton from 'clerk-sveltekit/client/UserButton.svelte'
	import SignedIn from 'clerk-sveltekit/client/SignedIn.svelte'
	import SignedOut from 'clerk-sveltekit/client/SignedOut.svelte'	

	import { isAdmin } from '$lib/stores';
	export let data: any;
	if(data.userRole === "admin") {
		isAdmin.set(true);
	} else {
		isAdmin.set(false);
	}
</script>

<SignedIn>
    <div class="bg-blue-500 text-white p-2 rounded">
        <UserButton afterSignOutUrl="/" />
    </div>
</SignedIn>

<SignedOut>
    <a href="/login" class="bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600">Log in</a>
    <span class="text-gray-300 mx-2">|</span>
    <a href="/signup" class="bg-green-500 text-white py-2 px-4 rounded hover:bg-green-600">Sign up</a>
</SignedOut>

<slot />


