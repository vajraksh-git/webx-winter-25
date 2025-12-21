import React , {useEffect, useState} from "react";
import "./Dashboard.css"
import MainMovie from "./MainMovie";
import MovieCard from "./MovieCard";

function Dashboard(){
  const[searchItem , setSearchItem] = React.useState("");
  const[MovieData , setMovieData] = React.useState(null);
  const[MovieArray , setMovieArray] = React.useState([]);
    
// ---------------------------FETCHING MOVIE DATA FROM TMDB---------------------------//    
useEffect ( () => {
  async function fetchMovies(){ 
    const options = {
      method: 'GET',
      headers: {
        accept: 'application/json',
        Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJlNzE5ZGY5MTQ3NmFkYzk4NDQyMzhjMGRiMmYxMDJmNSIsIm5iZiI6MTc2NTk2MzQxNi4wMzUsInN1YiI6IjY5NDI3Njk4ZmVjNTViN2Q1ZTA4ZjRmYyIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.t2e1Z2w5L4EZBXgVst0JyrO2_tbZfuExkI9ZV5MHmm4'
      }
    };

    const response = await fetch(`https://api.themoviedb.org/3/discover/movie?include_adult=false&include_video=false&language=en-US&page=1&sort_by=popularity.desc`, options);
    const data = await response.json();
    console.log(data.results);  
    const tempArray =data.results.map( (movie , index) => {
      return {
        title: movie.title,
        year: movie.release_date,
        imgUrl: `https://image.tmdb.org/t/p/w500${movie.poster_path}`,
        rating: movie.vote_average
      }
    })
    setMovieArray( tempArray );
  };

  fetchMovies();
} , [] );

//---------------------------Scrolling to top whenever main movie changes---------------------------//
useEffect( ()=> {
  window.scrollTo({
    top: 0,
    left: 0,
    behavior: "smooth"
  });
} , [MovieData]);


 
  const handleInputChange = (e) => {
      setSearchItem(e.target.value);
    };
  
 // ---------------------------THE SEARCH FUNCTIONALITY---------------------------//
  
      
  function Search(x){
      const apiKey=`bc082182`;
      const url=`https://www.omdbapi.com/?apikey=${apiKey}&t=${x}`;
      console.log(url);
      const request = async() => {
      const response = await fetch (url);
      const data = await response.json();
      console.log(data);
      if(data.Response === "True"){
        setMovieData(data);
      }
    };
    request();
    console.log("Searching for movie:", x);
    setSearchItem("");  
    }


  function handleSearch(e) {
    if(e.key == 'Enter'){
      Search(searchItem);
  }};

  //---------------------------Chnainging MainMovie on clicking MovieCard---------------------------//
  const handleCardClick=(movie)=>{
    Search(movie);
  }

    return <div>
      <nav>
        <div className="logo">SASTA-MOVIE EXPLORER</div>
        <ul className="nav-links">
          <li><a href=""></a></li>
        </ul>
        <div className="btns">
          <input onKeyDown={handleSearch} onChange={handleInputChange} type="search" placeholder="search..."  value={searchItem} className="search-input"/>
          <button onClick={ ()=> Search(searchItem)} className="btn">Go</button>
        </div>  
      </nav>
      <div className="empty_space">empty_space</div>
      {MovieData && <MainMovie data={MovieData} />}
      <div className="movie-cards-container">
      {MovieArray.map((movie , index) => (
        <MovieCard onClick={()=>handleCardClick(movie.title)}
          key={index}
          title={movie.title}
          year={movie.year}
          imgUrl={movie.imgUrl}
          rating={movie.rating} />))}
      </div>
    </div>
}

export default Dashboard;