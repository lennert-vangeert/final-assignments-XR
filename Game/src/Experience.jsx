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
export default function Experience() {
  const phase = useGame((state) => state.phase);
  return (
    <>
      {/* <Perf position="top-left" /> */}
      {/* <OrbitControls makeDefault /> */}

      {/* Day-Night Cycle Component */}
      {/* <DayNightCycle /> */}
      <ambientLight intensity={2} />
      <directionalLight
        castShadow
        position={[100, 10, 100]}
        intensity={2}
        color={"#FFA500"} // Orange whiteish sun color
      />
      <Physics gravity={[0, -9.81, 0]}>
        {phase === "playing" && (
          <>
            <Plane />
            <Jerrycan />
            <Ring diameter={5} position={[5, 10, -7]} />
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
      <Sky sunPosition={[100, 10, 100]} />
    </>
  );
}
