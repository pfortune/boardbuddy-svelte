<script lang="ts">
    import { enhance } from "$app/forms";

    export let action:string = "";
    export let method:string = "POST";
</script>
<form {action} {method} use:enhance>
    <slot />
</form>