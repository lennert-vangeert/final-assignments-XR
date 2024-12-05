import React, { useEffect } from "react";
import { useGLTF } from "@react-three/drei";
import {RigidBody } from "@react-three/rapier";

const Landscape = () => {
  const landscape = useGLTF("./models/landscape/landscape.gltf");
  useEffect(() => {
    landscape.scene.traverse((child) => {
      if (child.isMesh) {
        child.castShadow = true;
        child.receiveShadow = true;
      }
    });
  }, []);

  const onCollission = () => {
    console.log("plane crashed");
  }

  return (
    <>
      <RigidBody onCollisionEnter={onCollission} type="fixed" colliders="trimesh">
        <primitive
          object={landscape.scene}
          scale={100}
          position={[0, -70, 0]}
        />
      </RigidBody>
    </>
  );
};

export default Landscape;
