import { useEffect, useState } from "react";
import Book from "./Book/Book";
import { BookData } from "../../models/BookData";
import "./Bookshelf.css";

type BookshelfProps = {
  books: BookData[];
};

type TagType = {
  shadowColor: string;
  bgColor: string;
  label: string;
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
    .map((book) => book.tags)
    .flat()
    .filter((tag, index, self) => self.indexOf(tag) === index);

  const TAG_TYPES: { [key: string]: TagType } = {
    software: {
      shadowColor: "rgba(59, 130, 246, 0.9)",
      bgColor: "from-blue-500 via-blue-400 to-blue-100",
      label: "Software",
    },
    default: {
      shadowColor: "rgba(34, 197, 94, 0.9)",
      bgColor: "from-green-500 via-green-400 to-green-100",
      label: "Default",
    },
    agilityDevops: {
      shadowColor: "rgba(234, 179, 8, 0.9)",
      bgColor: "from-yellow-500 via-yellow-400 to-yellow-100",
      label: "Agility & DevOps",
    },
  };

  // group books by tag
  const booksByTag = tags.map((tag) => {
    return {
      tag,
      books: props.books.filter((book) => book.tags.includes(tag)),
      tagType: TAG_TYPES[tag],
    };
  });

  function alignBooksBottom(books: BookData[], tag: string) {
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
        `book-${i}-${tag}`
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
        `book-${i}-${tag}`
      );
      let child: HTMLElement | null | undefined =
        book?.querySelector(".side.spine");
      let height = child?.style.height;
      if (book && height) {
        (
          document.querySelector(`#book-${i}-${tag}`) as HTMLElement
        ).style.bottom = `${Number(height.split("px")[0]) - maxHeight}px`;
      }
    }
  }
  useEffect(() => {
    // for each tag, align books
    booksByTag.forEach((tag) => {
      alignBooksBottom(tag.books, tag.tag);
    });
  }, []);

  return (
    <div className="container flex flex-column items-center justify-center p-4 mb-4">
      {
        //display all books grouped by their tag
        booksByTag.map((tagGroup, tagIndex: number) => (
          <div
            style={{
              marginTop: `${tagIndex === 0 ? "0px" : "-500px"}`,
            }}
          >
            <div className="bookshelf flex flex-row align-bottom mt-4">
              {tagGroup.books.map((book: BookData, index: number) => (
                <Book
                  bookData={book}
                  index={`${index}-${tagGroup.tag}`}
                  key={`${index}-${tagGroup.tag}`}
                />
              ))}
            </div>
            <div
              className={`transition ease-in-out duration-300 hover:cursor-pointer flex relative bg-white 
              rounded text-white text-2xl p-2 items-center justify-center
              ${tagGroup.tagType.bgColor} bg-gradient-to-r ${
                isHovering[tagGroup.tag] ? "scale-125" : ""
              } `}
              onMouseOver={(e) => handleMouseOver(tagGroup.tag)}
              onMouseOut={(e) => handleMouseOut(tagGroup.tag)}
              style={{
                width: "250px",
                height: "50px",
                zIndex: 20,
                right: "35%", // <-- reduce this to move the tag closer to the books
                top: "0%",
                boxShadow: `0px 0px 18px 4px ${tagGroup.tagType.shadowColor}`,
              }}
            >
              {tagGroup.tagType.label}
            </div>
            <div
              className={`box bg-white ${
                isHovering[tagGroup.tag] ? "box-hover" : ""
              }`}
              style={{
                marginLeft: "-50px", // <-- reduce this to move the books to the left
              }}
            ></div>
          </div>
        ))
      }
    </div>
  );
}

export default Bookshelf;
