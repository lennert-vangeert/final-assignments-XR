import { RigidBody } from "@react-three/rapier";
import { useControls } from "leva";
import React from "react";
import useWorld from "../hooks/useWorld";

const Poi = ({ positionX, positionY, positionZ, command }) => {
  const setMenuPhase = useWorld((state) => state.setMenuPhase);
  const audio = new Audio("/audio/turnon.mp3");


  const onCollisionEnter = () => {
    setMenuPhase(command);
    audio.currentTime = 0;
    audio.volume = 0.5;
    audio.play();
  };

  return (
    <RigidBody
      onCollisionEnter={onCollisionEnter}
      type="fixed"
      colliders="hull"
      position={[positionX, positionY, positionZ]}
    >
      <mesh>
        <cylinderGeometry args={[0.35, 0.35, 0.25]} />
        <meshStandardMaterial
          color={"red"}
          transparent={true}
          opacity={0.5}
          emissive={"red"}
          emissiveIntensity={1}
        />
      </mesh>
    </RigidBody>
  );
};

export default Poi;
