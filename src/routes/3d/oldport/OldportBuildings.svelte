<script>
    import { Group,  Raycaster, Vector2  } from 'three'
    import { T, forwardEventHandlers, useTask, useThrelte } from '@threlte/core'
    import { useGltf,Edges } from '@threlte/extras'
	import { RigidBody, Collider,CollisionGroups  } from '@threlte/rapier'
	import {mesh_list} from '$lib/DDD/js/Oldport/geom_list'
    import {mesh_list_coord} from '$lib/DDD/js/Oldport/geom_list_coord'
	import {mesh_list_two} from '$lib/DDD/js/Oldport/geom_list2'
    import {mesh_list_coord_two} from '$lib/DDD/js/Oldport/geom_list_coord2'
	import { writable } from 'svelte/store';
    import { onMount } from 'svelte';

    export const ref = new Group()

    const gltf = useGltf('/3d/oldport_via_blosm-transformed.glb', {"useDraco":true})
	const component = forwardEventHandlers()

	let activeMesh = writable("none");
	const { scene, camera } = useThrelte()
	const raycaster = new Raycaster();
    const pointer = new Vector2(0, 0);
	raycaster.setFromCamera(pointer, $camera);
	let frame = 0
    const interval = 30

	useTask(() => {
      	frame++
      	if (frame === interval) {
        const intersects = raycaster.intersectObjects( scene.children );
		let el = intersects[0]["object"]["userData"]["id"]
        activeMesh.set(el)
        frame = 0
      }
	  //console.log($activeMesh)
	})
	
</script>

<T is={ref} dispose={false} {...$$restProps} bind:this={$component}>
	{#await gltf}
	<slot name="fallback" />
	{:then gltf}			
			{#each mesh_list_two as mesh, i}
			<RigidBody userData = {{ id: mesh}} >
				<CollisionGroups groups={[1]}>
					<Collider shape={'cuboid'} args={[10, 10, 10]}/>
				</CollisionGroups>
                <T.Mesh geometry={gltf.nodes[mesh].geometry}  position={mesh_list_coord_two[i].split(',').map(Number)} userData = {{ id: mesh}}>
					{#key activeMesh}
					<T.MeshStandardMaterial color={$activeMesh === mesh ? '#99ff99' : '#ffffff'} />
					{/key}
					<Edges color="black" />
				</T.Mesh>
			</RigidBody>
            {/each}
			{#each mesh_list as mesh, i}
			<RigidBody 
			userData = {{ id: mesh}}
			>
			<CollisionGroups groups={[1]}>
			<Collider shape={'cuboid'} args={[10, 10, 10]}/>
			</CollisionGroups>
                <T.Mesh geometry={gltf.nodes[mesh].geometry} position={mesh_list_coord[i].split(',').map(Number)} userData = {{ id: mesh}}>
					{#key activeMesh}
					<T.MeshStandardMaterial color={$activeMesh === mesh ? '#99ff99' : '#ffffff'} />
					{/key}
					<Edges color="black" />
				</T.Mesh>
			</RigidBody>
            {/each}
	{:catch error}
		<slot name="error" {error} />
	{/await}

	<slot {ref} />
</T>
	