import { writable } from "svelte/store";
import busRoutes from "$lib/Geodata/bus_routes_coord.json"
import type {BooleanObject} from "$lib/CustomTypes"

let bus_routes_toggles : BooleanObject = {}

busRoutes["features"].forEach((br) => {
    let dir: string= `${br["properties"]["number"]}_${br["properties"]["direction"]}`
    bus_routes_toggles[dir] = false
})

export let bus_routes_logic = writable(bus_routes_toggles)
export let metro_lines_logic = writable(false)
export let umo = writable([-73.579374, 45.495724])