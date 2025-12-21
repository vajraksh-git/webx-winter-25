import React from "react";
import "./MainMovie.css";


function MainMovie({ data }) {
  return (
    <div  className="MainMovie">
      
      {/* LEFT SIDE: Image */}
      <div className="MainMovie-image">
        <img 
          src={data.Poster}
          alt="Movie Poster"
        />
      </div>
    
      {/* RIGHT SIDE: Content */}
      <div className="MainMovie-content">
        <div className="MainMovie-details">
          <h2>{data.Title}</h2>
          <div className="MainMovie-meta">
            <span className="rating">IMDB: {data.imdbRating}</span>
            <span>{data.Runtime}</span>
            <span>{data.Genre}</span>
          </div>
          <p className="description">
            {data.Plot}
          </p>
        </div>
        
        <button className="watchnow-btn">
            <i className="fa-solid fa-play"></i> Watch Now
        </button>
      </div>

    </div>  
  );
}

export default MainMovie;