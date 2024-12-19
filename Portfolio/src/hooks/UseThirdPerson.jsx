import { CapsuleCollider, RigidBody } from "@react-three/rapier";
import React, { useEffect, useRef, useState } from "react";
import Player from "../objects/Player";
import * as THREE from "three";
import { useFrame } from "@react-three/fiber";
import { useKeyboardControls } from "@react-three/drei";
import { useControls } from "leva";
import { degToRad } from "three/src/math/MathUtils.js";

const normalizeAngle = (angle) => {
  while (angle > Math.PI) angle -= 2 * Math.PI;
  while (angle < -Math.PI) angle += 2 * Math.PI;
  return angle;
};

const lerpAngle = (start, end, t) => {
  start = normalizeAngle(start);
  end = normalizeAngle(end);

  if (Math.abs(end - start) > Math.PI) {
    if (end > start) {
      start += 2 * Math.PI;
    } else {
      end += 2 * Math.PI;
    }
  }

  return normalizeAngle(start + (end - start) * t);
};

const UseThirdPerson = ({ isInVehicle }) => {
  const { WALK_SPEED, ROTATION_SPEED } = useControls("Character Control", {
    WALK_SPEED: { value: 3, min: 0.1, max: 4, step: 0.1 },
    ROTATION_SPEED: {
      value: 0.04,
      min: degToRad(0.1),
      max: degToRad(5),
      step: degToRad(0.1),
    },
  });
  const [, get] = useKeyboardControls();
  const container = useRef();
  const player = useRef();
  const [animation, setAnimation] = useState("Armature|Idle");
  const rotationTarget = useRef(0);
  const playerRotationTarget = useRef(0);
  const cameraTarget = useRef();
  const cameraPosition = useRef();
  const cameraWorldPosition = useRef(new THREE.Vector3());
  const cameraWorldTarget = useRef(new THREE.Vector3());
  const cameraLookAt = useRef(new THREE.Vector3());
  const rigidBodyRef = useRef();
  const speedRef = useRef(0);
  const lightRef = useRef();

  useFrame(({ camera }) => {
    if (rigidBodyRef.current) {
      const velocity = rigidBodyRef.current.linvel();
      const movement = {
        x: 0,
        z: 0,
      };

      // Determine speed multiplier based on whether in a vehicle
      const speedMultiplier = isInVehicle ? 2 : 1; // Double speed when in vehicle

      if (get().forward) {
        movement.z = 1;
      }

      if (get().backward) {
        movement.z = -1;
      }

      if (get().left) {
        movement.x = 1;
      }

      if (get().right) {
        movement.x = -1;
      }
      if (get().forward || get().backward || get().left || get().right) {
        setAnimation("Armature|Run");
      } else {
        setAnimation("Armature|Idle");
      }

      if (movement.x !== 0) {
        rotationTarget.current += ROTATION_SPEED * movement.x;
      }

      if (movement.x !== 0 || movement.z !== 0) {
        playerRotationTarget.current = Math.atan2(movement.x, movement.z);
        velocity.x =
          Math.sin(rotationTarget.current + playerRotationTarget.current) *
          WALK_SPEED *
          speedMultiplier;
        velocity.z =
          Math.cos(rotationTarget.current + playerRotationTarget.current) *
          WALK_SPEED *
          speedMultiplier;
      }
      player.current.rotation.y = lerpAngle(
        player.current.rotation.y,
        playerRotationTarget.current,
        1
      );
      rigidBodyRef.current.setLinvel(velocity);
      const speed = Math.sqrt(velocity.x ** 2 + velocity.z ** 2); // Speed calculation
      speedRef.current = speed;
    }

    container.current.rotation.y = THREE.MathUtils.lerp(
      container.current.rotation.y,
      rotationTarget.current,
      0.1
    );
    cameraPosition.current.getWorldPosition(cameraWorldPosition.current);
    camera.position.lerp(cameraWorldPosition.current, 1);

    if (cameraTarget.current) {
      cameraTarget.current.getWorldPosition(cameraWorldTarget.current);
      cameraLookAt.current.lerp(cameraWorldTarget.current, 1);
      camera.lookAt(cameraLookAt.current);
    }
  });

  return (
    <RigidBody
      canSleep={false}
      colliders={false}
      lockRotations
      ref={rigidBodyRef}
    >
      <group ref={container}>
        <group ref={cameraTarget} position-z={1.5}></group>
        <group ref={cameraPosition} position-y={0.75} position-z={-2}></group>
        
        <group ref={player}>
          <Player currentAnimation={animation} />
        </group>
      </group>
      <CapsuleCollider position={[0, 0.3, 0]} args={[0.2, 0.1]} />
    </RigidBody>
  );
};

export default UseThirdPerson;
