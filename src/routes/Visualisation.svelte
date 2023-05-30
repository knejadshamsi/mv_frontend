<script  lang="ts">
  import BusStops from "$lib/Visualisation/BusStops.svelte";
  import MetroStations from "$lib/Visualisation/MetroStations.svelte";
  import BusRoutes from "$lib/Visualisation/BusRoutes.svelte";
  import MetroLines from "$lib/Visualisation/MetroLines.svelte";
  import {interface_logic} from './stores'   
  import {metro_lines_logic} from '$lib/LibStores'
</script>

{#if $interface_logic["bs"]}
<BusStops />
{/if}
<BusRoutes />
{#if $interface_logic["ms"]}
<MetroStations />
{/if}
{#if $metro_lines_logic}
<MetroLines />
{/if}