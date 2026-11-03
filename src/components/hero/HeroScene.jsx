import { useRef, useMemo } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { Float, Sparkles, Center } from '@react-three/drei';
import * as THREE from 'three';

// 3D Heart Geometry Shape
function HeartMesh({ position, scale = 1, color = "#FF8FB1", speed = 1.5, rotationSpeed = 0.8 }) {
  const meshRef = useRef();

  const heartShape = useMemo(() => {
    const shape = new THREE.Shape();
    const x = 0, y = 0;
    shape.moveTo(x + 0.25, y + 0.25);
    shape.bezierCurveTo(x + 0.25, y + 0.25, x + 0.2, y, x, y);
    shape.bezierCurveTo(x - 0.3, y, x - 0.3, y + 0.35, x - 0.3, y + 0.35);
    shape.bezierCurveTo(x - 0.3, y + 0.55, x - 0.1, y + 0.77, x + 0.25, y + 1.0);
    shape.bezierCurveTo(x + 0.6, y + 0.77, x + 0.8, y + 0.55, x + 0.8, y + 0.35);
    shape.bezierCurveTo(x + 0.8, y + 0.35, x + 0.8, y, x + 0.5, y);
    shape.bezierCurveTo(x + 0.35, y, x + 0.25, y + 0.25, x + 0.25, y + 0.25);
    return shape;
  }, []);

  const extrudeSettings = useMemo(() => ({
    depth: 0.15,
    bevelEnabled: true,
    bevelSegments: 4,
    steps: 1,
    bevelSize: 0.06,
    bevelThickness: 0.06
  }), []);

  useFrame((state) => {
    if (!meshRef.current) return;
    const t = state.clock.getElapsedTime() * speed;
    meshRef.current.rotation.y = Math.sin(t * rotationSpeed) * 0.4;
    meshRef.current.rotation.z = Math.cos(t * 0.5) * 0.15;
    meshRef.current.position.y = position[1] + Math.sin(t) * 0.2;
  });

  return (
    <mesh
      ref={meshRef}
      position={position}
      scale={scale}
      rotation={[Math.PI, 0, 0]}
    >
      <extrudeGeometry args={[heartShape, extrudeSettings]} />
      <meshStandardMaterial
        color={color}
        roughness={0.2}
        metalness={0.1}
        emissive={color}
        emissiveIntensity={0.2}
      />
    </mesh>
  );
}

// 3D Glossy Balloon
function Balloon({ position, color = "#FF4D8D", scale = 1, swayOffset = 0 }) {
  const groupRef = useRef();

  useFrame((state) => {
    if (!groupRef.current) return;
    const t = state.clock.getElapsedTime() + swayOffset;
    groupRef.current.position.y = position[1] + Math.sin(t * 1.2) * 0.25;
    groupRef.current.rotation.z = Math.sin(t * 0.8) * 0.08;
    groupRef.current.rotation.x = Math.cos(t * 0.9) * 0.06;
  });

  return (
    <group ref={groupRef} position={position} scale={scale}>
      {/* Balloon Body */}
      <mesh scale={[1, 1.25, 1]} castShadow>
        <sphereGeometry args={[0.55, 32, 32]} />
        <meshPhysicalMaterial
          color={color}
          roughness={0.15}
          metalness={0.1}
          clearcoat={0.9}
          clearcoatRoughness={0.1}
          reflectivity={0.9}
        />
      </mesh>

      {/* Balloon Knot */}
      <mesh position={[0, -0.7, 0]} rotation={[0, 0, Math.PI]}>
        <coneGeometry args={[0.08, 0.12, 16]} />
        <meshStandardMaterial color={color} roughness={0.3} />
      </mesh>

      {/* Balloon String */}
      <mesh position={[0, -1.3, 0]}>
        <cylinderGeometry args={[0.005, 0.005, 1.1, 8]} />
        <meshBasicMaterial color="#FFC2D6" opacity={0.6} transparent />
      </mesh>
    </group>
  );
}

