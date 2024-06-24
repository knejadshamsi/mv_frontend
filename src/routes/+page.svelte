<script lang="ts">
  import { MapLibre, NavigationControl, MapEvents, GeoJSON,LineLayer } from 'svelte-maplibre'
  import VisualisationLogic from '$lib/Local/Visualisation/VisualisationLogic.svelte'
  import {state, selectedArea} from "$lib/Interface/StateManagement"
  import {map} from '$lib/LibStores'
  import SimVisualisation from '$lib/Simulation/SimVisualisation.svelte'
  import DDDVisuals from '$lib/DDD/Interface/DDDVisuals.svelte'
  import Emissions from '$lib/Interface/Emissions.svelte'
  import MapSelection from '$lib/Interface/MapSelection.svelte'
  import MapSelector from '$lib/Local/Visualisation/MapSelector.svelte'
  
</script>

<svelte:head>
	<title>MOVE</title>
	<meta name="description" content="MOVE main page" />
</svelte:head>

<section id="map_con">
<MapLibre style="https://basemaps.cartocdn.com/gl/positron-gl-style/style.json" zoom={10.5} center={[-73.685, 45.551]} bind:map={$map}>

<NavigationControl position="bottom-right" />
<VisualisationLogic />
{#if $state === "Simulation"}
<SimVisualisation />
{:else if $state === "3D"}
<DDDVisuals />
{/if}
{#if $state === "MapSelection"}
<MapSelection />
<MapSelector />
{/if}
</MapLibre>

</section>

{#if $state ==="Emissions"}
<Emissions />
{/if}




<style>
	section {
		width: auto;
		min-height: 100lvh;
		min-height: 100vh;
	}
	#map_con {
		width: 100vw;
		min-height: 100lvh;
		min-height: 100vh;
	}
</style>
