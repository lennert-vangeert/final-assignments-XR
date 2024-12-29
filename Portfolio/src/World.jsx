import { Environment, OrbitControls, Sky } from "@react-three/drei";
import { Perf } from "r3f-perf";
import { Physics, RigidBody } from "@react-three/rapier";
import UseThirdPerson from "./hooks/UseThirdPerson";
import Landscape from "./objects/Landscape";
import StreetLight from "./objects/StreetLight";
import useWorld from "./hooks/useWorld";

export default function World() {
  const streetLightLocations = useWorld((state) => state.streetLightLocations);
  return (
    <>
      <Perf position="top-left" />
      {/* <OrbitControls makeDefault /> */}

      {/* <directionalLight castShadow position={[10, 10, 0]} intensity={1} /> */}
      <ambientLight intensity={1.5} />
      <Physics gravity={[0, -9.81, 0]}>
        <group position={[0, -10, 0]}>
          <Landscape />
          {streetLightLocations.map((location, index) => (
            <StreetLight
              key={index}
              positionX={location[0]}
              positionY={location[1]}
              positionZ={location[2]}
              rotation={location[3]}
              light={location[4]}
            />
          ))}

          {/* <RigidBody type="fixed" restitution={0} friction={0.7}>
            <mesh receiveShadow position-y={-1.76}>
              <boxGeometry args={[50, 0.2, 50]} />
              <meshStandardMaterial color="greenyellow" />
            </mesh>
          </RigidBody> */}
        </group>
        <UseThirdPerson />
      </Physics>
    </>
  );
}
