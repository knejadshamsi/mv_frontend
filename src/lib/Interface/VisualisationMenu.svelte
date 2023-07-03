<script>
    import bus_stops from "$lib/images/bus_stops.svg"
    import bus_routes from "$lib/images/bus_routes.svg"
    import metro_stations from "$lib/images/metro_stations.svg"
    import metro_lines from "$lib/images/metro_lines.svg"
    import bicycle_stations from "$lib/images/bicycle_stations.svg"
    import {BRVisualisation} from "$lib/Interface/Interface_stores"
    import {interface_logic} from '../../routes/stores'
    import {metro_lines_logic} from '$lib/LibStores'
    import { fly } from 'svelte/transition';

    let toggles = {"bs":false,"br":false,"ms": false,"ml": false,"bis":false}
 
</script>

<div id="info_toggle_con" in:fly={{duration:150}}>
    <input class="it_btn_check" id="bus_stop_check" type="checkbox" bind:checked={toggles.bs} on:change={()=> {interface_logic.set(toggles)}} />
    <label class="info_toggle_btn" for="bus_stop_check" >
        <img class="it_btn_img" src="{bus_stops}" alt="">
        <span class="it_btn_text">Bus stops</span>
    </label>
    
    <input class="it_btn_check" type="checkbox" id="bus_route_check" bind:checked={toggles.br} on:change={()=> {BRVisualisation.set(toggles.br)}} />
    <label class="info_toggle_btn" for="bus_route_check" >
        <img class="it_btn_img" src="{bus_routes}" alt="">
        <span class="it_btn_text">Bus routes</span>
    </label>
        
    <input class="it_btn_check" type="checkbox" id="metro_stations_check" bind:checked={toggles.ms} on:change={()=> {interface_logic.set(toggles)}} />
    <label class="info_toggle_btn" for="metro_stations_check" >
        <img class="it_btn_img" src="{metro_stations}" alt="">
        <span class="it_btn_text">Metro stations</span>
    </label>

    <input class="it_btn_check" type="checkbox" id="metro_lines_check" bind:checked={toggles.ml} on:change={()=> {metro_lines_logic.set(toggles.ml)}} />
    <label class="info_toggle_btn" for="metro_lines_check" >
        <img class="it_btn_img" src="{metro_lines}" alt="">
        <span class="it_btn_text">Metro Lines</span>
    </label>

    <input class="it_btn_check" type="checkbox" id="bicycle_stations_check" bind:checked={toggles.bis} on:change={()=> {interface_logic.set(toggles)}} />
    <label class="info_toggle_btn" for="bicycle_stations_check" >
        <img class="it_btn_img" src="{bicycle_stations}" alt="">
        <span class="it_btn_text">Bicycle stations</span>
    </label>

</div>

<style>
    @import "@fontsource/poppins";
    @import "@fontsource/poppins/600.css";
    :root {
        --btn_height: 2.25rem;
        --btn_img_height: 1.5rem;
    }
#info_toggle_con {
    z-index: 100;
    display: flex;
    flex-direction: row;
    flex-wrap: wrap;
    margin-top: 0.5rem;
}
.it_btn_check {
    opacity: 0;
    position: absolute;
}
.it_btn_check:checked + label{
    background: darkgray;
}
.info_toggle_btn {
    height: var(--btn_height);
    border: 1.5px solid darkgray;
    border-radius: 20px;
    background: lightgray;
    margin-inline: 0.125rem;
    margin-block: 0.5rem;
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
    font-weight: 600;
    font-size: 1rem;
    padding-right: 0.25rem;
}
</style>