"use client";

import { Canvas } from "@react-three/fiber";
import { Environment } from "@react-three/drei";
import Avatar from "./Avatar";

export default function HeroScene() {
  return (
    <div className="absolute inset-0">
      <Canvas
        dpr={[1, 2]}
        camera={{
          position: [0, 0.8, 6],
          fov: 32,
        }}
        gl={{
          antialias: true,
          alpha: true,
        }}
      >
        <ambientLight intensity={1.5} />

        <directionalLight
          position={[3, 5, 4]}
          intensity={2.5}
        />

        <directionalLight
          position={[-4, 2, 3]}
          intensity={1}
        />

        <Avatar />

        <Environment preset="city" />
      </Canvas>
    </div>
  );
}