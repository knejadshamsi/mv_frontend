<script lang="ts">
    import {Marker} from 'svelte-maplibre'
    import oldport from '$lib/Images/stickers/DALL_E_OLD_PORT.png'
    import {map} from '$lib/LibStores'

    function oldporttransitions() {
        if ($map) {
        $map.flyTo({center:[-73.55571682768839,45.504432623184556],zoom:15.5})
        }
        console.log("works! lol")
    }
</script>


<Marker lngLat={[-73.55571682768839,45.504432623184556]} class="dddmarker" on:click={oldporttransitions}>
    <img src={oldport} alt="old port" />
</Marker>

<style>
.dddmarker img {
    width: 1rem;
}
</style>