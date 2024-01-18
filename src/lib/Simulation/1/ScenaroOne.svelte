<script lang="ts">
import Marker from "$lib/MapComponents/Marker.svelte";
import {location} from '$lib/Simulation/sim_store'
import {coords, frames_played, frames_passed, frame_frequesncy,animationduration} from '$lib/Simulation/sim_store'
import Route from "$lib/Geodata/route_output.json"
import {scenario} from "$lib/Interface/StateManagement"

$: if ($scenario === 1) {
    frames_played.set(0)
    frames_passed.set(0)
    frame_frequesncy.set(3)
    animationduration.set(5000)
    location.set([-73.579374, 45.495724])
    coords.set(Route["features"][0]["geometry"]["coordinates"])
}

</script>

<Marker lngLat={$location} class="umo">
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"><path d="M12 0c-6.627 0-12 5.373-12 12s5.373 12 12 12 12-5.373 12-12-5.373-12-12-12zm0 18.25c-.69 0-1.25-.56-1.25-1.25s.56-1.25 1.25-1.25c.691 0 1.25.56 1.25 1.25s-.559 1.25-1.25 1.25zm1.961-5.928c-.904.975-.947 1.514-.935 2.178h-2.005c-.007-1.475.02-2.125 1.431-3.468.573-.544 1.025-.975.962-1.821-.058-.805-.73-1.226-1.365-1.226-.709 0-1.538.527-1.538 2.013h-2.01c0-2.4 1.409-3.95 3.59-3.95 1.036 0 1.942.339 2.55.955.57.578.865 1.372.854 2.298-.016 1.383-.857 2.291-1.534 3.021z"/></svg>  
</Marker>
