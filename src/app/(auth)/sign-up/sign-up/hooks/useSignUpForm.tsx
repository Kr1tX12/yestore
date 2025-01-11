import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { useState } from "react";
import { createAccount } from "@/lib/actions/user.actions";

const formSchema = z.object({
  username: z.string().min(2).max(50),
  email: z.string().min(2).max(255),
});

export const useSignUpForm = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [accountId, setAccountId] = useState<string>("");

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      username: "",
      email: "",
    },
  });

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    setIsLoading(true);
    setErrorMessage(null);

    try {
      const user = await createAccount({
        fullname: values.username || "",
        email: values.email,
      });

      setAccountId(user.accountId);
    } catch (e) {
      setErrorMessage("Не получилось создать аккаунт, попробуйте ещё раз");
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
