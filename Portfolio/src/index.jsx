import "./style.css";
import ReactDOM from "react-dom/client";
import { Canvas } from "@react-three/fiber";
import World from "./World.jsx";
import { KeyboardControls, Loader } from "@react-three/drei";
import MainInterface from "./interface/MainInterface.jsx";
import { Suspense } from "react";

const root = ReactDOM.createRoot(document.querySelector("#root"));
root.render(
  <>
    <KeyboardControls
      map={[
        { name: "forward", keys: ["ArrowUp", "KeyW"] },
        { name: "backward", keys: ["ArrowDown", "KeyS"] },
        { name: "left", keys: ["ArrowLeft", "KeyA"] },
        { name: "right", keys: ["ArrowRight", "KeyD"] },
        { name: "escape", keys: ["Escape"] },
        // { name: "jump", keys: ["Space"] },
      ]}
    >
      <Canvas
        shadows
        camera={{
          fov: 45,
          near: 0.1,
          far: 200,
          position: [-14, 5, 4],
        }}
      >
        <Suspense fallback={null}>
          <World />
        </Suspense>
      </Canvas>
      <Loader />
      <MainInterface />
    </KeyboardControls>
  </>
);
