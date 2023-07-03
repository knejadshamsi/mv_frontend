<script lang="ts">
  import Maplibre from '$lib/MapComponents/MapLibre.svelte'
  import NavigationControl from '$lib/MapComponents/NavigationControl.svelte'
  import Visualisation from './Visualisation.svelte';
  import {map} from '$lib/LibStores'
  import {simulation_toggle} from './stores'
  import SimulationVisualisation from '$lib/Simulation/SimulationVisualisation.svelte';

    $: if ($simulation_toggle) {
      if ($map) {
        $map.flyTo({center:[-73.5834,45.4937],zoom:15.5})
      }
  }
  
</script>

<svelte:head>
	<title>MOVE</title>
	<meta name="description" content="MOVE main page" />
</svelte:head>

<section id="map_con">
<Maplibre style="https://basemaps.cartocdn.com/gl/positron-gl-style/style.json"
 bind:map={$map}>
<NavigationControl position="bottom-right" />
<Visualisation />
{#if $simulation_toggle}
<SimulationVisualisation />
{/if}
</Maplibre>

</section>

<style>
	section {
		width: auto;
		min-height: 100vh;
	}
	#map_con {
		width: 100vw;
		min-height: 100vh;
	}
</style>
