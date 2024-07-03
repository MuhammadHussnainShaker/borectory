import { useState, useEffect } from "react"

import MovieCard from "./MovieCard"
import Popup from "./Popup"

import "./App.css"
import SearchIcon from "./search.svg"
import ResetIcon from "./reset.svg"

// A variable that store demo book data for debugging purposes
// const book = {
//       "kind": "books#volume",
//       "id": "Hi5wCgAAQBAJ",
//       "etag": "OMYjIvBe48k",
//       "selfLink": "https://www.googleapis.com/books/v1/volumes/Hi5wCgAAQBAJ",
//       "volumeInfo": {
//         "title": "The Movie Book",
//         "subtitle": "Big Ideas Simply Explained",
//         "authors": [
//           "DK"
//         ],
//         "publisher": "Dorling Kindersley Ltd",
//         "publishedDate": "2016-01-05",
//         "description": "Stand by for hours of blissful immersion in the world of film - the world's \"seventh art\". The Movie Book is your detailed guide to 100 seismic films, from Intolerance (1916) to the groundbreaking Boyhood (2014). Part of the Big Ideas series, The Movie Book is your perfect companion and reference with infographics to explain swift-moving plots and complicated relationships. It shows The Godfather's complicated web of family and associates, for example, and gives minute-by-minute plot lines to iconic movies such as Taxi Driver or Blade Runner. One film can influence another and this indispensable and crystal clear guide explains what inspired Quentin Tarantino to use a glowing briefcase in Pulp Fiction, for example, or how Jaws triggered decades of summer action blockbusters. Liberally sprinkled with gorgeous stills, pithy quotes and trivia detail, The Movie Book brings you new insights into your favourites and introduces you to little-known masterpieces from around the world.",
//         "industryIdentifiers": [
//           {
//             "type": "ISBN_13",
//             "identifier": "9780241248720"
//           },
//           {
//             "type": "ISBN_10",
//             "identifier": "0241248728"
//           }
//         ],
//         "readingModes": {
//           "text": true,
//           "image": false
//         },
//         "pageCount": 764,
//         "printType": "BOOK",
//         "categories": [
//           "Performing Arts"
//         ],
//         "maturityRating": "NOT_MATURE",
//         "allowAnonLogging": true,
//         "contentVersion": "1.7.7.0.preview.2",
//         "panelizationSummary": {
//           "containsEpubBubbles": false,
//           "containsImageBubbles": false
//         },
//         "imageLinks": {
//           "smallThumbnail": "http://books.google.com/books/content?id=Hi5wCgAAQBAJ&printsec=frontcover&img=1&zoom=5&source=gbs_api",
//           "thumbnail": "http://books.google.com/books/content?id=Hi5wCgAAQBAJ&printsec=frontcover&img=1&zoom=1&source=gbs_api"
//         },
//         "language": "en",
//         "previewLink": "http://books.google.com/books?id=Hi5wCgAAQBAJ&dq=movie&hl=&cd=1&source=gbs_api",
//         "infoLink": "http://books.google.com/books?id=Hi5wCgAAQBAJ&dq=movie&hl=&source=gbs_api",
//         "canonicalVolumeLink": "https://books.google.com/books/about/The_Movie_Book.html?hl=&id=Hi5wCgAAQBAJ"
//       },
//       "saleInfo": {
//         "country": "PK",
//         "saleability": "NOT_FOR_SALE",
//         "isEbook": false
//       },
//       "accessInfo": {
//         "country": "PK",
//         "viewability": "NO_PAGES",
//         "embeddable": false,
//         "publicDomain": false,
//         "textToSpeechPermission": "ALLOWED",
//         "epub": {
//           "isAvailable": true
//         },
//         "pdf": {
//           "isAvailable": true
//         },
//         "webReaderLink": "http://play.google.com/books/reader?id=Hi5wCgAAQBAJ&hl=&source=gbs_api",
//         "accessViewStatus": "NONE",
//         "quoteSharingAllowed": false
//       },
//       "searchInfo": {
//         "textSnippet": "Stand by for hours of blissful immersion in the world of film - the world&#39;s &quot;seventh art&quot;. The Movie Book is your detailed guide to 100 seismic films, from Intolerance (1916) to the groundbreaking Boyhood (2014)."
//       }
//     }

const API_URL = "https://www.googleapis.com/books/v1/volumes"

const App = () => {
  const [movies, setMovies] = useState([])
  const [searchTerm, setSearchTerm] = useState("")
  const [isPopupOpen, setIsPopupOpen] = useState(false)
  const [selectedMovie, setSelectedMovie] = useState(null)

  const searchMovies = async (title) => {
    const response = await fetch(`${API_URL}?q=${title}`)
    const data = await response.json()
    data.items = data.items.filter((book) => {
      return !(
        book.volumeInfo.title.includes("Muha") ||
        book.volumeInfo.title.includes("Moha")
      )
    })
    setMovies(data.items)
  }

  useEffect(() => {
    searchMovies("programming")
  }, [])
  useEffect(() => {
    const handleEscapeKeyPress = (event) => {
      if (event.key === "Escape") {
        closePopup()
      }
    }
    window.addEventListener("keydown", handleEscapeKeyPress)
    return () => {
      window.removeEventListener("keydown", handleEscapeKeyPress)
    }
  }, [])

  const openPopup = (movie) => {
    setSelectedMovie(movie)
    setIsPopupOpen(true)
  }
  const closePopup = () => {
    setSelectedMovie(null)
    setIsPopupOpen(false)
  }
  const handleEnterKeyPress = (event) => {
    if (event.key === "Enter") {
      searchMovies(searchTerm)
    }
  }

  return (
    <div className="app">
      <h1>Borectory - The Books Directory</h1>

      <div className="search">
        <input
          placeholder="Search"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          onKeyPress={handleEnterKeyPress}
        />
        <img
          src={SearchIcon}
          alt="search"
          onClick={() => searchMovies(searchTerm)}
        />
        <img
          src={ResetIcon}
          alt="reset"
          onClick={() => {
            searchMovies("movie")
            setSearchTerm("")
          }}
        />
      </div>

      {movies?.length > 0 ? (
        <div className="container">
          {movies.map((movie) => (
            <button
              key={movie.id}
              onClick={() => openPopup(movie)}
              className="button"
            >
              <MovieCard movie={movie} />
            </button>
          ))}
        </div>
      ) : (
        <div className="empty">
          <h2>No record found</h2>
        </div>
      )}

      <Popup
        isOpen={isPopupOpen}
        onClose={closePopup}
        selectedMovie={selectedMovie}
      />
    </div>
  )
}

export default App
