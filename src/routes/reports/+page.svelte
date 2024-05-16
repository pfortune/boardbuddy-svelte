<script lang="ts">
  import { Chart, Card } from "$lib/ui";
  import type { ChartData, ChartOptions } from "chart.js";

  const data: ChartData = {
    labels: ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"],
    datasets: [
      {
        label: "Sales",
        data: [820, 932, 901, 934, 1290, 1330, 1320],
        backgroundColor: "rgba(75, 192, 192, 0.2)",
        borderColor: "rgba(75, 192, 192, 1)",
        borderWidth: 1
      }
    ]
  };

  const options: ChartOptions = {
    responsive: true,
    scales: {
      y: {
        beginAtZero: true
      }
    }
  };
</script>

<div class="p-4">
  <ol class="breadcrumb">
    <li class="crumb"><a class="anchor" href="/">Home</a></li>
    <li class="crumb-separator" aria-hidden="true">&rsaquo;</li>
    <li class="crumb">Reports</li>
  </ol>
</div>

<Card title="Reports / Charts">
  <Chart type="bar" {data} {options} />
</Card>
