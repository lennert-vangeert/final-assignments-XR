import { useGLTF } from "@react-three/drei";
import { RigidBody } from "@react-three/rapier";
import React, { useEffect } from "react";

const StreetLight = ({ positionX, positionY, positionZ, rotation, light }) => {
  const { scene } = useGLTF("/models/streetlight/streetlight.gltf");

  const clonedScene = scene.clone();

  if (!positionX || !positionY || !positionZ || !rotation) {
    positionX = 2;
    positionY = 6;
    positionZ = 2;
    rotation = 0;
  }


  useEffect(() => {
    clonedScene.traverse((child) => {
      if (child.isMesh) {
        child.castShadow = true;
        child.receiveShadow = true;
      }
    });
  }, [clonedScene]);

  return (
    <group rotation={[0, rotation, 0]}>
      <RigidBody restitution={0} friction={1} type="fixed" colliders="trimesh">

        <primitive
          object={clonedScene}
          scale={0.4}
          position={[positionX, positionY, positionZ]}
        />

      </RigidBody>
      <mesh
        position={[positionX + 7.5, positionY + 0.4, positionZ + 0.65]} 
      >
        <coneGeometry args={[1, 3, 32]} /> 
        <meshStandardMaterial
          color={"#ffd27f"}
          transparent={true}
          opacity={0.5} 
          emissive={"#ffd27f"}
          emissiveIntensity={0.2} 
        />
      </mesh>

      {light && (
        <directionalLight
          position={[positionX, positionY, positionZ]} 
          intensity={.25} 
          castShadow
          color="#ffd27f" 
          shadow-mapSize={[512, 512]} 
          target-position={[positionX, positionY - 3, positionZ]} 
        />
      )}
    </group>
  );
};

export default StreetLight;
