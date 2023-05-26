<script lang="ts">
    import GeoJSON from "$lib/MapComponents/GeoJSON.svelte";
    import LineLayer from "$lib/MapComponents/LineLayer.svelte";
    import metroLinesFile from "$lib/Geodata/metro_lines_coord.json"
    import {metro_lines_logic} from "$lib/LibStores"
    const metroLines = metroLinesFile["features"]

</script>
{#each metroLines as data}
<GeoJSON id="ml_{data["properties"]["id"]}" data={metroLines}>
    {#if $metro_lines_logic}
        <LineLayer
        layout={{ 'line-cap': 'round', 'line-join': 'round' }}
        paint={{
        'line-width': 5,
         'line-color': data["properties"]["color"],
         'line-opacity': 0.8,
        }}
    />
    {/if}
</GeoJSON>   
{/each}

