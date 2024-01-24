import { writable } from 'svelte/store'

let map_obj : maplibregl.Map | null = null
export let map = writable(map_obj)

export let interface_logic = writable({"bs":false,"br":false,"ms":false,"ml":false,"bis":false})