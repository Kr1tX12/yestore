import * as THREE from "three";
import React, { useRef } from "react";
import { Float, useGLTF } from "@react-three/drei";
import { GLTF } from "three-stdlib";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";

type GLTFResult = GLTF & {
  nodes: {
    Object_2: THREE.Mesh;
  };
  materials: {
    ["Paint_-_Metallic_Silver"]: THREE.MeshStandardMaterial;
  };
};

export default function CloudModel(props: React.JSX.IntrinsicElements["group"]) {
  const { nodes, materials } = useGLTF("/models/cloud.glb") as GLTFResult;

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
      gsap.fromTo(
        cloudRef.current.scale,
        {
          x: 0,
          y: 0,
          z: 0,
        },
        {
          x: prevScale.x,
          y: prevScale.y,
          z: prevScale.z,
          duration: 3,
        }
      );
    }
  });

  return (
    <Float intensity={0.1}>
      <group {...props} dispose={null} ref={cloudRef}>
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.Object_2.geometry}
          material={randomGrayBlueMaterial}
          rotation={[-Math.PI / 2, 0, 0]}
        />
      </group>
    </Float>
  );
}

useGLTF.preload("/models/cloud.glb");
