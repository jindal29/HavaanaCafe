import { useRef, useEffect, useState } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { OrbitControls, Environment, Float, ContactShadows, PresentationControls } from '@react-three/drei';
import { useScroll, useSpring } from 'framer-motion';

function CoffeeCupModel({ scrollProgress }) {
  const group = useRef();

  useFrame((state) => {
    const t = state.clock.getElapsedTime();
    if (group.current) {
        // Subtle ambient idle float
        const ambientY = t * 0.1;
        
        // Read strictly from motion value .get() avoiding framer-motion-3d wrap
        const scrollAmount = scrollProgress.get(); 
        
        // Map 0-1 to rotation angles (0 to PI/4 locally for X, -1 to PI*2 for Y)
        const scrollRotX = 0.1 + (scrollAmount * (Math.PI / 4));
        const scrollRotY = -1 + (scrollAmount * (Math.PI * 2));
        
        // Combine Physics cleanly
        group.current.rotation.x = scrollRotX;
        group.current.rotation.y = scrollRotY + ambientY;
    }
  });

  return (
    <group ref={group} dispose={null}>
      <Float speed={2} rotationIntensity={0.2} floatIntensity={0.5} floatingRange={[-0.05, 0.05]}>
        {/* Cup Body (Tapered Cylinder) */}
        <mesh position={[0, 0, 0]} castShadow receiveShadow>
          <cylinderGeometry args={[1.2, 0.9, 2.5, 32]} />
          {/* Ceramic material */}
          <meshStandardMaterial color="#EED9C4" roughness={0.2} metalness={0.1} />
        </mesh>

        {/* Coffee inside */}
        <mesh position={[0, 1.2, 0]} rotation={[-Math.PI / 2, 0, 0]}>
          <circleGeometry args={[1.15, 32]} />
          <meshStandardMaterial color="#2E1B0F" roughness={0.8} />
        </mesh>

        {/* Plate / Saucer */}
        <mesh position={[0, -1.3, 0]} castShadow receiveShadow>
          <cylinderGeometry args={[1.8, 1.4, 0.2, 32]} />
          <meshStandardMaterial color="#EED9C4" roughness={0.2} metalness={0.1} />
        </mesh>
      </Float>
    </group>
  );
}

export default function ThreeCoffeeCup() {
  // Bind standard window scroll to smooth spring physics for buttery 3D interaction bounds
  const { scrollYProgress } = useScroll();
  const smoothProgress = useSpring(scrollYProgress, { stiffness: 100, damping: 30, restDelta: 0.001 });
  return (
    <div className="w-full h-full min-h-[400px] sm:min-h-[500px]">
      <Canvas shadows camera={{ position: [0, 2, 6], fov: 45 }}>
        <color attach="background" args={['transparent']} />
        <ambientLight intensity={0.6} />
        <directionalLight 
          position={[5, 10, 5]} 
          intensity={1.8} 
          castShadow 
          shadow-mapSize-width={1024} 
          shadow-mapSize-height={1024} 
        />
        <spotLight position={[-5, 5, 5]} intensity={1.2} color="#C4A484" />
        
        <PresentationControls 
          global 
          rotation={[0.1, 0, 0]} 
          polar={[-0.4, 0.2]} 
          azimuth={[-1, 0.75]} 
          config={{ mass: 2, tension: 400 }} 
          snap={{ mass: 4, tension: 400 }}
        >
          <CoffeeCupModel scrollProgress={smoothProgress} />
        </PresentationControls>

        <ContactShadows position={[0, -2, 0]} opacity={0.5} scale={10} blur={2.5} far={4} color="#000000" />
        <Environment preset="apartment" environmentIntensity={0.6} />
      </Canvas>
    </div>
  );
}
