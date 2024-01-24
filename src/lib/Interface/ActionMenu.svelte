<script lang="ts">
    import SimPanel from '$lib/Simulation/SimPanel.svelte'
    import {state} from '$lib/Interface/StateManagement'
</script>

{#if $state==="Simulation"}
<SimPanel />
{/if}