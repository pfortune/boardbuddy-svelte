<script lang="ts">
	import SignIn from 'clerk-sveltekit/client/SignIn.svelte'
</script>

<div>
	<p>Sign in</p>
	<SignIn redirectUrl="/dashboard" />
</div>