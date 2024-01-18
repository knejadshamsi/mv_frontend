import { writable } from "svelte/store";
import type { LngLatLike } from 'maplibre-gl';

export let scenario_logic= writable({1:true, 2:false,3:false})
export let location = writable<LngLatLike>([-73.579374, 45.495724])
export let speed_indicator_logic = writable(false)
export let speed_indicator = writable("normal")

export let animationduration = writable(500)
export let frames_played = writable(0)
export let frames_passed = writable(0)
export let frame_frequesncy = writable(3)

//First Sim
export let s1_duration = writable(5000)
export let coords = writable()

///Second Sim
export let s2_duration = writable(5000)
export let s2_location = writable([-73.57968373905821,45.495883507521825])
export let s2_start = writable([-73.57968373905821,45.495883507521825])
export let s2_end = writable([-73.58023288007169,45.49617361020738])



