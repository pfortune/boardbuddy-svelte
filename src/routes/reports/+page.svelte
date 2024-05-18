<script lang="ts">
  import { onMount } from 'svelte';
  import { Chart, Card } from '$lib/ui';
  import type { ChartData, ChartOptions } from 'chart.js';
  export let data;

  // Data for bar chart (distribution of locations by number of games)
  let distributionData: ChartData = {
    labels: [],
    datasets: [
      {
        label: 'Number of Locations',
        data: [],
        backgroundColor: 'rgba(75, 192, 192, 0.2)',
        borderColor: 'rgba(75, 192, 192, 1)',
        borderWidth: 1
      }
    ]
  };

  let barChartOptions: ChartOptions = {
    responsive: true,
    scales: {
      y: {
        beginAtZero: true
      },
      x: {
        title: {
          display: true,
          text: 'Number of Games'
        }
      }
    }
  };

  // Data for pie chart (percentage of locations by game count ranges)
  let pieChartData: ChartData = {
    labels: [],
    datasets: [
      {
        label: 'Location Distribution',
        data: [],
        backgroundColor: ['rgba(255, 99, 132, 0.2)', 'rgba(54, 162, 235, 0.2)', 'rgba(255, 206, 86, 0.2)', 'rgba(75, 192, 192, 0.2)'],
        borderColor: ['rgba(255, 99, 132, 1)', 'rgba(54, 162, 235, 1)', 'rgba(255, 206, 86, 1)', 'rgba(75, 192, 192, 1)'],
        borderWidth: 1
      }
    ]
  };

  let pieChartOptions: ChartOptions = {
    responsive: true
  };

  // Data for bar chart (average games per category)
  let categoryChartData: ChartData = {
    labels: [],
    datasets: [
      {
        label: 'Average Number of Games',
        data: [],
        backgroundColor: 'rgba(153, 102, 255, 0.2)',
        borderColor: 'rgba(153, 102, 255, 1)',
        borderWidth: 1
      }
    ]
  };

  let categoryChartOptions: ChartOptions = {
    responsive: true,
    scales: {
      y: {
        beginAtZero: true
      },
      x: {
        title: {
          display: true,
          text: 'Category'
        }
      }
    }
  };

  // Data for line chart (trend of locations created over time)
  let trendChartData: ChartData = {
    labels: [],
    datasets: [
      {
        label: 'Locations Created',
        data: [],
        backgroundColor: 'rgba(75, 192, 192, 0.2)',
        borderColor: 'rgba(75, 192, 192, 1)',
        borderWidth: 1,
        fill: false
      }
    ]
  };

  let trendChartOptions: ChartOptions = {
    responsive: true,
    scales: {
      y: {
        beginAtZero: true,
        title: {
          display: true,
          text: 'Number of Locations'
        }
      },
      x: {
        title: {
          display: true,
          text: 'Day'
        }
      }
    }
  };

  // Reactively update distributionData, pieChartData, categoryChartData, and trendChartData
  $: if (data.distributionArray) {
    const labels = data.distributionArray.map(d => d.gameCount);
    const locationCounts = data.distributionArray.map(d => d.locationCount);

    distributionData.labels = labels;
    distributionData.datasets[0].data = locationCounts;

    console.log('Distribution Data:', JSON.stringify(distributionData, null, 2));
  }

  $: if (data.pieChartData) {
    const labels = data.pieChartData.map(d => d.range);
    const counts = data.pieChartData.map(d => d.count);

    pieChartData.labels = labels;
    pieChartData.datasets[0].data = counts;

    console.log('Pie Chart Data:', JSON.stringify(pieChartData, null, 2));
  }

  $: if (data.categoryGameCounts) {
    const labels = data.categoryGameCounts.map(d => d.category);
    const averageGames = data.categoryGameCounts.map(d => d.averageGames);

    categoryChartData.labels = labels;
    categoryChartData.datasets[0].data = averageGames;

    console.log('Category Chart Data:', JSON.stringify(categoryChartData, null, 2));
  }

  $: if (data.trendData) {
    const labels = data.trendData.map(d => d.day);
    const counts = data.trendData.map(d => d.count);

    console.log('Trend Data:', data.trendData);  // Log raw trend data

    trendChartData.labels = labels;
    trendChartData.datasets[0].data = counts;

    console.log('Trend Chart Data:', JSON.stringify(trendChartData, null, 2));
  }

  onMount(() => {
    console.log('Bar Chart Data on mount:', JSON.stringify(distributionData, null, 2));
    console.log('Pie Chart Data on mount:', JSON.stringify(pieChartData, null, 2));
    console.log('Category Chart Data on mount:', JSON.stringify(categoryChartData, null, 2));
    console.log('Trend Chart Data on mount:', JSON.stringify(trendChartData, null, 2));
  });
</script>

<div class="p-4">
  <ol class="breadcrumb">
    <li class="crumb"><a class="anchor" href="/">Home</a></li>
    <li class="crumb-separator" aria-hidden="true">&rsaquo;</li>
    <li class="crumb">Reports</li>
  </ol>
</div>

<div class="max-w-4xl mx-auto p-4">
  <Card title="Distribution of Locations by Number of Games">
    {#if distributionData.labels.length > 0}
      <Chart type="bar" data={distributionData} options={barChartOptions} />
    {/if}
  </Card>

  <Card title="Percentage of Locations by Game Count Ranges">
    {#if pieChartData.labels.length > 0}
      <Chart type="pie" data={pieChartData} options={pieChartOptions} />
    {/if}
  </Card>

  <Card title="Average Number of Games per Category">
    {#if categoryChartData.labels.length > 0}
      <Chart type="bar" data={categoryChartData} options={categoryChartOptions} />
    {/if}
  </Card>

  <Card title="Trend of Locations Created Over Time">
    {#if trendChartData.labels.length > 0}
      <Chart type="line" data={trendChartData} options={trendChartOptions} />
    {/if}
  </Card>
</div>
