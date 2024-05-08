<script lang="ts">
  import SignUp from "clerk-sveltekit/client/SignUp.svelte";
</script>

<div class="flex justify-center items-center min-h-screen">
  <SignUp redirectUrl="/dashboard" />
</div>
