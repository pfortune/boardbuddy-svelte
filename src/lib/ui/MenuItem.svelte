<script lang="ts">
    import { page } from "$app/stores";
  
    export let href: string;
    export let label: string;
    export let activeClass: string;
    export let inactiveClass: string;
    export let additionalClasses: string = '';
  
    $: isActive = $page.url.pathname === href;
  </script>
  
  <li>
    <a href={href} class={`btn ${isActive ? activeClass : inactiveClass} ${additionalClasses}`}>
      {label}
    </a>
  </li>
  