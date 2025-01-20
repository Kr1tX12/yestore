import Link from "next/link";
import React from "react";

const AlreadyHaveAccount = () => {
  return (
    <div className="text-center text-sm">
      Нет аккаунта?{" "}
      <Link href="/sign-up" className="underline underline-offset-4">
        Зарегистрируйся
      </Link>
    </div>
  );
};

export default AlreadyHaveAccount;