// 3D Birthday Cake with Flickering Candle
function BirthdayCake({ position = [0, -1.2, 0], scale = 1 }) {
  const cakeRef = useRef();
  const flameRef = useRef();
  const lightRef = useRef();

  useFrame((state) => {
    const t = state.clock.getElapsedTime();
    if (cakeRef.current) {
      cakeRef.current.rotation.y = t * 0.25;
    }
    // Flame flicker
    if (flameRef.current) {
      const flicker = 1 + Math.sin(t * 18) * 0.15 + Math.cos(t * 27) * 0.1;
      flameRef.current.scale.set(flicker, flicker * 1.2, flicker);
    }
    if (lightRef.current) {
      lightRef.current.intensity = 1.5 + Math.sin(t * 20) * 0.4;
    }
  });

  return (
    <group ref={cakeRef} position={position} scale={scale}>
      {/* Bottom Plate */}
      <mesh position={[0, 0, 0]} receiveShadow>
        <cylinderGeometry args={[1.6, 1.7, 0.1, 36]} />
        <meshStandardMaterial color="#FFFFFF" roughness={0.15} metalness={0.2} />
      </mesh>

      {/* Bottom Tier (Pink Velvet) */}
      <mesh position={[0, 0.45, 0]} castShadow receiveShadow>
        <cylinderGeometry args={[1.3, 1.3, 0.8, 36]} />
        <meshStandardMaterial color="#FFE4EC" roughness={0.4} />
      </mesh>

      {/* Frosting drips / layer */}
      <mesh position={[0, 0.85, 0]}>
        <cylinderGeometry args={[1.32, 1.32, 0.12, 36]} />
        <meshStandardMaterial color="#FF8FB1" roughness={0.3} />
      </mesh>

      {/* Top Tier (Cream White) */}
      <mesh position={[0, 1.25, 0]} castShadow receiveShadow>
        <cylinderGeometry args={[0.9, 0.9, 0.7, 36]} />
        <meshStandardMaterial color="#FFF8FA" roughness={0.35} />
      </mesh>

      {/* Frosting top layer */}
      <mesh position={[0, 1.6, 0]}>
        <cylinderGeometry args={[0.92, 0.92, 0.1, 36]} />
        <meshStandardMaterial color="#FFC2D6" roughness={0.3} />
      </mesh>

      {/* Candle Body */}
      <mesh position={[0, 1.95, 0]} castShadow>
        <cylinderGeometry args={[0.06, 0.06, 0.6, 20]} />
        <meshStandardMaterial color="#FF4D8D" roughness={0.2} />
      </mesh>

      {/* Candle Wick */}
      <mesh position={[0, 2.3, 0]}>
        <cylinderGeometry args={[0.015, 0.015, 0.1, 8]} />
        <meshBasicMaterial color="#333333" />
      </mesh>

      {/* Glowing Flame */}
      <group position={[0, 2.45, 0]}>
        <mesh ref={flameRef}>
          <sphereGeometry args={[0.07, 16, 16]} />
          <meshBasicMaterial color="#FFB300" />
        </mesh>
        <pointLight
          ref={lightRef}
          color="#FF9E00"
          intensity={2.2}
          distance={4}
          decay={2}
        />
      </group>
    </group>
  );
}

// Drifting Rose Petals
function DriftingPetals({ count = 25 }) {
  const petals = useMemo(() => {
    return Array.from({ length: count }, () => ({
      position: [
        (Math.random() - 0.5) * 12,
        Math.random() * 8 - 4,
        (Math.random() - 0.5) * 6
      ],
      speed: 0.4 + Math.random() * 0.6,
      rotSpeed: 0.5 + Math.random() * 1.5,
      scale: 0.1 + Math.random() * 0.15
    }));
  }, [count]);

  const petalRefs = useRef([]);

  useFrame((state, delta) => {
    petals.forEach((p, idx) => {
      const mesh = petalRefs.current[idx];
      if (!mesh) return;

      mesh.position.y -= p.speed * delta;
      mesh.rotation.x += p.rotSpeed * delta;
      mesh.rotation.y += p.rotSpeed * 0.7 * delta;

      // Wrap around
      if (mesh.position.y < -4.5) {
        mesh.position.y = 4.5;
        mesh.position.x = (Math.random() - 0.5) * 10;
      }
    });
  });

  return (
    <group>
      {petals.map((p, idx) => (
        <mesh
          key={idx}
          ref={(el) => (petalRefs.current[idx] = el)}
          position={p.position}
          scale={p.scale}
        >
          <sphereGeometry args={[0.5, 8, 8]} />
          <meshStandardMaterial
            color="#FF8FB1"
            roughness={0.6}
            transparent
            opacity={0.75}
          />
        </mesh>
      ))}
    </group>
  );
}

