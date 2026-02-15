import { useMemo } from "react";
import { useMachine } from "@xstate/react";

import { SignUpDialog } from "../../components/landing/SignUpDialog";
import { BooksShowcase } from "../../components/landing/BooksShowcase";
import { LandingHero } from "../../components/landing/LandingHero";
import { ModularEngine } from "../../components/landing/ModularEngine";
import { PaceSelector } from "../../components/landing/PaceSelector";
import { fieldStructure, landingMachine } from "./machine";

export const LandingPage = () => {
  const [state, send] = useMachine(landingMachine);
  const formFields = useMemo(() => fieldStructure(state.context), [state.context]);
  const selectedBook = state.context.books.find((book) => book.id === state.context.selectedBookId);

  return (
    <main className="landing-page">
      <LandingHero
        onPrimary={() => send({ type: "OPEN_FORM" })}
        onSecondary={() => send({ type: "OPEN_FORM" })}
        highlightSummary={selectedBook?.tagline}
      />
      <section className="library-stage">
        <BooksShowcase
          books={state.context.books}
          selectedId={state.context.selectedBookId}
          onSelect={(id) => send({ type: "SET_BOOK", bookId: id })}
        />
      </section>
      <section className="modular-stage">
        <div className="section-heading">
          <h2>Modular Engine</h2>
          <p>Every path is curated, every pace tracked, every ping tracked back to you.</p>
        </div>
        <ModularEngine />
      </section>
      <section className="pace-stage">
        <div className="section-heading">
          <h2>Reading tempo animation</h2>
          <p>Tell us how you like to absorb chapters and the engine will breathe them in.</p>
        </div>
        <PaceSelector pace={state.context.pace} onChange={(pace) => send({ type: "SET_PACE", pace })} />
      </section>
      <section className="cta-panel">
        <div className="cta-copy">
          <p className="cta-eyebrow">The Sapien Paradox</p>
          <h3>Join 5,000+ sapiens rewriting the way we learn.</h3>
          <p>Fill the form, tell us your intent, and we will send the first packet curated to you.</p>
          <button className="primary" type="button" onClick={() => send({ type: "OPEN_FORM" })}>
            Use the form
          </button>
        </div>
        <div className="cta-visual">
          <div />
          <div />
          <div />
        </div>
      </section>
      {(state.matches("form") || state.matches("submitting")) && (
        <SignUpDialog
          fields={formFields}
          formValues={state.context.formValues}
          selectedBook={selectedBook}
          pace={state.context.pace}
          submitting={state.matches("submitting")}
          onFieldChange={(name, value) => send({ type: "UPDATE_FIELD", field: name, value })}
          onSubmit={() => send({ type: "SUBMIT" })}
          onClose={() => send({ type: "CLOSE_FORM" })}
          books={state.context.books}
          selectedBookId={state.context.selectedBookId}
        />
      )}
    </main>
  );
};
