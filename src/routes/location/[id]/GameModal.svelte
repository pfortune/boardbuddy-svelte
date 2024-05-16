<script lang="ts">
    import { getModalStore } from '@skeletonlabs/skeleton';
    import { debounce } from 'lodash-es';
  
    const modalStore = getModalStore();
    let searchQuery = "";
    let searchResults = [];
    let isSearching = false;
    let isFetchingDetails = false;
  
    async function fetchSearchResults(query: string) {
      try {
        isSearching = true;
        console.log('Fetching search results for query:', query);
        const response = await fetch(`https://corsproxy.io/?${encodeURIComponent(`https://boardgamegeek.com/xmlapi/search?search=${query}`)}`);
        const text = await response.text();
        console.log('Raw API response:', text);
        const parser = new DOMParser();
        const xml = parser.parseFromString(text, "application/xml");
        const boardgames = xml.getElementsByTagName('boardgame');
        searchResults = Array.from(boardgames).slice(0, 15).map(boardgame => {
          const titleElement = boardgame.querySelector('name[primary="true"]');
          const yearElement = boardgame.querySelector('yearpublished');
          return {
            id: boardgame.getAttribute('objectid'),
            title: titleElement ? titleElement.textContent : 'No title',
            year: yearElement ? yearElement.textContent : 'Unknown'
          };
        });
        console.log('Parsed search results:', searchResults);
      } catch (error) {
        console.error('Error fetching search results:', error);
      } finally {
        isSearching = false;
      }
    }
  
    async function fetchGameDetails(game) {
      try {
        isFetchingDetails = true;
        const response = await fetch(`https://api.allorigins.win/raw?url=${encodeURIComponent(`https://boardgamegeek.com/xmlapi/boardgame/${game.id}`)}`);
        const text = await response.text();
        const parser = new DOMParser();
        const xml = parser.parseFromString(text, "application/xml");
        const boardgame = xml.querySelector('boardgame');
        if (boardgame) {
          const details = {
            id: game.id,
            name: game.title,
            minPlayers: boardgame.querySelector('minplayers')?.textContent ?? 'N/A',
            maxPlayers: boardgame.querySelector('maxplayers')?.textContent ?? 'N/A',
            playingTime: boardgame.querySelector('playingtime')?.textContent ?? 'N/A',
            age: boardgame.querySelector('age')?.textContent ?? 'N/A',
            category: boardgame.querySelector('boardgamesubdomain')?.textContent ?? 'N/A'
          };
          console.log('Game details:', details);
          return details;
        } else {
          console.error('No boardgame element found in response');
        }
      } catch (error) {
        console.error('Error fetching game details:', error);
      } finally {
        isFetchingDetails = false;
      }
    }
  
    const debouncedFetchSearchResults = debounce(fetchSearchResults, 500);
  
    $: if (searchQuery.length > 2) {
      debouncedFetchSearchResults(searchQuery);
    } else {
      searchResults = [];
    }
  
    async function onGameSelect(game) {
      const gameDetails = await fetchGameDetails(game);
      if ($modalStore[0].response) $modalStore[0].response(gameDetails);
      modalStore.close();
    }
  
    function onCancel() {
      modalStore.close();
    }
  
    // Base Classes
    const cBase = 'card p-4 w-modal shadow-xl space-y-4';
    const cHeader = 'text-2xl font-bold';
    const cForm = 'border border-surface-500 p-4 space-y-4 rounded-container-token';
  </script>
  
  {#if $modalStore[0]}
    <div class={cBase}>
      <header class={cHeader}>{$modalStore[0].title ?? 'Add New Game'}</header>
      <article>{$modalStore[0].body ?? 'Complete the form below and then press submit.'}</article>
      <div class={cForm}>
        <label class="label">
          <span>Game Title</span>
          <input class="input" type="text" bind:value={searchQuery} placeholder="Enter game title..." />
        </label>
        {#if isSearching}
          <p>Searching...</p>
        {:else if isFetchingDetails}
          <p>Gathering game details...</p>
        {:else if searchResults.length > 0}
          <ul class="max-h-60 overflow-y-auto mt-2">
            {#each searchResults as game}
              <li class="py-1">
                <button type="button" class="text-left w-full hover:bg-gray-100 p-2 rounded" on:click={() => onGameSelect(game)} disabled={isFetchingDetails}>
                  {game.title} ({game.year})
                </button>
              </li>
            {/each}
          </ul>
        {:else}
          <p>No results found.</p>
        {/if}
      </div>
      <footer class="modal-footer">
        <button class="btn bg-gray-500 text-white px-4 py-2 rounded" on:click={onCancel} disabled={isFetchingDetails}>Cancel</button>
      </footer>
    </div>
  {/if}
  