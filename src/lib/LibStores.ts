import { writable } from 'svelte/store'

let map_obj : maplibregl.Map | null = null
export let map = writable(map_obj)

// let toggles = ['bs','br','ms','ml','bis']
// export let interface_logic = writable(toggles.map(toggle => ({ name: toggle, value: writable(false)})));

export let bus_stop_check = writable(false)
export let bus_route_check = writable(false)
export let metro_stations_check = writable(false)
export let metro_lines_check = writable(false)
export let bicycle_stations_check = writable(false)