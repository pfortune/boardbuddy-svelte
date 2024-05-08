<script lang="ts">
    import UserButton from 'clerk-sveltekit/client/UserButton.svelte';

    export let username: string = '';
</script>
<div class="flex justify-between items-center bg-white shadow-md rounded-lg p-3">
    <nav class="flex-grow">
        <ul class="flex justify-start gap-4">
            <li><a href="/" class="text-blue-600 hover:text-blue-800 transition-colors">Home</a></li>
            <li><a href="/dashboard" class="text-blue-600 hover:text-blue-800 transition-colors">Dashboard</a></li>
            <li><a href="/search" class="text-blue-600 hover:text-blue-800 transition-colors">Search</a></li>
            <li><a href="/about" class="text-blue-600 hover:text-blue-800 transition-colors">About</a></li>
        </ul>
    </nav>

    <div class="flex items-center">
        <p class="text-blue-600 mr-4">Welcome {username}!</p>
        <UserButton afterSignOutUrl="/" class="bg-blue-700 hover:bg-blue-800 text-white text-sm px-4 py-2 rounded-lg transition-colors" />
    </div>

</div>