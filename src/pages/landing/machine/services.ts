import type { LandingContext } from "./types";

const API_BASE = process.env.REACT_APP_API_BASE_URL ?? "https://sapien-paradox-services.onrender.com";

export const submitLead = async ({ context }: { context: LandingContext }) => {
  const targetBook = context.books.find((book) => book.id === context.selectedBookId);
  const payload = {
    full_name: context.formValues.fullName ?? "",
    email: context.formValues.email ?? "",
    book_id: context.selectedBookId ?? "",
    book_title: targetBook?.title ?? "",
    pace: context.pace,
    notes: context.formValues.paceNotes ?? "",
  };

  const response = await fetch(`${API_BASE}/api/leads/`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json",
    },
    body: JSON.stringify(payload),
  });

  if (!response.ok) {
    const errorText = await response.text();
    throw new Error(errorText || "Failed to save lead");
  }

  return response.json();
};
