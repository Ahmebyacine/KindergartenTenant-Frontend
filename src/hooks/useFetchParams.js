import { useState, useEffect, useCallback } from 'react';

const useFetchParams = (fetchFunction) => {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const executeFetch = useCallback(async (customFetchFn) => {
    try {
      setLoading(true);
      setError(null);
      
      const fn = customFetchFn || fetchFunction;
      const result = await fn();
      
      setData(result);
    } catch (err) {
      setError(err);
      console.error('Fetch error:', err);
    } finally {
      setLoading(false);
    }
  }, [fetchFunction]);

  // Initial fetch on mount
  useEffect(() => {
    if (fetchFunction) {
      executeFetch();
    }
  }, []);

  // Refetch function that can accept a new fetch function
  const refetch = useCallback((newFetchFunction) => {
    executeFetch(newFetchFunction);
  }, [executeFetch]);

  return {
    data,
    setData,
    loading,
    error,
    refetch,
  };
};

export default useFetchParams;