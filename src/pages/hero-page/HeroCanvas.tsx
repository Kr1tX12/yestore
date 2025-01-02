import React, { useState, useEffect } from "react";
import { Canvas } from "@react-three/fiber";
import Cloud from "./components/three/Cloud";
import CloudModel from "./components/three/CloudModel";

type deviceType = "xs" | "sm" | "lg" | "xl";
const HeroCanvas = () => {
  const [deviceType, setDeviceType] = useState<deviceType>("xl");
  const positions = getPositionsDependingOnDeviceType(deviceType);

  useEffect(() => {
    const updatePosition = () => {
      const width = window.innerWidth;
      let xPosition;

      // Adjust the x position based on the screen width
      if (width < 480) {
        setDeviceType("xs");
      } else if (width < 768) {
        setDeviceType("sm");
      } else if (width < 1524) {
        setDeviceType("lg");
      } else {
        setDeviceType("xl");
      }
    };

    // Initial position update
    updatePosition();

    // Add event listener for window resize
    window.addEventListener("resize", updatePosition);

    // Cleanup event listener on component unmount
    return () => window.removeEventListener("resize", updatePosition);
  }, []);

  return (
    <Canvas className="h-screen w-screen">
      <CloudModel position={[4.5, -2, 0]} scale={0.8} />
      <CloudModel

        position={[-5, -7, 0]}
        scale={0.8}
        rotation={[0, -Math.PI, 0]}
      />
      <CloudModel
        position={[1, 0, 1]}
        scale={0.3}
        rotation={[0, -Math.PI, 0]}
      />
      <CloudModel position={[1.7, 0.2, 1]} scale={0.1} />

      <directionalLight intensity={60} rotation={[0, 2, 1]} />
      <ambientLight intensity={2} />
    </Canvas>
  );
};

const getPositionsDependingOnDeviceType = (deviceType: deviceType) => {
  return {
    cloud2X:
      deviceType === "xs"
        ? -1
        : deviceType === "sm"
          ? -4
          : deviceType === "lg"
            ? -6
            : -13,
  };
};

export default HeroCanvas;
