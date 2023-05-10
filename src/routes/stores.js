import { writable } from "svelte/store";
import busRoutes from "$lib/geodata/bus_routes_coord.json"

let interface_toggles = {
    "bs":false,
    "br":false,
    "ms":false,
    "ml":false,
    "bis":false
}

export let interface_logic = writable(interface_toggles)


let brtogc = {}
busRoutes.features.forEach((br) => {
    let option = br.properties.number + "_" + br.properties.direction
    // @ts-ignore
    brtogc[option] = false
})
export let brtogstore = writable(brtogc)
 
export let movesim = writable(false)
