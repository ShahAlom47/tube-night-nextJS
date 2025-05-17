/* eslint-disable @typescript-eslint/no-explicit-any */
'use client';

import { useSearchParams } from 'next/navigation';
import { useEffect, useState } from 'react';
import Loading from '../loading';
import SearchVideoCard from '@/componets/SearchVideoCard';

const SearchResultsPage = () => {
  const searchParams = useSearchParams();
  const query = searchParams.get('query') || '';
  const [results, setResults] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);
  const [page, setPage] = useState(1);
  const limit = 12;

  // Fetch results with optional reset
  const fetchResults = async (reset = false) => {
    setLoading(true);
    try {
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_BASE_URL}/api/search?query=${query}&limit=${limit}&page=${reset ? 1 : page}`
      );
      const data = await res.json();
      if (reset) {
        setResults(data);
      } else {
        setResults((prevResults) => [...prevResults, ...data]);
      }
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  // When query changes, reset results and fetch first page
  useEffect(() => {
    if (!query) return;
    setPage(1);
    fetchResults(true);
  }, [query,page]);

  // Load more data (next page)
  const handleMore = () => {
    const nextPage = page + 1;
    setPage(nextPage);
    fetchResults();
  };

  return (
    <div className="p-4">
      <h1 className="text-sm font-semibold mb-4">
        Results for: <span className="font-normal">{query}</span>
      </h1>

      {loading && results.length === 0 ? (
        <Loading />
      ) : results.length ? (
        <>
          <ul className="space-y-2">
            {results.map((video: any,index) => (
              <SearchVideoCard key={video?.id?.videoId ||  index+"video"} video={video} />
            ))}
          </ul>
          <div className="my-4 flex justify-center">
            <button
              onClick={handleMore}
              className="border-2 px-3 py-1 bg-white rounded-sm hover:bg-gray-100"
              disabled={loading}
            >
              {loading ? 'Loading...' : 'Load more'}
            </button>
          </div>
        </>
      ) : (
        <p>No results found.</p>
      )}
    </div>
  );
};

export default SearchResultsPage;
