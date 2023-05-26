import { writable } from "svelte/store";

export let anime = writable()
export let scenario_logic= writable({1:true, 2:false,3:false})

export let s1_location = writable([-73.579374, 45.495724])
export let s2_duration = writable(5000)
export let s2_location = writable([-73.57968373905821,45.495883507521825])
export let s2_start = writable([-73.57968373905821,45.495883507521825])
export let s2_end = writable([-73.58023288007169,45.49617361020738])
