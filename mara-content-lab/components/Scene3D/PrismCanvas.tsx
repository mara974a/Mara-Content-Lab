"use client";

import { Canvas, useFrame, useThree } from "@react-three/fiber";
import { useMemo, useRef } from "react";
import * as THREE from "three";
import type { SceneInteraction } from "./Scene3D";

interface PrismCanvasProps {
  interaction: React.RefObject<SceneInteraction>;
  onFallback: () => void;
}

const beamColors = ["#0f766e", "#8e9c8f", "#b49567", "#75808c"];
const rayBaseAngles = [-0.28, -0.09, 0.09, 0.28];

function placeBeam(
  mesh: THREE.Mesh | null,
  startX: number,
  startY: number,
  endX: number,
  endY: number,
) {
  if (!mesh) return;
  const dx = endX - startX;
  const dy = endY - startY;
  mesh.position.set((startX + endX) / 2, (startY + endY) / 2, -0.12);
  mesh.rotation.z = Math.atan2(dy, dx);
  mesh.scale.x = Math.hypot(dx, dy);
}

function Prism({ interaction, onFallback }: PrismCanvasProps) {
  const prismRef = useRef<THREE.Group>(null);
  const beamRefs = useRef<(THREE.Mesh | null)[]>([]);
  const particleRefs = useRef<(THREE.InstancedMesh | null)[]>([]);
  const elapsed = useRef(0);
  const slowFrames = useRef(0);
  const fallbackRequested = useRef(false);
  const sceneRef = useRef<THREE.Group>(null);
  const particleTransform = useMemo(() => new THREE.Object3D(), []);
  const { viewport } = useThree();
  const edges = useMemo(() => {
    const geometry = new THREE.CylinderGeometry(0.86, 0.86, 1.4, 3, 1, false);
    const edgeGeometry = new THREE.EdgesGeometry(geometry);
    geometry.dispose();
    return edgeGeometry;
  }, []);

  useFrame((_, delta) => {
    if (document.hidden) return;

    elapsed.current += delta;
    slowFrames.current = delta > 0.05 ? slowFrames.current + 1 : Math.max(0, slowFrames.current - 1);
    if (slowFrames.current > 90 && !fallbackRequested.current) {
      fallbackRequested.current = true;
      window.setTimeout(onFallback, 0);
      return;
    }

    const pointer = interaction.current;
    const scroll = interaction.current.scroll;
    const targetAngle =
      (pointer.active ? (pointer.x + 1) * 0.5 : 0.5) *
        (Math.PI * 0.75) +
      scroll * 0.035;
    const targetTilt = (pointer.active ? pointer.y : 0) * 0.08;

    if (prismRef.current) {
      prismRef.current.rotation.y +=
        (targetTilt - prismRef.current.rotation.y) * 0.035;
      prismRef.current.rotation.z +=
        (targetAngle - prismRef.current.rotation.z) * 0.035;
    }

    if (sceneRef.current) {
      sceneRef.current.position.y +=
        (scroll * 0.16 - sceneRef.current.position.y) * 0.025;
      sceneRef.current.scale.setScalar(1 - scroll * 0.012);
      sceneRef.current.rotation.y +=
        (scroll * 0.035 - sceneRef.current.rotation.y) * 0.025;
    }

    const worldWidth = viewport.width;
    const worldHeight = viewport.height;
    const coreX = 0;
    const coreY = 0;
    const leftStart = -worldWidth * 0.52;
    const rightEnd = worldWidth * 0.52;
    const fanSpread = Math.min(worldHeight * 0.25, worldWidth * 0.12);
    const pointerShift = pointer.active ? pointer.y * fanSpread * 0.13 : 0;
    const prismAngle = prismRef.current?.rotation.z ?? Math.PI / 4;
    const dispersionShift = (prismAngle - (Math.PI * 3) / 8) * 0.16;
    placeBeam(beamRefs.current[0], leftStart, coreY, coreX - 0.62, coreY);
    for (let rayIndex = 0; rayIndex < 4; rayIndex += 1) {
      const rayAngle =
        rayBaseAngles[rayIndex] + dispersionShift * (rayIndex - 1.5);
      const targetX = rightEnd;
      const targetY = THREE.MathUtils.clamp(
        Math.tan(rayAngle) * (rightEnd - (coreX + 0.62)) + pointerShift,
        -worldHeight * 0.4,
        worldHeight * 0.4,
      );
      placeBeam(
        beamRefs.current[rayIndex + 1],
        coreX + 0.62,
        coreY,
        targetX,
        targetY,
      );

      const particles = particleRefs.current[rayIndex];
      if (!particles) continue;

      const startX = coreX + 0.66;
      for (let particleIndex = 0; particleIndex < 6; particleIndex += 1) {
        const progress =
          (elapsed.current * 0.12 + particleIndex / 6 + rayIndex * 0.13) % 1;
        particleTransform.position.set(
          startX + (targetX - startX) * progress,
          targetY * progress,
          0.04,
        );
        particleTransform.scale.setScalar(
          0.025 * (0.35 + Math.sin(progress * Math.PI) * 0.65),
        );
        particleTransform.updateMatrix();
        particles.setMatrixAt(particleIndex, particleTransform.matrix);
      }
      particles.instanceMatrix.needsUpdate = true;
    }
  });

  return (
    <group ref={sceneRef}>
      <ambientLight intensity={1.8} />
      <directionalLight position={[-3, 4, 6]} intensity={1.1} />
      <group rotation={[Math.PI / 2, 0, 0]}>
        <group ref={prismRef} rotation={[0, 0, (Math.PI * 3) / 8]}>
          <mesh>
            <cylinderGeometry args={[0.86, 0.86, 1.4, 3, 1, false]} />
            <meshStandardMaterial
              color="#e3ded4"
              roughness={0.82}
              metalness={0}
              transparent
              opacity={0.88}
            />
          </mesh>
          <lineSegments geometry={edges}>
            <lineBasicMaterial color="#5c5a54" transparent opacity={0.7} />
          </lineSegments>
          <mesh position={[0, 0, 0.62]}>
            <sphereGeometry args={[0.055, 12, 12]} />
            <meshBasicMaterial color="#0f766e" />
          </mesh>
        </group>
      </group>
      {Array.from({ length: 5 }, (_, index) => (
        <mesh
          key={index}
          ref={(mesh) => {
            beamRefs.current[index] = mesh;
          }}
        >
          <boxGeometry args={[1, index === 0 ? 0.025 : 0.018, 0.018]} />
          <meshBasicMaterial
            color={index === 0 ? "#817d75" : beamColors[index - 1]}
            transparent
            opacity={index === 0 ? 0.28 : 0.34}
            depthWrite={false}
          />
        </mesh>
      ))}
      {beamColors.map((color, index) => (
        <instancedMesh
          key={`particles-${color}`}
          ref={(mesh) => {
            particleRefs.current[index] = mesh;
          }}
          args={[undefined, undefined, 6]}
        >
          <sphereGeometry args={[1, 6, 6]} />
          <meshBasicMaterial
            color={color}
            transparent
            opacity={0.48}
            depthWrite={false}
          />
        </instancedMesh>
      ))}
    </group>
  );
}

export default function PrismCanvas(props: PrismCanvasProps) {
  const handleCreated = ({ gl }: { gl: THREE.WebGLRenderer }) => {
    gl.domElement.addEventListener(
      "webglcontextlost",
      (event) => {
        event.preventDefault();
        props.onFallback();
      },
      { once: true },
    );
  };

  return (
    <Canvas
      orthographic
      camera={{ position: [0, 0, 9.5], zoom: 72, near: 0.1, far: 40 }}
      dpr={[1, 1.25]}
      frameloop="always"
      gl={{ alpha: true, antialias: false, powerPreference: "low-power" }}
      onCreated={handleCreated}
      fallback={null}
    >
      <Prism {...props} />
    </Canvas>
  );
}
