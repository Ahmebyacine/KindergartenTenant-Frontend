import { useState, useEffect, useCallback } from "react";

const usePaginatedFetch = (fetchFunction) => {
  const [data, setData] = useState([]);
  const [page, setPage] = useState(1);
  const [pages, setPages] = useState(0);
  const [total, setTotal] = useState(0);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const executeFetch = useCallback(
    async (customFetchFn) => {
      try {
        setLoading(true);
        setError(null);

        const fn = customFetchFn || fetchFunction;
        const result = await fn();
        setData(result?.data || []);
        setPage(result?.page || 1);
        setPages(result?.pages || 0);
        setTotal(result?.total || 0);
      } catch (err) {
        setError(
          err?.response?.data || {
            message: "An error occurred while fetching data",
            status: 404,
          }
        );
        console.error("Fetch error:", err);
      } finally {
        setLoading(false);
      }
    },
    [fetchFunction]
  );

  useEffect(() => {
    if (fetchFunction) {
      executeFetch();
    }
  }, []);

  const refetch = useCallback(
    (newFetchFunction) => {
      executeFetch(newFetchFunction);
    },
    [executeFetch]
  );

  return {
    data,
    loading,
    error,
    refetch,
    setData,
    page,
    pages,
    total,
  };
};

export default usePaginatedFetch;
