<script>
    import { Group } from 'three'
    import { T, forwardEventHandlers } from '@threlte/core'
    import { useGltf } from '@threlte/extras'
	import { AutoColliders } from '@threlte/rapier'
	import {mesh_list} from './geom_list'
	import { writable } from 'svelte/store';

    export const ref = new Group()

    const gltf = useGltf('/3d/new_buildings-transformed.glb', {"useDraco":true})
	const component = forwardEventHandlers()

	export const activeMesh = writable("none")

	function enterMesh(meshId) {
  		activeMesh.set(meshId)
	}
	function leaveMesh() {
		activeMesh.set("none")
	}
</script>

<T is={ref} dispose={false} {...$$restProps} bind:this={$component}>
	{#await gltf}
	<slot name="fallback" />
	{:then gltf}
		<AutoColliders shape={'cuboid'}>
			<T.Mesh geometry={gltf.nodes.map_6osm_buildings_1.geometry} material={gltf.materials.wall} />
            <T.Mesh geometry={gltf.nodes.map_6osm_buildings_2.geometry} material={gltf.materials.roof} />
            <T.Mesh geometry={gltf.nodes.map_6osm_buildings_3.geometry} material={gltf.materials.d3d3d3} />
            <T.Mesh geometry={gltf.nodes.map_6osm_buildings_4.geometry} material={gltf.materials.grey} />
            <T.Mesh geometry={gltf.nodes.map_6osm_buildings_5.geometry} material={gltf.materials['708090']} />
            <T.Mesh geometry={gltf.nodes.map_6osm_buildings_6.geometry} material={gltf.materials.brown} />
            <T.Mesh geometry={gltf.nodes.map_6osm_buildings_7.geometry} material={gltf.materials.beige} />
		</AutoColliders>
	{:catch error}
		<slot name="error" {error} />
	{/await}

	<slot {ref} />
</T>
	