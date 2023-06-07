import Layout from "@theme/Layout";
import React from "react";
import { MovieBox } from "../components/MoviesPage/MovieBox";
import { QueryClient, QueryClientProvider, useQuery } from "react-query";
import { supabase } from "../common/supabase";
import { Movies } from "../components/MoviesPage/Movies";

export const MoviesPage = () => {
  const queryClient = new QueryClient({
    defaultOptions: { queries: { refetchOnWindowFocus: false } },
  });

  return (
    <Layout>
      <QueryClientProvider client={queryClient}>
        <div className="p-12">
          <div className="text-center mb-12">
            Movies i've watched. Ratings are personal opinion.
          </div>

          <Movies />
        </div>
      </QueryClientProvider>
    </Layout>
  );
};

export default MoviesPage;
