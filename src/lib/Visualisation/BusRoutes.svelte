<script lang="ts">
    import busRouteFile from "$lib/Geodata/bus_routes_coord.json";
    import GeoJSON from "$lib/MapComponents/GeoJSON.svelte";
    import LineLayer from "$lib/MapComponents/LineLayer.svelte";
    import {bus_routes_logic} from '$lib/LibStores'
    const BusRoutes = busRouteFile["features"]
</script>

{#each BusRoutes as data}
<GeoJSON id="br_{data.properties.name}_{data.properties.direction}" data={data} >
{#if ($bus_routes_logic[data.properties.number+ "_"+ data.properties.direction] == true)}
  <LineLayer
    layout={{ 'line-cap': 'round', 'line-join': 'round' }}
    paint={{
      'line-width': 5,
      'line-dasharray': [5, 2],
      'line-color': 'rgb(0, 119, 182)',
      'line-opacity': 0.8,
    }}
  />
  {/if}
</GeoJSON>
{/each}