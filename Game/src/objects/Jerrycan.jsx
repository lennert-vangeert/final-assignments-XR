import React, { useEffect } from "react";
import { useGLTF } from "@react-three/drei";
import { RigidBody } from "@react-three/rapier";

const Jerrycan = () => {
  const jerrycan = useGLTF("./models/jerrycan/scene.gltf");

  const onHit = () => {
    // dissolve the jerrycan
    console.log("hit");
  }


  return (
    <RigidBody type="fixed" colliders="cuboid" onCollisionEnter={onHit}>
      <primitive
        object={jerrycan.scene}
        scale={0.2}
        position={[-3, 0, 3]}
        rotation={[0, Math.PI * 0.25, 0]}
      />
    </RigidBody>
  );
};

export default Jerrycan;
