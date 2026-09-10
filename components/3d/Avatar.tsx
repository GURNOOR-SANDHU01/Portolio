"use client";

import { useEffect, useRef } from "react";
import { useGLTF } from "@react-three/drei";
import { useFrame } from "@react-three/fiber";
import * as THREE from "three";

const CHARACTER = "/models/avatar/Aj.glb";

const FILES = {
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

type AnimationName = keyof typeof FILES;

export default function Avatar() {
  const group = useRef<THREE.Group>(null);

  const character = useGLTF(CHARACTER);

  const standing = useGLTF(FILES.standing);
  const walking = useGLTF(FILES.walking);
  const walking2 = useGLTF(FILES.walking2);
  const strafe = useGLTF(FILES.strafe);
  const nod = useGLTF(FILES.nod);
  const jump = useGLTF(FILES.jump);
  const backflip = useGLTF(FILES.backflip);

  const mixer = useRef<THREE.AnimationMixer | null>(
    null
  );

  const actions = useRef<
    Record<string, THREE.AnimationAction>
  >({});

  const activeAction =
    useRef<THREE.AnimationAction | null>(null);

  const activeAnimation =
    useRef<AnimationName>("standing");

  const lastProgress = useRef(0);

  /*
   * Animation clips.
   */
  const getModels = () => ({
    standing,
    walking,
    walking2,
    strafe,
    nod,
    jump,
    backflip,
  });

  /*
   * Choose animation according to scroll.
   */
  const getAnimation = (
    progress: number
  ): AnimationName => {
    if (progress < 0.12)
      return "standing";

    if (progress < 0.28)
      return "walking";

    if (progress < 0.40)
      return "nod";

    if (progress < 0.57)
      return "walking2";

    if (progress < 0.72)
      return "strafe";

    if (progress < 0.87)
      return "jump";

    return "backflip";
  };

  /*
   * Initialize mixer.
   */
  useEffect(() => {
    if (!character.scene) return;

    const newMixer =
      new THREE.AnimationMixer(
        character.scene
      );

    mixer.current = newMixer;

    return () => {
      newMixer.stopAllAction();
      newMixer.uncacheRoot(
        character.scene
      );

      mixer.current = null;
    };
  }, [character]);

  /*
   * Change active animation.
   *
   * IMPORTANT:
   * We don't PLAY it.
   *
   * We only prepare an AnimationAction
   * and then manually control its time.
   */
  const changeAnimation = (
    name: AnimationName
  ) => {
    if (
      activeAnimation.current === name
    ) {
      return;
    }

    if (!mixer.current) return;

    const model =
      getModels()[name];

    const clip =
      model.animations[0];

    if (!clip) return;

    /*
     * Stop old action.
     */
    if (activeAction.current) {
      activeAction.current.stop();
    }

    const action =
      mixer.current.clipAction(
        clip,
        character.scene
      );

    action.reset();

    action.setLoop(
      THREE.LoopOnce,
      1
    );

    action.clampWhenFinished = true;

    /*
     * Disable automatic playback.
     */
    action.paused = true;

    action.play();

    action.paused = true;

    activeAction.current = action;
    activeAnimation.current = name;
  };

  /*
   * Set animation frame from normalized progress.
   */
  const scrubAnimation = (
    action: THREE.AnimationAction,
    progress: number
  ) => {
    const duration =
      action.getClip().duration;

    /*
     * Clamp.
     */
    const safeProgress =
      THREE.MathUtils.clamp(
        progress,
        0,
        1
      );

    /*
     * Directly choose animation frame.
     */
    action.time =
      safeProgress * duration;

    /*
     * Force mixer to update.
     */
    mixer.current?.update(0);
  };

  /*
   * Main frame loop.
   */
  useFrame((state) => {
    if (
      !group.current ||
      !mixer.current
    ) {
      return;
    }

    /*
     * Calculate page scroll progress.
     */
    const scrollTop =
      window.scrollY;

    const maxScroll =
      document.documentElement
        .scrollHeight -
      window.innerHeight;

    const progress =
      maxScroll > 0
        ? THREE.MathUtils.clamp(
            scrollTop / maxScroll,
            0,
            1
          )
        : 0;

    /*
     * Find animation.
     */
    const animation =
      getAnimation(progress);

    /*
     * Switch animation only when
     * crossing an animation region.
     */
    if (
      animation !==
      activeAnimation.current
    ) {
      changeAnimation(animation);
    }

    /*
     * Calculate progress INSIDE
     * the current animation region.
     */
    const regions = [
      {
        start: 0,
        end: 0.12,
        animation: "standing",
      },
      {
        start: 0.12,
        end: 0.28,
        animation: "walking",
      },
      {
        start: 0.28,
        end: 0.40,
        animation: "nod",
      },
      {
        start: 0.40,
        end: 0.57,
        animation: "walking2",
      },
      {
        start: 0.57,
        end: 0.72,
        animation: "strafe",
      },
      {
        start: 0.72,
        end: 0.87,
        animation: "jump",
      },
      {
        start: 0.87,
        end: 1,
        animation: "backflip",
      },
    ];

    const region =
      regions.find(
        (item) =>
          progress >= item.start &&
          progress <= item.end
      );

    if (
      region &&
      activeAction.current
    ) {
      const localProgress =
        (progress - region.start) /
        (region.end - region.start);

      scrubAnimation(
        activeAction.current,
        localProgress
      );
    }

    /*
     * Avatar movement across screen.
     */
    const targetX = 1.8;
const targetY = -2.35;

group.current.position.x +=
  (targetX - group.current.position.x) * 0.08;

group.current.position.y +=
  (targetY - group.current.position.y) * 0.08;
    /*
     * Rotate character according
     * to scroll direction.
     */
    
    /*
     * Mouse interaction.
     */
    const mouseRotation =
  state.pointer.x * 0.12;

group.current.rotation.y +=
  (
    mouseRotation -
    group.current.rotation.y
  ) * 0.03;
  });

  return (
    <group
      ref={group}
      position={[1.1, -2.35, 0]}
      scale={1.65}
    >
      <primitive
        object={character.scene}
      />
    </group>
  );
}


/*
 * Preload everything.
 */

useGLTF.preload(CHARACTER);

useGLTF.preload(
  FILES.standing
);

useGLTF.preload(
  FILES.walking
);

useGLTF.preload(
  FILES.walking2
);

useGLTF.preload(
  FILES.strafe
);

useGLTF.preload(
  FILES.nod
);

useGLTF.preload(
  FILES.jump
);

useGLTF.preload(
  FILES.backflip
);