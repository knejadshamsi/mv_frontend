import { writable } from 'svelte/store'

let map_obj : maplibregl.Map | null = null
export let map = writable(map_obj)

export let bus_stop_check = writable(false)
export let bus_route_check = writable(false)
export let metro_stations_check = writable(false)
export let metro_lines_check = writable(false)
export let bicycle_stations_check = writable(false)

export let meshList = writable([])
export let dialog3d= writable(false)
