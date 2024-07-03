import React, { useEffect, useState } from "react"

const MovieCard = ({ movie }) => {
console.log(movie);

  const [thumbnailUrl, setThumbnailUrl] = useState(
    "https://via.placeholder.com/400"
  )

  useEffect(() => {
    const loadImage = async () => {
      const url = movie?.volumeInfo?.imageLinks?.thumbnail

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
  }, [movie])

  return (
    <div className="movie">
      <div>
        <p>{movie?.volumeInfo?.publishedDate}</p>
      </div>

      <div>
        <img src={thumbnailUrl} alt={movie?.volumeInfo?.title || "Book Title"} />
      </div>

      <div>
        <span>{movie?.volumeInfo?.printType}</span>
        <h3>{movie?.volumeInfo?.title}</h3>
      </div>
    </div>
  )
}

export default MovieCard
