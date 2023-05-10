import { writable } from "svelte/store";
import busRoutes from "$lib/geodata/bus_routes_coord.json"

export let interface_logic = writable({"bs":false,"br":false,"ms":false,"ml":false,"bis":false})

let bus_routes_toggles={};
busRoutes.features.forEach((br) => {
    let dir = br.properties.number + "_" + br.properties.direction
    // @ts-ignore
    bus_routes_toggles[dir] = false
})
export let brtogstore = writable(bus_routes_toggles)
export let sim_panel_logic = writable(false)
export let location = writable([-73.579374, 45.495724])
