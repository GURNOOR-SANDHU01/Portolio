"use client";

import { Canvas } from "@react-three/fiber";
import { Environment } from "@react-three/drei";
import Avatar from "./Avatar";

export default function HeroScene() {
  return (
    <div className="avatar-scene">
      <Canvas
        camera={{
          position: [0, 0.8, 6],
          fov: 35,
        }}
        dpr={[1, 2]}
        gl={{
          antialias: true,
          alpha: true,
        }}
      >
        <ambientLight intensity={1.2} />

        <directionalLight
          position={[3, 5, 4]}
          intensity={2}
        />

        <directionalLight
          position={[-3, 2, 2]}
          intensity={0.7}
        />

        <Environment preset="city" />

        <Avatar />
      </Canvas>
    </div>
  );
}