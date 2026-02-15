import { createMachine } from "xstate";
import { fromPromise } from "xstate/actors";
import { paceActor } from "./actors";
import { submitLead } from "./services";
import * as actions from "./actions";
import * as guards from "./guards";
import type { LandingContext, LandingEvent, BookOption } from "./types";
import type { MetaObject, NonReducibleUnknown, ParameterizedObject, ProvidedActor } from "xstate";

const curatedBooks: BookOption[] = [
  { id: "pathfinder", title: "Pathfinder Codex", tagline: "", summary: "" },
  { id: "solstice", title: "Solstice of the Soul", tagline: "", summary: "" },
  { id: "aurora", title: "Aurora Algorithm", tagline: "", summary: "" },
];

const submitLeadActor = fromPromise<void, LandingContext>(({ input }) => submitLead({ context: input }));

export const landingMachine = createMachine<
  LandingContext,
  LandingEvent,
  ProvidedActor,
  ParameterizedObject,
  ParameterizedObject,
  string,
  string,
  NonReducibleUnknown,
  NonReducibleUnknown,
  LandingEvent,
  MetaObject
>(
  {
    id: "landing",
    initial: "idle",
    context: {
      books: curatedBooks,
      pace: "steady",
      formValues: {},
      selectedBookId: undefined,
    } satisfies LandingContext,
    on: {
      SET_BOOK: { actions: ["assignSelectedBook"] },
      SET_PACE: { actions: ["assignPace"] },
    },
    states: {
      idle: {
        on: {
          OPEN_FORM: "form",
        },
      },
      form: {
        entry: ["logFormReady"],
        invoke: {
          id: "paceActor",
          src: "paceActor",
          input: ({ context }) => ({ pace: context.pace }),
        },
        on: {
          CLOSE_FORM: { target: "idle" },
          UPDATE_FIELD: { actions: ["assignFieldValue"] },
          SUBMIT: [
            {
              guard: "canSubmit",
              target: "submitting",
            },
          ],
          PACE_TICK: { actions: ["noop"] },
        },
      },
      submitting: {
        invoke: {
          id: "submitLead",
          src: "submitLeadActor",
          input: ({ context }) => context,
          onDone: { target: "success", actions: ["resetForm"] },
          onError: { target: "form" },
        },
      },
      success: {
        entry: ["notifySuccess"],
        on: {
          OPEN_FORM: { target: "form" },
        },
      },
    },
  },
  {
    actions,
    guards,
    actors: {
      paceActor,
      submitLeadActor,
    },
  }
);
