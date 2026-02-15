import type { LandingContext } from "./types";

const hasValue = (value?: string | undefined) => Boolean(value?.trim());

export const canSubmit = ({ context }: { context: LandingContext }) => {
  const formValues = context.formValues;
  return (
    hasValue(formValues.fullName) &&
    hasValue(formValues.email) &&
    Boolean(context.selectedBookId)
  );
};
