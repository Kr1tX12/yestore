"use client";

import { useSignUpForm } from "./hooks/useSignUpForm";
import ReactForm from "./components/react-form";
import { FormInput } from "./components/FormInput";
import AlreadyHaveAccount from "./components/already-have-account";
import SubmitButton from "./components/submit-button";
import ErrorMessage from "./components/error-message";
import OtherSignUpWays from "./components/other-sign-up-ways";
import SignUpTitle from "./components/sign-up-title";
import FormInputsGrid from "./components/form-inputs-grid";
import OTPModal from "./components/otp-modal/otp-modal";

export function SignUpForm({
  className,
  ...props
}: React.ComponentPropsWithoutRef<"form">) {
  const { isLoading, errorMessage, form, onSubmit, accountId } = useSignUpForm();

  return (
    <>
      <ReactForm
        className={className}
        props={props}
        form={form}
        onSubmit={onSubmit}
      >
        <SignUpTitle />
        <FormInputsGrid>
          <FormInput
            name="username"
            placeholder="Козёл баранов"
            label="Имя пользователя"
            control={form.control}
          />
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
