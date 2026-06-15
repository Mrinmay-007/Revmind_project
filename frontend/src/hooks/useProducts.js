
import { useEffect, useState } from "react";
import { api } from "../api/api";

export function useProducts() {
  const [data, setData] = useState([]);
  const [loading, setLoading] =
    useState(true);

  useEffect(() => {
    api
      .getProducts()
      .then(setData)
      .catch(console.error)
      .finally(() => setLoading(false));
  }, []);

  return { data, loading };
}