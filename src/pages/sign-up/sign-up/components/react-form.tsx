import { cn } from "@/lib/utils";
import React from "react";
import { Form } from "@/components/ui/form";
import { SubmitHandler, UseFormReturn } from "react-hook-form";

const ReactForm = ({
  form,
  className,
  onSubmit,
  props,
  children,
}: {
  children: React.ReactNode;
  form: UseFormReturn<any>;
  className: string | undefined;
  onSubmit: SubmitHandler<any>;
  props: object;
}) => {
  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className={cn("flex flex-col gap-6", className)}
        {...props}
      >
        {children}
      </form>
    </Form>
  );
};

export default ReactForm;
