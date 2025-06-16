'use client';

import * as THREE from 'three';
import { Suspense, useEffect, useRef, useState } from 'react';
import { Canvas, useFrame, useThree } from '@react-three/fiber';
import { useProgress } from '@react-three/drei';
import { Box } from '@mui/material';
import { motion } from 'framer-motion';
import { usePalette } from '@/theme';

function Clouds() {
  const [clouds, setClouds] = useState<THREE.Mesh[]>([]);

  useEffect(() => {
    new THREE.TextureLoader().load('/models/smoke.webp', (texture) => {
      const cloudMeshes: THREE.Mesh[] = [];
      const cloudGeometry = new THREE.PlaneGeometry(1000, 500);
      const cloudMaterial = new THREE.MeshLambertMaterial({
        map: texture,
        transparent: true,
        opacity: 0.2,
      });

      for (let i = 0; i < 30; i++) {
        const mesh = new THREE.Mesh(cloudGeometry, cloudMaterial);

        mesh.position.set(
          Math.random() * 800 - 400,
          500,
          Math.random() * 500 - 400,
        );
        mesh.rotation.set(1.18, -0.12, Math.random() * Math.PI * 2);

        cloudMeshes.push(mesh);
      }

      setClouds(cloudMeshes);
    });
  }, []);

  useFrame(() => {
    clouds.forEach((cloud) => (cloud.rotation.z -= 0.0005));
  });

  return (
    <>
      {clouds.map((cloud, i) => (
        <primitive object={cloud} key={i} />
      ))}
    </>
  );
}

function Flash() {
  const ref = useRef<THREE.PointLight>(null);
  const { primary } = usePalette();

  useFrame(() => {
    if (!ref.current) return;

    if (Math.random() > 0.99 && ref.current.power < 100) {
      ref.current.position.set(
        Math.random() * 400,
        300 + Math.random() * 200,
        100,
      );
      ref.current.power = 50 + Math.random() * 500;
    }

    if (ref.current.power > 0) {
      ref.current.power *= 0.9;

      if (ref.current.power < 10) ref.current.power = 0;
    }
  });

  return (
    <pointLight
      ref={ref}
      color={primary.main}
      intensity={50}
      distance={500}
      decay={0.1}
      position={[200, 300, 100]}
    />
  );
}

function Lights() {
  return (
    <>
      <ambientLight intensity={0.3} color={0x555555} />
      <directionalLight position={[0, 0, 1]} intensity={1.5} color={0xffeedd} />
    </>
  );
}

function Group() {
  const { scene } = useThree();
  const { background } = usePalette();
  const group = useRef<THREE.Group>(null);

  useEffect(() => {
    scene.fog = new THREE.FogExp2(background.default, 0.0025);
  }, [scene, background]);

  return (
    <group ref={group}>
      <Lights />
      <Flash />
      <Clouds />
    </group>
  );
}

export default function Scene() {
  const { active, progress } = useProgress();

  const variants = {
    hidden: { opacity: 0, transition: { duration: 0.5, delay: 0.5 } },
    visible: { opacity: 1, transition: { duration: 0.5, delay: 0.5 } },
  };

  return (
    <Box position="fixed" width="100%" height="100%" zIndex={-1}>
      <Box
        position="absolute"
        width="100%"
        height="100%"
        overflow="hidden"
        component={motion.div}
        variants={variants}
        animate={!active && progress === 100 ? 'visible' : 'hidden'}
        initial="hidden"
      >
        <Canvas camera={{ rotation: [1.16, -0.12, 0.27] }}>
          <Suspense fallback={null}>
            <Group />
          </Suspense>
        </Canvas>
      </Box>
    </Box>
  );
}
