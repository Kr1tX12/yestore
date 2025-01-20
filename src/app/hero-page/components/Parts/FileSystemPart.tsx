"use client";

import { TypewriterEffectSmooth } from "@/components/aceternity/TypewriterEffect";
import { FileSystemDemo } from "@/components/fileSystems/file-system/_index";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/dist/ScrollTrigger";
import React, { useRef, useEffect } from "react";

gsap.registerPlugin(ScrollTrigger);

const words = [
  {
    text: "Попробуйте",
  },
  {
    text: "файловую",
    className: "text-blue-500 dark:text-blue-500",
  },
  {
    text: "систему",
    className: "text-blue-500 dark:text-blue-500",
  },
];
const FileSystemPart = () => {
  const containerRef = useRef<HTMLDivElement | null>(null);

  useGSAP(() => {
    gsap;
  });

  useEffect(() => {
    if (containerRef.current) {
      gsap.fromTo(
        containerRef.current,
        { opacity: 0, transform: "perspective(1000px) rotateX(20deg)", y: 50 },
        {
          opacity: 1,
          transform: "perspective(1000px) rotateX(0deg)",
          y: 0,
          duration: 1,
          scrollTrigger: {
            trigger: containerRef.current,
            start: "top 80%", // Adjust this value to control when the animation starts
            end: "top 30%", // Adjust this value to control when the animation ends
            toggleActions: "play none none reverse", // Play animation on scroll down, reverse on scroll up
          },
        }
      );
    }
  }, []);

  return (
    <section className="max-w-7xl w-full">
      <div
        className="flex flex-col gap-2 justify-center items-center"
        ref={containerRef}
      >
        <TypewriterEffectSmooth words={words} />
        <FileSystemDemo className="w-full" height={400} />
      </div>
    </section>
  );
};

export default FileSystemPart;
