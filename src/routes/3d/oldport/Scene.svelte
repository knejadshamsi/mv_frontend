<script lang="ts">
import { T,useTask } from '@threlte/core'
import { interactivity ,ContactShadows, Grid, Float, Sky } from '@threlte/extras'
import { BoxGeometry, Mesh, MeshStandardMaterial, Vector3 } from 'three'
import { AutoColliders, CollisionGroups  } from '@threlte/rapier'
import { spring } from 'svelte/motion'
import Player from './Player.svelte'
//import Ground from './Ground.svelte'
import Groundv2 from './Groundv2.svelte'
import DDDBuildings from './DDDBuildings.svelte'
import New_buildings from './New_buildings.svelte'
import New_buildings2 from './New_buildings2.svelte'
import { Environment } from '@threlte/extras'

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

<Sky turbidity={0} elevation={40} rayleigh={0.07} />
<Environment path="/hdr/" files="kloofendal_43d_clear_puresky_1k.hdr" />
<!-- <T.PerspectiveCamera position={[2, 2, 2]} on:create={({ ref }) => {ref.lookAt(0, 0, -1)}} /> -->
<T.DirectionalLight intensity={0.8} position.x={5} position.y={10} />
<T.AmbientLight intensity={0.3} />
<Grid position.y={-0.001} cellColor="#ffffff" sectionColor="#ffffff" sectionThickness={0} fadeDistance={25} cellSize={2} />
<ContactShadows scale={10} blur={2} far={2.5} opacity={0.5} />
<Float floatIntensity={1} floatingRange={[0, 1]} >
    <T.Mesh position.y={1.2} position.z={-0.75}>
        <T.BoxGeometry />
        <T.MeshStandardMaterial color="#0059BA" />
    </T.Mesh>
</Float>

<CollisionGroups groups={[0]}>
    <!-- <Ground /> -->
    <Groundv2 />
</CollisionGroups>

<CollisionGroups groups={[2]}>
  <!-- <DDDBuildings position={[0, -35, 0]}/> -->
  <!-- <New_buildings /> -->
  <New_buildings2 />
</CollisionGroups>
  
<CollisionGroups groups={[3]}>
    <Player
      bind:playerMesh
      position={[1, 10, 3]}
    />
</CollisionGroups>