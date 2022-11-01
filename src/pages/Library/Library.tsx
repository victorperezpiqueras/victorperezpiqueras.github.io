import Book from "../../components/Book/Book";
import { BookData } from "../../models/BookData";

type LibraryProps = {
  books: BookData[];
};

function Library(props: LibraryProps) {
  let books = props.books.filter((book: any) => book.title === "Refactoring");
  console.log(books);
  return (
    <div className="container flex flex-column items-center justify-center  bg-white rounded text-black p-10">
      <p className="font-bold text-2xl">My Library:</p>
      <div className="bookshelf">
        {books.map((book: any) => (
          <Book bookData={book} />
        ))}
      </div>
    </div>
  );
}

export default Library;
