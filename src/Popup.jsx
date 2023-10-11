import React from 'react';
import ResetIcon from './reset.svg';

const Popup = ({ isOpen, onClose, selectedMovie }) => {
  if (!isOpen || !selectedMovie) return null;

  return (
    <div className="popup">
      <div className="popup-content">
        <img
                    className='close-button'
                    src={ResetIcon}
                    alt='reset'
                    onClick={onClose}
                />
        <div className='movie-popup'>
          <div className='poster-popup'>
              <img 
              className='poster-img-popup'
              src={selectedMovie.Poster !== 'N/A' ? selectedMovie.Poster : 'https://via.placeholder.com/400'} 
              alt={selectedMovie.Title} />
          </div>
          <div className='details-popup'>
              <h2>{selectedMovie.Title}</h2>
              <p>Type: {selectedMovie.Type}</p>
              <p>Year: {selectedMovie.Year}</p>
              <h3>Overview:</h3>
              <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Popup;
