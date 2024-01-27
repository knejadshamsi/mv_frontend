<script lang="ts">
    import bus_stops from '$lib/images/bus_stops.svg'
    import bus_routes from '$lib/images/bus_routes.svg'
    import metro_stations from '$lib/images/metro_stations.svg'
    import metro_lines from '$lib/images/metro_lines.svg'
    import bicycle_stations from '$lib/images/bicycle_stations.svg'
    import { fly } from 'svelte/transition';
    import {bus_stop_check ,bus_route_check ,metro_stations_check ,metro_lines_check ,bicycle_stations_check } from '$lib/LibStores'
 
</script>

<div id="info_toggle_con" in:fly|global={{duration:150}} out:fly|global={{duration:150}}>
    <input class="it_btn_check" id="bus_stop_check" type="checkbox" on:change={()=> {bus_stop_check.set(!$bus_stop_check)}} />
    <label class="info_toggle_btn" for="bus_stop_check" >
        <img class="it_btn_img" src="{bus_stops}" alt="">
        <span class="it_btn_text">Bus stops</span>
    </label>
    
    <input class="it_btn_check" type="checkbox" id="bus_route_check" on:change={()=> {bus_route_check.set(!$bus_route_check)}} />
    <label class="info_toggle_btn" for="bus_route_check" >
        <img class="it_btn_img" src="{bus_routes}" alt="">
        <span class="it_btn_text">Bus routes</span>
    </label>
        
    <input class="it_btn_check" type="checkbox" id="metro_stations_check" on:change={()=> {metro_stations_check.set(!$metro_stations_check)}} />
    <label class="info_toggle_btn" for="metro_stations_check" >
        <img class="it_btn_img" src="{metro_stations}" alt="">
        <span class="it_btn_text">Metro stations</span>
    </label>

    <input class="it_btn_check" type="checkbox" id="metro_lines_check" on:change={()=> {metro_lines_check.set(!$metro_lines_check)}} />
    <label class="info_toggle_btn" for="metro_lines_check" >
        <img class="it_btn_img" src="{metro_lines}" alt="">
        <span class="it_btn_text">Metro lines</span>
    </label>

    <input class="it_btn_check" type="checkbox" id="bicycle_stations_check" on:change={()=> {bicycle_stations_check.set(!$bicycle_stations_check)}} />
    <label class="info_toggle_btn" for="bicycle_stations_check" >
        <img class="it_btn_img" src="{bicycle_stations}" alt="">
        <span class="it_btn_text">Bicycle stations</span>
    </label>

</div>

<style>
    @import "@fontsource/poppins";
    @import "@fontsource/poppins/600.css";
    :root {
        --btn_height: 2rem;
        --btn_img_height: 1.25rem;
    }
    #info_toggle_con {
    z-index: 100;
    display: flex;
    flex-direction: row;
    flex-wrap: wrap;
    margin-left: 0.25rem;
    }
.it_btn_check {
    width: 0;
    height: 0;
    opacity: 0;
    position: absolute;
}
.it_btn_check:checked + label{
    background: darkgray;
}
.info_toggle_btn {
    height: var(--btn_height);
    border: 1.5px solid darkgray;
    border-radius: 10px;
    background: lightgray;
    margin-left: 0.125rem;
    padding-inline: 0.45rem;
    user-select: none;
    cursor: pointer;
    display: flex;
    flex-direction: row;
    align-items: center;
    transform: scale(0.95);
}
.info_toggle_btn img {
    padding: 0.125rem;
    padding-left: 0.25rem;
}
.it_btn_img {
    height: var(--btn_img_height);
}
.it_btn_text {
    margin-left: 0.25rem;
    font-family: "poppins", sans-serif;
    font-weight: 650;
    font-size: 0.8rem;
    padding-right: 0.25rem;
}
</style>