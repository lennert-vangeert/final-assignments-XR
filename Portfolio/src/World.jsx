import {
  Environment,
  OrbitControls,
  Sky,
  useKeyboardControls,
} from "@react-three/drei";
import { Perf } from "r3f-perf";
import { Physics, RigidBody } from "@react-three/rapier";
import UseThirdPerson from "./hooks/UseThirdPerson";
import Landscape from "./objects/Landscape";
import StreetLight from "./objects/StreetLight";
import useWorld from "./hooks/useWorld";
import Poi from "./objects/Poi";
import { useEffect } from "react";

export default function World() {
  const streetLightLocations = useWorld((state) => state.streetLightLocations);
  const poiLocations = useWorld((state) => state.poiLocations);
  const isAmbienceOn = useWorld((state) => state.isAmbienceOn);
  const setAmbience = useWorld((state) => state.setAmbience);
  

    

  return (
    <>
      {/* <Perf position="top-left" /> */}
      <OrbitControls makeDefault />
      <ambientLight intensity={1.5} />
      <Environment files="/hdr/nightsky.hdr" background blur={0.5} />
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
