import * as THREE from "three";
import React, { useEffect, useRef } from "react";
import { Float, useGLTF } from "@react-three/drei";
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';

type ModelProps = React.JSX.IntrinsicElements['group'] & {
    cloudType: '1' | '2' | '3';
}

export default function Cloud({ cloudType, ...props }: ModelProps) {
  const { nodes } = useGLTF("/models/clouds.glb");
  const cloudRef = useRef<THREE.Group>(null);

  const getRandomGrayBlueColor = () => {
    const grayValue = Math.random() * 0.5 + 0.5; // Random value between 0.5 and 1
    const blueTint = Math.random() * 0.5; // Random blue tint between 0 and 0.2
    return new THREE.Color(grayValue, grayValue, grayValue + blueTint);
  };

  const randomGrayBlueMaterial = new THREE.MeshStandardMaterial({
    color: getRandomGrayBlueColor(),
    roughness: 1,
    metalness: 0,
  });

  useGSAP(() => {
    
    if (cloudRef.current) {
      const prevScale = cloudRef.current.scale;
      gsap.fromTo(cloudRef.current.scale, {
        x: 0,
        y: 0,
        z: 0,
      }, {
        x: prevScale.x,
        y: prevScale.y,
        z: prevScale.z,
        duration: 3,
      });
    }
  })

  return (
    <Float intensity={0.2}>
      <group {...props} dispose={null} ref={cloudRef}>
        {{
          "1": (
            <mesh
              castShadow
              receiveShadow
              geometry={nodes.root_Material_187_0.geometry}
              material={randomGrayBlueMaterial}
              position={[-0.041, 0.002, 0.175]}
              rotation={[0.097, 0.054, 0.076]}
              scale={[0.503, 0.336, 0.168]}
            />
          ),
          "2": (
            <mesh
              castShadow
              receiveShadow
              geometry={nodes.root_Material_187_0_1.geometry}
              material={randomGrayBlueMaterial}
              position={[0.187, -0.037, 0.282]}
              rotation={[0.097, 0.054, 0.076]}
              scale={[0.366, 0.245, 0.122]}
            />
          ),
          "3": (
            <mesh
              castShadow
              receiveShadow
              geometry={nodes.root_Material_187_0_2.geometry}
              material={randomGrayBlueMaterial}
              position={[-0.35, -0.175, 0.325]}
              rotation={[0, 0.05, 0]}
              scale={[0.403, 0.269, 0.135]}
            />
          ),
        }[cloudType]}
      </group>
    </Float>
  );
}

useGLTF.preload("/models/clouds.glb");