import React from "react";
import HeroCanvas from "./HeroCanvas";
import Button from "@/components/aceternity/Button";
import { Spotlight } from "@/components/aceternity/Spotlight";
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible";
import FileSystemDemo from "../../components/fileSystems/file-system/FileSystemDemo";
import { DemoChart } from "./components/DemoChart";
import {
  CodesandboxIcon,
  FacebookIcon,
  FigmaIcon,
  SlackIcon,
  TwitchIcon,
  YoutubeIcon,
} from "lucide-react";
import { Cover } from "@/components/aceternity/Cover";
import RightSide from "./components/RigthSide";
import FileSystemPart from "./components/Parts/FileSystemPart";

const HeroPage = () => {
  return (
    <div className="flex flex-col items-center justify-center w-full">
      <section className="grid sm:grid-cols-[8fr_7fr] w-full px-32 relative h-screen">
        <Spotlight
          className="-top-40 left-0 md:left-60 md:top-0"
          fill="#168afc"
        />
        <Spotlight
          className="-top-40 left-0 md:left-40 md:-top-96"
          fill="#168afc"
        />

        <div className="flex flex-col gap-5 pt-20 pl-10 z-50">
          <div className="flex gap-4 items-center justify-start translate-y-2">
            <CodesandboxIcon className="size-8" />
            <SlackIcon className="size-8" />
            <FacebookIcon className="size-8" />
            <FigmaIcon className="size-8" />
            <TwitchIcon className="size-8" />
            <YoutubeIcon className="size-8" />
          </div>
          <span className="text-left font-black text-7xl">
            Храните данные.
            <br /> <Cover className="">Безопасно</Cover>
          </span>
          <p className="text-zinc-300">
            Полностью{" "}
            <span className="text-lime-50 font-semibold">бесплатно</span>.
            Быстрая <span className="text-sky-100 font-semibold">скорость</span>
            . Отличная{" "}
            <span className="text-orange-50 font-semibold">надежность</span>
          </p>

          {/* <div className="max-w-96 w-full">
            <FileSystemDemo />
          </div> */}
        </div>
        <RightSide />

        <div className="absolute inset-0 z-10 !pointer-events-none">
          <HeroCanvas />
        </div>
      </section>
    </div>
  );
};

export default HeroPage;
