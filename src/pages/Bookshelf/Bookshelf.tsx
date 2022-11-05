import { useEffect } from "react";
import Book from "../../components/Book/Book";
import { BookData } from "../../models/BookData";
import "./Bookshelf.css";

type BookshelfProps = {
  books: BookData[];
};

function Bookshelf(props: BookshelfProps) {
  let books = props.books.filter((book) => !book.unread);
  function alignBooksBottom(books: BookData[]) {
    //calculate max height of books
    let maxHeight = 0;
    for (let i = 0; i < books.length; i++) {
      const height = Number(books[i].height.split("px")[0]);
      if (height > maxHeight) {
        maxHeight = height;
      }
    }
    //calculate max width of books
    let maxWidth = 0;
    for (let i = 0; i < books.length; i++) {
      const width = Number(books[i].spine.width.split("px")[0]);
      if (width > maxWidth) {
        maxWidth = width;
      }
    }
    // set margin-right of html books to max width- width of book
    const minMarginRight = 18;
    for (let i = 0; i < books.length; i++) {
      let book: HTMLElement | null = document.getElementById(`book-${i}`);
      if (book) {
        book.style.marginRight = `${
          Number(books[i].spine.width.split("px")[0]) -
          maxWidth +
          minMarginRight
        }px`;
      }
    }

    //set bottom property of book to maxheight - book.height
    for (let i = 0; i < books.length; i++) {
      let book: HTMLElement | null = document.getElementById(`book-${i}`);
      let child: HTMLElement | null | undefined =
        book?.querySelector(".side.spine");
      let height = child?.style.height;
      if (book && height) {
        (document.querySelector(`#book-${i}`) as HTMLElement).style.bottom = `${
          Number(height.split("px")[0]) - maxHeight
        }px`;
      }
    }
  }
  useEffect(() => {
    alignBooksBottom(books);
  }, []);

  return (
    <div className="container flex flex-column items-center justify-center p-4">
      <div className="bookshelf flex flex-row align-bottom mt-20">
        {books.map((book: BookData, index: number) => (
          <Book bookData={book} index={index} key={index} />
        ))}
      </div>
      <div className="box bg-white"></div>
    </div>
  );
}

export default Bookshelf;
