import { useRef } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { Float, Sparkles } from '@react-three/drei';
import * as THREE from 'three';

// Procedural 3D Donut with Glaze & Sprinkles
function Donut({ position, scale = 1, rotationSpeed = 1 }) {
  const donutRef = useRef();

  useFrame((state, delta) => {
    if (donutRef.current) {
      donutRef.current.rotation.x += delta * 0.6 * rotationSpeed;
      donutRef.current.rotation.y += delta * 0.8 * rotationSpeed;
    }
  });

  return (
    <group ref={donutRef} position={position} scale={scale}>
      {/* Dough */}
      <mesh>
        <torusGeometry args={[0.5, 0.22, 16, 32]} />
        <meshStandardMaterial color="#E0AC69" roughness={0.4} />
      </mesh>
      {/* Pink Strawberry Glaze */}
      <mesh position={[0, 0, 0.04]}>
        <torusGeometry args={[0.5, 0.18, 16, 32]} />
        <meshStandardMaterial color="#FF4D8D" roughness={0.2} metalness={0.1} />
      </mesh>
    </group>
  );
}

// Procedural 3D Burger
function Burger({ position, scale = 1, rotationSpeed = 1 }) {
  const burgerRef = useRef();

  useFrame((state, delta) => {
    if (burgerRef.current) {
      burgerRef.current.rotation.y += delta * 0.7 * rotationSpeed;
      burgerRef.current.rotation.z += delta * 0.4 * rotationSpeed;
    }
  });

  return (
    <group ref={burgerRef} position={position} scale={scale}>
      {/* Top Bun */}
      <mesh position={[0, 0.28, 0]}>
        <sphereGeometry args={[0.55, 24, 16, 0, Math.PI * 2, 0, Math.PI / 2]} />
        <meshStandardMaterial color="#D7995B" roughness={0.4} />
      </mesh>
      {/* Lettuce */}
      <mesh position={[0, 0.18, 0]}>
        <cylinderGeometry args={[0.58, 0.58, 0.06, 16]} />
        <meshStandardMaterial color="#4CAF50" roughness={0.5} />
      </mesh>
      {/* Patty */}
      <mesh position={[0, 0.06, 0]}>
        <cylinderGeometry args={[0.54, 0.54, 0.14, 24]} />
        <meshStandardMaterial color="#5D4037" roughness={0.6} />
      </mesh>
      {/* Cheese */}
      <mesh position={[0, -0.04, 0]} rotation={[0, Math.PI / 4, 0]}>
        <boxGeometry args={[0.7, 0.04, 0.7]} />
        <meshStandardMaterial color="#FFB300" roughness={0.3} />
      </mesh>
      {/* Bottom Bun */}
      <mesh position={[0, -0.16, 0]}>
        <cylinderGeometry args={[0.52, 0.5, 0.18, 24]} />
        <meshStandardMaterial color="#D7995B" roughness={0.4} />
      </mesh>
    </group>
  );
}

// Procedural 3D Boba Tea Cup
function BobaCup({ position, scale = 1, rotationSpeed = 1 }) {
  const cupRef = useRef();

  useFrame((state, delta) => {
    if (cupRef.current) {
      cupRef.current.rotation.y += delta * 0.5 * rotationSpeed;
    }
  });

  return (
    <group ref={cupRef} position={position} scale={scale}>
      {/* Cup Body */}
      <mesh position={[0, 0, 0]}>
        <cylinderGeometry args={[0.35, 0.26, 0.9, 24]} />
        <meshPhysicalMaterial
          color="#FFF8FA"
          roughness={0.1}
          transmission={0.6}
          opacity={0.85}
          transparent
        />
      </mesh>
      {/* Milk Tea liquid inside */}
      <mesh position={[0, -0.05, 0]}>
        <cylinderGeometry args={[0.32, 0.24, 0.7, 24]} />
        <meshStandardMaterial color="#D7A177" roughness={0.3} />
      </mesh>
      {/* Lid */}
      <mesh position={[0, 0.46, 0]}>
        <cylinderGeometry args={[0.37, 0.37, 0.06, 24]} />
        <meshStandardMaterial color="#FF4D8D" roughness={0.2} />
      </mesh>
      {/* Straw */}
      <mesh position={[0.08, 0.6, 0]} rotation={[0, 0, 0.15]}>
        <cylinderGeometry args={[0.03, 0.03, 0.5, 12]} />
        <meshStandardMaterial color="#FF8FB1" roughness={0.2} />
      </mesh>
    </group>
  );
}

