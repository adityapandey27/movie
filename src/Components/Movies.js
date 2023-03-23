import React, { useEffect } from 'react'
import Image from "../banner1.jpg";
// axios will make the request to server on our behalf
import axios from "axios";
import {Oval} from "react-loader-spinner";
import { useState } from 'react';

function Movies() {
    const [movies,setMovies]=useState([]);
   
    useEffect(function (){
        
        axios.get("https://api.themoviedb.org/3/trending/all/day?api_key=ef49ff4316320a28417198a6375bd3f1"
        ).then((res)=>
        {
            console.table(res.data.results)
            setMovies(res.data.results);
        }
            ) 
    })

   


  return (
    <div className='mb-8'>
        <div className='mt-8 font-bold text-2xl text-center'> Trending Movies</div>
        {
            movies.length==0?
            <div className='flex justify-center'>
            <Oval 
            height="100" 
            width="100" 
            color="gray"
             ariaLabel="landing"
             />
             </div>:

            <div className='flex flex-wrap justify-center '>

                {
                    movies.map((movie)=>(
                        <div className={`bg-[url(${Image})]
                        md:h-[30vh]  md:w-[200px] bg-center bg-cover
                        h-[25vh] w-[150px]
                         rounded-xl flex items-end m-4
                         hover:scale-110
                         ease-out duration-300
                     `}>
                         <div className='w-full bg-gray-900 text-white
                         py-2 text-center rounded-b-xl text-xl font-bold
                         '>{movie.title}
                         </div>
                     </div>
                        
                    ))
                }
               

            </div>
        }
        
        
        
    </div>
  )
}

export default Movies