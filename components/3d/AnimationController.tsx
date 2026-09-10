"use client";

import { useEffect } from "react";
import { useAnimations, useGLTF } from "@react-three/drei";
import * as THREE from "three";

interface AnimationControllerProps {
  group: React.RefObject<THREE.Group | null>;
  animation: string;
}

const animationFiles = {
  standing:
    "/models/avatar/animations/Male Standing Pose.glb",

  walking:
    "/models/avatar/animations/Walking.glb",

  walking2:
    "/models/avatar/animations/Walking (1).glb",

  strafe:
    "/models/avatar/animations/Left Strafe Walking.glb",

  nod:
    "/models/avatar/animations/Lengthy Head Nod.glb",

  jump:
    "/models/avatar/animations/Jumping Up.glb",

  backflip:
    "/models/avatar/animations/Backflip.glb",
};

export default function AnimationController({
  group,
  animation,
}: AnimationControllerProps) {
  const file =
    animationFiles[
      animation as keyof typeof animationFiles
    ];

  const { animations } = useGLTF(file);

  const { actions } = useAnimations(
    animations,
    group
  );

  useEffect(() => {
    if (!animations.length) return;

    const action = actions[animations[0].name];

    if (!action) return;

    action.reset();
    action.fadeIn(0.4);
    action.play();

    return () => {
      action.fadeOut(0.4);
    };
  }, [animations, actions]);

  return null;
}
