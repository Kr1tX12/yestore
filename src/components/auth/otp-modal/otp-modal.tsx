import {
  AlertDialogHeader,
  AlertDialogFooter,
  AlertDialog,
  AlertDialogContent,
  AlertDialogTitle,
  AlertDialogDescription,
  AlertDialogAction,
} from "@/components/ui/alert-dialog";
import React, { useState } from "react";
import { FormInputOTP } from "./form-input-otp";
import { Loader2, SendIcon, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { sendEmailOTP, verifySecret } from "@/lib/actions/user.actions";
import { useRouter } from "next/navigation";
import ErrorMessage from "../error-message";

const OTPModal = ({
  accountId,
  email,
}: {
  accountId: string;
  email: string;
}) => {
  const router = useRouter();

  const [open, setOpen] = useState<boolean>(true);
  const [password, setPassword] = useState<string>("");
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [errorMessage, setErrorMessage] = useState<null | string>(null);
  const isPasswordEntered = password.length >= 6;

  const handleSubmit = async (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      const { sessionId } = await verifySecret({ accountId, password });

      if (sessionId) {
        router.push("/");
      }
    } catch (error) {
      const errorMessage =
        error instanceof Error ? error.message : JSON.stringify(error);
      setErrorMessage(errorMessage);
      console.log("Failed to verify OTP", error);
    }

    setIsLoading(false);
  };

  const handleResetOTP = async () => {
    await sendEmailOTP({ email });
  };

  return (
    <AlertDialog open={open} onOpenChange={setOpen}>
      <AlertDialogContent className="bg-zinc-950 flex flex-col justify-center items-center gap-8">
        <AlertDialogHeader>
          <AlertDialogTitle className="text-center text-xl flex gap-2 items-center">
            <SendIcon className="size-5" />
            Вам отправили код для входа
          </AlertDialogTitle>
          <AlertDialogDescription className="text-center">
            На почту{" "}
            <span className="text-blue-400">
              {email || "nion19255@gmail.com"}
            </span>
            . Введите его здесь:
          </AlertDialogDescription>
        </AlertDialogHeader>
        <Button
          onClick={() => setOpen(false)}
          size="icon"
          variant="ghost"
          className="absolute top-1 right-1 text-zinc-500"
        >
          <X className="size-12" />
        </Button>
        <FormInputOTP value={password} onChange={setPassword} />
        <AlertDialogFooter className="w-full">
          <AlertDialogAction
            className="w-full mx-10"
            disabled={!isPasswordEntered || isLoading}
            onClick={handleSubmit}
          >
            {isLoading && <Loader2 className="animate-spin" />}
            <span>Продолжить</span>
          </AlertDialogAction>
        </AlertDialogFooter>
        <div className="flex flex-col">
          <ErrorMessage
            className="text-center text-sm"
            errorMessage={errorMessage}
          />
          <div>
            Не получили код?{" "}
            <Button
              onClick={handleResetOTP}
              type="button"
              variant="link"
              className="pl-1 text-blue-400"
            >
              Отправьте ещё раз!
            </Button>
          </div>
        </div>
      </AlertDialogContent>
    </AlertDialog>
  );
};

export default OTPModal;
