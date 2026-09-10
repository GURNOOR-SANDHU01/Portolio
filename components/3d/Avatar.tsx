"use client";

import { useEffect, useRef, useState } from "react";
import { useGLTF, useAnimations } from "@react-three/drei";
import { useFrame } from "@react-three/fiber";
import * as THREE from "three";

type AnimationName =
  | "standing"
  | "walking"
  | "walking2"
  | "strafe"
  | "nod"
  | "jump"
  | "backflip";

interface AvatarProps {
  animation?: AnimationName;
}

export default function Avatar({
  animation = "standing",
}: AvatarProps) {
  const group = useRef<THREE.Group>(null);

  const { scene, animations } = useGLTF(
    "/models/avatar/Aj.glb"
  );

  const { actions } = useAnimations(
    animations,
    group
  );

  const [currentAnimation, setCurrentAnimation] =
    useState<string | null>(null);

  /*
   * Map your animation files here.
   *
   * At this stage we use the animations embedded
   * inside Aj.glb if available.
   */
  const animationMap: Record<AnimationName, string> = {
    standing: animations[0]?.name ?? "",
    walking: animations[1]?.name ?? "",
    walking2: animations[2]?.name ?? "",
    strafe: animations[3]?.name ?? "",
    nod: animations[4]?.name ?? "",
    jump: animations[5]?.name ?? "",
    backflip: animations[6]?.name ?? "",
  };

  useEffect(() => {
    const nextAnimation = animationMap[animation];

    if (!nextAnimation || !actions[nextAnimation]) {
      return;
    }

    if (currentAnimation === nextAnimation) {
      return;
    }

    const nextAction = actions[nextAnimation];

    nextAction.reset();
    nextAction.fadeIn(0.35);
    nextAction.play();

    if (currentAnimation && actions[currentAnimation]) {
      actions[currentAnimation]
        ?.fadeOut(0.35);
    }

    setCurrentAnimation(nextAnimation);

    return () => {
      nextAction.fadeOut(0.35);
    };
  }, [
    animation,
    actions,
    currentAnimation,
    animationMap,
  ]);

  /*
   * Small natural movement.
   */
  useFrame((state) => {
    if (!group.current) return;

    const time = state.clock.elapsedTime;

    group.current.rotation.y =
      Math.sin(time * 0.5) * 0.04;

    group.current.position.y =
      -2.35 +
      Math.sin(time * 1.2) * 0.015;
  });

  return (
    <group
      ref={group}
      position={[1.1, -2.35, 0]}
      scale={1.65}
    >
      <primitive object={scene} />
    </group>
  );
}

useGLTF.preload("/models/avatar/Aj.glb");