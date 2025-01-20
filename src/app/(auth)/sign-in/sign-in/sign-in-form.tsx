"use client";

import { useSignInForm } from "./hooks/useSignInForm";
import ReactForm from "../../../../components/auth/react-form";
import { FormInput } from "../../../../components/auth/FormInput";
import AlreadyHaveAccount from "./components/already-have-account";
import SubmitButton from "../../../../components/auth/submit-button";
import ErrorMessage from "../../../../components/auth/error-message";
import OtherSignUpWays from "../../../../components/auth/other-sign-up-ways";
import SignTitle from "../../../../components/auth/sign-title";
import FormInputsGrid from "../../../../components/auth/form-inputs-grid";
import OTPModal from "../../../../components/auth/otp-modal/otp-modal";

export function SignInForm({
  className,
  ...props
}: React.ComponentPropsWithoutRef<"form">) {
  const { isLoading, errorMessage, form, onSubmit, accountId } = useSignInForm();

  return (
    <>
      <ReactForm
        className={className}
        props={props}
        form={form}
        onSubmit={onSubmit}
      >
        <SignTitle title="Войти в аккаунт" description="Вы сможете снова хранить данные, сделав это" />
        <FormInputsGrid>
          <FormInput
            name="email"
            placeholder="kozelbaranov228@gmail.com"
            label="Электронная почта"
            control={form.control}
          />

          <SubmitButton isLoading={isLoading} />
          <ErrorMessage errorMessage={errorMessage} />

          <OtherSignUpWays />
        </FormInputsGrid>

        <AlreadyHaveAccount />
      </ReactForm>
      { accountId && <OTPModal accountId={accountId} email={form.getValues('email')} /> }
    </>
  );
}
