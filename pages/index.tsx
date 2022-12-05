import { useFieldExtension } from "microcms-field-extension-react";
import type { NextPage } from "next";
import Image from "next/image";
import { useCallback, useState } from "react";
import { useSearch } from "../hooks/useSearch";
import Result from "../components/Result";
import { Item } from "../types/result";

const origin =
  process.env.NEXT_PUBLIC_MICROCMS_ORIGIN || "https://example.microcms.io";

const Home: NextPage = () => {
  const { data, sendMessage } = useFieldExtension<Item>(
    {
      node: {
        vendor: "",
        description: "",
        handle: "",
        title: "",
        id: "",
        availableForSale: false,
        createdAt: "",
      },
    },
    { origin, height: 400 }
  );

  const [query, setQuery] = useState<string>("");
  const [result, error, loading, search] = useSearch(query);
  const onKeyDown = useCallback(
    (e: { keyCode: number }) => {
      if (e.keyCode === 13) {
        search();
      }
    },
    [search]
  );

  return (
    <>
      <main className="flex items-start">
        <div className="w-[200px] h-[400px] shrink-0">
          {data?.node?.handle ? (
            <div className="w-full max-w-[200px]">
              {data?.node?.images?.edges[0]?.node && (
                <Image
                  src={data?.node?.images?.edges[0]?.node?.originalSrc}
                  alt=""
                  width={data?.node?.images?.edges[0]?.node?.width}
                  height={data?.node?.images?.edges[0]?.node?.height}
                />
              )}
              <p className="">{data?.node?.title}</p>
              <button
                className="flex items-center justify-center border-2  font-bold text-xs leading-4 rounded-sm h-[40px] px-4 py-2 whitespace-nowrap mx-auto mt-4"
                onClick={() => {
                  sendMessage({ id: "relatedProduct", data: "" });
                }}
              >
                選択解除
              </button>
            </div>
          ) : (
            <div className="w-[200px] text-center text-sm shrink-0 py-2">
              <p>選択中のアイテムがありません</p>
            </div>
          )}
        </div>
        <div className="flex flex-col flex-1 pl-10 h-[400px]">
          <div className="flex">
            <input
              type="text"
              onChange={(e) => setQuery(e.target.value)}
              onKeyDown={onKeyDown}
              className="p-4 border rounded-sm bg-white w-full h-[40px] shadow-sm mx-2"
            />
            <button
              onClick={search}
              className="flex items-center justify-center text-white bg-gray-900 font-bold text-sm leading-4 rounded-sm h-[40px] px-4 py-2 whitespace-nowrap"
            >
              検索
            </button>
          </div>
          <div className="overflow-auto flex-1 mt-4">
            <Result
              result={result}
              error={error}
              loading={loading}
              sendMessage={sendMessage}
            />
          </div>
        </div>
      </main>
    </>
  );
};

export default Home;
