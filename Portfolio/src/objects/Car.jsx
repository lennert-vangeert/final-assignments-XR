import { useGLTF } from "@react-three/drei";
import { RigidBody } from "@react-three/rapier";
import React from "react";

const Car = () => {
  const car = useGLTF("/models/car/scene.gltf");

  const onPointerEnter = (e) => {
    // make cursor a pointer
    e.stopPropagation();
    document.body.style.cursor = "pointer";
  };

  const onPointerLeave = (e) => {
    // make cursor default
    e.stopPropagation();
    document.body.style.cursor = "auto";
  };

  const enterVehicle = () => {
    // enter vehicle
    console.log("Entering vehicle");

  };

  return (
    <RigidBody type="" colliders={"cuboid"}>
      <primitive
        onClick={enterVehicle}
        onPointerEnter={onPointerEnter}
        onPointerLeave={onPointerLeave}
        object={car.scene}
        scale={0.3}
        position={[-15, -7, -46]}
      />
    </RigidBody>
  );
};

export default Car;
