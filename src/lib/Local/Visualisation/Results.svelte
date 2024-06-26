<script>
    import { fly } from 'svelte/transition'
    import {results, state} from "$lib/Interface/StateManagement"
    import { MapLibre, NavigationControl, MapEvents, GeoJSON,CircleLayer, HeatmapLayer } from 'svelte-maplibre'
</script>
{#if $state === "Results" || $state === "Viewmap"}
<button id="result_toggle" on:click={()=> {$state=== "Viewmap"? state.set("Results"):state.set("Viewmap")}}>{$state=== "Viewmap"? "View Results":"View Map"}</button>
{/if}
{#if $state === "Results"}
<div id="results" in:fly={{duration:250}} > 
    <nav id="tabs_con">
        <button class="tabs_items {$results==="Overview"? "selected":""}" on:click={()=> results.set("Overview")}>Overview</button>
        <button class="tabs_items {$results==="Area"? "selected":""}" on:click={()=> results.set("Area")}>Area/Network</button>
        <button class="tabs_items {$results==="Heatmap"? "selected":""}" on:click={()=> results.set("Heatmap")}>Papulation</button>
        <button class="tabs_items {$results==="Cluster"? "selected":""}" on:click={()=> results.set("Cluster")}>Accessibility</button>
        <button class="tabs_items {$results==="Emissions"? "selected":""}" on:click={()=> results.set("Emissions")}>Emissions</button>
        <button class="tabs_items {$results==="Finance"? "selected":""}" on:click={()=> results.set("Finance")}>Finance</button>
    </nav>
    <section id="results_section"></section>
</div>
{/if}
<!-- {#if $results === "Heatmap"}
<GeoJSON id="earthquakes" data={earthquakes}>
    <HeatmapLayer
      maxzoom={9}
      paint={{
        // Increase the heatmap weight based on frequency and property magnitude
        'heatmap-weight': ['interpolate', ['linear'], ['get', 'mag'], 0, 0, 6, 1],
        // Increase the heatmap color weight weight by zoom level
        // heatmap-intensity is a multiplier on top of heatmap-weight
        'heatmap-intensity': ['interpolate', ['linear'], ['zoom'], 0, 1, 9, 3],
        // Color ramp for heatmap.  Domain is 0 (low) to 1 (high).
        // Begin color ramp at 0-stop with a 0-transparancy color
        // to create a blur-like effect.
        'heatmap-color': [
          'interpolate',
          ['linear'],
          ['heatmap-density'],
          0,
          'rgba(33,102,172,0)',
          0.2,
          'rgb(103,169,207)',
          0.4,
          'rgb(209,229,240)',
          0.6,
          'rgb(253,219,199)',
          0.8,
          'rgb(239,138,98)',
          1,
          'rgb(178,24,43)',
        ],
        // Adjust the heatmap radius by zoom level
        'heatmap-radius': ['interpolate', ['linear'], ['zoom'], 0, 2, 9, 20],
        // Transition from heatmap to circle layer by zoom level
        'heatmap-opacity': ['interpolate', ['linear'], ['zoom'], 7, 1, 9, 0],
      }}
    />
    <CircleLayer
      id="earthquakes-circle"
      source="earthquakes"
      minzoom={7}
      paint={{
        // Size circle radius by earthquake magnitude and zoom level
        'circle-radius': [
          'interpolate',
          ['linear'],
          ['zoom'],
          7,
          ['interpolate', ['linear'], ['get', 'mag'], 1, 1, 6, 4],
          16,
          ['interpolate', ['linear'], ['get', 'mag'], 1, 5, 6, 50],
        ],
        // Color circle by earthquake magnitude
        'circle-color': [
          'interpolate',
          ['linear'],
          ['get', 'mag'],
          1,
          'rgba(33,102,172,0)',
          2,
          'rgb(103,169,207)',
          3,
          'rgb(209,229,240)',
          4,
          'rgb(253,219,199)',
          5,
          'rgb(239,138,98)',
          6,
          'rgb(178,24,43)',
        ],
        'circle-stroke-color': 'white',
        'circle-stroke-width': 1,
        // Transition from heatmap to circle layer by zoom level
        'circle-opacity': ['interpolate', ['linear'], ['zoom'], 7, 0, 8, 1],
      }}
    />
</GeoJSON>
{/if} -->
<style>
    #result_toggle {
        width: 10rem;
        aspect-ratio: 2.5/0.8;
        position: absolute;
        top:2%;
        right: 2.5%;
        background-color: var(--brand_main);
        border: none;
        color: var(--brand_white);
        border-radius: 5px;
        font-weight: 800;
        font-size: 1.125rem;
        cursor: pointer;
    }
    #results {
        position: absolute;
        top: 7%;
        bottom: 4%;
        right: 2.5%;
        width: 60rem;
        display: flex;
        font-family: "poppins", sans-serif;
        background-color: rgba(211, 211, 211, .7);
        border: 2px solid darkgray;
        backdrop-filter: blur(5px);
        box-sizing: border-box;
        display: flex;
        flex-direction: column;
    }
    #tabs_con {
        width: 100%;
        height: 5rem;
        display: flex;
        flex-direction: row;
        justify-content: space-evenly;
        align-items: center;
        border-bottom: 2px solid darkgray;

    }
    .tabs_items {
        width: 100%;
        height: 100%;
        display: flex;
        align-items: flex-end;
        justify-content: center;
        font-size: 1.25rem;
        border: none;
        background: none;
        cursor: pointer;
        transition: border 0.2s ease;
        padding-bottom: 0.5rem;
    }
    .selected {
        font-weight: 800;
        color: var(--brand_main);
        border-bottom: 5px solid var(--brand_main);
    }
    #results_section {
        flex-grow: 1;
        padding-inline:1.5rem;
    }
</style>