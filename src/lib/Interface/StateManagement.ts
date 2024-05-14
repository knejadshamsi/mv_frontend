import { writable, type Writable } from "svelte/store"

type Page = "Map" | "3D"
type State = "Visualisation" | "Menu" | "Simulation" | "3D" | "Emissions"
type Scenario = 1 | 2 | 3
type Em = 1 | 2 | 3 | 4

export let page:Writable<Page> = writable("Map")
export let state:Writable<State> = writable("Visualisation");
export let scenario:Writable<Scenario> = writable(1);
export let Em:Writable<Scenario> = writable(1);