// Procedural 3D Pizza Slice
function PizzaSlice({ position, scale = 1 }) {
  const pizzaRef = useRef();

  useFrame((state, delta) => {
    if (pizzaRef.current) {
      pizzaRef.current.rotation.y += delta * 0.8;
      pizzaRef.current.rotation.x += delta * 0.3;
    }
  });

  return (
    <group ref={pizzaRef} position={position} scale={scale}>
      {/* Triangular crust & cheese */}
      <mesh rotation={[-Math.PI / 2, 0, 0]}>
        <cylinderGeometry args={[0.7, 0.7, 0.1, 3]} />
        <meshStandardMaterial color="#FFA000" roughness={0.4} />
      </mesh>
      {/* Crust rim */}
      <mesh position={[0, 0.05, 0.55]} rotation={[0, 0, Math.PI / 2]}>
        <cylinderGeometry args={[0.08, 0.08, 0.7, 12]} />
        <meshStandardMaterial color="#D7995B" roughness={0.5} />
      </mesh>
      {/* Pepperoni discs */}
      <mesh position={[-0.15, 0.06, 0.1]}>
        <cylinderGeometry args={[0.1, 0.1, 0.02, 12]} />
        <meshStandardMaterial color="#C2185B" roughness={0.3} />
      </mesh>
      <mesh position={[0.12, 0.06, 0.2]}>
        <cylinderGeometry args={[0.09, 0.09, 0.02, 12]} />
        <meshStandardMaterial color="#C2185B" roughness={0.3} />
      </mesh>
      <mesh position={[0.02, 0.06, -0.2]}>
        <cylinderGeometry args={[0.08, 0.08, 0.02, 12]} />
        <meshStandardMaterial color="#C2185B" roughness={0.3} />
      </mesh>
    </group>
  );
}

// Procedural Cupcake
function Cupcake({ position, scale = 1 }) {
  const cupcakeRef = useRef();

  useFrame((state, delta) => {
    if (cupcakeRef.current) {
      cupcakeRef.current.rotation.y += delta * 0.7;
    }
  });

  return (
    <group ref={cupcakeRef} position={position} scale={scale}>
      {/* Cup Base */}
      <mesh position={[0, -0.2, 0]}>
        <cylinderGeometry args={[0.38, 0.28, 0.45, 16]} />
        <meshStandardMaterial color="#FFE4EC" roughness={0.6} />
      </mesh>
      {/* Swirled Frosting Top */}
      <mesh position={[0, 0.15, 0]}>
        <sphereGeometry args={[0.42, 24, 16]} />
        <meshStandardMaterial color="#FF8FB1" roughness={0.2} />
      </mesh>
      {/* Cherry on Top */}
      <mesh position={[0, 0.56, 0]}>
        <sphereGeometry args={[0.1, 16, 16]} />
        <meshStandardMaterial color="#C2185B" roughness={0.1} metalness={0.2} />
      </mesh>
    </group>
  );
}

function FoodieGalaxy() {
  const groupRef = useRef();

  useFrame((state) => {
    const t = state.clock.getElapsedTime();
    if (groupRef.current) {
      groupRef.current.rotation.y = t * 0.18;
    }
  });

  return (
    <>
      <ambientLight intensity={0.9} />
      <directionalLight position={[5, 8, 5]} intensity={1.5} color="#FFF8FA" />
      <pointLight position={[-4, 2, 2]} intensity={0.8} color="#FF4D8D" />
      <pointLight position={[3, -2, 2]} intensity={0.7} color="#FFE4EC" />

      {/* Orbiting Food Galaxy */}
      <group ref={groupRef}>
        <Donut position={[4.2, 1.2, -1.0]} scale={0.65} />
        <Burger position={[-4.2, -0.8, -0.8]} scale={0.6} />
        <PizzaSlice position={[3.8, -1.8, -1.2]} scale={0.7} />
        <BobaCup position={[-3.8, 1.8, -1.2]} scale={0.65} />
        <Cupcake position={[4.0, 2.4, -1.2]} scale={0.65} />
        <Donut position={[-3.9, -2.2, -1.5]} scale={0.6} />
      </group>

      <Sparkles count={45} scale={7} size={2.5} speed={0.5} opacity={0.5} color="#FF8FB1" />
    </>
  );
}

export default function FoodieScene() {
  return (
    <div className="absolute inset-0 pointer-events-none z-0">
      <Canvas
        camera={{ position: [0, 0, 6.5], fov: 44 }}
        dpr={[1, 2]}
        gl={{ antialias: true, alpha: true }}
      >
        <FoodieGalaxy />
      </Canvas>
    </div>
  );
}
