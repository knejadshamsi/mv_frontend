<script lang="ts">
    import busRouteFile from '$lib/Local/Geodata/bus_routes_coord.json'
    import {GeoJSON, LineLayer} from 'svelte-maplibre'
    import {bus_routes_logic} from '$lib/Local/LocalStore'
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