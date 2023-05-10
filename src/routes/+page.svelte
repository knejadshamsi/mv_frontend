<script>
    import MapLibre from '$lib/maps/MapLibre.svelte'
    import {brtogstore,interface_logic,movesim} from './stores'
    import  Marker  from "$lib/maps/Marker.svelte";
    import GeoJSON from "$lib/maps/GeoJSON.svelte";
    import LineLayer from "$lib/maps/LineLayer.svelte";

    import busStops from "$lib/geodata/bus_stops.json"
    import busRoute from "$lib/geodata/bus_routes_coord.json"
    import metroStations from "$lib/geodata/motro_stations.json"
    import metroLines from "$lib/geodata/metro_lines_coord.json"
    import expRoute from "$lib/geodata/route_output.json"
    import GeoJson from "$lib/maps/GeoJSON.svelte";
   
    

    //onMount(()=> {
         //gsap.registerPlugin(AttrPlugin)
        //let header_timeline = gsap.timeline({duration:0.2,paused:true, ease:"power4.out"})
        //header_timeline.to("header",{ background: "linear-gradient(to bottom, rgba(132,21,38,0.4) , rgba(132,21,38,0)"},'ha')
        //.to("#full", {opacity:0.3},'ha')
        //.to("#Abbreviation", {textShadow:"-2px 3px 0px var(--brand_main)"}, 'ha')
    //})
    // @ts-ignore
    let layertoggle = {};
    interface_logic.subscribe((value)=> {
      layertoggle = value
    })

    let brToggle = {}
    brtogstore.subscribe((value)=> {
        brToggle = value
    })

    let sim_panel_toggle;

    movesim.subscribe((value)=> {
      sim_panel_toggle = value
    })
    
    //let testlocation = [-73.58019957334444,45.49629458176709]
    //let testlocation2 = { lon: -73.58019957334444, lat: 45.496294581768}

    let steps = 500
    let coords = expRoute.features[0].geometry.coordinates
    let i =0
    let counter = 0 
    let freq = 3
    let location = [-73.579374, 45.495724]
    let anime;
    let speed_toggle = false
    let start_protection = false
    const speed = {
      "1": "fastest",
      "2": "faster",
      "3": "normal",
      "4": "slower",
      "5": "slowest"
    }
    function AnimeStart() {
      return new Promise((resolve,reject)=>{
        Animation();
        resolve();
      })
    }
    
    function Animation() {
        counter++
        if (counter%freq==0) {
          i++
          location = coords[i]
        }
        if (i < (steps-1)) {
          anime = requestAnimationFrame(Animation)
        }
      }
    function AnimationReset() {
      cancelAnimationFrame(anime)
      i=0;
      counter=0;
      location = [-73.579374, 45.495724]
      freq=3
      start_protection = false
    }
    function AnimationPause(){
      cancelAnimationFrame(anime)
      start_protection = false
    }
    function AnimationSlowDown() {
      if (freq < 5){
        freq++
      }
    }
    function AnimationSpeedUP() {
      if (freq > 1) {
        freq = freq - 1
      }
      
    }

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
  <GeoJson id="ml-test" data={metroLines}>
    {#if ( layertoggle.ml === true)}
    <LineLayer
        layout={{ 'line-cap': 'round', 'line-join': 'round' }}
        paint={{
          'line-width': 5,
          'line-color': metroLines.features[0].properties.color,
          'line-opacity': 0.8,
        }}
      />
    {/if}
  </GeoJson>
  <!--
  {#each metroLines.features as data (data.properties.id)}
    <GeoJSON id="ml_{data.properties.id}" data={data}>
      {#if layertoggle.ml === true}
        <LineLayer
          layout={{ 'line-cap': 'round', 'line-join': 'round' }}
          paint={{
            'line-width': 5,
            'line-color': data.properties.color,
            'line-opacity': 0.8,
          }}
        />
      {/if}
    </GeoJSON>
  {/each}--->
  <!---{#if (layertoggle.bis == true)}
  <Marker lngLat={location} class="testing_movement">
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"><path d="M12 0c-6.627 0-12 5.373-12 12s5.373 12 12 12 12-5.373 12-12-5.373-12-12-12zm0 18.25c-.69 0-1.25-.56-1.25-1.25s.56-1.25 1.25-1.25c.691 0 1.25.56 1.25 1.25s-.559 1.25-1.25 1.25zm1.961-5.928c-.904.975-.947 1.514-.935 2.178h-2.005c-.007-1.475.02-2.125 1.431-3.468.573-.544 1.025-.975.962-1.821-.058-.805-.73-1.226-1.365-1.226-.709 0-1.538.527-1.538 2.013h-2.01c0-2.4 1.409-3.95 3.59-3.95 1.036 0 1.942.339 2.55.955.57.578.865 1.372.854 2.298-.016 1.383-.857 2.291-1.534 3.021z"/></svg>
</Marker>
  {/if}--->
  {#if (sim_panel_toggle==true)}
  <Marker lngLat={location} class="testing_movement">
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"><path d="M12 0c-6.627 0-12 5.373-12 12s5.373 12 12 12 12-5.373 12-12-5.373-12-12-12zm0 18.25c-.69 0-1.25-.56-1.25-1.25s.56-1.25 1.25-1.25c.691 0 1.25.56 1.25 1.25s-.559 1.25-1.25 1.25zm1.961-5.928c-.904.975-.947 1.514-.935 2.178h-2.005c-.007-1.475.02-2.125 1.431-3.468.573-.544 1.025-.975.962-1.821-.058-.805-.73-1.226-1.365-1.226-.709 0-1.538.527-1.538 2.013h-2.01c0-2.4 1.409-3.95 3.59-3.95 1.036 0 1.942.339 2.55.955.57.578.865 1.372.854 2.298-.016 1.383-.857 2.291-1.534 3.021z"/></svg>
</Marker>
  {/if}
</MapLibre>

{#if (sim_panel_toggle==true)}
<div id="simpanel_con">
  <button class="sim_btn" id="sim_slow" on:click={AnimationSlowDown}>
    <svg style="rotate:180deg"  xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"><path d="M12 12l-12 8v-16l12 8zm0-8v16l12-8-12-8z"/></svg>
  </button>
  <button class="sim_btn" id="sim_play" on:click={()=> { if (start_protection==false) {AnimeStart().then(()=>{speed_toggle=true;start_protection = true})}}}>
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"><path d="M3 22v-20l18 10-18 10z"/></svg>
  </button>
  <button class="sim_btn" id="sim_pause" on:click={AnimationPause}>
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"><path d="M11 22h-4v-20h4v20zm6-20h-4v20h4v-20z"/></svg>
  </button>
  <button class="sim_btn" id="sim_fast" on:click={AnimationSpeedUP}>
    <svg  xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"><path d="M12 12l-12 8v-16l12 8zm0-8v16l12-8-12-8z"/></svg>
  </button>
  <button class="sim_btn" id="sim_reset" on:click={()=> {AnimationReset();speed_toggle=false }}>
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"><path d="M13.5 2c-5.629 0-10.212 4.436-10.475 10h-3.025l4.537 5.917 4.463-5.917h-2.975c.26-3.902 3.508-7 7.475-7 4.136 0 7.5 3.364 7.5 7.5s-3.364 7.5-7.5 7.5c-2.381 0-4.502-1.119-5.876-2.854l-1.847 2.449c1.919 2.088 4.664 3.405 7.723 3.405 5.798 0 10.5-4.702 10.5-10.5s-4.702-10.5-10.5-10.5z"/></svg>
  </button>
  {#if (speed_toggle==true)}
  <span id="speed_ind">{speed[freq]}</span>
  {/if}
</div>
{/if}

</section>

<style>
  #test {
    width: 10rem;
    aspect-ratio: 1/1;
    background: red;
    position: absolute;
    top: 2rem;
    right: 2rem;
    cursor: pointer;
    z-index: 200;
  }
	section {
		width: auto;
		min-height: 100vh;
	}
	#map_con {
		width: 100vw;
		min-height: 100vh;
	}
  #simpanel_con {
    width: auto;
    height: 2rem;
    background-color: lightgray;
    border-radius: 25px;
    border: 2px solid darkgray;
    padding: 0.125rem;
    z-index: 102;
    position: absolute;
    top:7.5rem;
    left:1rem;
    display: flex;
    flex-direction: row;
    justify-content: center;
    align-items: center;
  }
  .sim_btn {
    width: 30%;
    height: 100%;
    margin-right: 0.125rem;
    background: none;
    border: none;
    transform: scale(0.95);
    cursor: pointer;
  }
  #speed_ind {
    height: 100%;
    border-radius: 0 25px 25px 0;
    background-color: rgba(132,21,38,1);
    z-index: 103;
    color: white;
    display: flex;
    align-items: center;
    padding-inline: 0.5rem ;
  }
  #sim_play {
    padding-right: 0;
  }
  #sim_reset,#sim_pause {
    padding-left: 0;
  }
  #sim_fast {
    padding-left: 0.125rem;
  }
</style>
