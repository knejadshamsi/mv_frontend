<script>
    import { Group } from 'three'
    import { T, forwardEventHandlers } from '@threlte/core'
    import { useGltf } from '@threlte/extras'
	import { AutoColliders } from '@threlte/rapier'
	import {mesh_list} from './geom_list'
	import { writable } from 'svelte/store';

    export const ref = new Group()

    const gltf = useGltf('/3d/Buildings-transformed.glb', {"useDraco":true})
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
			{#each mesh_list as mesh}
                <T.Mesh geometry={gltf.nodes[mesh].geometry} on:pointerenter={() => enterMesh(mesh)} on:pointerleave={() => leaveMesh()}>
					<T.MeshStandardMaterial color={$activeMesh === mesh ? '#99ff99' : '#ffffff'} />
				</T.Mesh>
            {/each}
		</AutoColliders>
	{:catch error}
		<slot name="error" {error} />
	{/await}

	<slot {ref} />
</T>
	