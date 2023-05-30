<script lang="ts">
  import Maplibre from '$lib/MapComponents/MapLibre.svelte'
  import Visualisation from './Visualisation.svelte';
  import {map} from '$lib/LibStores'
  import {sim_panel_logic} from './stores'
  import SimulationVisualisation from '$lib/Simulation/SimulationVisualisation.svelte';
  import metroLinesFile from "$lib/Geodata/metro_lines_coord.json"


  //let map: maplibregl.Map | null = null

    $: if ($sim_panel_logic) {
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
<Maplibre style="https://basemaps.cartocdn.com/gl/positron-gl-style/style.json" standardControls
 bind:map={$map}>
<Visualisation />
{#if $sim_panel_logic}
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
