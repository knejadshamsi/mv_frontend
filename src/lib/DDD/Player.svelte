<script lang="ts">
  import { RigidBody as RapierRigidBody, Ray } from '@dimforge/rapier3d-compat'
  import { T, useTask, useThrelte } from '@threlte/core'
  import { RigidBody, CollisionGroups, Collider } from '@threlte/rapier'
  import { onDestroy } from 'svelte'
  import { PerspectiveCamera, Vector3, _SRGBAFormat, Raycaster, Vector2, Mesh, MeshBasicMaterial } from 'three'
  import PointerLockControls from './PointerLockControls.svelte'
  import { writable, type Writable } from 'svelte/store';
  import {meshList, dialog3d} from '$lib/LibStores'
  
  export let position: [x: number, y: number, z: number] | number[] = [0, 0, 0]

  let radius = 0.3
  let height = 1.7

  let rigidBody: RapierRigidBody
  let lock: () => void
  let cam: PerspectiveCamera
  
  let forward = 0
  let backward = 0
  let left = 0
  let right = 0

  let jumpStrength = 5;
  let nextJumpTime = 0;
  let jumpCooldown = 1;

  export let speed = 7;     
  let runSpeed = 12;
  let isRunning = false; 
  
  const t = new Vector3()
  const lockControls = () => lock()
  const { renderer } = useThrelte()
  renderer.domElement.addEventListener('click', lockControls)
  onDestroy(() => {
    renderer.domElement.removeEventListener('click', lockControls)
  })

  const addToMesh = (item:string) => {
    $meshList = [...$meshList,item]
    console.log($meshList)
  } 
  const removeMesh = (itemToRemove:string) => {
    const new_list = $meshList.filter(item => item !== itemToRemove)
    meshList.set(new_list)
  }
  const searchMesh = (item:string) => {
    return $meshList.includes(item)
  }
  
	let activeMesh: Mesh | undefined = undefined;
  let activeMeshid : Writable<string> | Writable<undefined> = writable();

  let activeMeshClone: Mesh | undefined = undefined;


  const { scene, camera } = useThrelte()
  let raycaster = new Raycaster()
	
	function checkIntersections() {
    raycaster.setFromCamera(new Vector2(0, 0), $camera)
		const intersects = raycaster.intersectObjects(scene.children)
    if (intersects[0] && intersects[0].object.userData) {
      if (Object.keys(intersects[0].object.userData).length > 0) {
        if (searchMesh($activeMeshid) === false && activeMeshClone != undefined) {
        if (activeMesh) activeMesh.visible = true
        activeMesh = intersects[0].object
        scene.remove(activeMeshClone)
        if (activeMeshClone.material) activeMeshClone.material.dispose()
        if (activeMeshClone.geometry) activeMeshClone.geometry.dispose()
        activeMeshClone = undefined
      }
      activeMesh = intersects[0].object
      activeMeshid.set(activeMesh?.userData.id)

      activeMeshClone = activeMesh.clone()
      activeMeshClone.userData = {id : $activeMeshid, cloned: true}
      activeMeshClone.material = new MeshBasicMaterial({color:0x99ff99})
      activeMesh.visible = false
      scene.add(activeMeshClone)
    }
    }
  }

  useTask(() => {
    if (!rigidBody) return
    const currentSpeed = isRunning ? runSpeed : speed;
    // get direction
    const velVec = t.fromArray([right - left, 0, backward - forward])
    // sort rotate and multiply by speed
    velVec.applyEuler(cam.rotation).multiplyScalar(currentSpeed)
    // don't override falling velocity
    const linVel = rigidBody.linvel()
    t.y = linVel.y
    // finally set the velocities and wake up the body
    rigidBody.setLinvel(t, true)
    // when body position changes update position prop for camera
    const pos = rigidBody.translation()
    position = [pos.x, pos.y, pos.z]

  })
  
  function onKeyDown(e: KeyboardEvent) {
    switch (e.key) {
      case 's':
        backward = 1
        break
      case 'w':
        forward = 1
        //console.log(searchMesh("test2"))
        break
      case 'a':
        left = 1
        break
      case 'd':
        right = 1
        break
      case ' ':
        const currentTime = performance.now() / 1000; // Current time in seconds
      if (currentTime >= nextJumpTime) { 
          nextJumpTime = currentTime + jumpCooldown;
          const currentVel = rigidBody.linvel();
          rigidBody.setLinvel(new Vector3(currentVel.x, jumpStrength, currentVel.z), true);
        }
        break
      case 'Shift':
        isRunning = true;
        break
      default:
        break
    }
     checkIntersections()
  }
  
  function onKeyUp(e: KeyboardEvent) {
    switch (e.key) {
      case 's':
        backward = 0
        break
      case 'w':
        forward = 0
        break
      case 'a':
        left = 0
        break
      case 'd':
        right = 0
        break
      case 'Shift':
        isRunning = false;
        break
      case 'e':
        dialog3d.set(true)
      default:
          break
     }
  }
  function mousedown(e) {
    switch (e.button) {
      case 0: {
        //Left button clicked
        if (searchMesh($activeMeshid) === false && $activeMeshid != undefined && $dialog3d != true) addToMesh($activeMeshid)
        break
      }
      case 1: {
        //Middle button clicked
        break
        }
      case 2: {
        //Right button clicked
        removeMesh($activeMeshid)
        if ($activeMeshid != undefined) {
          scene.traverse((object)=> {
          if(object.isMesh && object.userData.id === $activeMeshid) object.visible = true
          if(object.isMesh && object.userData.id === $activeMeshid && object.userData.cloned === true) object.parent.remove(object)
        })
        }
        
        break
        }
      default:
        console.log('Unknown button');
    }
  }
  </script>
  
  <svelte:window
    on:keydown|preventDefault={onKeyDown}
    on:keyup={onKeyUp}
    on:mousemove={checkIntersections}
    on:mousedown={mousedown}
    
  />
  
  <T.Group position.y={0.9}>
    <T.PerspectiveCamera
      makeDefault
      fov={90}
      bind:ref={cam}
      position.x={position[0]}
      position.y={position[1]}
      position.z={position[2]}
      on:create={({ ref }) => {
        ref.lookAt(new Vector3(0, 2, 0))
      }}
    >
      <PointerLockControls bind:lock />
    </T.PerspectiveCamera>
  </T.Group>
  
  <T.Group {position}>
    <RigidBody
      bind:rigidBody
      {position}
      enabledRotations={[false, false, false]}
      userData = {{ id: 'testing', type: 'it works' }}
    >
      <CollisionGroups groups={[0]}>
        <Collider
          shape={'capsule'}
          args={[height / 2 - radius, radius]}
        />
       
      </CollisionGroups>
      <CollisionGroups groups={[15]}>
        <T.Group position={[0, -height / 2 + radius, 0]}>
          <Collider
            sensor
            shape={'ball'}
            args={[radius * 1.2]}
          />
        </T.Group>
      </CollisionGroups>
    </RigidBody>
  </T.Group>
