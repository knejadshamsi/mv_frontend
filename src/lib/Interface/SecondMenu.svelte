<script>
    import BusRoutesMenu from '$lib/Local/Visualisation/BusRoutesMenu.svelte'
    import {BRVisualisation} from '$lib/Interface/Interface_stores'

</script>
<section>
   {#if $BRVisualisation} 
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