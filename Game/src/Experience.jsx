// Experience.jsx
import { OrbitControls } from "@react-three/drei";
import { Perf } from "r3f-perf";
import { Physics } from "@react-three/rapier";
import Plane from "./objects/Plane";
import Jerrycan from "./objects/Jerrycan";
import Ring from "./objects/Ring";
import Landscape from "./objects/Landscape";
import Lake from "./objects/Lake";
import DayNightCycle from "./hooks/DayNightCycle"; // Import the DayNightCycle component

export default function Experience() {
  return (
    <>
      <Perf position="top-left" />
      <OrbitControls makeDefault />

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
        <Plane />
        <Jerrycan />
        <Ring diameter={5} position={[5, 10, -7]} />
        <Landscape />
        <Lake />
      </Physics>
    </>
  );
}
