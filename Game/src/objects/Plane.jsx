import React, { useEffect, useRef } from "react";
import { useAnimations, useGLTF } from "@react-three/drei";
import { CuboidCollider, RigidBody } from "@react-three/rapier";
import { AnimationClip, Camera, Matrix4, Quaternion, Vector3 } from "three";
import { updatePlaneAxis } from "../flightControls";
import { useFrame } from "@react-three/fiber";

const x = new Vector3(1, 0, 0);
const y = new Vector3(0, 1, 0);
const z = new Vector3(0, 0, 1);
export const planePosition = new Vector3(0, 3, 7);

const delayedRotMatrix = new Matrix4();
const delayedQuaternion = new Quaternion();
const Plane = () => {
  const plane = useGLTF("./models/plane/scene.gltf");
  const pilot = useGLTF("./models/pilot/pilot.gltf");
  const smoke = useGLTF("./models/smoke/scene.gltf");

  const groupRef = useRef();
  const helixMeshRef = useRef();
  const colliderRef = useRef();

  useFrame(({ camera }) => {
    updatePlaneAxis(x, y, z, planePosition, camera);

    const rotMatrix = new Matrix4().makeBasis(x, y, z);

    const matrix = new Matrix4()
      .multiply(
        new Matrix4().makeTranslation(
          planePosition.x,
          planePosition.y,
          planePosition.z
        )
      )
      .multiply(rotMatrix);

    groupRef.current.matrixAutoUpdate = false;
    groupRef.current.matrix.copy(matrix);
    groupRef.current.matrixWorldNeedsUpdate = true;

    const quaternionA = new Quaternion().copy(delayedQuaternion);
    const quaternionB = new Quaternion().setFromRotationMatrix(rotMatrix);

    const interpolationFactor = 0.175;
    quaternionA.slerp(quaternionB, interpolationFactor);
    delayedQuaternion.copy(quaternionA);

    delayedRotMatrix.identity().makeRotationFromQuaternion(delayedQuaternion);

    // Adjust the camera position behind and above the plane
    const cameraOffset = new Vector3(0, 10, 30); // Adjust the offset for third-person view
    const cameraMatrix = new Matrix4()
      .multiply(
        new Matrix4().makeTranslation(
          planePosition.x,
          planePosition.y,
          planePosition.z
        )
      )
      .multiply(delayedRotMatrix)
      .multiply(
        new Matrix4().makeTranslation(
          cameraOffset.x,
          cameraOffset.y,
          cameraOffset.z
        )
      );

    camera.matrixAutoUpdate = false;
    camera.matrix.copy(cameraMatrix);
    camera.matrixWorldNeedsUpdate = true;

    helixMeshRef.current.rotation.z -= 1.0;
  });

  useEffect(() => {
    plane.scene.traverse((child) => {
      if (child.isMesh) {
        child.castShadow = true;
        child.receiveShadow = true;
      }
    });
    pilot.scene.traverse((child) => {
      if (child.isMesh) {
        child.castShadow = true;
        child.receiveShadow = true;
      }
    });
    smoke.scene.traverse((child) => {
      if (child.isMesh) {
        child.castShadow = true;
        child.receiveShadow = true;
      }
    });
  }, [plane, pilot, smoke]);
  const planeAnimations = useAnimations(plane.animations, plane.scene);
  const smokeAnimations = useAnimations(smoke.animations, smoke.scene);
  const animationspeed = 1;
  useEffect(() => {
    const singleTrack = planeAnimations.actions.Animation._clip.tracks[1];

    const singleTrackClip = new AnimationClip("SingleTrackAnimation", -1, [
      singleTrack,
    ]);

    const singleTrackAction = planeAnimations.mixer.clipAction(singleTrackClip);
    planeAnimations.mixer.timeScale = animationspeed;
    singleTrackAction.play();

    smokeAnimations.actions["Default Take"].play();
  }, [animationspeed]);

  return (
    <>
      {/* <RigidBody type="fixed" position={[0, 0, 0]} colliders="cuboid"> */}
        <group ref={groupRef} scale={0.5} position={[0, -1.5, 0]}>
          {/* camera */}
          <group ref={helixMeshRef}></group>
          <primitive
            object={plane.scene}
            scale={1}
            position={[0, 2, 0]}
            rotation={[0, Math.PI, 0]}
          />

          <primitive
            object={pilot.scene}
            scale={0.3}
            position={[0, 2.2, .6]}
            rotation={[Math.PI * -0.1, Math.PI, 0]}
          />

          <primitive
            object={smoke.scene}
            rotation={[Math.PI * -0.2, Math.PI, 0]}
            scale={3.5}
            position={[0, 4, -2]}
          />
          {/* headlights */}
        </group>
        <CuboidCollider ref={colliderRef} position={[0, 4, 2]} args={[5, 2, 5]}/>
      {/* </RigidBody> */}
    </>
  );
};

export default Plane;
