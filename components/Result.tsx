import Image from "next/image";
import type { Item, ShopifyResult } from "../types/result";

type Props = {
  result: ShopifyResult | null;
  error: any;
  loading: boolean;
  sendMessage: (data: any) => void;
};

export function Index({ result, error, loading, sendMessage }: Props) {
  if (loading) {
    return (
      <div className="flex justify-center  h-full">
        <div className="animate-spin h-10 w-10 border-4 border-blue-500 rounded-full border-t-transparent"></div>
      </div>
    );
  }
  if (error) {
    return (
      <div className="flex items-center justify-center h-full">
        <p>エラーが発生しました</p>
      </div>
    );
  }
  if (result?.data.products.edges.length === 0) {
    return (
      <div className="flex items-center justify-center h-full">
        <p>検索結果が見つかりません</p>
      </div>
    );
  }
  return (
    <ul>
      {result?.data.products.edges.map((item: Item) => (
        <li
          key={item.node.id}
          className="flex p-4 hover:bg-violet-100 hover:cursor-pointer border-4 border-transparent hover:border-violet-400"
          onClick={() => {
            sendMessage({
              id: "relatedProduct",
              data: item,
              imageUrl: item?.node?.images?.edges[0]?.node?.originalSrc
                ? item?.node?.images?.edges[0]?.node?.originalSrc
                : "https://placehold.jp/150x150.png?text=NO%20IMAGE",
            });
          }}
        >
          <div className="w-full max-w-[80px] mr-6 shrink-0">
            {item?.node?.images?.edges[0]?.node?.originalSrc && (
              <Image
                src={item.node.images.edges[0].node.originalSrc}
                alt=""
                width={item.node.images.edges[0].node.width}
                height={item.node.images.edges[0].node.height}
              />
            )}
          </div>
          <div>
            <ul>
              <li>商品コード: {item.node.handle}</li>
              <li>
                {item.node.vendor} / {item.node.title}
              </li>
              <li>
                {item?.node?.priceRange?.minVariantPrice.amount}
                {item?.node?.priceRange?.minVariantPrice.currencyCode}（
                {item?.node?.availableForSale ? "販売中" : "在庫切れ"}）
              </li>
            </ul>
          </div>
        </li>
      ))}
    </ul>
  );
}

export default Index;
