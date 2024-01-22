<script lang="ts">
import busRoutes from "$lib/Geodata/bus_routes_id.json"
import {bus_routes_logic} from '$lib/LibStores'

let brtoggle = {}
bus_routes_logic.subscribe((value)=> {
    brtoggle = value
})
</script>
<div id="brmenu_con">
    <table id="br_table">
        <tbody>
        {#each busRoutes as busroute}
            <tr>
            <td><span class="br_name">{busroute.line_name}</span></td>
            {#each Object.keys(busroute.routes) as route}
                <td>
                    <input class="br_btn_check" type="checkbox" id="br_inp_{busroute.line_number}_{route}" bind:checked={brtoggle[busroute.line_number + "_" + route]} on:change={bus_routes_logic.set(brtoggle)} />
                    <label class="info_toggle_btn" for="br_inp_{busroute.line_number}_{route}" > {route}
                    </label>
                </td>
            {/each}
        </tr>
        {/each}
        </tbody>
    </table>
</div>

<style>
    @import "@fontsource/poppins";
    @import "@fontsource/poppins/900.css";
    #br_table {
        width: 100%;
        border: 1px solid darkgray;
        border-collapse: collapse;
    }
    #br_table td {
        border: 1px solid darkgray;
        padding-inline: 0.5rem;
        padding-block: 0.75rem;
        text-align: center;
    }
    #brmenu_con {
    width: 25rem;
    aspect-ratio: 1/1.5;
    border: 1.5px solid darkgray;
    border-radius: 15px;
    background: lightgray;
    user-select: none;
    overflow-y: scroll;
    overflow-x: hidden;
    user-select: none;
    z-index: 101;
    }
    .br_btn_check {
        opacity: 0;
        position: absolute
    }
    .info_toggle_btn {
        width: 100%;
        height: 1rem;
        padding: 0.5rem;
        cursor: pointer;
        font-family: "poppins" sans-serif;
	    font-weight: 900;
        font-size: 0.75rem;
    }
    .br_btn_check:checked + label{
    background: darkgray;
}
</style>