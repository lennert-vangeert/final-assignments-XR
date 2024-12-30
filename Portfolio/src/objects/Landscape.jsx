import { useGLTF } from "@react-three/drei";
import { RigidBody } from "@react-three/rapier";
import React, { useEffect } from "react";

const Landscape = () => {
  const landscape = useGLTF("/models/landscape/portfolio-new-compressed.gltf");
  useEffect(() => {
    landscape.scene.traverse((child) => {
      if (child.isMesh) {
        child.castShadow = true;
        child.receiveShadow = true;
      }
    });
  }, []);
  return (
    <RigidBody restitution={0} friction={1} type="fixed" colliders="trimesh">
      <primitive
        object={landscape.scene}
        scale={0.4}
        position={[11, 6, 17]}
        rotation={[0, Math.PI, 0]}
      />
    </RigidBody>
  );
};

export default Landscape;
