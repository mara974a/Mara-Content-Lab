"use client";

import { Canvas, useFrame, useThree } from "@react-three/fiber";
import { useMemo, useRef } from "react";
import * as THREE from "three";
import type { SceneInteraction } from "./Scene3D";

interface PrismCanvasProps {
  interaction: React.RefObject<SceneInteraction>;
  onFallback: () => void;
}

const rayColors = [
  { color: "#10b981", glow: "#34d399", name: "Authority" },
  { color: "#06b6d4", glow: "#22d3ee", name: "Buyer Education" },
  { color: "#f59e0b", glow: "#fbbf24", name: "Recruitment" },
  { color: "#a855f7", glow: "#c084fc", name: "Speaking" },
];

const rayBaseAngles = [-0.32, -0.11, 0.11, 0.32];

function seededRandom(seed: number) {
  const value = Math.sin(seed * 12.9898) * 43758.5453;
  return value - Math.floor(value);
}

function placeBeam(
  mesh: THREE.Mesh | null,
  startX: number,
  startY: number,
  endX: number,
  endY: number,
  z = -0.1
) {
  if (!mesh) return;
  const dx = endX - startX;
  const dy = endY - startY;
  mesh.position.set((startX + endX) / 2, (startY + endY) / 2, z);
  mesh.rotation.z = Math.atan2(dy, dx);
  mesh.scale.x = Math.hypot(dx, dy);
}

function QuantumParticles({ count = 120 }: { count?: number }) {
  const pointsRef = useRef<THREE.Points>(null);

  const [positions, colors] = useMemo(() => {
    const pos = new Float32Array(count * 3);
    const col = new Float32Array(count * 3);
    const colorChoices = [
      new THREE.Color("#10b981"),
      new THREE.Color("#06b6d4"),
      new THREE.Color("#34d399"),
      new THREE.Color("#fbbf24"),
    ];

    for (let i = 0; i < count; i++) {
      pos[i * 3] = (seededRandom(i * 3 + 1) - 0.5) * 28;
      pos[i * 3 + 1] = (seededRandom(i * 3 + 2) - 0.5) * 16;
      pos[i * 3 + 2] = (seededRandom(i * 3 + 3) - 0.5) * 8 - 1;

      const c = colorChoices[Math.floor(seededRandom(i + count * 3 + 1) * colorChoices.length)];
      col[i * 3] = c.r;
      col[i * 3 + 1] = c.g;
      col[i * 3 + 2] = c.b;
    }
    return [pos, col];
  }, [count]);

  useFrame((_, delta) => {
    if (!pointsRef.current) return;
    const geom = pointsRef.current.geometry;
    const posAttr = geom.getAttribute("position") as THREE.BufferAttribute;
    const posArray = posAttr.array as Float32Array;

    for (let i = 0; i < count; i++) {
      // Gentle floating motion
      posArray[i * 3 + 1] += Math.sin(delta * 2 + i) * 0.005;
      posArray[i * 3] += Math.cos(delta * 1.5 + i) * 0.003;

      // Wrap around
      if (posArray[i * 3 + 1] > 9) posArray[i * 3 + 1] = -9;
      if (posArray[i * 3 + 1] < -9) posArray[i * 3 + 1] = 9;
      if (posArray[i * 3] > 15) posArray[i * 3] = -15;
      if (posArray[i * 3] < -15) posArray[i * 3] = 15;
    }
    posAttr.needsUpdate = true;
    pointsRef.current.rotation.y += delta * 0.02;
  });

  return (
    <points ref={pointsRef}>
      <bufferGeometry>
        <bufferAttribute
          attach="attributes-position"
          args={[positions, 3]}
        />
        <bufferAttribute
          attach="attributes-color"
          args={[colors, 3]}
        />
      </bufferGeometry>
      <pointsMaterial
        size={0.08}
        vertexColors
        transparent
        opacity={0.65}
        blending={THREE.AdditiveBlending}
        depthWrite={false}
      />
    </points>
  );
}

