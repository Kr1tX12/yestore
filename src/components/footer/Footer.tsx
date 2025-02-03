import React from "react";
import { Separator } from "../ui/separator";
import Link from "next/link";
import {
  DollarSignIcon,
  GithubIcon,
  InfoIcon,
  UserIcon,
  UsersIcon,
  YoutubeIcon,
} from "lucide-react";
import { cn } from "@/lib/utils";

const footerItems = [
  {
    name: "Контакты",
    href: "/contacts",
    icon: UserIcon,
  },
  {
    name: "О нас",
    href: "/about",
    icon: InfoIcon,
  },
  {
    name: "Прайс",
    href: "/pricing",
    icon: DollarSignIcon,
  },
  {
    name: "Пользователи",
    href: "/users",
    icon: UsersIcon,
  },
];

const socialMediaItems = [
  {
    name: 'Мой ютубчик',
    href: "https://www.youtubchik.ru/youtube.ru/krit228",
    icon: YoutubeIcon,
  },
  {
    name: 'Мой Github',
    href: "https://github.com/Kr1tX12",
    icon: GithubIcon,
  },
];
const Footer = ({ className }: { className?: string }) => {
  return (
    <div className={cn("bg-card  border-t border-border w-full flex items-center justify-center", className)}>
      <div className="flex flex-col gap-4 p-4 w-full max-w-5xl">
        <div className="col-span-2 flex flex-col gap-2">
          <h2 className="font-bold text-xl ml-2">Сайт сделан Krit'ом</h2>
          <Separator />
        </div>
        <div className="grid grid-cols-2">
          <ul className="flex flex-col items-start gap-2 mx-2">
            {footerItems.map((item) => (
              <Link
                key={item.name}
                href={item.href}
                className="flex items-center gap-2 hover:text-sky-100 transition-all"
              >
                <item.icon className="size-5" />
                <span className="font-medium">{item.name}</span>
              </Link>
            ))}
          </ul>
          <ul className="flex flex-col items-start gap-2 mx-2">
            {socialMediaItems.map((item) => (
              <Link
                key={item.name}
                href={item.href}
                className="hover:text-sky-100 transition-all flex gap-2 items-center"
              >
                <item.icon className="size-6" />
                <span className="font-medium">{item.name}</span>
              </Link>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
};

export default Footer;
