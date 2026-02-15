import type { FC } from "react";
import type { BookOption, FieldDefinition, ReadingPace } from "../../pages/landing/machine/types";

type SignUpDialogProps = {
  fields: FieldDefinition[];
  formValues: Record<string, string | undefined>;
  selectedBook?: BookOption;
  pace: ReadingPace;
  submitting?: boolean;
  books: BookOption[];
  selectedBookId?: string;
  onFieldChange: (name: string, value: string) => void;
  onSubmit: () => void;
  onClose: () => void;
};

export const SignUpDialog: FC<SignUpDialogProps> = ({
  fields,
  formValues,
  selectedBook,
  pace,
  submitting,
  books,
  selectedBookId,
  onFieldChange,
  onSubmit,
  onClose,
}) => {
  const renderField = (field: FieldDefinition) => {
    if (
      field.renderIf &&
      !field.renderIf({
        books,
        pace,
        formValues,
        selectedBookId: selectedBookId ?? selectedBook?.id,
      })
    ) {
      return null;
    }

    if (field.type === "select") {
      return (
        <label key={field.name}>
          <span>{field.label}</span>
          <select
            value={formValues[field.name] ?? ""}
            onChange={(event) => onFieldChange(field.name, event.target.value)}
          >
            <option value="" disabled>
              Choose
            </option>
            {field.options?.map((option) => (
              <option key={option} value={option}>
                {option}
              </option>
            ))}
          </select>
        </label>
      );
    }

    if (field.type === "textarea") {
      return (
        <label key={field.name}>
          <span>{field.label}</span>
          <textarea
            rows={3}
            placeholder={field.placeholder}
            value={formValues[field.name] ?? ""}
            onChange={(event) => onFieldChange(field.name, event.target.value)}
          />
        </label>
      );
    }

    return (
      <label key={field.name}>
        <span>{field.label}</span>
        <input
          type={field.type}
          placeholder={field.placeholder}
          value={formValues[field.name] ?? ""}
          onChange={(event) => onFieldChange(field.name, event.target.value)}
        />
      </label>
    );
  };

  return (
    <div className="signup-dialog">
      <div className="dialog-backdrop" onClick={onClose} />
      <div className="dialog-card">
        <header>
          <p>Sign up</p>
          <h3>Personalize how you receive each chapter.</h3>
          {selectedBook && (
            <p className="selected-book">
              <strong>{selectedBook.title}</strong> · pace: {pace}
            </p>
          )}
        </header>
        <div className="dialog-meta">
          <p>
            We route harvesters from the library to your inbox; the form keep tabs on your intent and pace so you never
            miss a rhythm.
          </p>
          <div className="dialog-meta-details">
            <span>Selected paths: {selectedBook?.title ?? "Pick a focus"}</span>
            <span>Tempo: {pace}</span>
          </div>
        </div>
        <div className="dialog-form">
          {fields.map((field) => renderField(field))}
        </div>
        <footer>
          <button type="button" className="secondary" onClick={onClose}>
            Maybe later
          </button>
          <button type="button" className="primary" onClick={onSubmit} disabled={submitting}>
            {submitting ? "Sending sequence…" : "Send me the first module"}
          </button>
        </footer>
      </div>
    </div>
  );
};
