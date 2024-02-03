<script lang="ts">
    import {Marker} from 'svelte-maplibre'
    import oldport from '$lib/Images/stickers/DALL_E_OLD_PORT.png'
    import {map} from '$lib/LibStores'
    import {page} from '$lib/Interface/StateManagement'

    function oldporttransitions() {
        if ($map) {
        $map.flyTo({center:[-73.55571682768839,45.504432623184556],zoom:15.5})
        }
        console.log("works! lol")
        page.set("3D")
    }
</script>


<Marker lngLat={[-73.55571682768839,45.504432623184556]} class="dddmarker" on:click={oldporttransitions}>
    <a href="/3d/oldport"><img id="logo-test" src={oldport} alt="old port" /></a>
</Marker>

<style>
#logo-test {
    width: 6rem;
    view-transition-name: img;
}
</style>