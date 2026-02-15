export type ReadingPace = "crawl" | "steady" | "soar";

export interface BookOption {
  id: string;
  title: string;
  tagline: string;
  summary: string;
}

export interface LandingContext {
  books: BookOption[];
  selectedBookId?: string;
  pace: ReadingPace;
  formValues: Record<string, string | undefined>;
}

export type FieldInputType = "text" | "email" | "select" | "textarea";

export interface FieldDefinition {
  name: string;
  label: string;
  type: FieldInputType;
  placeholder?: string;
  options?: string[];
  renderIf?: (context: LandingContext) => boolean;
}

export type LandingEvent =
  | { type: "OPEN_FORM" }
  | { type: "CLOSE_FORM" }
  | { type: "SET_BOOK"; bookId: string }
  | { type: "SET_PACE"; pace: ReadingPace }
  | { type: "UPDATE_FIELD"; field: string; value: string }
  | { type: "SUBMIT" }
  | { type: "SUCCESS" }
  | { type: "FAILURE" }
  | { type: "PACE_TICK"; pace: ReadingPace };
