<script lang="ts">
	import '../app.postcss';

	// Floating UI for Popups
	import { computePosition, autoUpdate, flip, shift, offset, arrow } from '@floating-ui/dom';
	import { storePopup } from '@skeletonlabs/skeleton';
	storePopup.set({ computePosition, autoUpdate, flip, shift, offset, arrow });

	import UserButton from 'clerk-sveltekit/client/UserButton.svelte'
	import SignedIn from 'clerk-sveltekit/client/SignedIn.svelte'
	import SignedOut from 'clerk-sveltekit/client/SignedOut.svelte'
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
