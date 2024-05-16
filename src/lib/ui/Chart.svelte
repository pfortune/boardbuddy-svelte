<script lang="ts">
  import { onMount, onDestroy } from "svelte";
  import Chart from "chart.js/auto";
  import type { ChartConfiguration, ChartData, ChartType } from "chart.js";

  export let type: ChartType = "bar";
  export let data: ChartData;
  export let options: ChartConfiguration["options"];

  let canvas: HTMLCanvasElement;
  let chart: Chart | null = null;

  onMount(() => {
    if (canvas) {
      chart = new Chart(canvas, {
        type,
        data,
        options
      });

      return () => {
        chart?.destroy();
      };
    }
  });

  $: if (chart) {
    chart.data = data;
    chart.options = options ?? {};
    chart.update();
  }

  onDestroy(() => {
    chart?.destroy();
  }) ;
</script>

<canvas bind:this={canvas}></canvas>

<style>
  canvas {
    display: block;
    width: 100%;
    height: 100%;
  }
</style>
