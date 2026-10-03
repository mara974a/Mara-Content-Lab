"use client";

import dynamic from "next/dynamic";
import { useEffect, useRef, useState } from "react";
import PrismFallback from "./PrismFallback";
import styles from "./Scene3D.module.css";

export interface SceneInteraction {
  x: number;
  y: number;
  active: boolean;
  scroll: number;
  angleIndex: number;
}

interface DeviceCapabilities {
  deviceMemory?: number;
  connection?: { saveData?: boolean };
}

const PrismCanvas = dynamic(() => import("./PrismCanvas"), {
  ssr: false,
  loading: () => <PrismFallback />,
});

function supportsWebGL(): boolean {
  try {
    const canvas = document.createElement("canvas");
    const context =
      window.WebGLRenderingContext &&
      (canvas.getContext("webgl2") || canvas.getContext("webgl"));
    if (!context) return false;
    context.getExtension("WEBGL_lose_context")?.loseContext();
    return true;
  } catch {
    return false;
  }
}

export default function Scene3D() {
  const interaction = useRef<SceneInteraction>({
    x: 0,
    y: 0,
    active: false,
    scroll: 0,
    angleIndex: -1,
  });
  const [sceneEnabled, setSceneEnabled] = useState(false);

  useEffect(() => {
    const motionPreference = window.matchMedia("(prefers-reduced-motion: reduce)");
    const device = navigator as Navigator & DeviceCapabilities;
    const lowPower =
      (navigator.hardwareConcurrency > 0 && navigator.hardwareConcurrency <= 2) ||
      (device.deviceMemory !== undefined && device.deviceMemory <= 2) ||
      Boolean(device.connection?.saveData);

    const updateScene = () => {
      setSceneEnabled(!motionPreference.matches && !lowPower && supportsWebGL());
    };

    updateScene();
    motionPreference.addEventListener("change", updateScene);

    return () => motionPreference.removeEventListener("change", updateScene);
  }, []);

  useEffect(() => {
    if (!sceneEnabled) return;

    const updatePointer = (event: PointerEvent) => {
      const current = interaction.current;
      current.x = (event.clientX / window.innerWidth) * 2 - 1;
      current.y = 1 - (event.clientY / window.innerHeight) * 2;
      current.active = true;
      const angleIndex = Math.min(
        3,
        Math.floor((event.clientX / window.innerWidth) * 4),
      );
      if (angleIndex !== current.angleIndex) {
        current.angleIndex = angleIndex;
        window.dispatchEvent(
          new CustomEvent<number>("mara:prism-angle", { detail: angleIndex }),
        );
      }
    };
    const releasePointer = () => {
      interaction.current.active = false;
    };
    const updateScroll = () => {
      const maxScroll =
        document.documentElement.scrollHeight - window.innerHeight;
      interaction.current.scroll =
        maxScroll > 0 ? window.scrollY / maxScroll : 0;
    };

    updateScroll();
    window.addEventListener("pointermove", updatePointer, { passive: true });
    window.addEventListener("pointerup", releasePointer, { passive: true });
    window.addEventListener("pointercancel", releasePointer, { passive: true });
    window.addEventListener("scroll", updateScroll, { passive: true });
    window.addEventListener("resize", updateScroll, { passive: true });

    return () => {
      window.removeEventListener("pointermove", updatePointer);
      window.removeEventListener("pointerup", releasePointer);
      window.removeEventListener("pointercancel", releasePointer);
      window.removeEventListener("scroll", updateScroll);
      window.removeEventListener("resize", updateScroll);
    };
  }, [sceneEnabled]);

  return (
    <div className={styles.scene} aria-hidden="true">
      {sceneEnabled ? (
        <PrismCanvas
          interaction={interaction}
          onFallback={() => setSceneEnabled(false)}
        />
      ) : (
        <PrismFallback />
      )}
    </div>
  );
}
