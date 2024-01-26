import { writable, type Writable } from "svelte/store"

type State = "Visualisation" | "Menu" | "Simulation" | "3D"
type Scenario = 1 | 2 | 3

export let state:Writable<State> = writable("Visualisation");
export let scenario:Writable<Scenario> = writable(1);
