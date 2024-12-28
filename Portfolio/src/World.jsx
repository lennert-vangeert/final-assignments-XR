import { Environment, OrbitControls } from "@react-three/drei";
import { Perf } from "r3f-perf";
import { Physics, RigidBody } from "@react-three/rapier";
import { Bloom, EffectComposer } from "@react-three/postprocessing";
import { useEffect } from "react";
import { useThree } from "@react-three/fiber";
import UseThirdPerson from "./hooks/UseThirdPerson";
import * as THREE from "three";
import Landscape from "./objects/Landscape";

export default function World({ camera }) {
  const { scene } = useThree();

  useEffect(() => {
    scene.fog = new THREE.Fog("#b9d3ff", 35, 100);
  }, [scene]);
  return (
    <>
      <Perf position="top-left" />
      {/* <OrbitControls makeDefault /> */}
      <Environment files={"/hdr/satara_night.hdr"} />
      {/* <EffectComposer>
        <Bloom luminanceThreshold={0.5} luminanceSmoothing={0.9} height={300} />
      </EffectComposer> */}
        <directionalLight
          castShadow
          position={[30, 10, 0]}
          intensity={1}
          
        />
      <ambientLight intensity={0.5} />

      <Physics gravity={[0, -9.81, 0]}>
        <group position={[0, -10, 0]}>
          <Landscape />

          <RigidBody type="fixed" restitution={0} friction={0.7}>
            <mesh receiveShadow position-y={-1.76}>
              <boxGeometry args={[50, 0.2, 50]} />
              <meshStandardMaterial color="greenyellow" />
            </mesh>
          </RigidBody>
            
        </group>
        <UseThirdPerson />
      </Physics>
    </>
  );
}
