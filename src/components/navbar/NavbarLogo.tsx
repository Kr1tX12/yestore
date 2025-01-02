import Link from "next/link";
import Image from "next/image";

const NavbarLogo = () => {
  return (
    <Link href="/" className="flex items-center gap-2  transition-all">
      <Image
        src={"/images/logo.png"}
        alt="yestore logo"
        width={25}
        height={25}
        className="drop-shadow-[0_0_1px_#0ea5e9]"
      />
      <h1 className="font-extrabold">
        YEStore
      </h1>
    </Link>
  );
};

export default NavbarLogo;
