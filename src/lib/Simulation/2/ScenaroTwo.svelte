<script lang="ts">
    import {s2_duration,s2_location,s2_start,s2_end} from '../sim_store'
    import type { LngLatLike } from 'maplibre-gl'
    import {Marker} from 'svelte-maplibre'
    //import Journey from "./journey.json"
    //import dispatch from "$lib/sim/AnimeControls.svelte"
    //import { onDestroy, onMount } from "svelte";


  
    let car1: LngLatLike;
    s2_location.subscribe((value)=> {
      car1 = value as [number,number]
    })
    function Animation() {
      console.log("works!!!!")
    }
    //const l_sub = dispatch.on("event-test", Animation)
    //onDestroy(l_sub);
    //function AnimationSetter(){}
</script>

<Marker lngLat={car1} class="car_point">
<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"><path d="M17.75 7c.138 0 .25.112.25.25v.255c0 .397-.463.495-.808.495l-.543-1h1.101zm-.721 1.753c.32.593.473 1.126.473 1.833 0 .685-.198 1.267-.503 1.991v.923c0 .276-.224.5-.5.5h-.75c-.276 0-.5-.224-.5-.5v-.5h-6.5v.5c0 .276-.224.5-.5.5h-.749c-.276 0-.5-.224-.5-.5v-.924c-.304-.724-.503-1.306-.503-1.991 0-.707.154-1.24.473-1.833.414-.768.926-1.726 1.465-2.626.415-.69.631-.853 1.139-.944.767-.137 1.459-.182 2.426-.182s1.659.045 2.426.182c.508.091.725.253 1.139.945.539.9 1.05 1.857 1.464 2.626zm-8.029 1.497c0-.414-.336-.75-.75-.75s-.75.336-.75.75.336.75.75.75.75-.336.75-.75zm5 .5c0-.138-.112-.25-.25-.25h-3.5c-.138 0-.25.112-.25.25s.112.25.25.25h3.5c.138 0 .25-.112.25-.25zm1.471-2.764s-.37-.913-.815-1.571c-.101-.149-.258-.251-.435-.283-.756-.136-1.418-.179-2.221-.179s-1.465.043-2.22.179c-.177.032-.334.134-.435.283-.445.658-.816 1.571-.816 1.571.821.157 2.155.249 3.471.249s2.65-.092 3.471-.249zm1.029 2.264c0-.414-.336-.75-.75-.75s-.75.336-.75.75.336.75.75.75.75-.336.75-.75zm-9.149-3.25h-1.101c-.138 0-.25.112-.25.25v.255c0 .397.463.495.808.495l.543-1zm4.649-7c-5.523 0-10 4.394-10 9.815 0 5.505 4.375 9.268 10 14.185 5.625-4.917 10-8.68 10-14.185 0-5.421-4.478-9.815-10-9.815zm0 18c-4.419 0-8-3.582-8-8s3.581-8 8-8c4.419 0 8 3.582 8 8s-3.581 8-8 8z"/></svg>
</Marker>


<style>
    .car_point {
      width: 2rem;
    }
    .car_point svg path{
      fill: #ff3e00;
    }
</style>
    