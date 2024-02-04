<script>
    import { Group } from 'three'
    import { T, forwardEventHandlers } from '@threlte/core'
    import { useGltf,Edges } from '@threlte/extras'
	import { AutoColliders } from '@threlte/rapier'
	import {mesh_list} from '$lib/DDD/js/Oldport/geom_list'
    import {mesh_list_coord} from '$lib/DDD/js/Oldport/geom_list_coord'
	import {mesh_list_two} from '$lib/DDD/js/Oldport/geom_list2'
    import {mesh_list_coord_two} from '$lib/DDD/js/Oldport/geom_list_coord2'
	import { writable } from 'svelte/store';

    export const ref = new Group()

    const gltf = useGltf('/3d/oldport_via_blosm-transformed.glb', {"useDraco":true})
	const component = forwardEventHandlers()

	export const activeMesh = writable("none")

	function enterMesh(meshId) {
  		activeMesh.set(meshId)
		console.log("fired")
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
			{#each mesh_list_two as mesh, i}
                <T.Mesh geometry={gltf.nodes[mesh].geometry} 
				position={mesh_list_coord_two[i].split(',').map(Number)}
                    on:pointerenter={() => enterMesh(mesh)} 
                    on:pointerleave={() => leaveMesh()}>
					<T.MeshStandardMaterial color={$activeMesh === mesh ? '#ff0000' : '#fff'} />
					<Edges color="black" />
				</T.Mesh>
            {/each}
			{#each mesh_list as mesh, i}
                <T.Mesh geometry={gltf.nodes[mesh].geometry} 
				position={mesh_list_coord[i].split(',').map(Number)}
                    on:pointerenter={() => enterMesh(mesh)} 
                    on:pointerleave={() => leaveMesh()}>
					<T.MeshStandardMaterial color={$activeMesh === mesh ? '#99ff99' : '#ffffff'} />
					<Edges color="black" />
				</T.Mesh>
            {/each}
			
			<!-- <T.Mesh geometry={gltf.nodes[mesh_list_two[0]].geometry} 
				position={mesh_list_coord_two[0].split(',').map(Number)}
                    on:pointerenter={() => enterMesh(mesh)} 
                    on:pointerleave={() => leaveMesh()}>
					<T.MeshStandardMaterial color={$activeMesh === mesh ? '#99ff99' : '#ffffff'} />
				</T.Mesh> -->
			<!-- <T.Mesh geometry={gltf.nodes[mesh_list[100]].geometry} 
					position={gpt}
                    on:pointerenter={() => enterMesh(mesh_list[10])} 
                    on:pointerleave={() => leaveMesh()}>
					<T.MeshStandardMaterial color={$activeMesh === mesh_list[0] ? '#99ff99' : '#ffffff'} />
				</T.Mesh> -->
		</AutoColliders>
	{:catch error}
		<slot name="error" {error} />
	{/await}

	<slot {ref} />
</T>
	