import { useState, useEffect } from "react"

import BookCard from "./BookCard"
import Popup from "./Popup"

import "./App.css"
import SearchIcon from "./search.svg"
import ResetIcon from "./reset.svg"

const API_URL = "https://www.googleapis.com/books/v1/volumes"

const App = () => {
  const [books, setBooks] = useState([])
  const [searchTerm, setSearchTerm] = useState("")
  const [isPopupOpen, setIsPopupOpen] = useState(false)
  const [selectedBook, setSelectedBook] = useState(null)

  const searchBooks = async (title) => {
    const response = await fetch(`${API_URL}?q=${title}`)
    const data = await response.json()
    data.items = data.items.filter((book) => {
      return !(
        book.volumeInfo.title.includes("Muha") ||
        book.volumeInfo.title.includes("Moha")
      )
    })
    setBooks(data.items)
  }

  useEffect(() => {
    searchBooks("programming")
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

  const openPopup = (book) => {
    setSelectedBook(book)
    setIsPopupOpen(true)
  }
  const closePopup = () => {
    setSelectedBook(null)
    setIsPopupOpen(false)
  }
  const handleEnterKeyPress = (event) => {
    if (event.key === "Enter") {
      searchBooks(searchTerm)
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
          onClick={() => searchBooks(searchTerm)}
        />
        <img
          src={ResetIcon}
          alt="reset"
          onClick={() => {
            searchBooks("programming")
            setSearchTerm("")
          }}
        />
      </div>

      {books?.length > 0 ? (
        <div className="container">
          {books.map((book) => (
            <button
              key={book.id}
              onClick={() => openPopup(book)}
              className="button"
            >
              <BookCard book={book} />
            </button>
          ))}
        </div>
      ) : (
        <div className="empty">
          <h2>No record found</h2>
        </div>
      )}

      <footer>
        Made with React and <span>❤</span> by Muhammad Hussnain Shaker{" "}
        <a
          href="https://github.com/MuhammadHussnainShaker"
          target="_blank"
          rel="noreferrer"
        >
          [GitHub]
        </a>
      </footer>

      <Popup
        isOpen={isPopupOpen}
        onClose={closePopup}
        selectedBook={selectedBook}
      />
    </div>
  )
}

export default App
