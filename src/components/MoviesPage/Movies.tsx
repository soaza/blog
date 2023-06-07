import React from "react";
import { useQuery } from "react-query";
import { supabase } from "../../common/supabase";
import { MovieBox } from "./MovieBox";
import { IMovie } from "../../common/interfaces";

export const Movies = () => {
  const { data: movieData } = useQuery<IMovie[]>(
    "recently-watched-movie",
    async () => {
      const { data, error } = await supabase
        .from("movies")
        .select()
        .order("created_at", { ascending: false });

      if (!data) {
        return;
      }

      return data as IMovie[];
    }
  );
  return (
    <div className="grid lg:grid-cols-4 2xl:grid-cols-6 gap-4">
      {movieData && movieData.map((movie) => <MovieBox movie={movie} />)}
    </div>
  );
};
