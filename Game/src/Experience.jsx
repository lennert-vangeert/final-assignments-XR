// Experience.jsx
import { OrbitControls, Sky } from "@react-three/drei";
import { Perf } from "r3f-perf";
import { Physics, RigidBody } from "@react-three/rapier";
import Plane from "./objects/Plane";
import Jerrycan from "./objects/Jerrycan";
import Ring from "./objects/Ring";
import Landscape from "./objects/Landscape";
import Lake from "./objects/Lake";
import DayNightCycle from "./hooks/DayNightCycle"; // Import the DayNightCycle component
import { useFrame } from "@react-three/fiber";
import MenuPlane from "./objects/MenuPlane";
import useGame from "./stores/useGame";
import RingTwo from "./objects/RingTwo";
import DeadZones from "./objects/DeadZones";

export default function Experience() {
  const ringLocations = useGame((state) => state.ringLocations);
  const phase = useGame((state) => state.phase);
  return (
    <>
      {/* <Perf position="top-left" /> */}
      {/* <OrbitControls makeDefault /> */}

      <ambientLight intensity={2} />
      <directionalLight
        castShadow
        position={[100, 100, 100]}
        intensity={2}
        color={"#FFA500"} // Orange whiteish sun color
        shadow-mapSize-width={1024}
        shadow-mapSize-height={1024}
        shadow-camera-far={5000}
        shadow-camera-left={-1000}
        shadow-camera-right={1000}
        shadow-camera-top={1000}
        shadow-camera-bottom={-1000}

      />
      <Physics gravity={[0, -9.81, 0]}>
        {phase === "playing" && (
          <>
          <DeadZones />
            <Plane />
            {/* <Jerrycan /> */}
            {/* <RingTwo diameter={5} position={[5, 10, -7]} /> */}
            {ringLocations.map(([x, y, z, rotY], index) => (
              <Ring
                key={index}
                position={[x, y, z]}
                rotY={[0, rotY, 0]}
                diameter={Math.random() * (5 - 3) + 3}
              />
            ))}
            <Landscape />
            <Lake />
            {/* <RigidBody
              type="fixed"
              position={[0, 0, -60]}
              restitution={0}
              friction={0.7}
            >
              <mesh receiveShadow position-y={-1.76}>
                <boxGeometry args={[50, 0.5, 50]} />
                <meshStandardMaterial color="greenyellow" />
              </mesh>
            </RigidBody>
             <RigidBody
            type="dynamic"
              position={[0, 2, -60]}
              restitution={0}
              friction={0.7}
            >
              <mesh receiveShadow position-y={-1.76}>
                <boxGeometry args={[50, 0.5, 50]} />
                <meshStandardMaterial color="greenyellow" />
              </mesh>
            </RigidBody> */}
          </>
        )}
        {phase === "ready" && <MenuPlane />}
      </Physics>
      <Sky sunPosition={[100, 10, 100]} distance={100000} />
    </>
  );
}
