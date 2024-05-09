<script lang="ts">
    export let title = "";
  </script>
  
  <div class="bg-white shadow-lg rounded-lg overflow-hidden mb-5">
    <header class="bg-gray-100 px-4 py-2 flex items-center">
      <span class="text-gray-700 mr-2">
        <i class="fas fa-coins"></i> 
          </span>
      <p class="font-semibold text-gray-800">{title}</p>
    </header>
    <div class="p-4">
      <div class="text-gray-600">
        <slot />
      </div>
    </div>
  </div>
  