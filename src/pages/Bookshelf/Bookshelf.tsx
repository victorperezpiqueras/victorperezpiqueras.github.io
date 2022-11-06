import { useEffect, useState } from "react";
import Book from "../../components/Book/Book";
import { BookData } from "../../models/BookData";
import "./Bookshelf.css";

type BookshelfProps = {
  books: BookData[];
};

function Bookshelf(props: BookshelfProps) {
  const [isHovering, setIsHovering] = useState({});
  const handleMouseOver = (id) => {
    setIsHovering({ ...isHovering, [id]: true });
  };
  const handleMouseOut = (id) => {
    setIsHovering({ ...isHovering, [id]: false });
  };

  // all books have one tag, find all unique tags
  const tags = props.books
    .map((book) => book.tag)
    .filter((tag, index, self) => self.indexOf(tag) === index);

  // group books by tag
  const booksByTag = tags.map((tag) => {
    return {
      tag,
      books: props.books.filter((book) => book.tag === tag),
    };
  });

  function alignBooksBottom(books: BookData[]) {
    //calculate max height of books
    let maxHeight = 0;
    for (let i = 0; i < books.length; i++) {
      const height = Number(books[i].height.split("px")[0]);
      if (height > maxHeight) {
        maxHeight = height;
      }
    }
    // set margin-right of html books
    const marginRight = 35;
    for (let i = 0; i < books.length; i++) {
      let book: HTMLElement | null = document.getElementById(
        `book-${i}-${books[i].tag}`
      );
      if (book) {
        book.style.marginRight = `${
          Number(books[i].spine.width.split("px")[0]) - marginRight
        }px`;
      }
    }

    //set bottom property of book to maxheight - book.height
    for (let i = 0; i < books.length; i++) {
      let book: HTMLElement | null = document.getElementById(
        `book-${i}-${books[i].tag}`
      );
      let child: HTMLElement | null | undefined =
        book?.querySelector(".side.spine");
      let height = child?.style.height;
      if (book && height) {
        (
          document.querySelector(`#book-${i}-${books[i].tag}`) as HTMLElement
        ).style.bottom = `${Number(height.split("px")[0]) - maxHeight}px`;
      }
    }
  }
  useEffect(() => {
    // for each tag, align books
    booksByTag.forEach((tag) => {
      alignBooksBottom(tag.books);
    });
  }, []);

  return (
    <div className="container flex flex-column items-center justify-center p-4 mb-4">
      {
        //display all books grouped by their tag
        booksByTag.map((tag, tagIndex: number) => (
          <div
            style={{
              marginTop: `${tagIndex === 0 ? "0px" : "-500px"}`,
            }}
          >
            <div className="bookshelf flex flex-row align-bottom mt-4">
              {tag.books.map((book: BookData, index: number) => (
                <Book
                  bookData={book}
                  index={`${index}-${tag.tag}`}
                  key={`${index}-${tag.tag}`}
                />
              ))}
            </div>
            <div
              className={`transition ease-in-out duration-300 hover:cursor-pointer flex relative bg-white rounded text-white text-2xl p-2 items-center justify-center white-shadow from-green-500 via-green-400 to-green-100 bg-gradient-to-r ${
                isHovering[tag.tag] ? "scale-125" : ""
              } `}
              onMouseOver={(e) => handleMouseOver(tag.tag)}
              onMouseOut={(e) => handleMouseOut(tag.tag)}
              style={{
                width: "200px",
                height: "50px",
                zIndex: 20,
                right: "45%",
                top: "0%",
              }}
            >
              {
                // first capital and low_bar to space
                tag.tag
                  .split("_")
                  .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
                  .join(" ")
              }
            </div>
            <div
              className={`box bg-white ${
                isHovering[tag.tag] ? "box-hover" : ""
              }`}
              style={{
                marginLeft: "-150px",
              }}
            ></div>
          </div>
        ))
      }
    </div>
  );
}

export default Bookshelf;
