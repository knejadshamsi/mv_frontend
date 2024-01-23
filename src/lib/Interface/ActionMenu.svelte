<script lang="ts">
    import SimulationPanel from "$lib/Simulation/SimulationPanel.svelte";
    import {state} from "$lib/Interface/StateManagement"
</script>

{#if $state==="Simulation"}
<SimulationPanel />
{/if}