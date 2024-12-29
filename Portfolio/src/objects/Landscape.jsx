import { useGLTF } from "@react-three/drei";
import { RigidBody } from "@react-three/rapier";
import React, { useEffect } from "react";
import { useControls } from "leva";
import StreetLight from "./StreetLight";

const Landscape = () => {
  const { posX, posY, posZ } = useControls({
    posX: { value: 11, min: -100, max: 100 },
    posY: { value: 6, min: -100, max: 100 },
    posZ: { value: 17, min: -100, max: 100 },
  });

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
    <RigidBody restitution={0} friction={1} type="fixed" colliders="trimesh">
      <primitive
        object={landscape.scene}
        scale={0.4}
        position={[posX, posY, posZ]}
        rotation={[0, Math.PI, 0]}
      />
    </RigidBody>
  );
};

export default Landscape;
