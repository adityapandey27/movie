import Image from "../banner1.jpg";
// axios will make the request to server on our behalf
import axios from "axios";
import { Oval } from "react-loader-spinner";
import { useEffect, useState } from "react";
import Pagination from "./Pagination";

function Movies() {
  const [movies, setMovies] = useState([]);
  const [page, setPage] = useState(1);
  const [hover, setHover] = useState("");
  const [favourites, setFavourites] = useState([]);
  function goAhead() {
    setPage(page + 1);
  }
  function goBack() {
    if (page > 1) {
      setPage(page - 1);
    }
  }

  useEffect(
    function () {
      axios
        .get(
          `https://api.themoviedb.org/3/trending/all/day?api_key=ef49ff4316320a28417198a6375bd3f1&page=${page}`
        )
        .then((res) => {
          console.table(res.data.results);
          setMovies(res.data.results);

          // getting the movies
          let oldFav = localStorage.getItem("imdb");
          oldFav = JSON.parse(oldFav);
          setFavourites([...oldFav]);
        });
    },
    [page]
  );

  let add = (movie) => {
    let newArray = [...favourites, movie];
    setFavourites([...newArray]);
    // console.log(newArray);

    // To store the favourite movies in local storage
    // we want to add our newArray into a package in imdb named collection
    // localstorage only store string , so converting the array into string
    // now we set the movies now want to get it in use effect
    localStorage.setItem("imdb", JSON.stringify(newArray));
    localStorage.setItem("imdb", JSON.stringify(newArray));
  };

  //  Deleting the movies from favourites
  let del = (movie) => {
    let newArray = favourites.filter((m) => m.id != movie.id);
    setFavourites([...favourites]);
    localStorage.setItem("imdb", JSON.stringify(newArray));
  };

  return (
    <div className="mb-8">
      <div className="mt-8 font-bold text-2xl text-center">
        {" "}
        Trending Movies
      </div>
      {movies.length == 0 ? (
        <div className="flex justify-center">
          <Oval height="100" width="100" color="gray" ariaLabel="landing" />
        </div>
      ) : (
        <div className="flex flex-wrap justify-center ">
          {movies.map((movie) => (
            <div
              className={`bg-[url(https://image.tmdb.org/t/p/w500/${movie.backdrop_path})]
                        md:h-[30vh]  md:w-[200px] bg-center bg-cover
                        h-[25vh] w-[150px]
                         rounded-xl flex items-end m-4
                         hover:scale-110
                         ease-out duration-300
                         relative
                     `}
              onMouseEnter={() => {
                setHover(movie.id);
                // console.log(movie.id);
              }}
              onMouseLeave={() => {
                setHover("");
              }}
            >
              {hover == movie.id && (
                <>
                  {!favourites.find((m) => m.id == movie.id) ? (
                    <div
                      className="
                        absolute
                        top-2 right-2
                        p-2 
                        bg-gray-800
                        rounded-xl
                        text-xl "
                      onClick={() => {
                        add(movie);
                        // console.log(favourites);
                      }}
                    >
                      😍
                    </div>
                  ) : (
                    <div
                      className="
                        absolute
                        top-2 right-14
                        p-2 
                        bg-gray-800
                        rounded-xl
                        text-xl
                        "
                      onClick={() => {
                        del(movie);
                      }}
                    >
                      ❌
                    </div>
                  )}
                </>
              )}

              <div
                className="w-full bg-gray-900 text-white
                         py-2 text-center rounded-b-xl text-xl font-bold
                         "
              >
                {movie.title || movie.name}
              </div>
            </div>
          ))}
        </div>
      )}

      <Pagination page={page} goBack={goBack} goAhead={goAhead} />
    </div>
  );
}

export default Movies;
