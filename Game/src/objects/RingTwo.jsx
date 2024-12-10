import { RigidBody } from "@react-three/rapier";
import React, { useState } from "react";
import useGame from "../stores/useGame";
import { useControls } from "leva";

const RingTwo = ({ diameter, position, rotY }) => {
  const [isVisible, setIsVisible] = useState(true);
  const addScore = useGame((state) => state.addScore);

  const { positionX, positionY, positionZ, rotationY } = useControls({
    positionX: {
      value: 0,
      min: -650,
      max: 650,
      step: 1,
    },
    positionY: {
      value: 0,
      min: -650,
      max: 650,
      step: 1,
    },
    positionZ: {
      value: 0,
      min: -650,
      max: 650,
      step: 1,
    },
    rotationY: {
      value: 0,
      min: -Math.PI,
      max: Math.PI,
      step: 0.01,
    },
  });

  const onCollission = (() => {
    let hasCollided = false;
    return (e) => {
      if (!hasCollided) {
        console.log("Collision detected:", e);
        addScore();
        setIsVisible(false);
        hasCollided = true;
      }
    };
  })();

  return (
    isVisible && (
      <>
          <RigidBody
            // onCollisionEnter={onCollission}
            type="fixed"
            gravityScale={0}
            position={[positionX, positionY, positionZ]}
            rotation={[0, rotationY, 0]}
            colliders="hull"
          >
            <mesh>
              <torusGeometry args={[diameter, 0.8, 16, 100]} />
              <meshStandardMaterial color="red" />
            </mesh>
          </RigidBody>
      </>
    )
  );
};

export default RingTwo;
