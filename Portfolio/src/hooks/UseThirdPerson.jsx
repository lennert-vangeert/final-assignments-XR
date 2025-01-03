import { CapsuleCollider, RigidBody } from "@react-three/rapier";
import React, { useRef, useState } from "react";
import Player from "../objects/Player";
import * as THREE from "three";
import { useFrame } from "@react-three/fiber";
import { useKeyboardControls } from "@react-three/drei";
import { useControls } from "leva";
import { degToRad } from "three/src/math/MathUtils.js";
import useWorld from "./useWorld";
import Trampoline from "../objects/Trampoline";

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

const UseThirdPerson = () => {
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
  const phase = useWorld((state) => state.phase);
  const setExploring = useWorld((state) => state.setExploring);
  const setAmbience = useWorld((state) => state.setAmbience);
  const isAmbienceOn = useWorld((state) => state.isAmbienceOn);
  const ambience = new Audio("/audio/ambience.mp3");
  const bm = new Audio("/audio/bm.mp3");
  const canJump = useRef(true);

  useFrame(({ camera }) => {
    if (rigidBodyRef.current) {
      const velocity = rigidBodyRef.current.linvel();
      const movement = {
        x: 0,
        z: 0,
      };

      const speedMultiplier = 1;
      if (phase === "menu") {
        setAnimation("Armature|Idle");
        if (get().escape) {
          setExploring();
        }
      }
      if (phase === "exploring") {
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

          if (!isAmbienceOn) {
            ambience.volume = 0.2;
            ambience.currentTime = 0;
            ambience.loop = true;
            ambience.play();
            bm.volume = 0.1;
            bm.currentTime = 0;
            bm.loop = true;
            bm.play();
            setAmbience();
          }
        } else {
          setAnimation("Armature|Idle");
        }

        if (movement.x !== 0) {
          rotationTarget.current += 0.04 * movement.x;
        }

        if (movement.x !== 0 || movement.z !== 0) {
          playerRotationTarget.current = Math.atan2(movement.x, movement.z);
          velocity.x =
            Math.sin(rotationTarget.current + playerRotationTarget.current) *
            2.5 *
            speedMultiplier;
          velocity.z =
            Math.cos(rotationTarget.current + playerRotationTarget.current) *
            2.5 *
            speedMultiplier;
        }

        if (get().jump && canJump.current) {
          velocity.y = 3;
          canJump.current = false;
          setTimeout(() => (canJump.current = true), 1000);
        }

        player.current.rotation.y = lerpAngle(
          player.current.rotation.y,
          playerRotationTarget.current,
          1
        );
        rigidBodyRef.current.setLinvel(velocity);
        const speed = Math.sqrt(velocity.x ** 2 + velocity.z ** 2);
        speedRef.current = speed;
      }

      container.current.rotation.y = THREE.MathUtils.lerp(
        container.current.rotation.y,
        rotationTarget.current,
        0.1
      );

      cameraPosition.current.getWorldPosition(cameraWorldPosition.current);
      camera.position.lerp(cameraWorldPosition.current, 0.1);

      if (cameraTarget.current) {
        cameraTarget.current.getWorldPosition(cameraWorldTarget.current);
        cameraLookAt.current.lerp(cameraWorldTarget.current, 0.1);
        camera.lookAt(cameraLookAt.current);
      }
    }
  });

  return (
    <>
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
      <Trampoline playerRigidBody={rigidBodyRef} />
    </>
  );
};

export default UseThirdPerson;
