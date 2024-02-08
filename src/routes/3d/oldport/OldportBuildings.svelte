<script>
    import { Group,  Mesh,  Raycaster, Vector2  } from 'three'
    import { T, forwardEventHandlers, useTask, useThrelte } from '@threlte/core'
    import { useGltf,Edges } from '@threlte/extras'
	import { RigidBody, Collider,CollisionGroups  } from '@threlte/rapier'
	import {mesh_list} from '$lib/DDD/js/Oldport/geom_list'
    import {mesh_list_coord} from '$lib/DDD/js/Oldport/geom_list_coord'
	import {mesh_list_two} from '$lib/DDD/js/Oldport/geom_list2'
    import {mesh_list_coord_two} from '$lib/DDD/js/Oldport/geom_list_coord2'


    export const ref = new Group()

    const gltf = useGltf('/3d/oldport_via_blosm-transformed.glb', {"useDraco":true})
	const component = forwardEventHandlers()
	
</script>

<T is={ref} dispose={false} {...$$restProps} bind:this={$component}>
	{#await gltf}
	<slot name="fallback" />
	{:then gltf}			
			{#each mesh_list_two as mesh, i}
				<CollisionGroups groups={[1]}>
					<Collider shape={'cuboid'} args={[1,1,1]}/>
				</CollisionGroups>
                <T.Mesh geometry={gltf.nodes[mesh].geometry}  position={mesh_list_coord_two[i].split(',').map(Number)} userData = {{ id: mesh}}>
					<T.MeshStandardMaterial color={'#ffffff'} />
					<Edges color="black" />
				</T.Mesh>
            {/each}
			{#each mesh_list as mesh, i}
			<CollisionGroups groups={[1]}>
			<Collider shape={'cuboid'} args={[1,1,1]}/>
			</CollisionGroups>
                <T.Mesh geometry={gltf.nodes[mesh].geometry} position={mesh_list_coord[i].split(',').map(Number)} userData = {{ id: mesh}}>
					<T.MeshStandardMaterial color={'#ffffff'} />
					<Edges color="black" />
				</T.Mesh>
            {/each}
	{:catch error}
		<slot name="error" {error} />
	{/await}

	<slot {ref} />
</T>
	