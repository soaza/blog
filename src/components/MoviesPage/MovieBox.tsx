import React from "react";
import { IMovie } from "../../common/interfaces";

export const MovieBox = (props: { movie: IMovie }) => {
  const { movie } = props;

  return (
    <div className="rounded-3xl p-4  dark:bg-slate-600 dark:border-gray-500 dark:border text-black dark:text-white aspect-square w-80 lg:w-full relative bg-gray-800 z-30">
      <img
        src={movie.movie_image}
        className="w-full h-full absolute top-0 left-0 rounded-3xl opacity-40 -z-10 object-cover"
      />

      <div className="text-white flex flex-col gap-2 h-full">
        <div className="text-4xl 2xl:text-3xl font-bold ">
          {movie.movie_name}
        </div>

        <div className="text-2xl font-thin xl:text-xl 2xl:text-2xl text-orange-300">
          {movie.movie_director}
        </div>

        <div className="absolute bottom-2 right-2 flex flex-row align-middle items-center gap-2">
          <span className="text-md font-light">{movie.movie_rating}</span>
        </div>
      </div>
    </div>
  );
};
