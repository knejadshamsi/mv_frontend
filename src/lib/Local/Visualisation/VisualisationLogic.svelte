<script  lang="ts">
  import BusStops from './BusStops.svelte'
  import MetroStations from './MetroStations.svelte'
  import BusRoutes from './BusRoutes.svelte'
  import MetroLines from './MetroLines.svelte'
  import {bus_stop_check,metro_stations_check,metro_lines_check} from '$lib/LibStores'
</script>

{#if $bus_stop_check}
<BusStops />
{/if}
<BusRoutes />
{#if $metro_stations_check}
<MetroStations />
{/if}
{#if $metro_lines_check}
<MetroLines />
{/if}