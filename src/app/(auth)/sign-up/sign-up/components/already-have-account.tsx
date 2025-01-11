import Link from "next/link";
import React from "react";

const AlreadyHaveAccount = () => {
  return (
    <div className="text-center text-sm">
      Уже есть аккаунт???{" "}
      <Link href="/sign-in" className="underline underline-offset-4">
        Войди
      </Link>
    </div>
  );
};

export default AlreadyHaveAccount;
