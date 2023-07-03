<script>
    import BusRoutesMenu from "$lib/Interface/BusRoutesMenu.svelte";
    import {BRVisualisation} from "$lib/Interface/Interface_stores"

</script>
<section>
   {#if $BRVisualisation} 
   <BusRoutesMenu />
   {/if}
</section>
<style>
    section {
        width: 20rem;
        margin-left: auto;
    }
</style>