<script lang="ts">
    import SimulationPanel from "$lib/Simulation/SimulationPanel.svelte";
    import {state} from "$lib/Interface/StateManagement"
    import {sim_panel_logic} from "./Interface_stores"
</script>

{#if $state==="Simulation"}
<SimulationPanel />
{/if}