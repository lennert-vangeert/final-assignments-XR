import { RigidBody } from "@react-three/rapier";
import React from "react";

const Ring = (props) => {
  return (
    <RigidBody type="dynamic" gravityScale={0} position={props.position} colliders="hull">
      <mesh>
        <torusGeometry args={[props.diameter, 0.8, 16, 100]} />
        <meshStandardMaterial color="red" />
      </mesh>
    </RigidBody>
  );
};

export default Ring;
