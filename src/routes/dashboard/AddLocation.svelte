<script lang="ts">
  let title: string = "";
  let category: string = "";
  let x: number;
  let y: number;
</script>

<form action="/your-route-name?index" method="post">
  <label for="title">Title:</label>
  <input id="title" name="title" type="text" bind:value={title} required />

  <label for="category">Category:</label>
  <select id="category" name="category" bind:value={category} required>
    <option value="">Select a category</option>
    <option value="restaurant">Restaurant</option>
    <option value="shop">Shop</option>
    <option value="park">Park</option>
  </select>

  <label for="x">X Coordinate:</label>
  <input id="x" name="x" type="number" bind:value={x} required />

  <label for="y">Y Coordinate:</label>
  <input id="y" name="y" type="number" bind:value={y} required />

  <button type="submit">Add Location</button>
</form>
