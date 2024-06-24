<script lang="ts">
    import { Marker} from 'svelte-maplibre'
    import {selectedArea,firstPoint} from "$lib/Interface/StateManagement"
    import {map} from '$lib/LibStores'
    import { onDestroy, onMount } from 'svelte'

    let longRange = []
    let latRange = []

    const eventHandler = (e) => {
      let { lng, lat } = e.lngLat
      let currentLocation = [parseFloat(lng.toFixed(6)), parseFloat(lat.toFixed(6))]
      map.update((map)=> {
       if (map) {
          let new_area;
          if ($selectedArea.length > 1) {
            if (e.type === "mousemove") {
              new_area = [...$selectedArea.slice(0, -1), currentLocation]
              //selectedArea.set(new_area)
            } else if (e.type === "click") {
              new_area = [...$selectedArea.slice(0, -1), currentLocation, currentLocation]
              selectedArea.set(new_area)
            }
          
          let data = {'type':'FeatureCollection','features':[{'type':'Feature','geometry':{'type':'LineString','coordinates':new_area}}]}
          map.getSource('selectedLine').setData(data)

          } else if ($selectedArea.length === 0 && e.type === "click") {
            new_area = [currentLocation,currentLocation]
            selectedArea.set(new_area)
            let data = {'type':'FeatureCollection','features':[{'type':'Feature','geometry':{'type':'LineString','coordinates':new_area}}]}
            map.addSource('selectedLine', {'type': 'geojson', 'data': data})
            map.addLayer({'id':'selectedLineLayer','type': 'line','source': 'selectedLine','layout': {'line-join': 'round','line-cap': 'round'},'paint': {'line-color': '#841526','line-width': 5}})
            firstPoint.set(currentLocation)
          }
       }
      return map  
      })
    }



  onMount(()=> {
   if(map){
    map.update((map)=> {map.on('click',eventHandler);return map;} )
    map.update((map)=> {map.on('mousemove',eventHandler);return map;} )
    }
})
</script>

<!-- {#each $selectedArea.slice(1) as marker, i}
  {#if i === 0}
  <Marker lngLat={marker}>
    <svg style="transform: scale(0.75);" width="24" height="24" xmlns="http://www.w3.org/2000/svg" xmlns:serif="http://www.serif.com/" fill-rule="evenodd" clip-rule="evenodd" fill="gold">
      <path fill="gold" serif:id="shape 17" d="M24 24.001c-.045 0-7.457.003-12 0h12zm-12 0c-4.551.003-11.979 0-12 0h12zm-12-12c-.032-8.648 3.365-11.993 12-12 8.635.007 12.032 3.352 12 12 .032 8.648-3.365 11.994-12 12-8.635-.006-12.032-3.352-12-12zm24-12h-12c4.543-.003 11.955 0 12 0zm-12 0c-4.551-.003-11.979 0-12 0h12z"/>
    </svg>
  </Marker>
  {:else}
  <Marker lngLat={marker}>
    <svg style="transform: scale(0.75);" width="24" height="24" xmlns="http://www.w3.org/2000/svg" xmlns:serif="http://www.serif.com/" fill-rule="evenodd" clip-rule="evenodd"><path serif:id="shape 17" d="M24 24.001c-.045 0-7.457.003-12 0h12zm-12 0c-4.551.003-11.979 0-12 0h12zm-12-12c-.032-8.648 3.365-11.993 12-12 8.635.007 12.032 3.352 12 12 .032 8.648-3.365 11.994-12 12-8.635-.006-12.032-3.352-12-12zm24-12h-12c4.543-.003 11.955 0 12 0zm-12 0c-4.551-.003-11.979 0-12 0h12z"/></svg>
  </Marker>
  {/if}
{/each} -->

{#each $selectedArea as marker}
<Marker lngLat={marker}>
  <svg style="transform: scale(0.75);" width="24" height="24" xmlns="http://www.w3.org/2000/svg" xmlns:serif="http://www.serif.com/" fill-rule="evenodd" clip-rule="evenodd"><path serif:id="shape 17" d="M24 24.001c-.045 0-7.457.003-12 0h12zm-12 0c-4.551.003-11.979 0-12 0h12zm-12-12c-.032-8.648 3.365-11.993 12-12 8.635.007 12.032 3.352 12 12 .032 8.648-3.365 11.994-12 12-8.635-.006-12.032-3.352-12-12zm24-12h-12c4.543-.003 11.955 0 12 0zm-12 0c-4.551-.003-11.979 0-12 0h12z"/></svg>
</Marker>
{/each}