// Scene Root with Interactive Camera Parallax
function SceneContainer() {
  useFrame((state) => {
    const { x, y } = state.pointer;
    state.camera.position.x = THREE.MathUtils.lerp(state.camera.position.x, x * 0.8, 0.05);
    state.camera.position.y = THREE.MathUtils.lerp(state.camera.position.y, y * 0.6 + 0.3, 0.05);
    state.camera.lookAt(0, 0, 0);
  });

  return (
    <>
      <ambientLight intensity={0.8} />
      <directionalLight position={[4, 6, 5]} intensity={1.2} castShadow color="#FFF8FA" />
      <pointLight position={[-4, 3, 2]} intensity={0.8} color="#FF8FB1" />
      <pointLight position={[3, -2, 2]} intensity={0.6} color="#FFC2D6" />

      {/* Center 3D Birthday Cake */}
      <BirthdayCake position={[0, -1.9, -0.5]} scale={0.72} />

      {/* Floating 3D Balloons */}
      <Balloon position={[-2.8, 1.2, -1]} color="#FF4D8D" scale={0.9} swayOffset={0.2} />
      <Balloon position={[-2.1, 2.0, -0.5]} color="#FFFFFF" scale={0.8} swayOffset={1.5} />
      <Balloon position={[2.6, 1.5, -0.8]} color="#FF8FB1" scale={0.95} swayOffset={0.8} />
      <Balloon position={[2.0, 2.2, -0.3]} color="#FFC2D6" scale={0.75} swayOffset={2.2} />
      <Balloon position={[-3.6, 0.2, -2]} color="#FF659F" scale={0.7} swayOffset={3.0} />
      <Balloon position={[3.5, 0.4, -2]} color="#FFFFFF" scale={0.75} swayOffset={1.1} />

      {/* 3D Hearts Floating */}
      <HeartMesh position={[-1.6, 0.4, 0.5]} scale={0.6} color="#FF4D8D" speed={1.2} />
      <HeartMesh position={[1.7, 0.6, 0.6]} scale={0.55} color="#FF8FB1" speed={1.4} />
      <HeartMesh position={[-2.5, -1.0, 0.2]} scale={0.45} color="#FFC2D6" speed={1.0} />
      <HeartMesh position={[2.4, -0.8, 0.3]} scale={0.5} color="#FF4D8D" speed={1.6} />

      {/* Falling Rose Petals & Golden/Pink Sparkles */}
      <DriftingPetals count={30} />
      <Sparkles count={55} scale={8} size={2.5} speed={0.4} opacity={0.6} color="#FF8FB1" />
    </>
  );
}

import CanvasErrorBoundary from '../common/CanvasErrorBoundary';

export default function HeroScene() {
  const fallback = (
    <div className="absolute inset-0 pointer-events-none z-0 overflow-hidden">
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-vishwa-babypink/30 rounded-full blur-3xl animate-pulse" />
      <div className="absolute top-1/4 left-8 text-3xl animate-float opacity-70">🎈</div>
      <div className="absolute top-1/3 right-8 text-3xl animate-float-delayed opacity-70">💖</div>
      <div className="absolute bottom-24 left-12 text-2xl animate-float opacity-60">✨</div>
      <div className="absolute bottom-32 right-14 text-2xl animate-float-delayed opacity-60">🌸</div>
    </div>
  );

  return (
    <div className="absolute inset-0 pointer-events-none z-0">
      <CanvasErrorBoundary fallback={fallback}>
        <Canvas
          camera={{ position: [0, 0.4, 4.5], fov: 48 }}
          dpr={[1, 1.5]}
          gl={{ antialias: false, alpha: true, powerPreference: 'low-power' }}
        >
          <SceneContainer />
        </Canvas>
      </CanvasErrorBoundary>
    </div>
  );
}
