import { useEffect } from "react";
import Book from "../../components/Book/Book";
import { BookData } from "../../models/BookData";
import "./Library.css";
type LibraryProps = {
  books: BookData[];
};

function Library(props: LibraryProps) {
  function alignBooksBottom(books: BookData[]) {
    //calculate max height of books
    let maxHeight = 0;
    for (let i = 0; i < books.length; i++) {
      const height = Number(books[i].height.split("px")[0]);
      if (height > maxHeight) {
        maxHeight = height;
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
    alignBooksBottom(props.books);
  }, []);

  return (
    <div className="container flex flex-column items-center justify-center p-4">
      <div className="w-1/2 items-center justify-center text-center  bg-white rounded text-black pt-2">
        <p className="font-bold text-2xl">My Library:</p>
      </div>
      <div className="bookshelf flex flex-row align-bottom mt-20">
        {props.books.map((book: BookData, index: number) => (
          <Book bookData={book} index={index} key={index} />
        ))}
      </div>
      <div
        className="a bg-green-500 items-center justify-center text-center text-black -mt-10"
        style={{
          width: "700px",
        }}
      ></div>
    </div>
  );
}

export default Library;
