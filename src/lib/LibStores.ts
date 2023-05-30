import { writable } from "svelte/store";
import busRoutes from "$lib/Geodata/bus_routes_coord.json"
import type {BooleanObject} from "$lib/CustomTypes"

let map_obj : maplibregl.Map | null = null
export let map = writable(map_obj)

let bus_routes_toggles : BooleanObject = {}

busRoutes["features"].forEach((br) => {
    let dir: string= `${br["properties"]["number"]}_${br["properties"]["direction"]}`
    bus_routes_toggles[dir] = false
})

export let bus_routes_logic = writable(bus_routes_toggles)
export let metro_lines_logic = writable(false)
