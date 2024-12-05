import { Sky } from "@react-three/drei";
import { useState } from "react";
import { useFrame } from "@react-three/fiber";

export default function DayNightCycle() {
  const [sunPosition, setSunPosition] = useState([100, 10, 100]);
  const [lightIntensity, setLightIntensity] = useState(3.5);
  const [sunAngle, setSunAngle] = useState(0); // Controls the day-night cycle progression

  useFrame((_, delta) => {
    const cycleSpeed = .75; // Adjust for faster/slower day-night cycle
    const angle = sunAngle + cycleSpeed * delta;
    // make angle to start cycle
    // setSunAngle(angle);
    setSunAngle(1);

    // Calculate sun's position based on angle
    const x = Math.cos(angle) * 100;
    const y = Math.sin(angle) * 100;
    setSunPosition([x, y, 100]);

    // Determine if it's day or night based on sun's height
    const isDay = y > 0;
    const intensity = isDay ? 3.5 * Math.sin(angle) : .5;
    const lightColor = isDay ? "white" : "#6a5acd"; // Bluish color for night

    setLightIntensity(Math.max(0.2, intensity));

    // Update the directional and ambient light properties accordingly
  });

  return (
    <>
      <Sky sunPosition={sunPosition} />
      <directionalLight
        castShadow
        position={sunPosition}
        intensity={lightIntensity}
        color={lightIntensity > 1 ? "white" : "#6a5acd"} // White during day, bluish at night
      />
      <ambientLight
        intensity={Math.max(0.1, lightIntensity * 0.3)}
        color={lightIntensity > 1 ? "white" : "#6a5acd"} // Dimmed blue for night
      />
    </>
  );
}
