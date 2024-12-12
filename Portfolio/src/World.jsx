import { Environment, OrbitControls } from "@react-three/drei";
import { Perf } from "r3f-perf";
import { Physics, RigidBody } from "@react-three/rapier";
import { Bloom, EffectComposer } from "@react-three/postprocessing";
import Landscape from "./objects/Landscape";
import Lake from "./objects/Lake";
import Windmill from "./objects/Windmill";
import { useEffect } from "react";
import * as THREE from "three";
import { useFrame, useThree } from "@react-three/fiber";
import Player from "./objects/Player";
import UseThirdPerson from "./hooks/UseThirdPerson";
import Car from "./objects/Car";

export default function World({camera}) {
  const { scene } = useThree();

  useEffect(() => {
    // scene.fog = new THREE.Fog("#b9d3ff", 35, 100); 
  }, [scene]);
  return (
    <>
      <Perf position="top-left" />
      {/* <OrbitControls makeDefault /> */}
      <Environment files={"/hdr/satara_night.hdr"}/>
      <EffectComposer>
        <Bloom luminanceThreshold={0.5} luminanceSmoothing={0.9} height={300} />
      </EffectComposer>
      <directionalLight castShadow position={[-1, 5, 10]} intensity={1} 
        shadow-mapSize-width={2048}
        shadow-mapSize-height={2048}
        shadow-camera-far={500}
        shadow-camera-left={-100}
        shadow-camera-right={100}
        shadow-camera-top={100}
        shadow-camera-bottom={-100}
       />
      <ambientLight intensity={0.2} />

      <Physics gravity={[0, -9.81, 0]}>
        <group position={[0, -10, 0]}>
          <Landscape />
          <Lake />
          <Windmill />
        </group>
        <UseThirdPerson isInVehicle={false} />
        {/* <Car />  */}
      </Physics>
    </>
  );
}
