import { useAnimations, useGLTF } from "@react-three/drei";
import { RigidBody } from "@react-three/rapier";
import React, { useEffect } from "react";

const Windmill = () => {
  const windmill = useGLTF("/models/windmill/scene.gltf");
  const windmillAnimations = useAnimations(windmill.animations, windmill.scene);
  useEffect(() => {
    windmill.scene.traverse((child) => {
      if (child.isMesh) {
        child.castShadow = true;
        child.receiveShadow = true;
      }
    });
  }, []);

  useEffect(() => {
    if (windmillAnimations.actions.Windmill_animation) {
      windmillAnimations.actions.Windmill_animation.play();
    }
  }, []);

  return (
    <RigidBody type="fixed" colliders="trimesh">
      <primitive
        object={windmill.scene}
        rotation={[0, Math.PI, 0]}
        scale={7}
        position={[22, 9.5, -16]}
      />
    </RigidBody>
  );
};

export default Windmill;
