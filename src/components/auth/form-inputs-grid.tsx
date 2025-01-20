import React from "react";

const FormInputsGrid = ({ children }: { children: React.ReactNode }) => {
  return <div className="grid gap-4">{children}</div>;
};

export default FormInputsGrid;
