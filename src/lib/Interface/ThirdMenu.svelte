<script lang="ts">
    import SimulationPanel from "$lib/Simulation/SimulationPanel.svelte";
    import {sim_panel_logic} from "./Interface_stores"
</script>

{#if $sim_panel_logic}
<SimulationPanel />
{/if}