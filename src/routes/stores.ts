import { writable } from "svelte/store";
import busRoutes from "$lib/Geodata/bus_routes_coord.json"
import metroLines from "$lib/Geodata/metro_lines_coord.json"
import type {BooleanObject} from "$lib/CustomTypes"

export let interface_logic = writable({"bs":false,"br":false,"ms":false,"ml":false,"bis":false})
let bus_routes_toggles: BooleanObject = {};
busRoutes["features"].forEach((br) => {
    let dir: string= `${br["properties"]["number"]}_${br["properties"]["direction"]}`
    bus_routes_toggles[dir] = false
})
let metro_line_toggles: BooleanObject = {};
metroLines["features"].forEach((ml)=> {let line = ml["properties"]["id"];metro_line_toggles[line]=false})
export let brtogstore = writable(bus_routes_toggles)
export let mltogstore = writable(false)
export let sim_panel_logic = writable(false)
