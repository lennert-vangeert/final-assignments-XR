import React, { useEffect, useRef } from "react";
import {
  Float,
  PresentationControls,
  useAnimations,
  useGLTF,
} from "@react-three/drei";
import { AnimationClip } from "three";
import { useFrame } from "@react-three/fiber";

const MenuPlane = () => {
  const plane = useGLTF("./models/plane/scene.gltf");
  const pilot = useGLTF("./models/pilot/pilot.gltf");
  const smoke = useGLTF("./models/smoke/scene.gltf");

  const planeRef = useRef();

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

  const bobbingSpeed = 0.5;
  const bobbingHeight = 0.2;
  const rotationSpeed = 0.1;

  useFrame(({ clock }) => {
    if (planeRef.current) {
      const elapsedTime = clock.getElapsedTime();

      planeRef.current.position.y =
        113 + Math.sin(elapsedTime * bobbingSpeed) * bobbingHeight;

      planeRef.current.rotation.z =
        Math.sin(elapsedTime * rotationSpeed) * 0.05;
      planeRef.current.rotation.x =
        Math.cos(elapsedTime * rotationSpeed) * 0.02;
    }
  });

  return (
      <group
        ref={planeRef}
        scale={0.5}
        rotation={[0, Math.PI * 0.65, Math.PI * -0.05]}
        position={[-198, 113, 265]}
      >
        <primitive
          object={plane.scene}
          scale={1}
          position={[0, 2, 0]}
          rotation={[0, Math.PI, 0]}
        />

        <primitive
          object={pilot.scene}
          scale={0.3}
          position={[0, 2, 1]}
          rotation={[Math.PI * 0.1, Math.PI, 0]}
        />

        <primitive
          object={smoke.scene}
          rotation={[Math.PI * 0.2, Math.PI, 0]}
          scale={3.5}
          position={[0, 4, -2]}
        />
      </group>
  );
};

export default MenuPlane;
