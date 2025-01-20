import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { useState } from "react";
import { createAccount, signInUser } from "@/lib/actions/user.actions";

const formSchema = z.object({
  email: z.string().min(2).max(255),
});

export const useSignInForm = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [accountId, setAccountId] = useState<string>("");

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: "",
    },
  });

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    setIsLoading(true);
    setErrorMessage(null);

    try {
      const user = await signInUser({
        email: values.email
      });

      setAccountId(user.accountId);
    } catch (e) {
      setErrorMessage("Не получилось войти в аккаунт, попробуйте ещё раз");
    } finally {
      setIsLoading(false);
    }
  };

  return {
    form,
    isLoading,
    errorMessage,
    accountId,
    onSubmit,
  };
};
