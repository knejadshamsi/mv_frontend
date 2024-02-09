<script lang="ts">
    import { RigidBody as RapierRigidBody, Ray } from '@dimforge/rapier3d-compat'
    import { T, useTask, useThrelte } from '@threlte/core'
    import { RigidBody, CollisionGroups, Collider,useRapier, useRigidBody  } from '@threlte/rapier'
    import { onDestroy } from 'svelte'
    import { PerspectiveCamera, Vector3, _SRGBAFormat, Raycaster, Vector2, Mesh, EdgesGeometry, LineSegments, LineBasicMaterial, Material, MeshBasicMaterial, BackSide  } from 'three'
    import PointerLockControls from './PointerLockControls.svelte'
    import { writable, type Writable } from 'svelte/store';
  
    export let position: [x: number, y: number, z: number] | number[] = [0, 0, 0]
    //let colposition: {x: number, y: number, z: number} = {x:0, y:0, z:0}

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

    let framecount = 0;
    let frameinterval = 20
  
    const t = new Vector3()
  
    const lockControls = () => lock()
  
    const { renderer } = useThrelte()
  
    renderer.domElement.addEventListener('click', lockControls)
  
    onDestroy(() => {
      renderer.domElement.removeEventListener('click', lockControls)
    })



  let activeMeshid : Writable<string> | Writable<undefined> = writable("none");
	let activeMesh: Mesh | undefined = undefined;
  let activeMeshClone: Mesh | undefined = undefined;
  const { scene, camera } = useThrelte()
  let raycaster = new Raycaster()
	
	function checkIntersections() {
		raycaster.setFromCamera(new Vector2(0, 0), $camera)
		const intersects = raycaster.intersectObjects( scene.children )

    if (activeMeshClone !== undefined)  {
      scene.remove(activeMeshClone)
      if (activeMesh) activeMesh.visible = true
      if (activeMeshClone.material) activeMeshClone.material.dispose()
      if (activeMeshClone.geometry) activeMeshClone.geometry.dispose()
      activeMeshClone = undefined
    }

		if(intersects.length > 0) {
    		activeMesh = intersects[0].object;
        if (activeMesh && activeMesh.userData && Object.keys(activeMesh.userData).length > 0) {
            activeMeshClone = activeMesh.clone()
            if (activeMeshClone) {
              activeMeshClone.material = new MeshBasicMaterial({color:0x99ff99})
              if (activeMesh) activeMesh.visible = false
              scene.add(activeMeshClone)
            }
				    let el = intersects[0]["object"]["userData"]["id"]
				    activeMeshid.set(el)
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
        default:
          break
      }
    }

  </script>
  
  <svelte:window
    on:keydown|preventDefault={onKeyDown}
    on:keyup={onKeyUp}
    on:mousemove={checkIntersections}
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
