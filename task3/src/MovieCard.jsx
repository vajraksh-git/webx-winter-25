import React from 'react';
import './MovieCard.css';




function MovieCard({ title, year, imgUrl, rating ,onClick }) {
  return (
    <div className="movie-card">
      <div onClick={onClick} className="card-image">
        <img src={imgUrl} alt={title} />
        <span className="rating-badge">⭐ {rating}</span>
      </div>
      
      <div className="card-details">
        <h3>{title}</h3>
        <p>{year}</p>
        <button className="watch-btn">Watch Now</button>
      </div>
    </div>
  );
}

export default MovieCard;