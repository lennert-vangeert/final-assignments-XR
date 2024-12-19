import { useGLTF } from "@react-three/drei";
import { RigidBody } from "@react-three/rapier";
import React, { useEffect } from "react";

const Landscape = () => {
  const landscape = useGLTF("/models/landscape/portfolio-new.gltf");
  useEffect(() => {
    landscape.scene.traverse((child) => {
      if (child.isMesh) {
        child.castShadow = true;
        child.receiveShadow = true;
      }
    });
  }, []);
  return (
    <RigidBody friction={1} type="fixed" colliders="trimesh">
      <primitive object={landscape.scene} scale={.5} position={[0, 0, 0]} />
    </RigidBody>
  );
};

export default Landscape;
