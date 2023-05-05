<script lang="ts">
    import { gsap } from "gsap";
    import { onMount } from 'svelte';
    import type {Feature} from "geojson"
    import MapLibre from '$lib/maps/MapLibre.svelte'
    import {brtogstore,interface_logic} from './stores'
    import  Marker  from "$lib/maps/Marker.svelte";
    import GeoJSON from "$lib/maps/GeoJSON.svelte";
    import LineLayer from "$lib/maps/LineLayer.svelte";

    import busStops from "$lib/geodata/bus_stops.json"
    import busRoute from "$lib/geodata/bus_routes_coord.json"
    import metroStations from "$lib/geodata/motro_stations.json"
    

    onMount(()=> {
        let header_timeline = gsap.timeline({duration:0.2,paused:true, ease:"power4.out"})
        header_timeline.to("header",{ background: "linear-gradient(to bottom, rgba(132,21,38,0.4) , rgba(132,21,38,0)"},'ha')
        .to("#full", {opacity:0.3},'ha')
        .to("#Abbreviation", {textShadow:"-2px 3px 0px var(--brand_main)"}, 'ha')
    })
    // @ts-ignore
    let layertoggle = {};
    interface_logic.subscribe((value)=> {
      layertoggle = value
    })

    let brToggle = {}
    brtogstore.subscribe((value)=> {
        brToggle = value
    })
    //console.log(busRoute.features[2])
</script>

<svelte:head>
	<title>MOVE</title>
	<meta name="description" content="MOVE main page" />
</svelte:head>

<section id="map_con">
    <MapLibre
  style="https://basemaps.cartocdn.com/gl/positron-gl-style/style.json"
  standardControls>
  <!---{#if (layertoggle.bs == true)}
  <Marker lngLat={[-73.58021,45.49631]} class=""><span>test</span></Marker>
{/if}-->
{#if (layertoggle.bs == true)}
    {#each busStops.features as busstop}
    <Marker lngLat={busstop.geometry.coordinates} class="busstop">
        <svg width="24" height="24" xmlns="http://www.w3.org/2000/svg" fill-rule="evenodd" clip-rule="evenodd"><path d="M8.829 19c-.412 1.165-1.524 2-2.829 2-1.446 0-2.654-1.025-2.937-2.387l-2.259-.452c-.468-.094-.804-.504-.804-.981v-10.18c0-.53.211-1.039.586-1.414s.884-.586 1.414-.586h4c0-.552.448-1 1-1h9c.552 0 1 .448 1 1h4c1.657 0 3 1.343 3 3v10c0 .552-.448 1-1 1h-3.171c-.412 1.165-1.524 2-2.829 2-1.305 0-2.417-.835-2.829-2h-5.342zm-2.829-2c.552 0 1 .448 1 1s-.448 1-1 1-1-.448-1-1 .448-1 1-1zm11 0c.552 0 1 .448 1 1s-.448 1-1 1-1-.448-1-1 .448-1 1-1zm5-3c-1.565-1.5-3.062-2-6-2v-5h4.5c.828 0 1.5.672 1.5 1.5v5.5zm-7-7h-5v5h5v-5zm-6 0h-5v5h5v-5z"/></svg>
    </Marker>
    {/each}
{/if}
{#if (layertoggle.ms == true)}
    {#each metroStations.features as metroStation}
    <Marker lngLat={metroStation.geometry.coordinates} class="metrostation">
        <svg fill="#000000" version="1.1" id="Capa_1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" 
        width="800px" height="800px" viewBox="0 0 94.362 94.362"
        xml:space="preserve">
   <g>
       <path d="M47.181,0.001C21.124,0.001,0,21.124,0,47.181c0,26.058,21.124,47.181,47.181,47.181c26.058,0,47.181-21.123,47.181-47.181
           C94.362,21.124,73.239,0.001,47.181,0.001z M47.181,82.567c-19.542,0-35.385-15.846-35.385-35.387
           c0-17.384,12.541-31.831,29.067-34.812v43.105L23.387,37.666l-9.321,9.487l33.122,33.453l33.289-33.289l-9.653-9.651L53.18,55.31
           V12.313c16.685,2.849,29.388,17.371,29.388,34.868C82.567,66.722,66.725,82.567,47.181,82.567z"/>
   </g>
   </svg>
    </Marker>
    {/each}
{/if}
{#each busRoute.features as data}
<GeoJSON id="br_{data.properties.name}_{data.properties.direction}" data={data} >
  {#if (brToggle[data.properties.number+ "_"+ data.properties.direction] == true)}
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
</MapLibre>



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
