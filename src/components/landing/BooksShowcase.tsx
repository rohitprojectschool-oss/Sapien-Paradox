import type { FC } from "react";
import type { BookOption } from "../../pages/landing/machine/types";

type BooksShowcaseProps = {
  books: BookOption[];
  selectedId?: string;
  onSelect: (id: string) => void;
};

export const BooksShowcase: FC<BooksShowcaseProps> = ({ books, selectedId, onSelect }) => (
  <section className="books-showcase">
    <div className="section-heading">
      <h2>The Interactive Library</h2>
      <p>We blend codices, raconteurs, and adaptive cues so the story remains alive.</p>
    </div>
    <div className="library-intro">
      <article className="library-slab legacy">
        <p className="slab-label">THE OLD WAY</p>
        <h3>Books as monoliths</h3>
        <p>Rigid chapters, dusty indexes, no feedback loop.</p>
        <ul>
          <li>One-size-fits-all delivery</li>
          <li>Static pacing</li>
          <li>Limited reflection prompts</li>
        </ul>
      </article>
      <article className="library-slab parasok">
        <p className="slab-label">THE PARASOK WAY</p>
        <h3>Living compendiums</h3>
        <p>Modulating rhythm, communal insights, and adaptive signposts.</p>
        <ul>
          <li>Choose a focus, we assemble the flow</li>
          <li>Signals tune the tempo always</li>
          <li>Every packet comes with reflective cues</li>
        </ul>
      </article>
    </div>
    <div className="books-grid">
      {books.map((book) => (
        <article
          key={book.id}
          className={`book-card ${selectedId === book.id ? "is-active" : ""}`}
          onClick={() => onSelect(book.id)}
        >
          <header>
            <p className="book-tagline">{book.tagline}</p>
            <h3>{book.title}</h3>
          </header>
          <p className="book-summary">{book.summary}</p>
        </article>
      ))}
    </div>
  </section>
);
