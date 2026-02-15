import { assign } from "xstate";
import { fieldStructure } from "./fields";
import type { LandingContext, LandingEvent } from "./types";
import type { NonReducibleUnknown, ProvidedActor } from "xstate";

// UPDATE_FIELD
export const assignFieldValue = assign<LandingContext, LandingEvent, NonReducibleUnknown, LandingEvent, ProvidedActor>(({ context, event }) => {
  if (event.type !== "UPDATE_FIELD") return { formValues: context.formValues };
  const updatedFormValues = {
    ...context.formValues,
    [event.field]: event.value,
  };

  let selectedBookId = context.selectedBookId;
  if (event.field === "selectedBook") {
    selectedBookId = context.books.find((book) => book.title === event.value)?.id ?? selectedBookId;
  }

  return {
    formValues: updatedFormValues,
    selectedBookId,
  };
});

// SET_BOOK
export const assignSelectedBook = assign<LandingContext, LandingEvent, NonReducibleUnknown, LandingEvent, ProvidedActor>(({ context, event }) => {
  if (event.type !== "SET_BOOK") return {};
  return {
    selectedBookId: event.bookId,
    formValues: {
      ...context.formValues,
      selectedBook: context.books.find((b:any) => b.id === event.bookId)?.title ?? "",
    },
  };
});

// SET_PACE
export const assignPace = assign<LandingContext, LandingEvent, NonReducibleUnknown, LandingEvent, ProvidedActor>(({ context, event }) => {
  if (event.type !== "SET_PACE") return { pace: context.pace };
  return { pace: event.pace };
});

// RESET_FORM
export const resetForm = assign<LandingContext, LandingEvent, NonReducibleUnknown, LandingEvent, ProvidedActor>(() => ({
  selectedBookId: undefined,
  formValues: {},
  pace: "steady",
}));

// SIDE-EFFECTS (not assign)
export const logFormReady = ({ context }: any) => console.debug("Form layout ready:", fieldStructure(context));
export const notifySuccess = () => console.info("Landing form submitted successfully");
export const noop = () => undefined;
