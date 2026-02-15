import { FieldDefinition, LandingContext } from "./types";

export const fieldStructure = (context: LandingContext): FieldDefinition[] => {
  const bookOptions = context.books.map((book) => book.title);

  return [
    {
      name: "fullName",
      label: "Full name",
      type: "text",
      placeholder: "Maria S. / Professor of Narrative Systems",
    },
    {
      name: "email",
      label: "Sapien email",
      type: "email",
      placeholder: "sapien@paradox.io",
    },
    {
      name: "selectedBook",
      label: "Book focus",
      type: "select",
      options: bookOptions,
      renderIf: () => bookOptions.length > 0,
    },
    {
      name: "paceNotes",
      label: "Reading intention",
      type: "textarea",
      placeholder: "What do you want to achieve after the first 3 chapters?",
      renderIf: (context) => Boolean(context.selectedBookId),
    },
  ];
};
