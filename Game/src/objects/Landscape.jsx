import React, { useEffect } from "react";
import { useGLTF } from "@react-three/drei";
import { RigidBody } from "@react-three/rapier";
import useGame from "../stores/useGame";
import { updatePlaneAxis } from "../flightControls";

const Landscape = () => {
  const end = useGame((state) => state.end);
  const phase = useGame((state) => state.phase);
  const failed = useGame((state) => state.failed);

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
    if (phase === "playing") {
      failed();
    }
    updatePlaneAxis(reset=== true);
  };

  return (
    <>
      <RigidBody
        onCollisionEnter={onCollission}
        type="dynamic"
        colliders="trimesh"
        gravityScale={0}
      >
        <primitive
          object={landscape.scene}
          scale={100}
          position={[0, -80, -250]}
        />
      </RigidBody>
    </>
  );
};

export default Landscape;
