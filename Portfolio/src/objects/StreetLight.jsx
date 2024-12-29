import { useGLTF } from "@react-three/drei";
import { RigidBody } from "@react-three/rapier";
import { useControls } from "leva";
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

  // const { positionX, positionY, positionZ, rotation } =
  //   useControls({
  //     positionX: { value: -6, min: -100, max: 100 },
  //     positionY: { value: 6, min: -100, max: 100 },
  //     positionZ: { value: -1, min: -100, max: 100 },
  //     rotation: { value: 4.71, min: 0, max: Math.PI * 2 },
  //   });

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
        {/* Directional Light for the streetlight */}

        {/* Primitive for the streetlight model */}
        <primitive
          object={clonedScene}
          scale={0.4}
          position={[positionX, positionY, positionZ]}
        />

        {/* Add the cartoony light cone */}
      </RigidBody>
      <mesh
        position={[positionX + 7.5, positionY + 0.4, positionZ + 0.65]} // Adjust position for the cone
      >
        <coneGeometry args={[1, 3, 32]} /> {/* Base radius, height, segments */}
        <meshStandardMaterial
          color={"#ffd27f"}
          transparent={true}
          opacity={0.5} // Semi-transparent
          emissive={"#ffd27f"}
          emissiveIntensity={0.2} // Makes it "glow"
        />
      </mesh>

      {light && (
        <directionalLight
          position={[positionX, positionY, positionZ]} // Top of the streetlight
          intensity={.25} // Adjust intensity as needed
          castShadow
          color="#ffd27f" // Warm yellow light
          shadow-mapSize={[512, 512]} // Optional: controls shadow quality
          target-position={[positionX, positionY - 3, positionZ]} // Aim downwards
        />
      )}
    </group>
  );
};

export default StreetLight;
