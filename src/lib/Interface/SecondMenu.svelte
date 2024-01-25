<script>
    import BusRoutesMenu from '$lib/Local/Visualisation/BusRoutesMenu.svelte'
    import {bus_route_check} from '$lib/LibStores'

</script>
<section>
   {#if $bus_route_check} 
   <BusRoutesMenu />
   {/if}
</section>
<style>
    section {
        position: absolute;
        top: 0.5rem;
        right: 0.5rem;
        z-index: 100;
        overflow: hidden;
    }
</style>