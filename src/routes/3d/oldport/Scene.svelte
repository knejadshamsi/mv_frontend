<script lang="ts">
import { T,useTask } from '@threlte/core'
import { interactivity, Float, Sky } from '@threlte/extras'
import { BoxGeometry, Mesh, MeshStandardMaterial, Vector3 } from 'three'
import {  CollisionGroups  } from '@threlte/rapier'
import { spring } from 'svelte/motion'
import Player from '$lib/DDD/Player.svelte'
import OldportGround from './OldportGround.svelte'
import OldportBuildings from './OldportBuildings.svelte'
import OldportRoads from './OldportRoads.svelte'

let playerMesh: Mesh
  let positionHasBeenSet = false
  const smoothPlayerPosX = spring(0)
  const smoothPlayerPosZ = spring(0)
  const t3 = new Vector3()

  useTask(() => {
    if (!playerMesh) return
    playerMesh.getWorldPosition(t3)
    smoothPlayerPosX.set(t3.x, {
      hard: !positionHasBeenSet
    })
    smoothPlayerPosZ.set(t3.z, {
      hard: !positionHasBeenSet
    })
    if (!positionHasBeenSet) positionHasBeenSet = true
  })
  interactivity()
  
</script>

<Sky turbidity={0.65} elevation={85} rayleigh={0.17} />
<T.AmbientLight intensity={0.3} /> 
<Float floatIntensity={1} floatingRange={[0, 1]} >
    <T.Mesh position.y={1.2} position.z={-0.75}>
        <T.BoxGeometry />
        <T.MeshStandardMaterial color="#0059BA" />
    </T.Mesh>
</Float>

<CollisionGroups groups={[0]}>
    <OldportGround />
</CollisionGroups>

<CollisionGroups groups={[2]}>
  <OldportBuildings />
  <OldportRoads />
</CollisionGroups>
  
<CollisionGroups groups={[3]}>
    <Player
      bind:playerMesh
      position={[1, 10, 3]}
    />
</CollisionGroups>