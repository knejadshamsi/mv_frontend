<script lang="ts">
    import metroLinesFile from '$lib/Local/Geodata/metro_lines_coord.json'
    import {map} from '$lib/LibStores'
    import { onDestroy, onMount } from 'svelte'

    const metroLines = metroLinesFile["features"]
    
    onMount(() => {
    if (map) {
        map.update(map => {
            try {
                if (map.loaded()) {
                    metroLines.forEach(line => {
                        let line_id = line["properties"]["id"]
                        let layer_id = line["properties"]["id"] + "_Layer"
                        let source = map.getSource(line_id)
                        if (!source) {
                            map.addSource(line_id, { type: 'geojson', data: line })
                        }
                        map.addLayer({
                                id: layer_id,
                                source: line_id,
                                type: 'line',
                                layout: { 'line-cap': "round", 'line-join': "round" },
                                paint: { 'line-color': line["properties"]["color"], 'line-width': 8 }
                            })
                    })
                }
                //console.log('After mount:', map)
            } catch (error) {
                console.error('Error in onMount:', error);
            }
            console.log('After Mount Sources:', map.getStyle().sources);
            console.log('After Mount Layers:', map.getStyle().layers);
            return map;
        })
    }
})

onDestroy(() => {
    if (map) {
        map.update(map => {
            try {
                if (map.loaded()) {
                    metroLines.forEach(line => {
                        let layer_id = line["properties"]["id"] + "_Layer"
                        let layer = map.getLayer(layer_id)
                        if (layer) {
                            map.removeLayer(layer_id)
                        }
                    })
                }
                //console.log('After Destroy:', map)
            } catch (error) {
                console.error('Error in onDestroy:', error);
            }
            console.log('After Destroy Sources:', map.getStyle().sources);
            console.log('After Destroy Layers:', map.getStyle().layers);
            return map;
        })
    }
})


</script>
<!--{#each metroLines as data}
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
{/each}-->

