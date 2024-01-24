<script  lang="ts">
  import BusStops from './BusStops.svelte'
  import MetroStations from './MetroStations.svelte'
  import BusRoutes from './BusRoutes.svelte'
  import MetroLines from './MetroLines.svelte'
  import {interface_logic} from '$lib/LibStores'   
  import {metro_lines_logic} from '$lib/Local/LocalStore'
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