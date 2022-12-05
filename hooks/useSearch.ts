import { useCallback, useState } from "react";
import type { ShopifyResult } from "../types/result";

type UseSearch = (
  keywords?: string
) => [ShopifyResult | null, any, boolean, () => void];

export const useSearch: UseSearch = (keywords) => {
  const [result, setResult] = useState<[ShopifyResult | null, any]>([
    null,
    null,
  ]);
  const [loading, setLoading] = useState<boolean>(false);

  const search = useCallback(() => {
    setLoading(true);
    fetch(`/api/search?keywords=${keywords}`)
      .then((res) => res.json())
      .then((data) => {
        setLoading(false);
        setResult([
          data || {
            Items: [],
            TotalResultCount: 0,
          },
          null,
        ]);
      })
      .catch((error) => {
        setLoading(false);
        setResult([null, error]);
      });
  }, [keywords]);

  return [...result, loading, search];
};