function PrismaticLaboratory({ interaction, onFallback }: PrismCanvasProps) {
  const crystalRef = useRef<THREE.Group>(null);
  const ring1Ref = useRef<THREE.Mesh>(null);
  const ring2Ref = useRef<THREE.Mesh>(null);
  const beamRefs = useRef<(THREE.Mesh | null)[]>([]);
  const particleRefs = useRef<(THREE.InstancedMesh | null)[]>([]);
  const sceneGroupRef = useRef<THREE.Group>(null);
  const particleTransform = useMemo(() => new THREE.Object3D(), []);
  const { viewport } = useThree();

  const elapsed = useRef(0);
  const slowFrames = useRef(0);
  const fallbackRequested = useRef(false);

  // Crystal wireframe edges
  const crystalEdges = useMemo(() => {
    const geometry = new THREE.OctahedronGeometry(1.2, 0);
    const edges = new THREE.EdgesGeometry(geometry);
    geometry.dispose();
    return edges;
  }, []);

  useFrame((_, delta) => {
    if (document.hidden) return;

    elapsed.current += delta;
    if (delta > 0.055) {
      slowFrames.current += 1;
    } else {
      slowFrames.current = Math.max(0, slowFrames.current - 1);
    }

    if (slowFrames.current > 120 && !fallbackRequested.current) {
      fallbackRequested.current = true;
      window.setTimeout(onFallback, 0);
      return;
    }

    const pointer = interaction.current;
    const scroll = pointer?.scroll ?? 0;
    const angleIndex = pointer?.angleIndex ?? -1;

    // Smooth crystal rotation and pointer tracking
    if (crystalRef.current) {
      const targetRotX = (pointer?.active ? pointer.y * 0.4 : 0) + Math.sin(elapsed.current * 0.7) * 0.15;
      const targetRotY = (pointer?.active ? pointer.x * 0.6 : 0) + elapsed.current * 0.35;
      const targetRotZ = (angleIndex >= 0 ? angleIndex * 0.25 : 0) + Math.cos(elapsed.current * 0.5) * 0.1;

      crystalRef.current.rotation.x += (targetRotX - crystalRef.current.rotation.x) * 0.05;
      crystalRef.current.rotation.y += (targetRotY - crystalRef.current.rotation.y) * 0.05;
      crystalRef.current.rotation.z += (targetRotZ - crystalRef.current.rotation.z) * 0.05;
    }

    // Gyroscope rings rotation
    if (ring1Ref.current) {
      ring1Ref.current.rotation.x += delta * 0.6;
      ring1Ref.current.rotation.y += delta * 0.4;
    }
    if (ring2Ref.current) {
      ring2Ref.current.rotation.y += delta * 0.5;
      ring2Ref.current.rotation.z += delta * 0.7;
    }

    // Scroll-reactive scene movement
    if (sceneGroupRef.current) {
      // Scene translates slightly as user scrolls down the page
      const targetY = scroll * 0.5 - 0.2;
      const targetX = (pointer?.active ? pointer.x * 0.25 : 0) + 1.2;
      sceneGroupRef.current.position.y += (targetY - sceneGroupRef.current.position.y) * 0.03;
      sceneGroupRef.current.position.x += (targetX - sceneGroupRef.current.position.x) * 0.03;
      sceneGroupRef.current.rotation.y = Math.sin(scroll * Math.PI) * 0.1;
    }

    // Dynamic beam geometry calculations
    const worldWidth = viewport.width;
    const coreX = (sceneGroupRef.current?.position.x ?? 1.2);
    const coreY = (sceneGroupRef.current?.position.y ?? 0);
    const leftStart = -worldWidth * 0.55;
    const rightEnd = worldWidth * 0.55;

    // Input beam
    placeBeam(beamRefs.current[0], leftStart, coreY, coreX - 1.1, coreY, -0.05);

    // 4 Refracted output beams
    for (let i = 0; i < 4; i++) {
      const isSelected = angleIndex === i;
      const baseAngle = rayBaseAngles[i];
      const fanSpread = (angleIndex >= 0 ? 0.38 : 0.3) + Math.sin(elapsed.current * 1.2) * 0.02;
      const angle = baseAngle * fanSpread * 2.5;

      const targetX = rightEnd;
      const targetY = coreY + Math.tan(angle) * (rightEnd - coreX);

      const beamMesh = beamRefs.current[i + 1];
      if (beamMesh) {
        placeBeam(beamMesh, coreX + 1.1, coreY, targetX, targetY, -0.05);
        const mat = beamMesh.material as THREE.MeshBasicMaterial;
        const targetOpacity = isSelected ? 0.85 : 0.4;
        mat.opacity += (targetOpacity - mat.opacity) * 0.08;
      }

      // Stream particles along each ray
      const stream = particleRefs.current[i];
      if (stream) {
        const startX = coreX + 1.15;
        const startY = coreY;
        const count = 8;
        for (let pIdx = 0; pIdx < count; pIdx++) {
          const progress = (elapsed.current * 0.35 + pIdx / count + i * 0.2) % 1;
          const px = startX + (targetX - startX) * progress;
          const py = startY + (targetY - startY) * progress;
          const scale = isSelected ? 0.055 : 0.035;

          particleTransform.position.set(px, py, 0.02);
          particleTransform.scale.setScalar(scale * (0.4 + Math.sin(progress * Math.PI) * 0.6));
          particleTransform.updateMatrix();
          stream.setMatrixAt(pIdx, particleTransform.matrix);
        }
        stream.instanceMatrix.needsUpdate = true;
      }
    }
  });

  return (
    <>
      <ambientLight intensity={1.5} />
      <directionalLight position={[-4, 5, 8]} intensity={2.2} color="#f0fdf4" />
      <pointLight position={[1.5, 0, 2]} intensity={3.5} color="#34d399" distance={10} />
      <pointLight position={[-3, -2, 2]} intensity={2.0} color="#06b6d4" distance={8} />

      <QuantumParticles count={140} />

      <group ref={sceneGroupRef} position={[1.5, 0, 0]}>
        {/* Crystal Core Assembly */}
        <group ref={crystalRef}>
          {/* Main Translucent Glass Octahedron */}
          <mesh>
            <octahedronGeometry args={[1.15, 0]} />
            <meshStandardMaterial
              color="#0d2e26"
              roughness={0.18}
              metalness={0.8}
              transparent
              opacity={0.85}
              wireframe={false}
              depthWrite={true}
            />
          </mesh>

          {/* Glowing Luminous Edges */}
          <lineSegments geometry={crystalEdges}>
            <lineBasicMaterial color="#34d399" transparent opacity={0.9} linewidth={2} />
          </lineSegments>

          {/* Internal Radiant Singularity */}
          <mesh>
            <sphereGeometry args={[0.22, 16, 16]} />
            <meshBasicMaterial color="#ffffff" />
          </mesh>

          {/* Inner Cyan Core */}
          <mesh>
            <sphereGeometry args={[0.38, 16, 16]} />
            <meshBasicMaterial color="#22d3ee" transparent opacity={0.35} />
          </mesh>
        </group>

        {/* Gyroscope Precision Rings */}
        <mesh ref={ring1Ref}>
          <torusGeometry args={[1.65, 0.02, 16, 64]} />
          <meshStandardMaterial
            color="#34d399"
            emissive="#10b981"
            emissiveIntensity={0.6}
            metalness={0.9}
            roughness={0.2}
            transparent
            opacity={0.7}
          />
        </mesh>
        <mesh ref={ring2Ref}>
          <torusGeometry args={[1.9, 0.016, 16, 64]} />
          <meshStandardMaterial
            color="#22d3ee"
            emissive="#06b6d4"
            emissiveIntensity={0.5}
            metalness={0.9}
            roughness={0.2}
            transparent
            opacity={0.55}
          />
        </mesh>
      </group>

      {/* Input Source Laser Beam */}
      <mesh
        ref={(mesh) => {
          beamRefs.current[0] = mesh;
        }}
      >
        <boxGeometry args={[1, 0.045, 0.02]} />
        <meshBasicMaterial
          color="#34d399"
          transparent
          opacity={0.65}
          depthWrite={false}
          blending={THREE.AdditiveBlending}
        />
      </mesh>

      {/* 4 Refracted Dispersion Beams */}
      {rayColors.map((ray, index) => (
        <mesh
          key={`beam-${ray.name}`}
          ref={(mesh) => {
            beamRefs.current[index + 1] = mesh;
          }}
        >
          <boxGeometry args={[1, 0.04, 0.02]} />
          <meshBasicMaterial
            color={ray.glow}
            transparent
            opacity={0.45}
            depthWrite={false}
            blending={THREE.AdditiveBlending}
          />
        </mesh>
      ))}

      {/* Light stream particles along rays */}
      {rayColors.map((ray, index) => (
        <instancedMesh
          key={`particles-${ray.name}`}
          ref={(mesh) => {
            particleRefs.current[index] = mesh;
          }}
          args={[undefined, undefined, 8]}
        >
          <sphereGeometry args={[1, 8, 8]} />
          <meshBasicMaterial
            color={ray.glow}
            transparent
            opacity={0.75}
            blending={THREE.AdditiveBlending}
            depthWrite={false}
          />
        </instancedMesh>
      ))}
    </>
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
      { once: true }
    );
  };

  return (
    <Canvas
      orthographic
      camera={{ position: [0, 0, 10], zoom: 70, near: 0.1, far: 50 }}
      dpr={[1, 1.5]}
      frameloop="always"
      gl={{
        alpha: true,
        antialias: true,
        powerPreference: "high-performance",
      }}
      onCreated={handleCreated}
      fallback={null}
    >
      <PrismaticLaboratory {...props} />
    </Canvas>
  );
}
