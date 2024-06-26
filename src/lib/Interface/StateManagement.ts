import { writable, type Writable, } from "svelte/store"

type Page = "Map" | "3D"
type State = "Visualisation" | "Menu" | "Simulation" | "3D" | "Emissions" | "MapSelection" | "Results" | "Viewmap"
type Result = "Overview" | "Area" |"Heatmap" | "Cluster" | "Emissions" | "Finance"

type NumericRange< START extends number, END extends number, ARR extends unknown[] = [], ACC extends number = never> = ARR['length'] extends END ? ACC | START | END: NumericRange<START, END, [...ARR, 1], ARR[START] extends undefined ? ACC : ACC | ARR['length']>


type Scenario = NumericRange<1,3>
type Em = NumericRange<1,5>

export let page:Writable<Page> = writable("Map")
export let state:Writable<State> = writable("Visualisation");
export let scenario:Writable<Scenario> = writable(1);

export let Em:Writable<Em> = writable(1);

export let selectedArea:Writable = writable([]);
export let finalArea:Writable = writable([]);

export let firstPoint:Writable = writable([]);
export let results:Writable<Result> = writable("Overview");

