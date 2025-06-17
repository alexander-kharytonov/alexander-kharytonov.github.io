'use client';

import * as THREE from 'three';
import { usePathname } from 'next/navigation';
import { useRef, useMemo, useEffect } from 'react';
import { Canvas, useFrame, useThree } from '@react-three/fiber';
// import { OrbitControls } from '@react-three/drei';
import { Box } from '@mui/material';
import { motion } from 'framer-motion';
import { usePalette } from '@/theme';

export function WaveGrid({ pathname }: { pathname: string }) {
  const mesh = useRef<THREE.Points>(null);
  const time = useRef(0);
  const { camera } = useThree();
  const { primary } = usePalette();

  const positions = useMemo(() => {
    const size = 50;
    const sep = 1;
    const count = size * size;
    const posArray = new Float32Array(count * 3);

    let i = 0;

    for (let x = -size / 2; x < size / 2; x++) {
      for (let z = -size / 2; z < size / 2; z++) {
        posArray[i++] = x * sep;
        posArray[i++] = 0;
        posArray[i++] = z * sep;
      }
    }

    return posArray;
  }, []);

  useFrame((_, delta) => {
    time.current += delta * 2;

    const geometry = mesh.current?.geometry;
    const positionAttr = geometry?.getAttribute('position') as
      | THREE.BufferAttribute
      | undefined;

    if (positionAttr) {
      for (let i = 0; i < positionAttr.count; i++) {
        const x = positionAttr.getX(i);
        const z = positionAttr.getZ(i);
        const y =
          Math.sin((x + time.current) * 0.3) * 2 +
          Math.cos((z + time.current) * 0.5);

        positionAttr.setY(i, y);
      }

      positionAttr.needsUpdate = true;
    }
  });

  useEffect(() => {
    const targetY =
      pathname === '/projects' ? 50 : pathname === '/about' ? -20 : 0;

    camera.position.x += (10 - camera.position.x) * 0.01;
    camera.position.y += (targetY - camera.position.y) * 0.01;

    camera.lookAt(0, 0, 0);
  }, [camera, pathname]);

  return (
    <points ref={mesh}>
      <bufferGeometry>
        <bufferAttribute attach="attributes-position" args={[positions, 3]} />
      </bufferGeometry>
      <pointsMaterial color={primary.main} size={0.1} />
    </points>
  );
}

export default function BackgroundScene() {
  const pathname = usePathname();

  return (
    <Box
      position="fixed"
      width="100%"
      height="100%"
      component={motion.div}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 1 }}
    >
      <Canvas camera={{ position: [20, 20, 20], fov: 45 }}>
        <ambientLight intensity={0.45} />
        <WaveGrid pathname={pathname} />
        {/* <OrbitControls /> */}
      </Canvas>
    </Box>
  );
}
