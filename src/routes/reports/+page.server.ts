import { locationStore } from '$lib/models/mongo/location-store';
import { error } from '@sveltejs/kit';

export async function load() {
  try {
    const gamesCountByLocation = await locationStore.getGamesCountByLocation();

    // Aggregate the number of locations by the number of games they have
    const gameCountDistribution = gamesCountByLocation.reduce((acc, { gameCount }) => {
      if (!acc[gameCount]) {
        acc[gameCount] = 0;
      }
      acc[gameCount]++;
      return acc;
    }, {});

    // Convert the distribution object to an array for easier handling in the chart
    const distributionArray = Object.entries(gameCountDistribution).map(([gameCount, locationCount]) => ({
      gameCount: parseInt(gameCount),
      locationCount
    }));

    // Create data for the pie chart: ranges of game counts
    const pieChartData = [
      { range: '0 games', count: gamesCountByLocation.filter(d => d.gameCount === 0).length },
      { range: '1-5 games', count: gamesCountByLocation.filter(d => d.gameCount >= 1 && d.gameCount <= 5).length },
      { range: '6-10 games', count: gamesCountByLocation.filter(d => d.gameCount >= 6 && d.gameCount <= 10).length },
      { range: '11+ games', count: gamesCountByLocation.filter(d => d.gameCount >= 11).length }
    ];

    // Calculate average number of games per category
    const categoryGameCounts = await locationStore.getAverageGamesByCategory();

    // Get location creation trend data
    const trendData = await locationStore.getLocationCreationTrend();

    return {
      distributionArray,
      pieChartData,
      categoryGameCounts,
      trendData // Include trend data in the returned object
    };
  } catch (err) {
    throw error(500, `Failed to fetch report data: ${err.message}`);
  }
}
