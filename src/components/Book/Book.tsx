import book_adaptive from "../../assets/bookCovers/book_adaptive.jpg";
import { BookData } from "../../models/BookData";
import "./Book.css";

type BookDataProps = {
  bookData: BookData;
  index: number;
};

function Book(props: BookDataProps) {
  return (
    <div className="book" id={`book-${props.index}`}>
      <div
        className="side spine"
        style={{
          height: props.bookData.height,
          width: props.bookData.spine.width,
          backgroundColor: props.bookData.spine.color,
        }}
      >
        <span
          className="spine-title"
          style={{
            fontSize: props.bookData.spine.fontSize,
            fontFamily: props.bookData.spine.fontFamily,
            color: props.bookData.spine.textColor,
            fontWeight: props.bookData.spine.fontWeight,
            textShadow: props.bookData.spine.textShadow,
            margin: props.bookData.spine.marginTitle,
            marginTop: props.bookData.spine.marginTop,
          }}
        >
          {props.bookData.title}
        </span>
      </div>
      <div
        className="side top"
        style={{
          height: props.bookData.width,
          width: props.bookData.spine.width,
        }}
      ></div>
      <a
        className="side cover link"
        href={props.bookData.link}
        target="_blank"
        style={{
          backgroundImage: `url(${require(`../../assets/bookCovers/${props.bookData.cover}`)})`,
          height: props.bookData.height,
          width: props.bookData.width,
          left: props.bookData.spine.width,
        }}
      >
        <div
          className="side cover"
          style={{
            height: props.bookData.height,
            width: props.bookData.width,
            left: props.bookData.spine.width,
          }}
        ></div>
      </a>
      <div
        className="side bot"
        style={{
          top: props.bookData.height,
          width: props.bookData.spine.width,
        }}
      ></div>
    </div>
  );
}

export default Book;
