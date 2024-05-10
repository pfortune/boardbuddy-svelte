<script lang="ts">
  import UserButton from "clerk-sveltekit/client/UserButton.svelte";
  import SignedIn from "clerk-sveltekit/client/SignedIn.svelte";
  import SignedOut from "clerk-sveltekit/client/SignedOut.svelte";
</script>

<SignedOut>
  <div><h1 class="m-10 h2">Hello world</h1></div>

  <a href="/login" class="m-5 bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600">Log in</a>
  <span class="text-gray-300 mx-2">|</span>
  <a href="/signup" class="m-5 bg-green-500 text-white py-2 px-4 rounded hover:bg-green-600">Sign up</a>
</SignedOut>

<SignedIn>Welcome aboard</SignedIn>
