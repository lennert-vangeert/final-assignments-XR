import { useGLTF } from "@react-three/drei";
import { CuboidCollider, RigidBody } from "@react-three/rapier";
import { useControls } from "leva";
import { useEffect } from "react";

const Trampoline = ({ playerRigidBody }) => {
  const trampoline = useGLTF("/models/trampoline/scene.gltf");

  useEffect(() => {
    trampoline.scene.traverse((child) => {
      if (child.isMesh) {
        child.castShadow = true;
        child.receiveShadow = true;
      }
    });
  }, []);

  const { posX, posY, posZ } = useControls("Trampoline", {
    posX: { value: -2.8, min: -20, max: 50 },
    posY: { value: -3.9, min: -50, max: 50 },
    posZ: { value: 26.6, min: -20, max: 50 },
  });

  const onCollision = () => {
    if (playerRigidBody?.current) {
      // Apply an upward velocity to the player
      const currentVelocity = playerRigidBody.current.linvel();
      playerRigidBody.current.setLinvel({
        x: currentVelocity.x,
        y: 5, // Set the upward boost (adjust value as needed)
        z: currentVelocity.z,
      });
    }
  };

  return (
    <group position={[-2.8, -3.9, 26.6]}>
    
      <RigidBody
        onCollisionEnter={onCollision}
        restitution={0}
        friction={1}
        type="fixed"
        colliders="trimesh"
      >
        <primitive object={trampoline.scene} scale={0.2} rotation={[0, 0, 0]} />
      </RigidBody>
    </group>
  );
};

export default Trampoline;
