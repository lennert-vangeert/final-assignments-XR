import { Environment, OrbitControls, Sky } from "@react-three/drei";
import { Perf } from "r3f-perf";
import { Physics, RigidBody } from "@react-three/rapier";
import UseThirdPerson from "./hooks/UseThirdPerson";
import Landscape from "./objects/Landscape";
import StreetLight from "./objects/StreetLight";
import useWorld from "./hooks/useWorld";
import MainInterface from "./interface/MainInterface";
import Poi from "./objects/Poi";

export default function World() {
  const streetLightLocations = useWorld((state) => state.streetLightLocations);
  const poiLocations = useWorld((state) => state.poiLocations);
  return (
    <>
      {/* <Perf position="top-left" /> */}
      <OrbitControls makeDefault />
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
          {poiLocations.map((location, index) => (
            <Poi
              key={index}
              positionX={location[0]}
              positionY={location[1]}
              positionZ={location[2]}
              command={location[3]}
            />
          ))}
        </group>
        <UseThirdPerson />
      </Physics>
    </>
  );
}
