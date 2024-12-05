import { SpotLight, useAnimations, useGLTF } from "@react-three/drei";
import React, { useEffect, useRef } from "react";

const Player = ({ currentAnimation, isInVehicle }) => {
  const player = useGLTF("/models/player/scene.gltf");
  const car = useGLTF("/models/car/scene.gltf");

  const animations = useAnimations(player.animations, player.scene);

  useEffect(() => {
    // Ensure the current animation exists and play it
    if (animations.actions[currentAnimation] || !isInVehicle) {
      animations.actions[currentAnimation].reset().fadeIn(0.24).play();
    } else {
      console.warn(`Animation ${currentAnimation} not found.`);
    }

    // Cleanup when animation changes
    return () => {
      if (animations.actions[currentAnimation]) {
        animations.actions[currentAnimation].fadeOut(0.24);
      }
    };
  }, [currentAnimation, animations, isInVehicle]);

  useEffect(() => {
    player.scene.traverse((child) => {
      if (child.isMesh) {
        child.castShadow = true;
        child.receiveShadow = true;
      }
    });
  }, [player.scene]);

  return (
    <group>
      {/* if isInVehicle show car otherwise show player */}
      {isInVehicle ? (
        <primitive object={car.scene} scale={0.3} />
      ) : (
        <primitive object={player.scene} scale={0.075} position={[0, 0, 0]} />
      )}
    </group>
  );
};

export default Player;
