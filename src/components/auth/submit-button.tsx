import { Button } from "@/components/ui/button";
import { Loader2 } from "lucide-react";
import React from "react";

const SubmitButton = ({ isLoading }: { isLoading: boolean }) => {
  return (
    <Button type="submit" className="w-full" disabled={isLoading}>
      {isLoading && <Loader2 className="animate-spin" />}
      Войти
    </Button>
  );
};

export default SubmitButton;
