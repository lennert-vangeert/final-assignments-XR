import { RigidBody } from "@react-three/rapier";
import React, { useEffect, useState } from "react";
import useGame from "../stores/useGame";
import { useControls } from "leva";

const Ring = ({ diameter, position, rotY }) => {
  const [isVisible, setIsVisible] = useState(true);
  const addScore = useGame((state) => state.addScore);
  const score = useGame((state) => state.score);
  const end = useGame((state) => state.end);

  // const { positionX, positionY, positionZ, rotationY } = useControls({
  //   positionX: {
  //     value: 0,
  //     min: -650,
  //     max: 650,
  //     step: 1,
  //   },
  //   positionY: {
  //     value: 0,
  //     min: -650,
  //     max: 650,
  //     step: 1,
  //   },
  //   positionZ: {
  //     value: 0,
  //     min: -650,
  //     max: 650,
  //     step: 1,
  //   },
  //   rotationY: {
  //     value: 0,
  //     min: -Math.PI,
  //     max: Math.PI,
  //     step: 0.01,
  //   },
  // });

  const onCollission = (() => {
    let hasCollided = false;
    return (e) => {

      if (!hasCollided) {
        addScore();
        setIsVisible(false);
        hasCollided = true;
      }
    };
  })();

  useEffect(() => {
    if (score === 10) {
      end();
    }
  }, [score]);

  // position={position}
  // rotation={rotY}
  {
    /* <torusGeometry args={[diameter, 0.8, 16, 100]} /> */
  }

  return (
    isVisible && (
      <RigidBody
        onCollisionEnter={onCollission}
        type="dynamic"
        gravityScale={0}
        position={position}
        rotation={rotY}
        colliders="hull"
      >
        <mesh>
          <torusGeometry args={[diameter, 0.8, 16, 100]} />
          <meshStandardMaterial color="red" />
        </mesh>
      </RigidBody>
    )
  );
};

export default Ring;
