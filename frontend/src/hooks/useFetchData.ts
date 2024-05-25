import { useRouter } from "next/navigation";
import { useState, useEffect } from "react";

type FetchFunction<T, U = undefined> = (input?: U) => Promise<T>;

export default function useFetchData<T, U = undefined>(
  fetchFunction: FetchFunction<T, U>,
  fetchInput?: U
) {
  const [data, setData] = useState<T | null>(null);
  const [error, setError] = useState<any | null>(null);
  const router = useRouter();

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) {
      router.push("/login");
    } else {
      fetchData(token);
    }
  }, []);

  async function fetchData(token: string) {
    try {
      let fetchedData;
      if (fetchInput !== undefined) {
        fetchedData = await fetchFunction(fetchInput);
      } else {
        fetchedData = await fetchFunction();
      }
      setData(fetchedData);
    } catch (err) {
      setError(err);
    }
  }

  return { data, error };
}