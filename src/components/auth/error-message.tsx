import clsx from "clsx";
import React from "react";

const ErrorMessage = ({
  errorMessage,
  className,
}: {
  errorMessage: string | null;
  className?: string;
}) => {
  return (
    errorMessage && (
      <p className={clsx("text-red-400", className)}>{errorMessage}</p>
    )
  );
};

export default ErrorMessage;
