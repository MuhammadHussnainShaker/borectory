import React, { useEffect, useState } from "react"
import ResetIcon from "./reset.svg"

const Popup = ({ isOpen, onClose, selectedMovie }) => {
  console.log(selectedMovie)

  const [thumbnailUrl, setThumbnailUrl] = useState(
    "https://via.placeholder.com/400"
  )

  useEffect(() => {
    const loadImage = async () => {
      const url = selectedMovie?.volumeInfo?.imageLinks?.thumbnail

      if (!url) {
        setThumbnailUrl("https://via.placeholder.com/400")
        return
      }

      const img = new Image()
      img.src = url.slice(0, 79)

      img.onload = () => {
        if (img.height === 750) {
          setThumbnailUrl(url)
        } else if (img.height > 250) {
          setThumbnailUrl(url.slice(0, 79))
        } else {
          setThumbnailUrl(url)
        }
      }

      img.onerror = () => {
        setThumbnailUrl("https://via.placeholder.com/400")
      }
    }

    loadImage()
  }, [selectedMovie])

  if (!isOpen || !selectedMovie) return null

  return (
    <div className="popup">
      <div className="popup-content">
        <img
          className="close-button"
          src={ResetIcon}
          alt="reset"
          onClick={onClose}
        />
        <div className="movie-popup">
          <div className="poster-popup">
            <img
              className="poster-img-popup"
              src={thumbnailUrl}
              alt={selectedMovie?.volumeInfo?.title || "Book Title"}
            />
          </div>
          <div className="details-popup">
            <h2>{selectedMovie?.Title}</h2>
            {selectedMovie?.volumeInfo?.printType !== undefined ? (
              <>
                <h3>Type: </h3>
                <p>{selectedMovie?.volumeInfo?.printType}</p>
              </>
            ) : null}
            {selectedMovie?.volumeInfo?.authors[0] !== undefined ? (
              <>
                <h3>Author: </h3>
                <p>{selectedMovie?.volumeInfo?.authors[0]}</p>
              </>
            ) : null}
            {selectedMovie?.volumeInfo?.publishedDate !== undefined ? (
              <>
                <h3>Published: </h3>
                <p>{selectedMovie?.volumeInfo?.publishedDate}</p>
              </>
            ) : null}
            {selectedMovie?.volumeInfo.publisher !== undefined ? (
              <>
                <h3>Publisher: </h3>
                <p>{selectedMovie?.volumeInfo?.publisher}</p>
              </>
            ) : null}
            <h3>Description:</h3>
            <p>
              {`${
                selectedMovie?.volumeInfo?.subtitle !== undefined
                  ? selectedMovie?.volumeInfo?.subtitle
                  : selectedMovie?.volumeInfo?.description.slice(0, 79)
              } ...`}
            </p>
            <button className="popup-btn">
              <a
                target="_blank"
                rel="noreferrer"
                href={selectedMovie?.volumeInfo?.infoLink}
              >
                <span>Read More on Google Books</span>
              </a>
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Popup
